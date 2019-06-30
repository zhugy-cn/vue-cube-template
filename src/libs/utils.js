// 生成唯一ID
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 判断是什么终端打开
export function isAlipayOrWechat() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.match(/Alipay/i) === 'alipay') {
    return 'ali';
  }
  if (userAgent.match(/MicroMessenger/i) === 'micromessenger') {
    return 'wx';
  }
  return 'default';
}

// 获取url的参数
export function getQueryString(url) {
  if (url) {
    url = url.substr(url.indexOf('?'));
  } else {
    url = location.search; // 获取url中"?"符后的字串
  }
  var theRequest = {};
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1);
    var strs = str.split('&');
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1]);
    }
  }
  return theRequest;
}

// 返回驼峰形式
// scroll-end => scrollEnd
export function camelize(str) {
  str = String(str);
  const camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, function(m, c) {
    return c ? c.toUpperCase() : '';
  });
}

// 节流
export function throttle(fn, wait) {
  let previous = 0;
  return function() {
    let now = new Date().getTime();
    if (now - previous > wait) {
      fn.apply(this, arguments);
      previous = now;
    }
  };
}

export function dealObjectValue(obj, arr) {
  let params = {};
  let whiteList = [null, undefined, '', NaN];
  if (arguments.length === 2) {
    if (typeof arr === 'string' && whiteList.includes(arr)) {
      var index = whiteList.indexOf(arr);
      whiteList.splice(index, 1);
    }
    if (Array.isArray(arr)) {
      arr.forEach((item, index) => {
        console.log(item);
        whiteList.includes(item) && whiteList.splice(index, 1);
      });
    }
  }
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params[key] = value;
      }
    } else {
      if (!whiteList.includes(value)) {
        params[key] = value;
      }
    }
  });
  return params;
}
