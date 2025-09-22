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

// Funzione per convertire i dati JSON nella struttura attesa dall'app
function convertWineData(jsonData) {
    return jsonData.map(wine => {
        // Determina la categoria in base al wine_type
        let category = 'bianco'; // default
        if (wine.wine_type) {
            const type = wine.wine_type.toLowerCase();
            if (type.includes('rosso')) category = 'rosso';
            else if (type.includes('rosato') || type.includes('rosé')) category = 'rose';
            else if (type.includes('bollicine') || type.includes('spumante')) category = 'bollicine';
            else category = 'bianco';
        }

        // Estrai l'anno dalla denominazione se presente
        const yearMatch = wine.denomination ? wine.denomination.match(/(\d{4})/) : null;
        const year = yearMatch ? yearMatch[1] : 'N/A';

        return {
            name: wine.wine_name || 'Nome non disponibile',
            producer: wine.producer || 'Produttore non specificato',
            year: year,
            region: wine.region || 'Regione non specificata',
            uva: wine.technical_sheet?.grape_varieties || 'Vitigno non specificato',
            category: category,
            price: 'Prezzo su richiesta', // Placeholder dato che non è presente nei JSON
            image: 'https://via.placeholder.com/150x200/7b0b2d/ffffff?text=Vino', // Placeholder
            description: wine.additional_information || 'Descrizione non disponibile',
            technical: {
                'Denominazione': wine.denomination,
                'Tipo': wine.wine_type,
                'Regione': wine.region,
                'Vitigni': wine.technical_sheet?.grape_varieties,
                'Terroir': wine.technical_sheet?.terroir,
                'Gradazione alcolica': wine.technical_sheet?.alcohol_content,
                'Acidità': wine.technical_sheet?.acidity,
                'Invecchiamento': wine.technical_sheet?.aging,
                'Tappo': wine.technical_sheet?.cap
            },
            tasting: {
                visual: wine.tasting_notes?.visual || '',
                olfactory: wine.tasting_notes?.olfactory || '',
                gustatory: wine.tasting_notes?.gustatory || ''
            }
        };
    });
}

// Funzione per caricare i dati da più file JSON
async function loadWineData() {
    try {
        console.log('Caricamento dati vini...');
        
        // Carica entrambi i file JSON
        const [pg3Response, pg4Response] = await Promise.all([
            fetch('pg3.json'),
            fetch('pg4.json')
        ]);

        if (!pg3Response.ok || !pg4Response.ok) {
            throw new Error('Errore nel caricamento dei file JSON');
        }

        const pg3Data = await pg3Response.json();
        const pg4Data = await pg4Response.json();
        
        console.log('Dati pg3 caricati:', pg3Data.length, 'vini');
        console.log('Dati pg4 caricati:', pg4Data.length, 'vini');

        // Combina i dati e convertili nel formato corretto
        const allWineData = [...pg3Data, ...pg4Data];
        wines = convertWineData(allWineData);
        
        console.log('Vini totali processati:', wines.length);
        console.log('Esempio vino convertito:', wines[0]);

        // Inizializza la visualizzazione
        displayWines(wines);
        updateTheme('all');
        populateDynamicFilters(wines, 'all');
        
    } catch (error) {
        console.error('Errore nel caricamento dei dati dei vini:', error);
        wineGridContainer.innerHTML = '<p class="text-white text-center col-span-full">Impossibile caricare i dati dei vini. Verifica che i file pg3.json e pg4.json siano presenti.</p>';
    }
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

        // Gestione del doppio clic per navigare alla pagina dettaglio
        card.addEventListener('dblclick', () => {
            // Salva i dati del vino convertiti nel formato atteso da wine-detail.html
            const wineDetailData = {
                wine_name: wine.name,
                producer: wine.producer,
                denomination: wine.technical?.Denominazione || '',
                wine_type: wine.technical?.Tipo || wine.category.toUpperCase(),
                region: wine.region,
                technical_sheet: wine.technical,
                tasting_notes: wine.tasting,
                additional_information: wine.description,
                food_pairings: 'Abbinamenti da definire' // Placeholder
            };
            
            localStorage.setItem('selectedWine', JSON.stringify(wineDetailData));
            window.location.href = `wine-detail.html`;
        });

        // Gestione del singolo clic per il modale
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
        for (const [key, value] of Object.entries(wine.technical)) {
            if (value) { // Solo se il valore esiste
                const li = document.createElement('li');
                li.innerHTML = `<strong>${key}:</strong> ${value}`;
                modalTechnicalSheet.appendChild(li);
            }
        }
    }

    // Note di degustazione
    modalTastingVisual.textContent = wine.tasting?.visual || "Note visive non disponibili";
    modalTastingOlfactory.textContent = wine.tasting?.olfactory || "Note olfattive non disponibili";
    modalTastingGustatory.textContent = wine.tasting?.gustatory || "Note gustative non disponibili";

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

    const uniqueUvas = [...new Set(relevantWines.map(wine => wine.uva).filter(uva => uva && uva !== 'Vitigno non specificato'))].sort();
    populateSelect(uvaFilter, uniqueUvas);

    const uniqueProducers = [...new Set(relevantWines.map(wine => wine.producer).filter(producer => producer && producer !== 'Produttore non specificato'))].sort();
    populateSelect(producerFilter, uniqueProducers);

    const uniqueYears = [...new Set(relevantWines.map(wine => wine.year).filter(year => year && year !== 'N/A'))].sort().reverse();
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
    loadWineData();
});
