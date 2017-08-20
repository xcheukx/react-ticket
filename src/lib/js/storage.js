/*
 * @Author: {daihanqiao}
 * @Date:   2015-12-25 16:40:55
 * @Last Modified by:   Cheuk
 * @Last Modified time: 2017-08-20 22:58:12
 * storage操作
 */

"use strict";
class Storage {
	set(key, value){
		var v = value;
		if(typeof v === 'object'){
		    v = JSON.stringify(v);
		    v = 'obj-'+ v;
		}else{
		    v = 'str-'+ v;
		}
		window.sessionStorage.setItem(key,v);
	}
	get(key){
	    var v = window.sessionStorage.getItem(key);
	    if(!v){return null;}
		if(v.indexOf('obj-') === 0){
	        v = v.slice(4);
	        return JSON.parse(v);
	    }else{
	        return v.slice(4);
	    }
	}
	remove(key){
		window.sessionStorage.removeItem(key);
	}
	clear(){
		window.sessionStorage.clear();
	}
}
export default Storage;
