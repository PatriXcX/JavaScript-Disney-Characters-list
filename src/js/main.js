"use strict";

//QUERY SELECTOR
const charactersElement = document.querySelector(".js__charactersCards");
const favouritesUl = document.querySelector(".js__favourites");

//DATOS
let characters = [];
let favourites = [];

//FUNCIONES

//Pintar personajes

const getCharacterHtmlCode = (character) => {
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

//FUNCIONES DE EVENTOS

function handleClickCard(ev) {
  debugger;
  console.log(ev.currentTarget);
  ev.currentTarget.classList.toggle("favourite");

  const clickedCharacterId = ev.currentTarget.dataset.id;
  console.log(clickedCharacterId);

  const clickedCharacterObj = characters.find(
    (eachCharacterObj) => eachCharacterObj._id.toString() === clickedCharacterId
  );
  console.log(clickedCharacterObj);
  // Meto la vaca en fav

  const clickedfavouriteIndex = favourites.findIndex(
    // Busca la vaca en favoritos (clickedfavouriteIndex <- la pos de la vaca den el array de fav)
    (eachCharacterObj) => eachCharacterObj._id.toString() === clickedCharacterId
  );

  if (clickedfavouriteIndex === -1) {
    // Si no esta
    favourites.push(clickedCharacterObj); // Meto la vaca en fav

    renderFavourites();
  } else {
    // Quitarlo del array de favoritos

    favourites.splice(clickedfavouriteIndex, 1);

    renderFavourites();
  }

  ev.currentTarget();
}

//FUNCIONES AL ARRANCAR PÁGINA

const getApiData = () => {
  fetch("//api.disneyapi.dev/character?pageSize=50")
    .then((response) => response.json())
    .then((dataFromFetch) => {
      characters = dataFromFetch.data;

      // Encontrar los índices de los personajes a cambiar
      const irwinaIndex = characters.findIndex(
        (character) => character.name === "Irwina Allen"
      );
      const arabellaIndex = characters.findIndex(
        (character) => character.name === "Arabella"
      );
      const ameliaIndex = characters.findIndex(
        (character) => character.name === "Amelia Duckworth"
      );

      // Verificar si se encontraron los índices y actualizar las imágenes
      if (irwinaIndex !== -1) {
        characters[irwinaIndex].imageUrl =
          "//via.placeholder.com/210x295/ffffff/555555/?text=Disney";
      }
      if (arabellaIndex !== -1) {
        characters[arabellaIndex].imageUrl =
          "//via.placeholder.com/210x295/ffffff/555555/?text=Disney";
      }
      if (ameliaIndex !== -1) {
        characters[ameliaIndex].imageUrl =
          "//via.placeholder.com/210x295/ffffff/555555/?text=Disney";
      }

      paintCharacters();
    });
};

getApiData();
