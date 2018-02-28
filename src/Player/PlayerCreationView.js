import React, { Component } from 'react';
import { PlayerEditView } from './PlayerEditView.js';
import { ModeEnum } from '../common/ModeEnum.js'

export class PlayerCreationView extends Component {

  render() {
     return (
       <PlayerEditView
       mode = {ModeEnum.CREATION}
       />
     );
   }
 }

export default PlayerCreationView
