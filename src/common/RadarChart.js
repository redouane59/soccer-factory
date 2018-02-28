import Radar from 'react-d3-radar';
import React, { Component } from 'react';

export class ReactChart extends Component {

  constructor(props){
    super(props);
    this.render = this.render.bind(this);
  }

  render(){
      var valuesObj = {};
      var valuesObj2 = {};
      var criteriaNameList = [];

      // sum mode
      if(this.props.chartSum && this.props.criteriaList1!==undefined && this.props.criteriaList2!==undefined && this.props.criteriaList1.length === this.props.criteriaList2.length){
        for(var i = 0; i<this.props.criteriaList1.length; i++){
          var criterion1 = this.props.criteriaList1[i];
          var criterion2 = this.props.criteriaList2[i];
          valuesObj[criterion1.name] = (criterion1.value + criterion2.value) / 2;
          criteriaNameList.push({key: criterion1.name, label: criterion1.name});
        }
        valuesObj2 = valuesObj;
      }
      // comparison mode
      else
      {
        this.props.criteriaList1.forEach(function(m) {
          valuesObj[m.name] = m.value;
          criteriaNameList.push({key: m.name, label: m.name});
        });

        if(this.props.criteriaList2!==undefined){
          this.props.criteriaList2.forEach(function(m) {
            valuesObj2[m.name] = m.value;
          });
        }
      }

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    var chartWidth = 0.25*x
    var padding = x/40;
    if(x<=1024){
      chartWidth = 0.9*x;
      padding = 40;
    }
    
    return (
      <Radar
      className = "radarChart"
      width={chartWidth}
      height={chartWidth}
      padding={padding}
      domainMax={100}
      highlighted={null}
      onHover={(point) => {
        if (point) {
    //      console.log('hovered over a data point');
        } else {
    //      console.log('not over anything');
        }
      }}
      data={{
        variables: criteriaNameList,
        sets: [
          {
            key: 'player1',
            label: 'Stats1',
            values: valuesObj,
          },
          {
            key: 'player2',
            label: 'Stats2',
            values: valuesObj2,
          }
        ],
      }}
      />
    )
    }

  }
