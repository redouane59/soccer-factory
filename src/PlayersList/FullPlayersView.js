import React, { Component } from 'react';
import { PlayerModel } from '../Player/PlayerModel.js';
import { PlayerListView } from './PlayerListView.js';
import { ReactChart } from '../common/RadarChart.js'
import { ModeEnum } from '../common/ModeEnum.js'
import { SwitchButton } from './SwitchButton.js'
import { SummaryInformation } from './SummaryInformation.js'
import firebase from 'firebase'
import './FullPlayersView.css';
import { Link } from 'react-router-dom'

export class FullPlayersView extends Component {

  constructor(props){
    super(props);
    this.state = ({players : [], playerModel : undefined, mode : ModeEnum.NONE, chartSum : false});
    // Initialize Firebase
    console.log("initializing firebase");
    var config = {
      apiKey: "AIzaSyBu_Eb1xF2BzZHHAE6y0PZ-IAXFxkRfVPs",
      authDomain: "soccer-factory.firebaseapp.com",
      databaseURL: "https://soccer-factory.firebaseio.com",
      projectId: "soccer-factory",
      storageBucket: "soccer-factory.appspot.com",
      messagingSenderId: "696519659698"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.database = firebase.database();
    this.loadPlayerData();

    //binding
    this.loadSelectedPlayer = this.loadSelectedPlayer.bind(this);
    this.comparePlayer = this.comparePlayer.bind(this);
    this.onHoverLine = this.onHoverLine.bind(this);
    this.sortPlayers = this.sortPlayers.bind(this);
    this.updateChartSumState = this.updateChartSumState.bind(this);
    this.loadPlayerData = this.loadPlayerData.bind(this);
  }

  // load players into state.players
  loadPlayerData(){
    var playerRef = this.database.ref('players/');
    return playerRef.once('value').then(function(snapshot) {
      var result = snapshot.val();
      var playerModelArray = [result.length];
      for (var key in snapshot.val()) {
        playerModelArray.push(PlayerModel.getCopyPlayerModel(result[key]));
      }
      playerModelArray.shift(); // @TODO comprendre pourquoi le 1er élément est undefined
      console.log(playerModelArray);
      this.setState({players : playerModelArray});
      console.log(JSON.stringify(playerModelArray));

    }.bind(this));
  }

  // call when the mouse is hover a array line
  onHoverLine(i){
    if(i===-1){
      this.setState({overviewedPlayer : undefined});
    } else{
      this.setState({overviewedPlayer : this.state.players[i]});
    }
  }

  // call when the switch button is used
  updateChartSumState(checked){
    this.setState({chartSum : checked});
  }

  // call when the editButton is clicked to edit a player
  loadSelectedPlayer(selectedPlayer){
    this.setState({playerModel : selectedPlayer, mode : ModeEnum.MODIFICATION});
  }

  // call when a first player is selected and clicking or hovering a second one
  comparePlayer(index, newState){
    if(newState){
      if(this.state.playerModel===undefined){
        this.setState({playerModel: this.state.players[index]});
      } else{
        this.setState({comparedPlayer: this.state.players[index]});
      }
    } else{
      if(this.state.players[index].equals(this.state.playerModel)){
        this.setState({playerModel: this.state.comparedPlayer});
        this.setState({comparedPlayer: undefined});
      } else if (this.state.players[index].equals(this.state.comparedPlayer)){
        this.setState({comparedPlayer: undefined});
      }
    }
  }

  // replace the state.players by the sortedArray newPlayers
  sortPlayers(newPlayers){
    this.setState({players: newPlayers});
  }


  render() {

    var player1;
    if(this.state.playerModel!==undefined){
      player1 = this.state.playerModel;
    } else if (this.state.overviewedPlayer!==undefined){
      player1 = this.state.overviewedPlayer;
    } else{
      player1 = new PlayerModel();
    }

    var player2;
    var criteriaList2 = [];
    if(this.state.comparedPlayer!==undefined){
      player2 = this.state.comparedPlayer;
    } else if (this.state.playerModel !== undefined && this.state.overviewedPlayer!==undefined){
      player2 = this.state.overviewedPlayer;
    }

    if(player2!==undefined){
      criteriaList2 = player2.criteria;
    }

    return (
      <div className="FullPlayersViewDiv">
           <Link  className="newButton" to={'./createNewPlayer'}> </Link>
              <PlayerListView
              players={this.state.players}
              selectedPlayer={player1}
              clickOnPlayer={this.loadSelectedPlayer}
              clickOnLine={this.comparePlayer}
              onHoverLine={this.onHoverLine}
              sortPlayers = {this.sortPlayers}
            />
            <div className="radarChart">
              <SwitchButton updateChartSumState={this.updateChartSumState}  />
              <ReactChart criteriaList1 = {player1.criteria} criteriaList2 = {criteriaList2} chartSum={this.state.chartSum} />
              <SummaryInformation player1={player1} player2={player2}/>
            </div>
      </div>
    );
  }
}

export default FullPlayersView
