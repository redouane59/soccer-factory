import React, { Component } from 'react';
import './CriterionView.css';
import ReactStars from 'react-stars'
import { RatingValueView } from '../common/RatingValueView.js'
import { RatingConvertHelper } from '../common/RatingConvertHelper.js'

export class CriterionView extends Component {

  constructor(props){
    super(props);
    this.render = this.render.bind(this);
    this.starsChanged = this.starsChanged.bind(this);
  }

  starsChanged(newNbStars){
    this.props.model.value = RatingConvertHelper.getGenFromNbStars(newNbStars);
    this.props.callback();
  }

  render() {

    return (

      <tr>
        <td>
          {this.props.model.name}
        </td>
        <td>
          <ReactStars
            className = "reactStars"
            count={5}
            value={RatingConvertHelper.getNbStarsFromGen(this.props.model.value)}
            onChange={this.starsChanged}
            size={40}
            color2={'#ffd700'}
            edit = {this.props.editable}
          />
        </td>
        <td>
          <RatingValueView
            value = {this.props.model.value}
          />
        </td>
      </tr>
    );
  }
}
