/*
* @Author: zhuozhenbao
* @Date:   2017-08-16 17:03:55
* @Last Modified by:   zhuozhenbao
* @Last Modified time: 2017-08-17 16:42:01
*/
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
// import './index.css';
import App from './page/App';
import registerServiceWorker from '../registerServiceWorker';

ReactDOM.render(<Router>
	<div>
		<Link to="/admin.html/">首页</Link>
	    <Route exact path="/admin.html/" component={App}/>
    </div>
  </Router>, document.getElementById('root'));
registerServiceWorker();
