const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default;
const {Videogames,Genres} = require('../db.js');


const router = Router();
const {API_KEY,PAGE_SIZE} = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/* router.get('/videogames', async(req, res) => {
    const apiurl = await axios.get('https://api.rawg.io/api/games?key=544bf6b2556f4547af91a9307a210ea6');
    const videogames = apiurl.data;

    res.send(videogames);
}); */


////TRAE TODOS LOS JUEGOS DE LA API SIN QUERIES
const getApiInfo = async() => {
    
    const apiurl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${PAGE_SIZE}`);
    const GameCount = await apiurl.data;
    const videogames = GameCount.results.map(game => {
        return {
            id: game.id,
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
    const videogames = await getAllGames();
   const Allgames = await axios.get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}&page_size=${PAGE_SIZE}`);
    const videogamesSearch = Allgames.data.results.map(game => {
          return {
                id: game.id,
                name: game.name,
                description: game.description,
                image: game.background_image,
                rating: game.rating,
                platforms: game.platforms.map(platforms => platforms),
                genres: game.genres.map(genre => genre.name)
          }
     });
   if(search){
        const gamesName = await videogamesSearch.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
        gamesName.length?
        res.status(200).send(gamesName):
        res.status(404).send('No se encontraron resultados');
               }
    else{
        res.status(200).send(videogames);
    
        }
});

    
    
    
    
    
    
    //RUTA GET /genres TRAE LOS DATOS DE GENEROS DE LA API Y LOS GUARDA EN LA BASE DE DATOS
    router.get('/genres', async (req, res) => {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresArray = await genresApi.data.results.map(el => el.name);
       const GenresEach = genresArray.map(genre => {
           for(let i = 0; i < genre.length; i++)return genre})
           console.log(GenresEach);
           GenresEach.forEach( genre => {
               Genres.findOrCreate({
                   where: {
                       name: genre
                   }

               })
              })
              const AllGenres = await Genres.findAll();
                res.status(200).send(AllGenres);
           });
            
            
            
            router.post('/videogames', async (req, res) => {
                const { 
                    name, 
                    description,
                    image,
                    rating,
                    platforms,
                    genres, 
                    released,
                    createdInDb


                } = req.body;
                const videogameCreated = await Videogames.create({
                    name, 
                    description,
                    image,
                    rating,
                    platforms,
                    released,
                    createdInDb
                });
                    const GenresDB = await Genres.findAll({
                        where: {name: genres}
                    });
                    videogameCreated.addGenres(GenresDB);
                    res.status(200).send("Videogame created successfully.");
                    });
                
                    router.get('/videogames/:id' , async (req, res)=>{
                        const id = req.params.id;
                        const VideogameTotal= await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
                        const videogameId = VideogameTotal.data;
                        
                        id?    res.status(200).json(videogameId):res.status(404).send('No results found by ID');

                            
                        }
                    );
                                             
                        
           
           
           module.exports = router;       