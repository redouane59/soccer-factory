import { LevelsEnum } from './LevelsEnum.js';
import { CriterionModel } from './CriterionModel.js';

export class PlayerModel{

  constructor(name=PlayerModel.defaultValues.name,
    initLevel=PlayerModel.defaultValues.initLevel,
    criteriaModels=this.getDefaultCriteriaModels(),
    preferredFoot=PlayerModel.defaultValues.preferredFoot,
    birthdate=PlayerModel.defaultValues.birthdate,
    mail=PlayerModel.defaultValues.mail,
    id=0){

    this.name = name;
    this.initLevel = initLevel;
    this.criteria = criteriaModels;
    this.preferredFoot = preferredFoot;
    this.birthdate = birthdate;
    this.mail = mail;
    var genSum = 0;
    for (var i = 0; i<this.criteria.length; i++) {
      var criterion = this.criteria[i];
      genSum+=criterion.value;
    }
    this.gen = Math.round((genSum/this.criteria.length)*10)/10;
    this.id = id;
  }

  static getCopyPlayerModel(obj) {
    var newPlayerModel = new PlayerModel();
    for(var prop in obj){
      newPlayerModel[prop] = obj[prop];
    }
    return newPlayerModel;
  }

  getCriterionByName(name){
    for(var i=0; i<this.criteria.length;i++){
      if(this.criteria[i].name === name){
        return this.criteria[i];
      }
    }
    return null;
  }

  equals(player2){
    if(this.id===player2.id){
      return true;
    } else{
      return false;
    }
  }

  static equals(player1, player2){
    if(player1===undefined || player2===undefined){
      console.log("EQUALS UNDEFINEEEEED");
      return false;
    }
    if(player1.id===player2.id){
      return true;
    } else{
      return false;
    }
  }

  // get default criteria from criteria names
  getDefaultCriteriaModels(){
    var criteriaModels = [];
    PlayerModel.defaultValues.criteriaNames.forEach(function(name){
      criteriaModels.push(new CriterionModel(name, 60));
    });
    return criteriaModels;
  }

}

PlayerModel.defaultValues = {
  criteriaNames : ["TIR","PAS","DRI","DEF","PHY","VIT"],
  name : "",
  initLevel : LevelsEnum.NOVICE,
  preferredFoot : undefined,
  mail:"",
  birthdate:"",
  criteriaModels : [],
  defaultCriterionValue : 60,
  gen : new CriterionModel("GEN",this.defaultCriterionValue),
  nbMaxStars : 9,
  nbStarsOK : false
}
