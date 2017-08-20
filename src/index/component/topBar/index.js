/*
* @Author: Cheuk
* @Date:   2017-08-20 21:51:30
* @Last Modified by:   Cheuk
* @Last Modified time: 2017-08-20 22:16:34
*/
'use strict';
import React, { Component } from 'react';

class LeftBtn extends React.Component{
	static propTypes = {
		b_show:React.PropTypes.bool
	}
	render(){
		let leftBtn = '';
		if(this.props.b_show){
			leftBtn = `<div>leftBtn</div>`;
		}
		return (
			<div>{leftBtn}</div>
		)
	};
}

class RightBtn extends React.Component{
	static propTypes = {
		b_show:React.PropTypes.bool
	}
	render(){
		let rightBtn = '';
		if(this.props.b_show){
			rightBtn = `<div>rightBtn</div>`;
		}
		return (
			<div>{rightBtn}</div>
		);
	};
}

class TopBar extends React.Component{
	static propTypes = {
		s_title:React.PropTypes.string.isRequired
	}
	render(){
		return (
			<div className="topBar">
				<LeftBtn b_show={true} />
				{this.props.s_title}
				<RightBtn />
			</div>
		);
	}
}

export default TopBar;