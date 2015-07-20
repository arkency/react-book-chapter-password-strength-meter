import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React from 'react';

const APP_ROOT = document.createElement("div");
document.body.appendChild(APP_ROOT);

React.render(<p>Hello!</p>, APP_ROOT);
