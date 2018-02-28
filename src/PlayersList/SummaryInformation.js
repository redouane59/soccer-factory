import React, { Component } from 'react';
import './SummaryInformation.css';

export class SummaryInformation extends Component {

    getAge(x) {
        var date = new Date(x);
        var now = new Date();
        var age = now.getFullYear() - date.getFullYear();
        return age;
    };

    render() {
        var p1foot = "";
        var p2foot = "";
        var p1age = "";
        var p2age = "";
        var p1gen = "";
        var p2gen = "";
        if(this.props.player1!==undefined){
            if(this.props.player1.preferredFoot!==undefined){
                p1foot = this.props.player1.preferredFoot[0];
            } else{
                p1foot = "-";
            }
            if(this.props.player1.birthdate!==""){
                p1age = this.getAge(this.props.player1.birthdate);
            } else{
                p1age = "-";
            }
            p1gen = Math.round(this.props.player1.gen);
        }
        if(this.props.player2!==undefined){
            if(this.props.player2.preferredFoot!==undefined){
                p2foot = this.props.player2.preferredFoot[0];
            } else{
                p2foot = "-";
            }        if(this.props.player2.birthdate!==""){
                p2age = this.getAge(this.props.player2.birthdate);
            } else{
                p2age = "-";
            }
            p2gen = Math.round(this.props.player2.gen);
        }

        return(
            <table className="summaryTable">
            <tbody>
                <tr>
                <td className="blueTd">
                {p1gen}
                </td>
                <td>
                GEN
                </td>
                <td className="redTd">
                {p2gen}
                </td>
                </tr>
                <tr>
                    <td className="blueTd">
                    {p1foot}
                    </td>
                    <td>
                        Preferred foot
                    </td>
                    <td className="redTd">
                    {p2foot}
                    </td>
                </tr>
                <tr>
                    <td className="blueTd">
                    {p1age}
                    </td>
                    <td>
                        Age
                    </td>
                    <td className="redTd">
                    {p2age}
                    </td>
                </tr>
            </tbody>
            </table>
    );
    }
}
