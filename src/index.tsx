import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

function TopComponent() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<TopComponent />, document.getElementById('root'));
serviceWorker.unregister();
