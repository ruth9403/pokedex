/**
 * imports
 */

import api from './services.js';
/**
 *Global variables 
 */
const btnElementForm = document.getElementById('pokedex-form-btn');
const divElementContainerCards = document.querySelector('.pokedex-container');
const pElementMsg = document.querySelector('.pokedex-msg');
const inputElementForm = document.querySelector('.pokedex-form-input');
/**
 * @method getPokemons
 * @description
 * @param {e} btn event
 * @returns {}
 */
const getPokemons = (() =>{
    divElementContainerCards.innerHTML = '';
    pElementMsg.innerHTML = "";//para que limpie por cada vez que se genere el evento, y no se quede el TypeError:fetch en caso de que salga
    api.pokemonsData(inputElementForm.value)// en este momento yo obtengo la promesa que me resuleve el json  de los pokemons, que consiste en un array de objetos, donde cada objto es un pokemon
    .then((response) =>{
        getPokemonDetail(response.results);//en este punto a mi metodo getPokemonDetail le estoy pasando justamente el array json de la promesa anterior, que se llama results y continene todos los pokemons, para que efectúe el forEach
    }).catch((error) => {
        renderMsg(error);
    });
});

/**
 * @method getPokemonDetail
 * @description
 * @param {} 
 * @returns {}
 */
const getPokemonDetail = ((pokemons) =>{//los nombres pokemons y pokemon se puede cambiar por lo que sea, finalmente el metodo comprende que se trata de un array lo que se le pasará en el futuro, al cual le tenrá que efectuar el forEach y generar todo lo demas.
    let allPromises = [];
    pokemons.forEach((pokemon) =>{
        allPromises.push(api.pokemonDetail(pokemon.url));//Tambien se puede hacer como un arreglo de promesas, y pusheamos en un array el fetch
        api.pokemonDetail(pokemon.url)
        .then((response) =>{
            divElementContainerCards.innerHTML += allCardsMarkup(response);
            
        }).catch((error) =>{
            renderMsg(error);
        })
        /*Promise.race(allPromises)//recibe un arreglo de promesas, solo muestra el primero que se resuelva
        .then((response)=>{
            divElementContainerCards.innerHTML += allCardsMarkup(response);
        }).catch((error) =>{
            renderMsg(error);
        })*/
    })
})

/**
 * @method cardMarkup
 * @description hace las cards de los pokemons
 * @param {string} img pokemon photo
 * @param {string} name pokemon name
 * @param {number} order pokemon order
 * @param {number} weight pokemon weight
 * @returns {string} retorna un string que retorna la representacion del html
 */
const cardMarkup = (img, name, order,weight) => {
    return(
        `<div class="pokedex-container-card">
            <img src=${img} alt="Pokemons">
            <p>Name: ${name}</p>
            <p>Order: ${order}</p>
            <p>weight: ${weight}</p>
        </div>`
    );
};
/**
 * @method allCardsMarkup
 * @description para setear cada dato apartir del metodo cardMarkup
 * @param {}
 * @returns {}
 */
const allCardsMarkup = ((pokemon) => {//esta llena los parametros del metodo cardMArkup
    const {sprites, order, name, weight} = pokemon;
    return cardMarkup(sprites.front_default, name, order,weight);
});

/**
 * @method renderMsg
 * @description mensaje de error
 * @param {}
 * @returns {}
 */
const renderMsg = ((msg) => pElementMsg.innerHTML = msg);


/**
 * Listener
 */
btnElementForm.addEventListener ('click', getPokemons);