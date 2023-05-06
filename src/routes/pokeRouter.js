const {Router} = require("express");
const pokeRouter = Router();
const {Pokemon,Type} = require("../db") //! importamos la base de datos de posgrest

const { getTypesDb, ApipokeInfo, postBDpokeinfo, getBDpokemon,getAllpokemons, getTypes,deletePokeBD} = require("../controller/pokecontroller")

//?--------->  /pokemons<--------------//
// este me da un array array de esta forma: {"id": 1,"name": "normal"	},
  pokeRouter.get('/chicho',async(req,res)=>{
    try {
        const types = await getTypesDb();
        res.status(201).json(types)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  })
//array con solo los tipos
pokeRouter.get('/tipos', async(req,res)=>{
  try {
    let pokemons= await getTypes();
   console.log("dede200");
   console.log(pokemons);
       res.status(200).send(pokemons)
  } catch (error) {
       res.status(400).send({error:error.message})  
  }
  })
//este obtiene todos los pokemones
pokeRouter.get('/',async (req, res) => {
  try {
    let types = await getAllpokemons();
    await getTypesDb();
    res.status(200).send(types)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});    

//-------------> por id
pokeRouter.get('/:id',async (req,res)=>{
  try {
    const {id} = req.params;
    let poke= await ApipokeInfo(id);
    console.log(poke);
    res.status(200).send(poke )
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}) 

  
pokeRouter.post('/',async(req,res)=>{
  try {
            const newPoke = await postBDpokeinfo(req)
            // const { name,img,hp,attack,defense,speed} = req.body;
            // const newPoke = await Pokemon.create({name,img,hp,attack,defense,speed}) 
            res.status(201).json(newPoke)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
} ) 

pokeRouter.delete('/deletepoke/:id', async(req,res)=>{
  const {id} = req.params;
  try {
    const pokedelete = await (deletePokeBD(id))
    res.status(200).json("pokedelete, si se pudo ")
  } catch (error) {
    res.status(404).json({error:error.message})
  }
})
  


module.exports = pokeRouter;