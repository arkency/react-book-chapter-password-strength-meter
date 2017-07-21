import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import PasswordInput from './components/PasswordInputSnapshot';

const APP_ROOT = document.createElement("div");
document.body.appendChild(APP_ROOT);

ReactDOM.render(<div>
                <br />
                <br />
                <PasswordInput />
             </div>, APP_ROOT);
