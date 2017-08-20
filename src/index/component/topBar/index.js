/*
* @Author: Cheuk
* @Date:   2017-08-20 21:51:30
* @Last Modified by:   Cheuk
* @Last Modified time: 2017-08-20 22:46:33
*/
'use strict';
import React, { Component } from 'react';
import './style.scss';

class LeftBtn extends React.Component{
	static propTypes = {
	}
	render(){
		return (
			<div>leftBtn</div>
		)
	};
}

class RightBtn extends React.Component{
	static propTypes = {
	}
	render(){
		return (
			<div>rightBtn</div>
		);
	};
}

class TopBar extends React.Component{
	static propTypes = {
		s_title:React.PropTypes.string.isRequired,
		b_left:React.PropTypes.bool,
	}
	render(){
		let leftBtn,rightBtn;
		if(this.props.b_left){
			leftBtn = (
				<LeftBtn />
			)
		}
		if(this.props.b_right){
			rightBtn = (
				<RightBtn />
			)
		}
		return (
			<div className="topBar">
				{leftBtn}
				<h1 className="topTitle">{this.props.s_title}</h1>
				{rightBtn}
			</div>
		);
	}
}

export default TopBar;