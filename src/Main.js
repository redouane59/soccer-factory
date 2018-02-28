import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Home } from './Home.js'
import PlayersView from './PlayersList/PlayersView'
import PlayerCreationView from './Player/PlayerCreationView'
import './App.css'

export class Main extends Component {

  render(){
    return (
      <div className="mainDiv">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/players' component={PlayersView}/>
        <Route exact path='/createNewPlayer' component={PlayerCreationView}/>
      </Switch>
      </div>

    );
  }
}

export default Main
