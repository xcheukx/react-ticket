import React from 'react';
import ReactDOM from 'react-dom';
// import './lib/js/base';
import './lib/sass/normalize.scss';
import './lib/js/base';
import App from './index/page/home/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
