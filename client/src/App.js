import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import LandingPage from './components/LandingPage'
import Home from './components/Home';




function App() {
  return (
<BrowserRouter>
    <div className="App">
   {/*    <Switch>
          <Route  exact path='/' components={LandingPage}/>
          <Route  path='/home' components={Home}/>
      </Switch >
 */}
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route path='/videogames' element={<Home/>}/>
      </Routes>

    </div>
</BrowserRouter>
  );
}

export default App;
