"use strict";

/*
//QUERYS

const charactersElement = document.querySelector(".js__charactersCards");

//DATOS

const characters = [
  {
    name: "Achilles",
    image:
      "https://static.wikia.nocookie.net/disney/images/d/d3/Vlcsnap-2015-05-06-23h04m15s601.png",
  },
  {
    name: "Abigail the Cow",
    image:
      "https://static.wikia.nocookie.net/disney/images/0/05/Fox-disneyscreencaps_com-901.jpg",
  },
];

//FUNCIONES

------Pintar un elemento

const renderCharacter = () => {
  charactersElement.innerHTML += `
    <li> ${characters[0].name}
    <img src="${characters[0].image}" alt="${characters[0].name}">
    </li>`;
}
renderCharacter();

--------

--------Pintar todos los elementos

function renderCharacters() {
  characters.forEach((character) => {
    charactersElement.innerHTML += `
        <li> ${character.name}
        <img src="${character.image}" alt="${character.name}">
        </li>`;
  });
}

renderCharacters();

*/

let characters = [];

//DATOS

//Pintar personajes

const charactersElement = document.querySelector(".js__charactersCards");
const getCharacterHtmlCode = (character) => {
  let htmlCode = "";
  htmlCode += "<li class= listStyles>";
  htmlCode += `<img src="${character.imageUrl}" class="card_img" alt= "${character.name}">`;
  htmlCode += `<h3 class= "card__title"> ${character.name}`;
  htmlCode += `</li>`;

  return htmlCode;
};

const paintCharacters = () => {
  let charactersCode = "";

  for (const character of characters) {
    charactersCode += getCharacterHtmlCode(character);
  }
  charactersElement.innerHTML = charactersCode;
};

//get data from Api

const getApiData = () => {
  fetch("//api.disneyapi.dev/character?pageSize=50")
    .then((response) => response.json())
    .then((dataFromFetch) => {
      characters = dataFromFetch.data;
      //paintCharacters();
      //});
      //};

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

      //characters.splice (irwinaIndex, 1, 'amalia');

      // Verificar si se encontraron los índices y actualizar las imágenes
      if (irwinaIndex !== -1) {
        characters[irwinaIndex].imageUrl =
          "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";
      }
      if (arabellaIndex !== -1) {
        characters[arabellaIndex].imageUrl =
          "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";
      }
      if (ameliaIndex !== -1) {
        characters[ameliaIndex].imageUrl =
          "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";
      }

      paintCharacters();
    });
};
//Funciones al arrancar la página
getApiData();

//document.querySelector(".js_card").innerHTML = data.result;
