// Array di dati dei vini
const wines = [
    { category: 'rosso', region: 'Toscana', uva: 'Sangiovese', producer: 'Cantina A', year: 2018, name: 'Chianti Classico', price: '€35', image: 'https://via.placeholder.com/100x150.png?text=Rosso', description: "Un Chianti Classico elegante con note di ciliegia, prugna e un tocco di spezie. Perfetto per carni rosse e formaggi stagionati.", tasting: { visual: "Rosso rubino intenso", olfactory: "Sentori di ciliegia, violetta e spezie", gustatory: "Corposo, con tannini morbidi e un lungo finale" }, technical: { "Alcol": "13.5%", "Affinamento": "12 mesi in barrique", "Abbinamenti": "Carni rosse, formaggi stagionati" } },
    { category: 'bianco', region: 'Alto Adige', uva: 'Gewürztraminer', producer: 'Cantina B', year: 2020, name: 'Gewürztraminer', price: '€25', image: 'https://via.placeholder.com/100x150.png?text=Bianco', description: "Aroma intenso di petali di rosa, litchi e zenzero. Ideale con piatti asiatici o formaggi erborinati.", tasting: { visual: "Giallo dorato brillante", olfactory: "Aromi di rosa, litchi e zenzero", gustatory: "Fresco, aromatico e persistente" }, technical: { "Alcol": "14%", "Affinamento": "Acciaio", "Abbinamenti": "Cucina asiatica, formaggi erborinati" } },
    { category: 'rosso', region: 'Piemonte', uva: 'Nebbiolo', producer: 'Cantina C', year: 2016, name: 'Barolo DOCG', price: '€80', image: 'https://via.placeholder.com/100x150.png?text=Rosso', description: "Il re dei vini piemontesi, con tannini potenti e un bouquet di rosa, catrame e tartufo. Da abbinare a brasati e selvaggina.", tasting: { visual: "Granato con riflessi aranciati", olfactory: "Rosa, catrame, tartufo e spezie", gustatory: "Strutturato, tannini decisi ma eleganti" }, technical: { "Alcol": "14.5%", "Affinamento": "38 mesi in legno", "Abbinamenti": "Arrosti, selvaggina, formaggi stagionati" } },
    { category: 'bollicine', region: 'Veneto', uva: 'Glera', producer: 'Cantina D', year: 2021, name: 'Prosecco Superiore', price: '€18', image: 'https://via.placeholder.com/100x150.png?text=Bollicine', description: "Fresco e vivace, con note di mela verde e pera. Ideale come aperitivo o per celebrare occasioni speciali.", tasting: { visual: "Giallo paglierino con perlage fine", olfactory: "Note di mela verde e fiori d'acacia", gustatory: "Fresco, secco e armonico" }, technical: { "Alcol": "11.5%", "Affinamento": "Metodo Charmat", "Abbinamenti": "Aperitivi, antipasti di pesce" } },
    { category: 'bianco', region: 'Sicilia', uva: 'Grillo', producer: 'Cantina B', year: 2022, name: 'Grillo DOC', price: '€22', image: 'https://via.placeholder.com/100x150.png?text=Bianco', description: "Vino di grande personalità, esprime profumi di agrumi e fiori bianchi, con un finale sapido. Ottimo con il pesce e frutti di mare.", tasting: { visual: "Giallo paglierino", olfactory: "Agrumi, gelsomino, frutti tropicali", gustatory: "Fresco, sapido e persistente" }, technical: { "Alcol": "12.5%", "Affinamento": "Acciaio", "Abbinamenti": "Pesce, crostacei, primi piatti leggeri" } },
    { category: 'rosso', region: 'Puglia', uva: 'Primitivo', producer: 'Cantina A', year: 2019, name: 'Primitivo del Salento', price: '€30', image: 'https://via.placeholder.com/100x150.png?text=Rosso', description: "Un vino caldo e avvolgente, con sentori di frutta rossa matura e un finale speziato. Perfetto con grigliate di carne.", tasting: { visual: "Rosso rubino con riflessi violacei", olfactory: "Marmellata di frutti rossi, pepe nero", gustatory: "Morbido, caldo e con tannini vellutati" }, technical: { "Alcol": "14%", "Affinamento": "10 mesi in barrique", "Abbinamenti": "Grigliate di carne, formaggi a pasta dura" } },
    { category: 'rose', region: 'Puglia', uva: 'Negroamaro', producer: 'Cantina E', year: 2021, name: 'Rosato Negroamaro', price: '€28', image: 'https://via.placeholder.com/100x150.png?text=Rosé', description: "Un rosé fresco e fruttato, con note di fragola e ciliegia. Ottimo per aperitivi estivi e piatti leggeri.", tasting: { visual: "Rosa tenue con riflessi salmone", olfactory: "Fragola, ciliegia e lampone", gustatory: "Fresco, sapido e di buona persistenza" }, technical: { "Alcol": "12%", "Affinamento": "Acciaio", "Abbinamenti": "Antipasti, primi piatti di mare, salumi" } },
    { category: 'bianco', region: 'Friuli', uva: 'Pinot Grigio', producer: 'Cantina F', year: 2020, name: 'Pinot Grigio', price: '€20', image: 'https://via.placeholder.com/100x150.png?text=Bianco', description: "Un Pinot Grigio elegante, con aromi di mela e pera. Un classico che si abbina a molti piatti, dalla pasta al pesce.", tasting: { visual: "Giallo paglierino chiaro", olfactory: "Mela, pera, note floreali", gustatory: "Equilibrato, fresco e piacevolmente beverino" }, technical: { "Alcol": "12.5%", "Affinamento": "Acciaio", "Abbinamenti": "Pasta, risotti, pesce" } },
    { category: 'rosso', region: 'Toscana', uva: 'Sangiovese', producer: 'Cantina G', year: 2019, name: 'Brunello di Montalcino', price: '€95', image: 'https://via.placeholder.com/100x150.png?text=Rosso', description: "Vino complesso e strutturato, con profumi di frutti di bosco, tabacco e cuoio. Ideale per occasioni speciali e arrosti.", tasting: { visual: "Rosso granato", olfactory: "Frutti di bosco, tabacco, liquirizia, cuoio", gustatory: "Potente, con tannini eleganti e un finale molto lungo" }, technical: { "Alcol": "14%", "Affinamento": "24 mesi in botte di rovere", "Abbinamenti": "Arrosti importanti, selvaggina, formaggi erborinati" } }
];

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
    modalWineImage.src = wine.image;
    modalWineName.textContent = wine.name;
    modalProducer.textContent = `Produttore: ${wine.producer}`;
    modalDescription.textContent = wine.description;

    // Dettagli tecnici
    modalTechnicalSheet.innerHTML = '';
    for (const key in wine.technical) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${wine.technical[key]}`;
        modalTechnicalSheet.appendChild(li);
    }

    // Note di degustazione
    modalTastingVisual.textContent = wine.tasting.visual;
    modalTastingOlfactory.textContent = wine.tasting.olfactory;
    modalTastingGustatory.textContent = wine.tasting.gustatory;

    wineModal.style.display = 'flex';
}

// Event listener per la chiusura del modale
modalCloseBtn.addEventListener('click', () => {
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
    const selectedCategory = document.querySelector('.category-filter-btn.active').dataset.category;
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
    displayWines(wines);
    updateTheme('all');
});
