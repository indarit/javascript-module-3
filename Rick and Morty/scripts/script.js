const root = document.querySelector("#root");

const crearElemento = (elementType, className, content) => {
  const nuevoElemento = document.createElement(`${elementType}`);
  const arrayClasses = className.split(",");
  arrayClasses.forEach((clase) => {
    nuevoElemento.classList.add(clase);
  });
  nuevoElemento.textContent = `${content}`;
  return nuevoElemento;
};

const headerContainer = crearElemento("div", "container-fluid,header", "");

root.appendChild(headerContainer);

const titleApi = crearElemento("img", "logo", "");
titleApi.src = "../images/image4.png";
headerContainer.appendChild(titleApi);

const sectionsContainer = crearElemento("div", "container-fluid", "");
root.appendChild(sectionsContainer);

const fila = crearElemento("div", "row", "");
sectionsContainer.appendChild(fila);

const col1 = crearElemento("div", "col-3,panel-izq", "Episodes");
const col2 = crearElemento("div", "col-9,panel-der", "");

fila.appendChild(col1);
fila.appendChild(col2);

const getEpisodes = async (page) => {
  const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
  const response = await fetch(url);
  const listaEpisodios = await response.json();
  renderAllEpisodes(listaEpisodios);
};

getEpisodes(1);

const renderAllEpisodes = (episodes) => {
  const columnIzq = document.querySelector(".panel-izq");
  episodes.results.forEach((episode) => {
    const episodio = crearElemento(
      "a",
      "individual-episode",
      episode.id + "-" + episode.name
    );
    columnIzq.appendChild(episodio);

    episodio.addEventListener("click", () => {
      getEpisodeInf(episode.id);
    });
  });
};

const getEpisodeInf = async (id) => {
  const url = `https://rickandmortyapi.com/api/episode/${id}`;
  const response = await fetch(url);
  const infEpisodio = await response.json();
  renderInfEpisode(infEpisodio);
  getCharacters(infEpisodio.characters);
};

getEpisodeInf(1);

const renderInfEpisode = (episode) => {
  const columnDer = document.querySelector(".panel-der");
  columnDer.innerHTML = `<h2>Episode: ${episode.name}</h2>
  <h5> Date: ${episode.air_date} | Code: ${episode.episode} </h5>`;
};

const getCharacters = async (characters) => {
  const results = await Promise.all(
    characters.map(async (character) => {
      const response = await fetch(character);
      return response.json();
    })
  );

  renderCharacters(results);
};

const renderCharacters = (characterList) => {
  const columnDer = document.querySelector(".panel-der");
  const charactersContainer = crearElemento(
    "div",
    "row,character-container",
    ""
  );
  columnDer.appendChild(charactersContainer);

  characterList.forEach((character) => {
    const individualTarget = crearElemento("div", "col-3,character-target", "");
    individualTarget.innerHTML = `<img class="character-img" src="${character.image}" alt="#"><div class="character-name"><h3>${character.name}</h3></div><div class="character-inf"><h3>${character.status} | ${character.species}</h3></div>`;
    charactersContainer.appendChild(individualTarget);
  });
};
