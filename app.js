// Variabile per i dati dei vini
let wines = [];

// Selettori e elementi del DOM
const categoryButtons = document.querySelectorAll('.category-filter-btn');
const wineGridContainer = document.getElementById('wine-grid');
const dynamicFiltersContainer = document.getElementById('dynamic-filters');

const regionSearch = document.getElementById('region-search');
const uvaFilter = document.getElementById('uva-filter');
const producerFilter = document.getElementById('producer-filter');
const yearFilter = document.getElementById('year-filter');

const wineModal = document.getElementById('wine-modal');
const modalWineImage = document.getElementById('modal-wine-image');
const modalWineName = document.getElementById('modal-wine-name');
const modalProducer = document.getElementById('modal-producer');
const modalDescription = document.getElementById('modal-description');
const modalTechnicalSheet = document.getElementById('modal-technical-sheet');
const modalTastingVisual = document.getElementById('modal-tasting-visual');
const modalTastingOlfactory = document.getElementById('modal-tasting-olfactory');
const modalTastingGustatory = document.getElementById('modal-tasting-gustatory');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// Check required elements exist
if (
    !wineGridContainer || !dynamicFiltersContainer || !regionSearch ||
    !uvaFilter || !producerFilter || !yearFilter ||
    !wineModal || !modalWineImage || !modalWineName || !modalProducer ||
    !modalDescription || !modalTechnicalSheet || !modalTastingVisual ||
    !modalTastingOlfactory || !modalTastingGustatory || !modalCloseBtn
) {
    console.error('Uno o più elementi richiesti non sono presenti nell\'HTML.');
}

// Funzione per visualizzare le schede dei vini
function displayWines(filteredWines) {
    wineGridContainer.innerHTML = '';
    if (filteredWines.length === 0) {
        wineGridContainer.innerHTML = '<p class="text-white text-center col-span-full">Nessun vino trovato con i filtri selezionati.</p>';
        return;
    }

    filteredWines.forEach((wine, index) => {
        const card = document.createElement('div');
        card.classList.add('wine-card');
        card.innerHTML = `
            <img src="${wine.image}" alt="Immagine di ${wine.name}" class="w-24 h-auto mx-auto mb-4">
            <h3 class="text-lg font-bold text-white">${wine.name}</h3>
            <p class="text-sm text-gray-200 mt-2">${wine.year} | <span class="wine-region-text">${wine.region}</span></p>
            <p class="text-sm text-gray-300">Uva: ${wine.uva}</p>
            <p class="text-sm text-gray-300">Produttore: ${wine.producer}</p>
            <p class="text-base font-bold text-white mt-2">${wine.price}</p>
        `;

        card.style.animationDelay = `${index * 0.05}s`;

        // Gestione del doppio clic
        card.addEventListener('dblclick', () => {
            window.location.href = `wine-detail.html?wine=${encodeURIComponent(JSON.stringify(wine))}`;
        });

        // Gestione del singolo clic per il modale (se ancora desiderato)
        card.addEventListener('click', () => showWineProfile(wine));

        wineGridContainer.appendChild(card);
    });
}

