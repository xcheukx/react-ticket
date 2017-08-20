/*
* @Author: Cheuk
* @Date:   2017-08-20 21:25:39
* @Last Modified by:   Cheuk
* @Last Modified time: 2017-08-20 22:59:28
*/

"use strict";
import Storage from './storage';
let storage = new Storage();
require('./flexible');

let _eventList = null;
//枚举：安卓系统
const ENUM_SYS_ANDROID = 0;
//枚举：IOS系统
const ENUM_SYS_IOS = 1;
//枚举：PC端浏览器
const ENUM_BROWSER_PC = 0;
//枚举：微信浏览器
const ENUM_BROWSER_WX = 1;

const Base = {
    get b_wechat(){
        return this.getBrowserType() === ENUM_BROWSER_WX;
    },
    get b_pc(){
        return this.getBrowserType() === ENUM_BROWSER_PC;
    },
    reload(){
        //安卓微信端刷新方法
        if(this.b_wechat && this.getSysType() === ENUM_SYS_ANDROID){
            let symbol = /\?/.test(window.location.href) ? '&':'?';
            window.location.href = window.location.href + symbol + 'random_id=' + (new Date()).getTime();
        }else{
            window.location.reload();
        }
    },
    //获取页面名称
    getPageName(){
        let a_page = window.document.location.pathname.match(/(\/)([a-zA-Z0-9_]+)(\.)/);
        return a_page[2];
    },
    //打开页面
    openWin(s_name,o_pageParam,o_winParams){
        if(!s_name){
            return;
        }
        o_pageParam = o_pageParam || {}
        if(!/(http:\/\/|https:\/\/)/.test(s_name)){
            s_name = './'+s_name+'.html';
        }else{
            let o_params = this.getPageParams(null,s_name);
            o_pageParam = this.spliceObj(o_params,o_pageParam);
        }
        let s_urlParam = "";
        for (let s_key in o_pageParam) {
            if (o_pageParam.hasOwnProperty(s_key)) {
                let value = o_pageParam[s_key];
                s_urlParam += (s_key+"="+escape(value)+"&");
            }
        }
        s_urlParam = s_urlParam.replace(/&$/,"");
        let s_division = /\?/.test(s_name) ? '&' : '?';
        s_name = s_urlParam?(s_name+s_division+s_urlParam):s_name;
        window.location.href = s_name;
    },
    //关闭页面
    closeWin(s_winName){
        if(_eventList){
            //做上一页面往下一页面传参时，关闭页面清空本地数据
            let self = this;
            _eventList.map((s_name)=>{
                self.setLocalData(s_name,null);
            })
        }
        window.history.go(-1);
    },
    //发送事件
    sendEvt(s_name,o_params){
        this.setLocalData(s_name,o_params);
    },
    //给上一个页面传值，safari中返回上一页时页面不刷新，ios微信中页面刷新
    addEvt(s_name,f_callBack){
        //针对上一页面刷新
        let data = this.getLocalData(s_name);
        _eventList = _eventList || [];
        if(_eventList.indexOf(s_name) === -1){
            _eventList.push(s_name);
        }
        if(data){
            f_callBack && f_callBack(data);
        }

        //针对上一页面不刷新
        if(window.addEventListener){
            window.addEventListener("storage",handleStorage,false);
        }else if(window.attachEvent){
            window.attachEvent("onstorage",handleStorage);
        }
        let self = this;
        function handleStorage(e){
            e = e || window.event;
            if(e.key == s_name){
                let data = self.getLocalData(s_name);
                f_callBack && f_callBack(data);
            }
        }
    },
    //截取字符串长度,超出部分显示...，一个中文算两个字符
    getSpliceStr(s_str,i_len){
        s_str = s_str || "";
        if(i_len >= s_str.replace(/[^\x00-\xff]/g, 'xx').length){
            return s_str;
        }
        let s_newStr='',i_newLen = 0,i_index = 0,i_charCode = 0;
        while (i_newLen<i_len){
            s_newStr += s_str[i_index];
            i_charCode = s_str.charCodeAt(i_index);
            i_newLen += (i_charCode >= 0 && i_charCode <= 128)? 1 : 2;
            i_index++;
        }
        return s_newStr + '...';
    },
    //获取本地数据
    getLocalData(s_storageName,s_key){
        let o_data = storage.get(s_storageName);
        return (o_data && s_key) ? o_data[s_key] : o_data;
    },
    //设置本地数据
    setLocalData(s_storageName,u_value,s_key){
        let o_data = storage.get(s_storageName);
        if(s_key){
            o_data = o_data || {};
            o_data[s_key] = u_value;
        }else{
            o_data = u_value;
        }
        storage.set(s_storageName,o_data);
    },
    //清除本地数据
    removeLocalData(s_storageName){
        storage.remove(s_storageName);
    },
    //获取cookie值
    getCookie(s_key){
        let a_cookies = document.cookie.split('; ');
        let result = null;
        for(let i = 0,len = a_cookies.length;i<len;i++){
            let value = a_cookies[i].split('=');
            if(value[0] === s_key && value[1]){
                return result = value[1];
            }
        }
        return result;
    },
    //获取设备ID
    getDeviceId(){
        let s_str = storage.get('userDeviceId');
        if(!s_str){
            let s_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
            let i_maxPos = s_chars.length;
            s_str = '';
            for (let i = 0; i < 16; i++) {
                s_str += s_chars.charAt(Math.floor(Math.random() * i_maxPos));
            }
            storage.set('userDeviceId',s_str);
        }
        return s_str;
    },
    //获取系统类型：安卓为0，其他为1
    getSysType(){
        if((/android/gi).test(navigator.appVersion)){
            return ENUM_SYS_ANDROID;
        }
        return ENUM_SYS_IOS;
    },
    //获取浏览器类型：0:PC端，1:微信浏览器
    getBrowserType(){
        let ua = window.navigator.userAgent.toLowerCase();
        let browserList = ['','micromessenger','qq','ucbrowser','safari'];
        if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE|Android|Adr/.test(navigator.userAgent))){
            for (let i = 0; i < browserList.length; i++) {
                if(browserList[i] && (ua.indexOf(browserList[i]) !== -1)){
                    return i;
                }
            }
        }
        return 0;
    },
    //获取实际像素(设计稿像素转为实际像素)
    getPxReality(n_pxValue){
        return n_pxValue/32 * parseFloat(document.querySelector("html").style.fontSize);
    },
    jsonP(s_url) {
        var JSONP=document.createElement("script");
        JSONP.type="text/javascript";
        JSONP.src=s_url;
        document.getElementsByTagName("head")[0].appendChild(JSONP);
    },
}
export default Base;