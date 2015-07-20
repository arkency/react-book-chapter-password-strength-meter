import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';
import PasswordInput from './components/PasswordInput';

const APP_ROOT = document.createElement("div");
document.body.appendChild(APP_ROOT);

React.render(<div>                
                <br />
                <br />
                <PasswordInput />
             </div>, APP_ROOT);
