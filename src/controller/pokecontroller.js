
const {Pokemon,Type} = require("../db") //! importamos la base de datos de posgrest
const axios = require("axios")

// aca hay que capas poner el try cacth
// vamos a hacer las funciones en los controllers
//*
//------------------Se pide a la Api un numero de pokemones-------------
const getApiInfo = async ()=>{
    let arrayApi = []
    //numero de pokemones que se dene traer.
    for (let i = 1; i < 30; i++) {
        
        let apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        let pokemon = await apiPokemon.data
        let finalPokemon =
        {
            name: pokemon.name,
            id: pokemon.id,
            img: pokemon.sprites.other.home.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            types: pokemon.types.map(e => e.type.name)
        }
        arrayApi.push(finalPokemon)
    }
    return arrayApi
}

//------------------->Se va pedir un pokemon especifico con el ID<----------
//*
const ApipokeInfo =async(id)=>{
    let apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        let pokemon = await apiPokemon.data
        let finalPokemon =
        {
            name: pokemon.name,
            id: pokemon.id,
            //* tener presente que solo en las card por id, se llama a height y weight
            height: pokemon.height,
            weight: pokemon.weight,
            img: pokemon.sprites.other.home.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            types: pokemon.types.map(e => e.type.name)
        }
        
    return finalPokemon;
}

//-------->Traer todos los pokemons de la BD <-----------
//*
const getBDpokemon = async()=>{
    let pokemonsDb=null;
    let resutlDb = null;
    resutlDb = await Pokemon.findAll({ include: Type })

    if (resutlDb.length > 0) {
        pokemonsDb = resutlDb.map((e) => {
            return e.dataValues;
        })

        pokemonsDb = pokemonsDb.map((i) => {
            return {
                ...i,
                types: i.types?.map(s => {
                    return s.name
                })
            }
        });
    }
    return pokemonsDb
}
//-----------> se encargara de traer absolutemente todos los pokemons BD y API <---
//*
const getAllpokemons = async()=>{
    let infoApi = await getApiInfo()

    let infoDb = await getBDpokemon()
 
    if (infoDb !== null) {
        
        const totalInfo = infoDb.concat(infoApi)
        return totalInfo
    }
    return infoApi
}
//*
//----------> este se encarga de crear un pokemon en la case de datos <-----------
const postBDpokeinfo = async (req)=>{
  
    const { name,img,hp,attack,defense,speed,types} = req.body;
   
   
    //creamos al pokememon
    const newPoke = await Pokemon.create({name,img,hp,attack,defense,speed})
    if (types && types.length > 0) {
                                            //?
        const typesList = await Type.findAll({ where: { id: types } });
        await newPoke.addTypes(typesList);
      }
    //asocia los tipos al nuevo pokemon
    // await newPoke.setTypes
    return newPoke;
}
//*
const getTypes1 = async () => {
    let typesArray = []
    const typesAxios = await axios.get("https://pokeapi.co/api/v2/type")
    const typesInfo = await typesAxios.data.results
    typesInfo.map((e) => {
        let axiosType = e.url
        typesArray.push(axiosType)

    })
    // aca tengo url 
    return typesArray //----> 
}


//  Obtiene solo los tiopos, dentro de un array
const getPokemonTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type/');
      const results = response.data.results;
      const pokemonTypes = results.map((type) => type.name);
      return pokemonTypes;
    }
// Obtiene los tipos, con un indice
const getTypes = async () => {
    let arr = []
    const array = await getTypes1() // aca obtenemos las url 
    for (let i = 0; i < array.length; i++) {
        let a = await axios.get(array[i])
        let b = a.data
        
        let obj = {
            name: b.name,
            id: b.id
        }
       
        arr.push(obj)

      
    }
    let typeNames = arr.map(type => type.name);
    // array con todos los pokemones
    
    return typeNames 
}
// Obtiene los pokemones desde la BD
    const getTypesDb=async()=>{
        let types= await Type.findAll();
        if(types.length === 0 ){
            
            const  tipos = await axios.get(`https://pokeapi.co/api/v2/type/`)
            listaTipos= tipos.data.results.map((element) => {
                return {name:element.name}
            });
            
            console.log(listaTipos);
            types = await Type.bulkCreate(listaTipos);
            types= await Type.findAll();
        }
        return types;
    }

// Se encargara de poder eliminar un pokemon desde la base de datos

    const deletePokeBD = async(id)=>{
        const deletedPoke = await Pokemon.destroy({ where: { id } });
      
        return deletedPoke;
    }

    


module.exports={
    deletePokeBD,
    getApiInfo,
    ApipokeInfo,
    postBDpokeinfo,
    getBDpokemon,
    getAllpokemons,
    getTypes,
    getTypes1,
    getPokemonTypes,
    getTypesDb

}

 