const ex = document.getElementById('serie')

document.addEventListener('DOMContentLoaded', () => {
    showSerieInfo(parseInt(getParameterByName('id')));
})

async function showSerieInfo(id) {
    //limpiar html
    ex.innerHTML = '';

    const resp = await fetch("series.json");
    const respData = await resp.json();
    const serieId = respData.filter(serie => serie.id === id)[0];
    console.log(id);
    const { nombre, portada, temporadas, dvds, precio, sinopsis, trailer, whatsapp } = serieId;
    const serieEl = document.createElement('div');
    serieEl.setAttribute("align", "center");
    serieEl.innerHTML = `
                <h1>${nombre}</h1>
                <img
                src="${portada}"
                alt="${nombre}"
                />
                <p><Strong>Sinopsis: </Strong>${sinopsis}</p>
                    <p><Strong>Temporadas: </Strong>${temporadas}</p>
                    <p><Strong>Precio Total: </Strong>${dvds}DVDs ${precio}.Bs</p>
                    <p><Strong>Whatsapp: </Strong><a href="${whatsapp}">Link directo Whatsapp</a></p>
                    <p><Strong>Trailer:</p>
                    <iframe width="560" height="315" src="${trailer}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                
                `;
    ex.appendChild(serieEl);
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
