
import React from 'react';
import { Switch,  Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Dash from './Components/Dash/Dash';
import Form from './Components/Form/Form';
import Post from './Components/Post/Post';

export default (
    <Switch>
        <Route component={Auth} exact path='/' />
        <Route component={Dash} exact path='/Dash' />
        <Route component={Form} exact path='/Form' />
        <Route component={Post} exact path='/Post/:id' />
    </Switch>
)