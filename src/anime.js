const apiUrl = "https://api.jikan.moe/v4/anime";
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');

async function fetchAnimeDetails(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const anime = await response.json();
    displayAnimeDetails(anime.data);
}

function displayAnimeDetails(anime) {
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>${anime.title}</h1>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
        <p>${anime.synopsis}</p>
        <p><strong>Статус:</strong> ${anime.status}</p>
        <p><strong>Тип:</strong> ${anime.type}</p>
        <p><strong>Эпизодов:</strong> ${anime.episodes}</p>
        <p><strong>Оценка:</strong> ${anime.score} (от ${anime.scored_by} участников)</p>
        <p><strong>Популярность:</strong> ${anime.popularity}</p>
        <p><strong>Возрастной рейтинг:</strong> ${anime.rating}</p>
        <p><strong>Жанры:</strong> ${anime.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Студия:</strong> ${anime.studios.map(studio => studio.name).join(', ')}</p>
        <p><strong>Источник:</strong> ${anime.source}</p>
        <p><strong>Сезон:</strong> ${anime.season} ${anime.year}</p>
        <a href="../">Назад к списку аниме</a>
    `
}

fetchAnimeDetails(animeId);
