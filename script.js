const APIURL = "series.json";
/* const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"; */
/* const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="; */
    
const main = document.getElementById("main");
const form = document.getElementById("form");
const seriePopup = document.getElementById('serie-popup');
const serieInfoEl = document.getElementById('serie-info');
const popupCloseBtn = document.getElementById('close-popup');

// initially get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { id, imagen, nombre } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
        <a href="serie.html?id=${id}"><img
                src="${imagen}"
                alt="${nombre}"
            
            />
            </a>
            <div class="movie-info">
                <h3>${nombre}</h3>
                <p>Temporadas: <span>${movie.temporadas}</span></p>
                <p>Precio Total: <span>${movie.dvds}DVDs ${movie.precio}.Bs</span></p>
                <p>Whatsapp <i style="font-size:24px" class="fa">&#xf232;</i>  <a href="${movie.whatsapp}">Link directo Whatsapp</a></p>
                <a href="serie.html?id=${id}"><button>Ver mas +</button></a>
            </div>
            
        `;

        main.appendChild(movieEl);
    });
}


popupCloseBtn.addEventListener('click', () => {
    seriePopup.classList.add('hidden');
});