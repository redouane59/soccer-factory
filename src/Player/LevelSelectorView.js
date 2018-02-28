import React, { Component } from 'react';
import './LevelSelectorView.css';
import { LevelsEnum } from './LevelsEnum.js'

export class LevelSelectorView extends Component {


  constructor(props){
    super(props);
    this.render = this.render.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getDefaultSelectedValue = this.getDefaultSelectedValue.bind(this);
    this.getSelectedValue = this.getSelectedValue.bind(this);
    this.state = ({selectedValue : undefined});
  }

  getDefaultSelectedValue(){
    if(this.props.initLevel===LevelsEnum.NOVICE){
      return 0;
    } else if(this.props.initLevel===LevelsEnum.DEBUTANT){
      return 1;
    }else if(this.props.initLevel===LevelsEnum.INTERMEDIAIRE){
      return 2;
    }else if(this.props.initLevel===LevelsEnum.AVANCE){
      return 3;
    }else if(this.props.initLevel===LevelsEnum.PROFESSIONNEL){
      return 4;
    } else{
      return 0;
    }
  }

  handleChange(e){
    this.setState({selectedValue:e.target.value});
    var level = e.target.value;
    var value = 5;
    var nbCriteria = 6;

    if(level===LevelsEnum.NOVICE){
      value = 1.5;
    } else if(level===LevelsEnum.DEBUTANT){
      value = 2;
    } else if(level===LevelsEnum.INTERMEDIAIRE){
      value = 2.5;
    } else if(level===LevelsEnum.AVANCE){
      value = 3;
    } else if(level===LevelsEnum.PROFESSIONNEL){
      value = 3.5;
    }
    this.props.callback(value*nbCriteria, level);
  }

  getSelectedValue(){
    if(this.state.selectedValue === undefined){
      return this.props.initLevel;
    } else{
      return this.state.selectedValue;
    }
  }

  render() {
    return (
      <select value={this.getSelectedValue()} onChange={this.handleChange} className="levelSelectorView" disabled={this.props.disabled}>
          <option value={LevelsEnum.NOVICE}>{LevelsEnum.NOVICE}</option>
          <option value={LevelsEnum.DEBUTANT}>{LevelsEnum.DEBUTANT}</option>
          <option value={LevelsEnum.INTERMEDIAIRE}>{LevelsEnum.INTERMEDIAIRE}</option>
          <option value={LevelsEnum.AVANCE}>{LevelsEnum.AVANCE}</option>
          <option value={LevelsEnum.PROFESSIONNEL}>{LevelsEnum.PROFESSIONNEL}</option>
        </select>
    );
  }
}
