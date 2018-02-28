import React, { Component } from 'react';
import './PlayerEditView.css';
import { CriteriaView } from './CriteriaView.js';
import { CriterionModel } from './CriterionModel.js';
import { RatingConvertHelper } from '../common/RatingConvertHelper.js';
import { CriterionView } from './CriterionView.js';
import { LevelsEnum } from './LevelsEnum.js';
import { PlayerModel } from './PlayerModel.js';
import { BasicInformation } from './BasicInformation.js';
import { PreferredFootEnum } from '../common/PreferredFootEnum.js';
import { ModeEnum } from '../common/ModeEnum.js'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { ReactChart } from '../common/RadarChart.js'


export class PlayerEditView extends Component {

  constructor(props){
    super(props);
    this.state = this.getInitializeState(); // set all default values
    // @TODO duplicate à bouger
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
    // get URL param to display the player from his id
    if(props.match!==undefined){
      this.setPlayerModel(props.match.params.number);
    }
    // binding
    this.update = this.update.bind(this);
    this.reset = this.reset.bind(this);
    this.updateMail = this.updateMail.bind(this);
    this.updateBirthdate = this.updateBirthdate.bind(this);
    this.updateMaxStars = this.updateMaxStars.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatepreferredFoot = this.updatepreferredFoot.bind(this);
    this.isNbStarsOk = this.isNbStarsOk.bind(this);
    this.savePlayer = this.savePlayer.bind(this);
    this.canSave = this.canSave.bind(this);
    this.setPlayerModel = this.setPlayerModel.bind(this);
  }

  setPlayerModel(playerId){
    var playerRef = this.database.ref('players/'+playerId);
    return playerRef.once('value').then(function(snapshot) {
      var result = snapshot.val();
      this.setState({playerModel : PlayerModel.getCopyPlayerModel(result)});
    }.bind(this));
  }

  // get all default values
  getInitializeState(){
    return ({
      playerModel : new PlayerModel(),
      name : PlayerEditView.defaultValues.name,
      initLevel : PlayerEditView.defaultValues.initLevel,
      preferredFoot : PlayerEditView.defaultValues.preferredFoot,
      mail: PlayerEditView.defaultValues.mail,
      birthdate:PlayerEditView.defaultValues.birthdate,
      criteriaModels : this.getDefaultCriteriaModels(),
      gen : PlayerEditView.defaultValues.gen,
      nbMaxStars : PlayerEditView.defaultValues.nbMaxStars,
      nbStarsOK : PlayerEditView.defaultValues.nbStarsOK
    });
  }

  // get default criteria from criteria names
  getDefaultCriteriaModels(){
    var criteriaModels = [];
    PlayerEditView.defaultValues.criteriaNames.forEach(function(name){
      criteriaModels.push(new CriterionModel(name, 60));
    });
    return criteriaModels;
  }

  // update of the maximum number of stars after level has changed
  updateMaxStars(value, level){
    this.setState({nbMaxStars : value, initLevel : level});
  }

  updateBirthdate(value){
    this.setState({birthdate : value});
  }

  updateMail(value){
    this.setState({mail : value});
  }

  updateName(value){
    this.setState({name : value});
  }

  updatepreferredFoot(value){
    this.setState({preferredFoot : value});
  }

  update(newGEN){
    this.setState({gen : new CriterionModel("GEN",newGEN)});
  }

  // get the className of the total stars count block
  getNbStarsStyle(){
    var nbStarsStyle = "nbStarsOK";
    var nbStars = Math.round(PlayerEditView.defaultValues.criteriaNames.length*RatingConvertHelper.getNbStarsFromGen(this.getPlayerGen().value)*10)/10;
    if(nbStars>this.getNbMaxStars()){
      nbStarsStyle = "nbStarsHigh";
    } else if (nbStars<this.getNbMaxStars()){
      nbStarsStyle = "nbStarsLow";
    }
    return nbStarsStyle;
  }

  // return true if the number of stars put are not greater than the maximum
  isNbStarsOk(){
    if(this.props.mode !== ModeEnum.CREATION){
      return true;
    }

    var nbStars = Math.round(PlayerEditView.defaultValues.criteriaNames.length*RatingConvertHelper.getNbStarsFromGen(this.getPlayerGen().value)*10)/10;
    if (nbStars<=this.getNbMaxStars()){
      return true;
    }
    return false;
  }

  isNameCorrect(name){
    if(name===undefined || name.length<2){
      return false;
    } else{
      return true;
    }
  }

  isBirthdateCorrect(birthdate){
    if(birthdate===undefined || birthdate.length>=6){
      return false;
    } else{
      return true;
    }
  }

  isMailCorrect(mail){
    if(mail===undefined || mail.length>=6){
      return false;
    } else{
      return true;
    }
  }

  getName(){
    var name = this.state.name;
    if(this.props.mode !== ModeEnum.CREATION && this.state.name===PlayerEditView.defaultValues.name){
      name =  this.state.playerModel.name;
    }
    return name;
  }

  getInitlevel(){
    var initlevel = this.state.initLevel;
    if(this.props.mode !== ModeEnum.CREATION && this.state.initLevel===PlayerEditView.defaultValues.initLevel){
      initlevel =  this.state.playerModel.initLevel;
    }
    return initlevel;
  }

