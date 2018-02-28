import React, { Component } from 'react';
import './PlayerListView.css';
import { RatingValueView } from '../common/RatingValueView.js';
import { Link } from 'react-router-dom'

export class PlayerListElementView extends Component {

  constructor(props){
    super(props);
    this.state = ({onHoverStyle : "selectedLineGray"})
    //binding
    this.clickOnEditButton = this.clickOnEditButton.bind(this);
    this.clickOnLine = this.clickOnLine.bind(this);
    this.onHoverLine = this.onHoverLine.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  clickOnLine(e){
    var newState = !this.props.lineSelected;
    if (e.target.cellIndex !== undefined){
    this.props.clickOnLine(this.props.tdIndex, newState);
    }
  }

  onHoverLine(e){
    this.props.onHoverLine(this.props.tdIndex);
    this.setState({onHoverStyle : this.props.hoverStyle})
  }

  onMouseOut() {
    this.props.onHoverLine(-1);
  }

  clickOnEditButton(e){
    this.props.clickOnEditButton(this.props.playerModel, (this.props.tdIndex));
  }

  render() {
    //           <img src="img/edit.png" height="20" width="20" alt="" onClick={this.clickOnEditButton}></img>

    return (
      <tr
      className={this.props.className + " " + this.state.onHoverStyle}
      value={this.props.playerModel.name}
      onClick={this.clickOnLine}
      onMouseOver={this.onHoverLine}
      onMouseOut={this.onMouseOut}  >

          <td className={this.props.tdIndex}>
          {this.props.playerModel.name}
          </td>
          <td className={this.props.tdIndex}>
          <RatingValueView value = {this.props.playerModel.gen}/>
        </td>
        <td>
        <Link className="editButton" to={`/players/${this.props.playerModel.id}`}> </Link>
        </td>
      </tr>
    );
  }
}
