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
            <img
                src="${imagen}"
                alt="${nombre}"
                onclick="showSerieInfo(${id})"
            />
            <div class="movie-info">
                <h3 onclick="showSerieInfo(${id})">${nombre}</h3>
                <p>Temporadas: ${movie.temporadas}</p>
                <p>Precio Total: ${movie.dvds}DVDs ${movie.precio}.Bs</p>
                <p>Whatsapp: <a href="${movie.whatsapp}">Link directo Whatsapp</a></p>
                <p>Trailer:<a href="${movie.trailer}">Trailer Youtube</a></p>
            </div>
            
        `;

        main.appendChild(movieEl);
    });
}
async function showSerieInfo(id) {
    //limpiar html
    serieInfoEl.innerHTML = '';

    const resp = await fetch("series.json");
    const respData = await resp.json();
    const serieId = respData.filter(serie => serie.id === id)[0];
    const { nombre, imagen, temporadas, dvds, precio, sinopsis, trailer, whatsapp } = serieId;
    const serieEl = document.createElement('div');
    serieEl.setAttribute("align", "center");
    serieEl.innerHTML = `
                <h1>${nombre}</h1>
                <img
                src="${imagen}"
                alt="${nombre}"
                />
                <p><Strong>Sinopsis: </Strong>${sinopsis}</p>
                    <p><Strong>Temporadas: </Strong>${temporadas}</p>
                    <p><Strong>Precio Total: </Strong>${dvds}DVDs ${precio}.Bs</p>
                    <p><Strong>Whatsapp: </Strong><a href="${whatsapp}">Link directo Whatsapp</a></p>
                    <p><Strong>Trailer: </Strong><a href="${trailer}">Trailer Youtube</a></p>
                
                `;
    serieInfoEl.appendChild(serieEl);
    seriePopup.classList.remove('hidden');
}

popupCloseBtn.addEventListener('click', () => {
    seriePopup.classList.add('hidden');
});