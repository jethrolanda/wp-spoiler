import App from "./App";
import { render } from '@wordpress/element';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

/**
 * Import the stylesheet for the plugin.
 */
import '../style/main.scss';
 
// Render the App component into the DOM
render(  
  <BrowserRouter basename={`${window.location.pathname}`}>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>, 
  document.getElementById('spoiler-settings')
);
  