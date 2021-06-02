import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from "./views/Home/home";
import {Header} from "./views/Header/Header";
import {Favorites} from "./views/Favorites/Favorites";
import {AnimateSharedLayout} from "framer-motion";

function App() {
  return (
      <AnimateSharedLayout type="crossfade">
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Router>
              <Switch>
                  <Route path={"/favorites/:idMovie"} component={Favorites}/>
                  <Route path={"/favorites"} component={Favorites}/>
                  <Route exact path={["/", "/movies", "/movies/:idMovie"]}  component={Home}/>
                  <Redirect to='/'/>
              </Switch>
            </Router>
          </div>
      </AnimateSharedLayout>
  );
}

export default App;
