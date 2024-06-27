"use strict";

//QUERY SELECTOR

const charactersElement = document.querySelector(".js__charactersCards");
const favouritesUl = document.querySelector(".js__favourites");

const searchInput = document.querySelector(".js__searchBar");
const searchButton = document.querySelector(".js__searchButton");

const clearFavouritesButton = document.querySelector(
  ".js__clearFavouritesButton"
);

//DATOS

let characters = [];
let favourites = [];

//FUNCIONES

//Pintar personajes

const getCharacterHtmlCode = (character) => {
  if (character.imageUrl === undefined) {
    character.imageUrl =
      "//via.placeholder.com/210x295/ffffff/555555/?text=Disney";
  }

  let htmlCode = "";
  htmlCode += `<li class="js__listStyles listStyles" data-id="${character._id}">`;
  htmlCode += `<img src="${character.imageUrl}" class="card_img" alt= "${character.name}">`;
  htmlCode += `<h3 class= "card__title"> ${character.name}</h3>`;
  htmlCode += `</li>`;

  return htmlCode;
};

const paintCharacters = () => {
  let charactersCode = "";

  for (const character of characters) {
    charactersCode += getCharacterHtmlCode(character);
  }
  charactersElement.innerHTML = charactersCode;

  //Fin parte pintar productos

  const listAllStyles = document.querySelectorAll(".js__listStyles");

  for (const eachCardLi of listAllStyles) {
    eachCardLi.addEventListener("click", handleClickCard);
  }
};

//Pintar favoritos

function renderFavourites() {
  let html = "";

  for (const character of favourites) {
    html += getCharacterHtmlCode(character);
  }

  favouritesUl.innerHTML = html;
}

//Borrar favoritos

function handleClearFavourites() {
  favourites = [];
  renderFavourites();
}

// FUNCIONES DE EVENTOS (HANDLER)

function handleClickCard(ev) {
  debugger;
  console.log(ev.currentTarget);
  ev.currentTarget.classList.toggle("favourite");

  const clickedCharacterId = ev.currentTarget.dataset.id;
  console.log(clickedCharacterId);

  const clickedCharacterObj = characters.find(
    (eachCharacterObj) => eachCharacterObj._id.toString() === clickedCharacterId
  );

  // Meto la vaca en fav

  const clickedfavouriteIndex = favourites.findIndex(
    // Busca la vaca en favoritos (clickedfavouriteIndex <- la pos de la vaca den el array de fav)
    (eachCharacterObj) => eachCharacterObj._id.toString() === clickedCharacterId
  );

  if (clickedfavouriteIndex === -1) {
    // Si no esta
    favourites.push(clickedCharacterObj); // Meto la vaca en fav

    localStorage.setItem("favs", JSON.stringify(favourites));

    renderFavourites();
  } else {
    // Quitarlo del array de favoritos

    favourites.splice(clickedfavouriteIndex, 1);

    localStorage.setItem("favs", JSON.stringify(favourites));

    renderFavourites();
  }

  ev.currentTarget();
}

function handleClickSearch(ev) {
  ev.preventDefault();

  const searchedcharacters = searchInput.value;

  console.log(searchedcharacters);

  fetch(`//api.disneyapi.dev/character?pageSize=50&name=${searchedcharacters}`)
    .then((response) => response.json())
    .then((dataFromOtherFetch) => {
      characters = dataFromOtherFetch.data;

      paintCharacters();
    });
}

//CÓDIGO AL CARGAR LA PÁGINA

const getApiData = () => {
  fetch("//api.disneyapi.dev/character?pageSize=50")
    .then((response) => response.json())
    .then((dataFromFetch) => {
      characters = dataFromFetch.data;

      paintCharacters();
    });
};

const favsFromLS = JSON.parse(localStorage.getItem("favs"));
if (favsFromLS !== null) {
  favourites = favsFromLS;

  renderFavourites();
}

getApiData();

//EVENTOS
searchButton.addEventListener("click", handleClickSearch);
clearFavouritesButton.addEventListener("click", handleClearFavourites);
