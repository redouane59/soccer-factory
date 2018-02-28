import React, { Component } from 'react';
import './RatingValue.css';

export class RatingValueView extends Component {

  constructor(props){
    super(props);
    this.render = this.render.bind(this);
  }

  render() {
    var backgroundColorClass;
    if(this.props.value>=95){
      backgroundColorClass = "higher95";
    } else if(this.props.value>=90){
      backgroundColorClass = "higher90";
    } else if(this.props.value>=85){
      backgroundColorClass = "higher85";
    } else if(this.props.value>=80){
      backgroundColorClass = "higher80";
    } else if(this.props.value>=75){
      backgroundColorClass = "higher75";
    } else if(this.props.value>=70){
      backgroundColorClass = "higher70";
    } else if(this.props.value>=65){
      backgroundColorClass = "higher65";
    } else if(this.props.value>=60){
      backgroundColorClass = "higher60";
    } else if(this.props.value>=55){
      backgroundColorClass = "higher55";
    } else{
      backgroundColorClass = "higher50";
    }

    return (
          <div className = {backgroundColorClass + " ratingValue"} >
          {Math.round(this.props.value)}
          </div>
    );
  }
}
