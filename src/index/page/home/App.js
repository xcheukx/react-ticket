import React, { Component } from 'react';
import TopBar from './../../component/topBar';
import Carousel from './../../component/carousel';
import Config from './../../../lib/js/config';
import './../../../lib/js/config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: ['', '', ''],
      initialHeight: 200,
    };
  }
  componentDidMount() {
    // 模拟img加载中
    setTimeout(() => {
      this.setState({
        slider: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <div className="App">
        <TopBar s_title={Config.websiteName} b_left={true} />
        <Carousel
          className="my-carousel"
          autoplay={false}
          infinite
          selectedIndex={1}
          swipeSpeed={35}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.slider.map(ii => (
            <a href="http://www.baidu.com" key={ii} style={hProp}>
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${ii || 'QcWDkUhvYIVEcvtosxMF'}.png`}
                alt="icon"
                onLoad={() => {
                  // fire window resize event to change height
                  // 触发window的resize事件去改变高度 （其他知识：IE-use 'window.fireEvent()' ）
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>
        <div className="con">

        </div>
        <div className="list">
			<div className="item">
				<div class="cover"><img src="" alt="" /></div>
			<div class="content">
			div class="title">测试</div>
			<div class="info">是多少</div>
			<div class="btn">选座购票</div>
            </div>
            <div class="rank">9.0</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
