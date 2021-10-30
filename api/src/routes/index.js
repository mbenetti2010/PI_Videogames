const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default;
const {Videogames,Genres} = require('../db.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


/* router.get('/videogames', async(req, res) => {
    const apiurl = await axios.get('https://api.rawg.io/api/games?key=544bf6b2556f4547af91a9307a210ea6');
    const videogames = apiurl.data;

    res.send(videogames);
}); */

const getApiInfo = async() => {
    const apiurl = await axios.get(`https://api.rawg.io/api/games?key=544bf6b2556f4547af91a9307a210ea6`);
    const GameInfo=await apiurl.data.results.map(api => {
        return {
            id: api.id,
            name: api.name,
             released: api.released,
            background_image: api.background_image,
            rating: api.rating,
            platforms: api.platforms.map(platforms => platforms),
            genres: api.genres.map(genres => genres), 
                 
        }
    });
    return GameInfo;
}




    

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

const getAllGames = async() => {
    const apiInfo = await getApiInfo();
    const dataBaseInfo = await getDataBaseInfo();
    const gamesTotal = apiInfo.concat(dataBaseInfo);
    return gamesTotal;
}
router.get('/videogames' , async (req, res) => {
    const name = req.query.name;
    const TotalGames = await getAllGames();
    if(name){
        const gameName = TotalGames.filter(game => game.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length? res.send(gameName).status(200) : res.send('No se encontraron resultados para este Juego').status(404);
    }else{
        res.send(TotalGames).status(200);
    }
}
);

module.exports = router;
