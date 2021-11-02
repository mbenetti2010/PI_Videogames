const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default;
const {Videogames,Genres} = require('../db.js');


const router = Router();
const {API_KEY} = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/* router.get('/videogames', async(req, res) => {
    const apiurl = await axios.get('https://api.rawg.io/api/games?key=544bf6b2556f4547af91a9307a210ea6');
    const videogames = apiurl.data;

    res.send(videogames);
}); */


////TRAE TODOS LOS JUEGOS DE LA API 
const getApiInfo = async() => {
    const page_size = 15;
    const apiurl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}`);
    const GameCount = await apiurl.data;
    const videogames = GameCount.results.map(game => {
        return {
            name: game.name,
            description: game.description,
            image: game.background_image,
            rating: game.rating,
            platforms: game.platforms.map(platforms => platforms),
            genres: game.genres.map(genre => genre.name)
        }
    });
    return videogames;
}

    //TRAE TODOS LOS JUEGOS DE LA BASE DE DATOS

const getDataBaseInfo = async() => {
    return await Videogames.findAll({
        includes: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

}
//CONCATENA LOS JUEGOS DE LA BASE DE DATOS CON LOS JUEGOS DE LA API
const getAllGames = async() => {
    const apiInfo = await getApiInfo();
    const dataBaseInfo = await getDataBaseInfo();
    const gamesTotal = apiInfo.concat(dataBaseInfo);
    return gamesTotal;
}

//RUTAS GET /videogames trae todos los juegos de la api y la base de datos
router.get('/videogames' , async (req, res) => {
   const search = req.query.search;
   const Allgames = await getAllGames();
    if(search){
        const gamesName = await Allgames.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
        gamesName.length?
        res.status(200).send(gamesName):
        res.status(404).send('No se encontraron resultados');
               }
    else{
        res.status(200).send(Allgames);
    
        }
});

    
    
    
    
    
    
    //RUTA GET /genres TRAE LOS DATOS DE GENEROS DE LA API Y LOS GUARDA EN LA BASE DE DATOS
    /* router.get('/genres', async (req, res) => {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=544bf6b2556f4547af91a9307a210ea6`);
        const genres = genresApi.data.results.map(genre => {
            genre = genres.name;  //Agrega el nombre del genero a la API)
        }
        );
        const genresEach = genres.map(genre => {
            for (let i = 0; i < genre.length; i++) {
                return genre[i]}})
                genresEach.forEach(genre => {
                    genre.findorCreate({
                        where :{name: genre}
                    })
                });
                const getAllGames = await Genres.findAll();
                res.send(getAllGames);
                
            }
            
            
            
            
            );
            */
           /* if(search){
               const apiurlSearch = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`);
               const videogamesSearch = apiurlSearch.data.results.map(api => {
                   return {
                       id: api.id,
                       name: api.name,
                       released: api.released,
                       background_image: api.background_image,
                       rating: api.rating,
                       platforms: api.platforms.map(platforms => platforms),
                       genres: api.genres.map(genres => genres), 
                       
                            
                   }
               })
               res.send(videogamesSearch);
           }else{
               res.send(Allgames);
               
           } */
           module.exports = router;
           