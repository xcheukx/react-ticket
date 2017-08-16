/*
* @Author: zhuozhenbao
* @Date:   2017-08-16 17:03:55
* @Last Modified by:   zhuozhenbao
* @Last Modified time: 2017-08-16 17:09:42
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './admin/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
