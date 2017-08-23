/*
* @Author: 卓圳宝
* @Date:   2017-08-23 14:53:15
* @Last Modified by:   卓圳宝
* @Last Modified time: 2017-08-23 17:43:30
*/

'use strict';
import React, { Component } from 'react';
import ReactCarousel from 'nuka-carousel';
import omit from 'omit.js';

export default class Carousel extends React.Component{
  static defaultProps = {
    prefixCls: 'am-carousel',
    dots: true,
    arrows: false,
    autoplay: false,
    infinite: false,
    edgeEasing: 'linear',
    cellAlign: 'center',
    selectedIndex: 0,
    dotStyle: {},
    dotActiveStyle: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: this.props.selectedIndex,
    };
  }
  onChange = (index) => {
    this.setState({
      selectedIndex: index,
    }, () => {
      if (this.props.afterChange) {
        this.props.afterChange(index);
      }
    });
  }
  render() {
    const {
      className, prefixCls, dotStyle, dotActiveStyle, infinite,
      selectedIndex, beforeChange, dots, vertical,
    } = this.props;
    //omit(object,keys) 把oject里key等于keys的排除掉
    const restProps = omit(this.props, ['infinite', 'selectedIndex', 'beforeChange', 'afterChange', 'dots']);
    console.log('props:'+this.props);
    console.log('restPros:'+restPros);
    const newProps = {
      ...restProps,
      wrapAround: infinite,
      slideIndex: selectedIndex,
      beforeSlide: beforeChange,
    };

    let Decorators: any[] = [];
    const current = this.state.selectedIndex;
    if (dots) {
      Decorators = [{
        component: createReactClass({
          render() {
            const { slideCount, slidesToScroll } = this.props;
            const arr: number[] = [];
            for (let i = 0; i < slideCount; i += slidesToScroll) {
              arr.push(i);
            }
            const dotDom = arr.map(function(index) {
              const dotCls = classNames({
                `${prefixCls}-wrap-dot`: true,
                `${prefixCls}-wrap-dot-active`: index === current,
              });
              const _dotStyle = index === current ? dotActiveStyle : dotStyle;
              return (
                <div className={dotCls} key={index}>
                  <span style={_dotStyle} />
                </div>
              );
            });
            return (
              <div className={`${prefixCls}-wrap`}>
                {dotDom}
              </div>
            );
          },
        }),
        position: 'BottomCenter',
      }];
    }

    const wrapCls = classNames({
      className: className,
      prefixCls: true,
      `${prefixCls}-vertical`: vertical,
    });

    return (
      <ReactCarousel
        {...newProps}
        className={wrapCls}
        decorators={Decorators}
        afterSlide={this.onChange}
      />
    );
  }
}