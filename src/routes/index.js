const { Router } = require('express');//* aca nosotros definimos las rutas

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokeRouter = require("./pokeRouter");
const postsRouter = require("./postsRouter");

const routes = Router(); //! enlazado
 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

routes.use("/pokemons",pokeRouter );
//* esta ruta no se usa
routes.use("/types",postsRouter );




module.exports = routes; //! enlazado
