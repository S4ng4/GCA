document.addEventListener('DOMContentLoaded', () => {
    let allWines = [];

    fetch('pg3.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON.');
            }
            return response.json();
        })
        .then(data => {
            allWines = data;
            renderWines(allWines);
            createFilters(allWines);
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error);
            const grid = document.getElementById('wine-grid');
            grid.innerHTML = '<p class="col-span-full text-center text-red-500 mt-16">Impossibile caricare la lista dei vini. Controlla il file JSON e riprova avviando il sito da un server locale (es. Live Server).</p>';
        });

    function renderWines(winesToRender) {
        const wineGrid = document.getElementById('wine-grid');
        wineGrid.innerHTML = '';

        if (winesToRender.length === 0) {
            wineGrid.innerHTML = '<p class="col-span-full text-center text-neutral-500">Nessun vino trovato per questa categoria.</p>';
            return;
        }

        const groupedByRegion = winesToRender.reduce((acc, wine) => {
            const region = wine.region || 'REGIONE SCONOSCIUTA';
            if (!acc[region]) {
                acc[region] = [];
            }
            acc[region].push(wine);
            return acc;
        }, {});

        const sortedRegions = Object.keys(groupedByRegion).sort();

        sortedRegions.forEach(region => {
            if (groupedByRegion[region].length === 0) return;

            const regionHeader = document.createElement('h2');
            regionHeader.className = 'col-span-full text-3xl font-serif font-semibold text-neutral-800 mt-12 mb-4 tracking-wide';
            regionHeader.textContent = region;
            wineGrid.appendChild(regionHeader);

            groupedByRegion[region].forEach(wine => {
                const wineCard = document.createElement('div');
                wineCard.className = 'bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer';

                const wineName = wine.wine_name || 'Nome Sconosciuto';
                const producer = wine.producer || 'Cantina Sconosciuta';
                const denomination = wine.denomination || 'Denominazione Sconosciuta';
                const wineType = wine.wine_type || 'Tipo Sconosciuto';
                const additionalInfo = wine.additional_information || '';

                wineCard.innerHTML = `
                    <div class="text-xs text-neutral-500 mb-1">${producer}</div>
                    <h3 class="text-2xl font-bold mb-1 line-clamp-1">${wineName}</h3>
                    <h4 class="text-sm text-neutral-600 mb-2 line-clamp-1">${denomination}</h4>
                    <div class="text-sm font-semibold text-neutral-700">
                        <span>${wineType}</span> | <span>${wine.region}</span>
                    </div>
                    <p class="text-xs text-neutral-400 mt-2 line-clamp-2">${additionalInfo}</p>
                `;

                // Add the click event listener to the wine card
                wineCard.addEventListener('click', () => {
                    selectWine(wine);
                });
                
                wineGrid.appendChild(wineCard);
            });
        });
    }

    function createFilters(wines) {
        const filterContainer = document.getElementById('filter-container');
        const wineTypes = [...new Set(wines.map(wine => wine.wine_type))];
        
        filterContainer.innerHTML = '<button class="filter-btn px-4 py-2 text-sm font-medium rounded-full bg-neutral-800 text-white transition filter-active" data-filter="all">Tutti</button>';
        
        wineTypes.sort().forEach(type => {
            if (type) {
                const button = document.createElement('button');
                button.className = 'filter-btn px-4 py-2 text-sm font-medium rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition';
                button.textContent = type;
                button.setAttribute('data-filter', type);
                filterContainer.appendChild(button);
            }
        });

        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.getAttribute('data-filter');
                
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-active', 'bg-neutral-800', 'text-white'));
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.add('bg-neutral-200', 'text-neutral-700'));
                e.target.classList.remove('bg-neutral-200', 'text-neutral-700');
                e.target.classList.add('filter-active', 'bg-neutral-800', 'text-white');
                
                let filteredWines;
                if (filter === 'all') {
                    filteredWines = allWines;
                } else {
                    filteredWines = allWines.filter(wine => wine.wine_type === filter);
                }
                
                renderWines(filteredWines);
            }
        });
    }

    // New function to handle wine selection and redirection
    function selectWine(wine) {
        // Save the wine data to localStorage
        localStorage.setItem('selectedWine', JSON.stringify(wine));
        // Redirect to the new details page
        window.location.href = 'wine-detail.html';
    }
});
