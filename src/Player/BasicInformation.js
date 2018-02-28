import React, { Component } from 'react';
import './BasicInformation.css';
import { PreferredFootEnum } from '../common/PreferredFootEnum.js';
import { LevelSelectorView } from './LevelSelectorView.js';
import ReactTooltip from 'react-tooltip'
import { PlayerSearchBar } from './PlayerSearchBar.js';

export class BasicInformation extends Component {

    constructor(props){
        super(props);
        this.state = ({preferredFootValue : PreferredFootEnum.RIGHT});
        this.preferredFootChange = this.preferredFootChange.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.mailChange = this.mailChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    preferredFootChange(e){
        this.setState({preferredFootValue:e.target.value});
        this.props.changepreferredFoot(e.target.value);
    }

    dateChange(e){
        this.props.changeDate(e.target.value);
    }

    mailChange(e){
        this.props.changeMail(e.target.value);
    }

    nameChange(e){
        this.props.changeName(e.target.value);
    }

    handleChange(e){
        console.log("change");
    }

    render() {

        let nameField =  <input className = "basicInformationInput" placeholder="Cristiano Ronaldo" type="text" name="name" onChange={this.nameChange} value={this.props.name}  />
        let mailField =  <input className = "basicInformationInput" placeholder="c.ronaldo@rmfc.com" type="email" name="email" onChange={this.mailChange} value={this.props.mail}   />
        let birthdateField =  <input className = "basicInformationInput" type="date" name="Date de naissance" onChange={this.dateChange} value={this.props.birthdate} />

        return (
            <form className="basicInformation">

            <label>
            Search a player
            <PlayerSearchBar/>
            </label>
            <br/>
            <label>
            Name <br/>
                {nameField}
            </label>
            <br/>

            <label className="initLevelLabel">
                Initial level <br/>
                <LevelSelectorView callback={this.props.changeInitLevel} initLevel={this.props.initLevel}  />
                <span className="tooltipButton" data-multiline={true}
                data-place="right"
                data-tip="<div> <p class='pTip'> Novice : I just play occasionnaly or less, i'm not very good </p> <p class='pTip'> Beginner : I play often, i'm so so </p> <p class='pTip'> Intermediate : I play regularly, I'm correct </p> <p class='pTip'> Advanced : I play very regularly for longtime, i'm pretty good </p> <p class='pTip'> Professionnal : I play very regularly for years, I'm very good </p></div>"
                >?
                </span>
                <ReactTooltip html={true} />
            </label>

            <br/>

            <label>
            Preferred foot <br/>
            <select className = "basicInformationInput" value={this.props.preferredFoot} onChange={this.preferredFootChange} >
                <option value={PreferredFootEnum.RIGHT}>{PreferredFootEnum.RIGHT}</option>
                <option value={PreferredFootEnum.LEFT}>{PreferredFootEnum.LEFT}</option>
                <option value={PreferredFootEnum.BOTH}>{PreferredFootEnum.BOTH}</option>
            </select>
            </label>

            <br/>
            <label>
            E-mail <br/>
            {mailField}
            </label>

            <br/>
            <label>
            Birthdate: <br/>
            {birthdateField}
            </label>
            </form>
        )
    }
}
