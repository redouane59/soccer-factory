import React, { Component } from 'react';
import Search from 'react-search-box';
import './PlayerSearchBar.css';



export class PlayerSearchBar extends Component {

  constructor(props){
    super(props);
    this.state = ({data : [
      {id:"0",name:"michel",full_name:"michel", searchKey :"michel", placeholder : "0"},
      {id:"1",name:"bilel", full_name:"bilel", searchKey :"bilel",placeholder : "1"},
      {id:"2",name:"david", full_name:"david", searchKey :"david", placeholder : "2"}]});
  }

  handleChange(value) {
    console.log(value);
  }


  render(){
    return (
      <Search
      data={ this.state.data }
      onChange={ this.handleChange.bind(this) }
      placeholder="Search for a string..."
      class="search-class"
      searchKey="full_name"
      />
    );
  }
}
