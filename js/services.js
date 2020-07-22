/**
 * import
 * 
 */
const api = { //Va a ser un objeto de promesas
    pokemonsData: ((limit) => {//Sería una key
        return new Promise ((resolve, reject) =>{
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=50'`)
            .then((Response) => resolve(Response.json()))
            .catch((error) => reject(error))
        })
    }),// se separan como se sepsra los keys en los objetos
    pokemonDetail: ((URL) => {//sería una key de mi ibjeto api, ahora, este parametro URL, viene del array donde aparacen ordenados cada objeto pokemon (2 keys: name & URL) se puede ver que hay un key en cada objeto que se llama url
        return new Promise((resolve, reject) =>{
            fetch (`${URL}`)
            .then((Response) => resolve(Response.json()))
            .catch((error) => reject(error))
        });
    }),
    hola: ((msg) => {
        alert(msg);
    })
}

export default api;
