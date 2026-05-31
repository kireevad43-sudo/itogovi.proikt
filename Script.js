const API_KEY = '74d8f6c9-ddea-43ed-923a-5dd3ad160bd8'; 
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS';

const movieGrid = document.getElementById('movie-grid');
const toggleBtn = document.getElementById('theme-toggle');
const loadMoreBtn = document.getElementById('load-more');
const modal = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

let allMovies = [];
let displayedCount = 0;
const step = 5;

async function fetchMovies() {
    try {
        const response = await fetch(API_URL, {
            headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        allMovies = data.films;
        renderNext();
    } catch (err) {
        movieGrid.innerHTML = '<p>Ошибка API. Проверьте ключ.</p>';
    }
}

function renderNext() {
    const nextMovies = allMovies.slice(displayedCount, displayedCount + step);
    nextMovies.forEach(film => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${film.posterUrlPreview}" alt="${film.nameRu}">
            <h3>${film.nameRu}</h3>
        `;
        
        // Исправление: вешаем слушатель на каждую созданную карточку
        card.addEventListener('click', () => {
            modalContent.innerHTML = `
                <h2>${film.nameRu}</h2>
                <p>Год: ${film.year}</p>
                <p>Рейтинг: ${film.rating}</p>
            `;
            modal.classList.remove('hidden');
        });
        
        movieGrid.appendChild(card);
    });
    displayedCount += step;
    if (displayedCount >= allMovies.length) loadMoreBtn.style.display = 'none';
}

// Слушатели событий
loadMoreBtn.addEventListener('click', renderNext);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

closeModal.addEventListener('click', () => modal.classList.add('hidden'));

// Инициализация
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');
fetchMovies();




