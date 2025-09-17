document.addEventListener('DOMContentLoaded', () => {
    let allWines = [];

    // Carica il file JSON
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
            grid.innerHTML = '<p class="col-span-full text-center text-red-500">Impossibile caricare la lista dei vini. Controlla il file JSON.</p>';
        });

    function getRegion(denomination) {
        if (!denomination) return 'ALTRO';
        const parts = denomination.split('/').pop().split(' ');
        if (parts.length > 1) {
            return parts[0].trim().toUpperCase();
        }
        return denomination.trim().toUpperCase();
    }

    function renderWines(winesToRender) {
        const wineGrid = document.getElementById('wine-grid');
        wineGrid.innerHTML = '';

        if (winesToRender.length === 0) {
            wineGrid.innerHTML = '<p class="col-span-full text-center text-neutral-500">Nessun vino trovato per questa categoria.</p>';
            return;
        }

        // Raggruppa i vini per regione
        const groupedByRegion = winesToRender.reduce((acc, wine) => {
            const region = getRegion(wine.denomination);
            if (!acc[region]) {
                acc[region] = [];
            }
            acc[region].push(wine);
            return acc;
        }, {});

        // Ordina le regioni alfabeticamente
        const sortedRegions = Object.keys(groupedByRegion).sort();

        // Renderizza ogni regione e i suoi vini
        sortedRegions.forEach(region => {
            if (groupedByRegion[region].length === 0) return;

            // Intestazione per la regione
            const regionHeader = document.createElement('h2');
            regionHeader.className = 'col-span-full text-2xl font-serif font-semibold text-neutral-700 mt-8 mb-4';
            regionHeader.textContent = region;
            wineGrid.appendChild(regionHeader);

            // Crea le schede per ogni vino della regione
            groupedByRegion[region].forEach(wine => {
                const wineCard = document.createElement('div');
                wineCard.className = 'bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer';

                const wineName = wine.wine_name || 'Nome Sconosciuto';
                const producer = wine.producer || 'Cantina Sconosciuta';
                const denomination = wine.denomination || 'Denominazione Sconosciuta';
                const wineType = wine.wine_type || 'Tipo Sconosciuto';
                const additionalInfo = wine.additional_information || '';

                wineCard.innerHTML = `
                    <div class="text-xs text-neutral-500 mb-1">${producer}</div>
                    <h3 class="text-xl font-bold mb-1 line-clamp-1">${wineName}</h3>
                    <h4 class="text-sm text-neutral-600 mb-2 line-clamp-1">${denomination}</h4>
                    <div class="text-sm font-semibold text-neutral-700">${wineType}</div>
                    <p class="text-xs text-neutral-400 mt-2 line-clamp-2">${additionalInfo}</p>
                `;
                
                wineGrid.appendChild(wineCard);
            });
        });
    }

    function createFilters(wines) {
        const filterContainer = document.getElementById('filter-container');
        const wineTypes = [...new Set(wines.map(wine => wine.wine_type))];
        
        // Crea i pulsanti per ogni tipo di vino
        wineTypes.sort().forEach(type => {
            const button = document.createElement('button');
            button.className = 'filter-btn px-4 py-2 text-sm font-medium rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition';
            button.textContent = type;
            button.setAttribute('data-filter', type);
            
            filterContainer.appendChild(button);
        });

        // Aggiunge un listener a tutti i pulsanti filtro
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.getAttribute('data-filter');
                
                // Rimuove la classe attiva da tutti i pulsanti e la aggiunge a quello cliccato
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('filter-active'));
                e.target.classList.add('filter-active');
                
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

});