import React from 'react';
import { hot } from 'react-hot-loader'
import test from './test';
import './App.scss';
import './test-css.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div>{test}fasf44ffwddww33sfasasf</div>
        )
    };
}

export default hot(module)(App)