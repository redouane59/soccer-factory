import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import PlayerEditView from '../Player/PlayerEditView'
import FullPlayersView from './FullPlayersView'

export class PlayersView  extends Component {

  render(){
    return (
      <Switch>
        <Route exact path='/players' component={FullPlayersView}/>
        <Route path='/players/:number' component={PlayerEditView}/>
      </Switch>
    );
  }
}

export default PlayersView
