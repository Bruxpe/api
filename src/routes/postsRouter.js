const {Router} = require("express");
const postsRouter = Router();

//---------->types
postsRouter.get('/',(req,res)=>{
        res.status(200).send(`types de poke`)
      })

    
module.exports= postsRouter;

//* esta ruta no se usa