// Funzione per mostrare il modale con i dettagli del vino
function showWineProfile(wine) {
    modalWineImage.src = wine.image || '';
    modalWineName.textContent = wine.name || '';
    modalProducer.textContent = `Produttore: ${wine.producer || ''}`;
    modalDescription.textContent = wine.description || 'Nessuna descrizione disponibile.';

    // Dettagli tecnici
    modalTechnicalSheet.innerHTML = '';
    if (wine.technical) {
        for (const key in wine.technical) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key}:</strong> ${wine.technical[key]}`;
            modalTechnicalSheet.appendChild(li);
        }
    }

    // Note di degustazione
    modalTastingVisual.textContent = wine.tasting?.visual || "";
    modalTastingOlfactory.textContent = wine.tasting?.olfactory || "";
    modalTastingGustatory.textContent = wine.tasting?.gustatory || "";

    wineModal.style.display = 'flex';
}

// Event listener per la chiusura del modale
modalCloseBtn && modalCloseBtn.addEventListener('click', () => {
    wineModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === wineModal) {
        wineModal.style.display = 'none';
    }
});

// Funzioni per la gestione dei filtri
function populateDynamicFilters(wines, selectedCategory) {
    const relevantWines = selectedCategory === 'all' ? wines : wines.filter(wine => wine.category === selectedCategory);

    const uniqueUvas = [...new Set(relevantWines.map(wine => wine.uva))].sort();
    populateSelect(uvaFilter, uniqueUvas);

    const uniqueProducers = [...new Set(relevantWines.map(wine => wine.producer))].sort();
    populateSelect(producerFilter, uniqueProducers);

    const uniqueYears = [...new Set(relevantWines.map(wine => wine.year))].sort().reverse();
    populateSelect(yearFilter, uniqueYears);
}

function populateSelect(selectElement, options) {
    selectElement.innerHTML = '<option value="all">Tutte</option>';
    options.forEach(option => {
        selectElement.innerHTML += `<option value="${option}">${option}</option>`;
    });
}

function applyFilters() {
    const activeButton = document.querySelector('.category-filter-btn.active');
    const selectedCategory = activeButton ? activeButton.dataset.category : 'all';
    const selectedUva = uvaFilter.value;
    const selectedProducer = producerFilter.value;
    const selectedYear = yearFilter.value;
    const searchTerm = regionSearch.value.toLowerCase();

    const filteredWines = wines.filter(wine => {
        const isCategoryMatch = selectedCategory === 'all' || wine.category === selectedCategory;
        const isUvaMatch = selectedUva === 'all' || wine.uva === selectedUva;
        const isProducerMatch = selectedProducer === 'all' || wine.producer === selectedProducer;
        const isYearMatch = selectedYear === 'all' || wine.year == selectedYear;
        const isSearchMatch = wine.region.toLowerCase().includes(searchTerm);

        return isCategoryMatch && isUvaMatch && isProducerMatch && isYearMatch && isSearchMatch;
    });

    displayWines(filteredWines);
}

// Funzione per aggiornare il tema in base alla categoria
function updateTheme(category) {
    document.body.classList.remove('theme-rosso', 'theme-bianco', 'theme-rose', 'theme-bollicine');
    if (category !== 'all') {
        document.body.classList.add(`theme-${category}`);
    }
}

// Event listeners per i pulsanti di categoria
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const selectedCategory = button.dataset.category;

        if (selectedCategory !== 'all') {
            dynamicFiltersContainer.style.display = 'flex';
        } else {
            dynamicFiltersContainer.style.display = 'none';
        }

        updateTheme(selectedCategory);

        // Reset filtri dinamici e search bar
        uvaFilter.value = 'all';
        producerFilter.value = 'all';
        yearFilter.value = 'all';
        regionSearch.value = '';

        populateDynamicFilters(wines, selectedCategory);
        applyFilters();
    });
});

// Event listeners per i filtri dinamici e la search bar
uvaFilter.addEventListener('change', applyFilters);
producerFilter.addEventListener('change', applyFilters);
yearFilter.addEventListener('change', applyFilters);
regionSearch.addEventListener('input', applyFilters);

// Inizializzazione della pagina
document.addEventListener('DOMContentLoaded', () => {
    // Carica i vini dal file JSON
    fetch('wines.json')
        .then(response => response.json())
        .then(jsonData => {
            wines = jsonData;
            displayWines(wines);
            updateTheme('all');
            populateDynamicFilters(wines, 'all'); // Populate filters on load for "all"
        })
        .catch(error => {
            console.error('Errore nel caricamento del file wines.json:', error);
            // In caso di errore, mostra un messaggio
            wineGridContainer.innerHTML = '<p class="text-white text-center col-span-full">Impossibile caricare i dati dei vini.</p>';
        });
});
