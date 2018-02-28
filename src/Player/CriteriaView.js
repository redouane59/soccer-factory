import React, { Component } from 'react';
import './CriteriaView.css';
import { CriterionView } from './CriterionView.js';

export class CriteriaView extends Component {

    constructor(props){
      super(props);
      this.render = this.render.bind(this);
      this.criteriaViews = [];
      // GEN : 0-100
      this.updateGEN = this.updateGEN.bind(this);
      this.getCriteriaListViews = this.getCriteriaListViews.bind(this);
    }

    getEditable(){
      if(this.props.editable){
        return true;
      } else if(!this.props.editable){
        return false;
      }
    }

  // mise à jour du GEN (0-100)
  updateGEN(){
    var sum = 0;
    this.criteriaViews.forEach(function(cView){
      sum += cView.props.model.value;
    });
    var nbCriteria = this.criteriaViews.length;
    var newGen = sum/nbCriteria;
    this.setState({GEN: newGen});
    this.props.updateParent(newGen);
  }


  getCriteriaListViews(){
    const criteriaListView = this.props.criteriaModels.map((model, i) =>
      <CriterionView
        key={i}
        model={model}
        callback={this.updateGEN}
        editable = {this.getEditable()}
        ref={(criterion) => {this.criteriaViews[i] = criterion}}
      />
    );
    return criteriaListView;
  }

  render() {

    return (
      <div>
        <table className = "criterionTable">
          <tbody>
            {this.getCriteriaListViews()}
          </tbody>
        </table>
      </div>

    );
  }
}