  getpreferredFoot(){
    var preferredFoot = this.state.preferredFoot;
    if(this.props.mode !== ModeEnum.CREATION  && this.state.preferredFoot===PlayerEditView.defaultValues.preferredFoot){
      preferredFoot =  this.state.playerModel.preferredFoot;
    }
    return preferredFoot;
  }

  getMail(){
    var mail = this.state.mail;
    if(this.props.mode !== ModeEnum.CREATION && this.state.mail===PlayerEditView.defaultValues.mail){
      mail =  this.state.playerModel.mail;
    }
    return mail;
  }

  getPlayerBirthdate(){
    var birthdate = this.state.birthdate;
    if(this.props.mode !== ModeEnum.CREATION && this.state.birthdate===PlayerEditView.defaultValues.birthdate){
      birthdate =  this.state.playerModel.birthdate;
    }
    return birthdate;
  }

  getPlayerCriteriaModels(){
    var criteriaModel = this.state.criteriaModels;
    if(this.props.mode !== ModeEnum.CREATION){
      criteriaModel =  this.state.playerModel.criteria;
    }
    return criteriaModel;
  }

  getPlayerGen(){
    var gen = this.state.gen;
    if(this.props.mode !== ModeEnum.CREATION && this.state.gen===PlayerEditView.defaultValues.gen){
      gen =  new CriterionModel("gen",this.state.playerModel.gen);
    }
    return gen;
  }

  getId(){
    var id;
    if(this.props.mode !== ModeEnum.CREATION){
      id =  this.state.playerModel.id;
    } else{
      id = this.props.lastId+1;
    }
    return id;
  }

  getNbMaxStars(){
    var nbMaxStars = this.state.nbMaxStars;
    if(this.props.mode !== ModeEnum.CREATION  && this.state.nbMaxStars===PlayerEditView.defaultValues.nbMaxStars){
      nbMaxStars =  RatingConvertHelper.getNbMaxStarsFromLevel(this.state.playerModel.initLevel, this.state.playerModel.criteria.length);
    }
    return nbMaxStars;
  }

  // return true if all the constraints are respected
  canSave(){
    if(!this.isNameCorrect(this.getName())  /*|| !this.isNameCorrect(this.state.birthdate) || !this.isMailCorrect(this.getMail()) */){
      return false;
    } else{
      return this.isNbStarsOk();
    }
  }

  // reset all the criteria
  reset(){
    this.getPlayerCriteriaModels().forEach(function(cModel){
      cModel.value = PlayerEditView.defaultValues.defaultCriterionValue;
    });
    this.update();
  }

  // save the player with all the input
  savePlayer(){
    var playerModel = new PlayerModel(this.getName(), this.getInitlevel(), this.getPlayerCriteriaModels(), this.getpreferredFoot(), this.getPlayerBirthdate(), this.getMail(), this.getId());
    this.setState(this.getInitializeState);
    if(this.props.mode!==ModeEnum.CREATION){
      this.database.ref('players/' + playerModel.id).set(playerModel);
    } else{
      var id = this.database.ref().child('players').push().key;
      playerModel.id = id;
      this.database.ref('players/' + playerModel.id).set(playerModel);
    }

    // redirection after validation
    window.location = '../players';

  }

  render() {
    var GENnbStars = RatingConvertHelper.getNbStarsFromGen(this.getPlayerGen().value);
    var totalStarsToDisplay = (GENnbStars*6).toFixed(1).replace(/[.]0]/, "")

    return (

      <div className="playerEditDiv">

          <BasicInformation
            mode={this.props.mode}
            name={this.getName()}
            initLevel={this.getInitlevel()}
            preferredFoot={this.getpreferredFoot()}
            mail={this.getMail()}
            birthdate={this.getPlayerBirthdate()}
            changeInitLevel={this.updateMaxStars}
            changepreferredFoot={this.updatepreferredFoot}
            changeName={this.updateName}
            changeDate={this.updateBirthdate}
            changeMail={this.updateMail}
          />

          <div className = "criteriaFullView">

              <CriteriaView
                criteriaModels = {this.getPlayerCriteriaModels()}
                updateParent = {this.update}
                editable = {true}
              />

              <table className = "genTable">
                  <tbody>
                      <CriterionView model={new CriterionModel(this.getPlayerGen().name, this.getPlayerGen().value)} editable = {false}/>
                  </tbody>
              </table>

              <div className={this.getNbStarsStyle() + " infoStarsDiv "} >
                  <p> Total étoiles : {totalStarsToDisplay} / {this.getNbMaxStars()} </p>
                  <button className="resetButton" onClick={this.reset}> Reset </button>
              </div>

              <button disabled={!this.canSave()} className="validateButton" onClick={this.savePlayer}>
                Valider
              </button>

          </div>
          <div className="editViewRadar">
              <ReactChart  criteriaList1 = {this.getPlayerCriteriaModels()}  />
          </div>
      </div>
    );
  }
}

PlayerEditView.defaultValues = {
  criteriaNames : ["TIR","PAS","DRI","DEF","PHY","VIT"],
  name : "",
  initLevel : LevelsEnum.NOVICE,
  preferredFoot : PreferredFootEnum.RIGHT,
  mail:"",
  birthdate:"",
  criteriaModels : [],
  defaultCriterionValue : 60,
  gen : new CriterionModel("GEN",this.defaultCriterionValue),
  nbMaxStars : 9,
  nbStarsOK : false
}

export default PlayerEditView
