const apiUrl = "https://api.jikan.moe/v4/anime";

let currentPage = 1;
let totalPages = 0;

function getSortByFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('sortBy');
}


async function fetchAnime(page, query= '') {
    let reqUrl = `${apiUrl}?page=${page}&q=${query}`

    const response = await fetch(reqUrl);
    const data = await response.json();
    totalPages = data.pagination.last_visible_page;
    updateAnimeList(data.data);
    updatePagination();
}

function updateAnimeList(animeList) {
    const animeContainer = document.querySelector('.anime-list');
    animeContainer.innerHTML = '';

    animeList.forEach(anime => {
        const animeItem = document.createElement('div');
        animeItem.className = 'anime-item';
        animeItem.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
        `;
        animeItem.addEventListener('click', () => {
            window.location.href = `src/anime.html?id=${anime.mal_id}`;
        });
        animeContainer.appendChild(animeItem);
    });
}

function updatePagination() {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const start = Math.max(1, currentPage - 5);
    const end = Math.min(totalPages, currentPage + 5);

    if (start > 3) {
        for (let i = 1; i <= 2; i++) {
            createPaginationButton(i);
        }
        paginationContainer.appendChild(createEllipsis());
    } else if (start > 2) {
        for (let i = 1; i < start; i++) {
            createPaginationButton(i);
        }
    }

    for (let i = start; i <= end; i++) {
        createPaginationButton(i);
    }

    if (end < totalPages - 2) {
        paginationContainer.appendChild(createEllipsis());
        for (let i = totalPages - 1; i <= totalPages; i++) {
            createPaginationButton(i);
        }
    } else if (end < totalPages) {
        for (let i = end + 1; i <= totalPages; i++) {
            createPaginationButton(i);
        }
    }
}

function createPaginationButton(i) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = currentPage === i ? 'active-pagination-button' : 'pagination-button';
    button.addEventListener('click', () => {
        currentPage = i;
        const searchInput = document.getElementById('search').value;
        fetchAnime(currentPage, searchInput);
    });
    document.querySelector('.pagination').appendChild(button);
}

function createEllipsis() {
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';
    return ellipsis;
}


document.getElementById('search-btn').addEventListener('click',    () => {
        const searchInput = document.getElementById('search').value;
        fetchAnime(1, searchInput); // Начинаем с первой страницы
        currentPage = 1; // Сбрасываем текущую страницу
    }
);

fetchAnime(currentPage);
