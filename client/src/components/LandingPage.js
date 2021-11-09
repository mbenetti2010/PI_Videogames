import {React,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { getAllGames } from '../actions';

export default function LandingPage() {
    const dispatch = useDispatch()
    const Allgames = useSelector ((state) => state.gamesST)  
    useEffect(() => {
        dispatch(getAllGames())
    },[]);  
    return (
        
        <div className="landing-page">
            <h1>Welcome to the Henry React Redux VideoGame App</h1>
            <p>This is your next favoutites Videogame App.</p>

            <Link to="/videogames">
                <button>Start</button>
            </Link>  
            </div>
    );
}