import React, { Component } from 'react';
import Switch from "react-switch";
import './SwitchButton.css';

export class SwitchButton extends Component {

  constructor(props){
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.props.updateChartSumState(checked);
  }

  render(){

    return (
      <div className="SwitchButton">

        <label>
          <span>Comparison</span>

        <Switch
        onChange={this.handleChange}
        checked={this.state.checked}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
        />
        <span>Sum</span>

        </label>
      </div>
    )
  }

}
