import React, { Component } from 'react';
import './PlayerListView.css';
import { PlayerListElementView } from './PlayerListElementView.js';

export class PlayerListView extends Component {

  constructor(props){
    super(props);
    // checkedX = index of the checked player #X
    this.state = ({checked1 : undefined, checked2 : undefined, overviewedPlayerStyle : "blue"});
    this.sortedByName = false;
    this.sortedByGEN = false;
    // binding
    this.getPlayerListView = this.getPlayerListView.bind(this);
    this.clickOnEditButton = this.clickOnEditButton.bind(this);
    this.clickOnLine = this.clickOnLine.bind(this);
    this.onHoverLine = this.onHoverLine.bind(this);
    this.getLineStyle = this.getLineStyle.bind(this);
    this.sortByGEN = this.sortByGEN.bind(this);
    this.sortByName = this.sortByName.bind(this);
  }

  // click on the edit button
  clickOnEditButton(p, i){
    this.setState({checked1 : i});
    this.props.clickOnPlayer(p);
  }

  // on hover an array line
  onHoverLine(i){
    this.props.onHoverLine(i);
  }

  // click on a line (tr)
  clickOnLine(i, newState){
    if(newState){
      if(this.state.checked1===undefined){
        this.setState({checked1 : i});
      } else{
        this.setState({checked2 : i});
      }
    } else{
      if(this.state.checked1===i){
        this.setState({checked1 : this.state.checked2});
        this.setState({checked2 : undefined});
      } else if (this.state.checked2===i){
        this.setState({checked2 : undefined});
      }
    }
    this.props.clickOnLine(i, newState);
  }

  // return className for the background-color property
  getLineStyle(i){
    var className = "unselectedLine";
    if(this.state.checked1 === i){
      className="selectedLineBlue";
    } else if (this.state.checked2 === i){
      className="selectedLineRed";
    }
    return className;
  }

  // return the onHover classes
  getHoverLineStyle(i){
    var className = "onHoverGray";
    if(this.state.checked1===undefined){
      className="onHoverBlue";
    } else if (this.state.checked2===undefined){
      className="onHoverRed";
    }
    return className;
  }

  // return a list of PlayerListElementView
  getPlayerListView(){
    var checkedState = this.getCheckedStates();
    const playerListView = this.props.players.map((p, i) =>
    <PlayerListElementView
    key={i}
    playerModel={p}
    tdIndex={i}
    hoverStyle={this.getHoverLineStyle(i)}
    clickOnEditButton={this.clickOnEditButton}
    clickOnLine={this.clickOnLine}
    onHoverLine={this.onHoverLine}
    className = {this.getLineStyle(i)}
    lineSelected={checkedState[i]}
    />
  );

  return playerListView;
}


// return an array with true if the player at the corresponding index is checked, otherwise false
getCheckedStates(){
  var checkedStates = new Array(this.props.players.length);
  checkedStates.fill(false);
  if(this.state.checked1 !== undefined){
    checkedStates[this.state.checked1] = true;
  }
  if(this.state.checked2 !== undefined){
    checkedStates[this.state.checked2] = true;
  }

  return checkedStates;
}

// sort players by name;
sortByName(){
  const myData = [].concat(this.props.players)
  myData.sort(function(a, b){
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  if(!this.sortedByName){
    this.props.sortPlayers(myData);
    this.sortedByName = true;
    this.sortedByGEN = false;
  } else{
    this.props.sortPlayers(myData.reverse());
    this.sortedByName = false;
    this.sortedByGEN = false;
  }
}

// sort players by GEN
sortByGEN(){
  const myData = [].concat(this.props.players)
  myData.sort(function(a, b){
    if(a.gen < b.gen) return -1;
    if(a.gen > b.gen) return 1;
    return 0;
  });

  if(!this.sortedByGEN){
    this.props.sortPlayers(myData);
    this.sortedByGEN = true;
    this.sortedByName = false;
  } else{
    this.props.sortPlayers(myData.reverse());
    this.sortedByName = false;
    this.sortedByGEN = false;
  }
}

  render() {

    return (
      <div className="playerListDiv">
        <table className="playerTable">
          <tbody>
          <tr>
            <th onClick={this.sortByName}>Name</th>
            <th onClick={this.sortByGEN}>GEN</th>
            <th>edit</th>
          </tr>
            {this.getPlayerListView()}
          </tbody>
        </table>
      </div>
    );
  }

}
