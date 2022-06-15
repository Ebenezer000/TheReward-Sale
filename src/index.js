import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./pages/App";
//styles import
import './assets/animate.css/animate.css';
import '../node_modules/alertifyjs/build/css/alertify.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import './assets/pe-icons/pe-icon-7-stroke.css';
import './assets/pe-icons/helper.css';
import './assets/stroke-icons/style.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        <HashRouter>
                <App />
        </HashRouter>
 , document.getElementById('root'));

registerServiceWorker();
