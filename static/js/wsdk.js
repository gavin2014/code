window.Messenger=function(){function a(a,b){var c="";if(arguments.length<2?c="target error - target and name are both required":"object"!=typeof a?c="target error - target itself must be window object":"string"!=typeof b&&(c="target error - target name must be string type"),c)throw new Error(c);this.target=a,this.name=b}function b(a,b){this.targets={},this.name=a,this.listenFunc=[],c=b||c,"string"!=typeof c&&(c=c.toString()),this.msgTester=new RegExp("^"+c),this.initListen()}var c="[PROJECT_NAME]",d="postMessage"in window;return d?a.prototype.send=function(a){try{this.target.postMessage(c+a,"*")}catch(b){if(window.__WSDK__POSTMESSAGE__DEBUG__)if("function"==typeof window.__WSDK__POSTMESSAGE__DEBUG__)try{window.__WSDK__POSTMESSAGE__DEBUG__.call(null,b)}catch(b){}else alert("瀵逛笉璧�,褰撳墠娴忚鍣ㄤ笉鏀寔鑱婂ぉ,璇锋洿鎹㈡祻瑙堝櫒")}}:a.prototype.send=function(a){var b=window.navigator[c+this.name];if("function"!=typeof b)throw new Error("target callback function is not defined");b(c+a,window)},b.prototype.addTarget=function(b,c){var d=new a(b,c);this.targets[c]=d},b.prototype.initListen=function(){var a=this,b=function(b){if("object"==typeof b&&b.data&&(b=b.data),a.msgTester.test(b)){b=b.slice(c.length);for(var d=0;d<a.listenFunc.length;d++)a.listenFunc[d](b)}};d?"addEventListener"in document?window.addEventListener("message",b,!1):"attachEvent"in document&&window.attachEvent("onmessage",b):window.navigator[c+this.name]=b},b.prototype.listen=function(a){this.listenFunc.push(a)},b.prototype.clear=function(){this.listenFunc=[]},b.prototype.send=function(a){var b,c=this.targets;for(b in c)c.hasOwnProperty(b)&&c[b].send(a)},b}(),function(a){"use strict";function b(){try{return g in e&&e[g]}catch(a){return!1}}var c,d={},e=window,f=e.document,g="localStorage",h="script";if(d.disabled=!1,d.version="1.3.17",d.set=function(a,b){},d.get=function(a,b){},d.has=function(a){return void 0!==d.get(a)},d.remove=function(a){},d.clear=function(){},d.transact=function(a,b,c){null==c&&(c=b,b=null),null==b&&(b={});var e=d.get(a,b);c(e),d.set(a,e)},d.getAll=function(){},d.forEach=function(){},d.serialize=function(a){return JSON.stringify(a)},d.deserialize=function(a){if("string"!=typeof a)return void 0;try{return JSON.parse(a)}catch(b){return a||void 0}},b())c=e[g],d.set=function(a,b){return void 0===b?d.remove(a):(c.setItem(a,d.serialize(b)),b)},d.get=function(a,b){var e=d.deserialize(c.getItem(a));return void 0===e?b:e},d.remove=function(a){c.removeItem(a)},d.clear=function(){c.clear()},d.getAll=function(){var a={};return d.forEach(function(b,c){a[b]=c}),a},d.forEach=function(a){for(var b=0;b<c.length;b++){var e=c.key(b);a(e,d.get(e))}};else if(f.documentElement.addBehavior){var i,j;try{j=new ActiveXObject("htmlfile"),j.open(),j.write("<"+h+">document.w=window</"+h+'><iframe src="/favicon.ico"></iframe>'),j.close(),i=j.w.frames[0].document,c=i.createElement("div")}catch(k){c=f.createElement("div"),i=f.body}var l=function(a){return function(){var b=Array.prototype.slice.call(arguments,0);b.unshift(c),i.appendChild(c),c.addBehavior("#default#userData"),c.load(g);var e=a.apply(d,b);return i.removeChild(c),e}},m=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),n=function(a){return a.replace(/^d/,"___$&").replace(m,"___")};d.set=l(function(a,b,c){return b=n(b),void 0===c?d.remove(b):(a.setAttribute(b,d.serialize(c)),a.save(g),c)}),d.get=l(function(a,b,c){b=n(b);var e=d.deserialize(a.getAttribute(b));return void 0===e?c:e}),d.remove=l(function(a,b){b=n(b),a.removeAttribute(b),a.save(g)}),d.clear=l(function(a){var b=a.XMLDocument.documentElement.attributes;for(a.load(g);b.length;)a.removeAttribute(b[0].name);a.save(g)}),d.getAll=function(a){var b={};return d.forEach(function(a,c){b[a]=c}),b},d.forEach=l(function(a,b){for(var c,e=a.XMLDocument.documentElement.attributes,f=0;c=e[f];++f)b(c.name,d.deserialize(a.getAttribute(c.name)))})}try{var o="__storejs__";d.set(o,o),d.get(o)!=o&&(d.disabled=!0),d.remove(o)}catch(k){d.disabled=!0}return d.enabled=!d.disabled,a.store=d,d}(this),function(a){var b=location.protocol+"//",c=location.host,d="chat.im.alisoft.com",e=function(a){return a=a||d,{PROXY_URL:"https://"+a+"/proxy.htm",LOGIN_URL:"https://"+a+"/login/oauth",TB_LOGIN_URL:"https://chat.im.taobao.com/taobaoLogin/taobao_oauth",GET_USER_STATUS_URL:"https://amos.alicdn.com/mullidstatus.aw",UPLOAD_URL:"https://"+a+"/api/file/uploadFile.json",UPLOAD_SUCCESS_PROXY:"https://"+a+"/uploadproxy.htm",GET_APP_INFO_URL:"https://idmgr.ww.taobao.com/getprefix",GET_ANONYMOUS:"https://"+a+"/openim/getanonymous"}};a.WSDKCons={updateHost:function(a){a.host&&(this.URLS=e(a.host)),a.imageHost&&(this.IMAGE_HOST=a.imageHost)},IMAGE_HOST:"mobileim.im.alisoft.com",URLS:e(),PROJECT_NAME:"WSDK",CUSTOM_PAGE:"CUSTOM_PAGE",PROXY_PAGE:"PROXY_PAGE",UPLOAD_PAGE:"UPLOAD_PAGE",ERROR_PROXY_PAGE:"ERROR_PAGE",DEFAULT_LOGIN_TIMEOUT:5e3,DEFAULT_UPLOAD_TIMEOUT:3e4,CODE:{1e3:"SUCCESS",1001:"NOT_LOGIN",1002:"TIMEOUT",1003:"OTHER_ERROR",1004:"PARSE_ERROR",1005:"NET_ERROR",1006:"KICK_OFF",1007:"LOGIN_INFO_ERROR",1008:"ALREADY_LOGIN",1009:"NO_MESSAGE",1010:"PARAM_ERROR",1011:"LOGIN_TOO_QUICK_FROM_SERVER",1012:"LOGIN_ALREADY_FROM_SERVER",1013:"NOT_EXIST_USER",1014:"ERROR_PASSWORD",1015:"UIC ERROR"},MAX_IMAGE_SIZE:5242880,PROXY_ACTION_API:{recvMsg:b+c+"/msg/msg_recv",sendMsg:b+c+"/msg/send",roamMsg:b+c+"/msg/roaming",listen:b+c+"/msg/msg_listen",unreadMsg:b+c+"/msg/readtimes",recentContact:b+c+"/msg/recent",recentContactNew:b+c+"/msg/recentExt",setReadState:b+c+"/msg/setReadState",setOpenimReadState:b+c+"/msg/setOpenimReadState",getRealCid:b+"amos.alicdn.com/getRealCid.aw",tribe:b+c+"/msg/tribe",getUserStatus:b+"amos.alicdn.com/mullidstatus.aw",uploadToken:b+c+"/msg/getToken",loginOut:b+c+"/msg/ImReqLogoff",uploadImage:b+c+"/api/file/uploadFile.json"},UPLOAD_ERRORS:{"-1":"PARAM ERROR","-2":"EMPTY FILE","-3":"NOT SUPPORT","-4":"SIZE LIMIT","-5":"CAN NOT LOAD IMAGE","-6":"TIME OUT","-7":"UPLOAD FAIL","-8":"GET TOKEN ERROR"}}}(this),function(a){function b(a){return Object.prototype.toString.call(a)}window.console&&window.console.log||(window.console={log:function(){}});var c=a.WSDKUtil||(a.WSDKUtil={});Array.prototype.forEach||(Array.prototype.forEach=function(a){if(!a)return!1;for(var b=0,c=this.length;c>b;b++)a(this[b],b,this)}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var d=["String","Array","Object","Function","Number","Boolean","Date","RegExp"," Null","Undefined","NaN","Arguments"];d.forEach(function(a){c["is"+a]=function(c){return b(c)==="[object "+a+"]"}});var e=new RegExp("(http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?","gi"),f="https://g.alicdn.com/aliww/h5-openim/0.0.1/faces/",g={};c.Event={on:function(a,b,d,e){if("function"==typeof b){if(e){var f=a,h=b;b=function(){c.Event.off(f,b,d),h.apply(this,arguments)}}return a=a.split(/\s+/),a.forEach(function(a){var c=g[a]||(g[a]=[]);c.push({callback:b,context:d||this})}),this}},one:function(a,b,d){return c.Event.on(a,b,d,1)},off:function(a,b){return a||b?(a=a.split(/\s+/),a.forEach(function(a){var c=g[a];if(!c)return this;if(!b)return delete g[a],this;for(var d=0,e=c.length;e>d;d++)if(b===c[d].callback){c.splice(d,1);break}}),this):(g={},this)},fire:function(a,b){return arguments.length?(a=a.split(/\s+/),a.forEach(function(a){var c=g[a];return c?void c.forEach(function(a){a.callback.call(a.context,b)}):this}),this):this}},c.extend=function(a){for(var b,c=a||{},d=a?1:0,e=arguments.length;e>d;d++)for(b in arguments[d])if(arguments[d].hasOwnProperty(b)){var f=arguments[d][b];""!==f&&null!==f&&"undefined"!=typeof f&&(c[b]=f)}return c},c.checkParam=function(a,b){var c="param lost:",d=!1;if(a?b.forEach(function(b){"undefined"==typeof a[b]&&(c+=b+";",d=!0)}):(c+="param",d=!0),d)throw new Error(c);return a.uid&&(a.uid=a.uid.toLowerCase()),a.touid&&(a.touid=a.touid.toLowerCase()),!0},c.callbackHandler=function(a,b){b&&(b.success||b.error)&&c.Event.one(a,function(a){a&&1e3===a.code?b.success&&b.success.call(null,a):b.error&&b.error.call(null,a)})},c.getScript=function(b,c,d,e){var f,g=document.createElement("script"),h=document.getElementsByTagName("head")[0],i=function(){f&&clearTimeout(f),c&&c()};a.addEventListener?g.addEventListener("load",function(){i()},!1):g.onreadystatechange=function(){("loaded"==this.readyState||"complete"==this.readyState)&&(g.onreadystatechange=null,i())},g.src=b,h.insertBefore(g,h.firstChild),f=setTimeout(function(){d&&d()},e||3e3)},c.htmlEncode=function(a){return a=a.replace(/&/g,"&amp;"),a=a.replace(/>/g,"&gt;"),a=a.replace(/</g,"&lt;"),a=a.replace(/"/g,"&quot;"),a=a.replace(/'/g,"&#39;")};var h="wsdk_";c.jsonp=function(b,c,d,e){var f=+new Date,g=document.createElement("script"),i=document.getElementsByTagName("head")[0],j=h+f,k=null;e&&g.setAttribute("charset",e),g.type="text/javascript",g.id=j,a[j]=function(b){try{var d=document.getElementById(j);k&&clearTimeout(k),d&&d.parentNode.removeChild(d),delete a[j],c&&c.call(null,b)}catch(e){}},b+=(b.indexOf("?")>-1?"&":"?")+"callback="+j,i.insertBefore(g,i.firstChild),g.src=b,k=setTimeout(function(){d&&d.call(null,{code:1002,resultText:"TIMEOUT"})},4e3)},c.param=function(a){var b="";if(a){for(var c in a)b+="&"+c+"="+encodeURIComponent(a[c]);b=b.substr(1)}return b},c.unparam=function(a){var b={};if(a){a=a.split("&");for(var c=0,d=a.length;d>c;c++){var e=a[c].split("=");try{b[e[0]]=decodeURIComponent(e[1])}catch(f){b[e[0]]=e[1]}}}return b},c.getRealMsgAndType=function(a,b,d){var e=a[d],f=[];if(4!=b)if(c.isArray(e)&&e.length){var g="",h="";e.forEach(function(a,d){g="","P"===a[0]||0===a[1].indexOf("http://interface.im")||0===a[1].indexOf("https://interface.im")||0===a[1].indexOf("http://mobileim.im")||0===a[1].indexOf("https://mobileim.etao")?(g=a[1],b=c.unparam(g.split("?")[1]).type||1,g=/^https:/.test(g)?g.replace("https://interface.im.taobao","https://mobileim.etao"):g.replace("http://interface.im.taobao","http://mobileim.etao"),b=parseInt(b)):"T"===a[0]&&(g=a[1]),e[d+1]&&"Z"===e[d+1][0]&&(h=e[d+1][1]),g.trim()&&f.unshift({type:b,msg:g,extInfo:h})})}else f.push({type:b,msg:e});else b=66,f.push({type:b,msg:e});return f},c.urlReplacer=function(a){return a.replace(e,function(a){return 0==a.indexOf(f)?a:'<a href="'+a+'" target="_blank">'+a+"</a>"})};var i=36e5,j=24*i,k=(new Date).getTimezoneOffset()/60;c.dateFormatter=function(a){var b,c,d,e,f,g,h=new Date(a),l=new Date,m=+h,n=+l-(+l-k*i)%j;return b=h.getFullYear(),c=this.numFormatter(h.getMonth()+1),d=this.numFormatter(h.getDate()),e=this.numFormatter(h.getHours()),f=this.numFormatter(h.getMinutes()),g=this.numFormatter(h.getSeconds()),l.getFullYear()==b?m>=n&&n+j>m?"浠婂ぉ "+e+":"+f+":"+g:c+"-"+d+" "+e+":"+f+":"+g:b+"-"+c+"-"+d+" "+e+":"+f+":"+g},c.numFormatter=function(a){return a=parseInt(a),a>9?a:"0"+a},c.addClass=function(a,b){return a&&b?(b=b.trim(),a.classList?b.split(/\s+/).forEach(function(b){a.classList.add(b)}):this.hasClass(a,b)||(a.className+=" "+b),this):this},c.ajax=function(a){var b=null;try{b=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){try{b=new XMLHttpRequest,b.overrideMimeType&&b.overrideMimeType("text/xml")}catch(c){alert("鎮ㄧ殑娴忚鍣ㄤ笉鏀寔Ajax")}}}var d=(a.method||"GET").toUpperCase(),e=Math.random();if("object"==typeof a.data){var f="";for(var g in a.data)f+=g+"="+a.data[g]+"&";a.data=f.replace(/&$/,"")}"GET"==d?(a.data?b.open("GET",a.url+"?"+a.data,!0):b.open("GET",a.url+"?t="+e,!0),b.send()):"POST"==d&&(b.open("POST",a.url,!0),b.setRequestHeader("Content-type","application/x-www-form-urlencoded"),b.send(a.data)),b.onreadystatechange=function(){4==b.readyState&&(200==b.status?a.success&&a.success(b.responseText):a.error&&a.error(b.status))}}}(this),function(a){function b(a){this.init(a)}var c=a.WSDKUtil,d=a.WSDKCons,e=c.Event,f=d.MAX_IMAGE_SIZE,g=d.DEFAULT_UPLOAD_TIMEOUT,h={wx_web_token:"",user_id:"",mimetype:"",base64ed_file_data:"",type:1,msgType:0,receiver_id:"",message_id:"",width:"",height:"",mediaSize:""},i=d.UPLOAD_ERRORS;!a.WSDKPlgs&&(a.WSDKPlgs={}),b.prototype={constructor:b,__IsTokenFetching:!1,__Token:"",init:function(a){this.Base=a.Base,a.isDaily,this.messengerSender=a.Base.messengerSender,this.Messenger=a.__Messenger,this.__events()},upload:function(a){c.checkParam(a,["base64Str","ext","success"]),!a.error&&(a.error=function(){}),(!a.maxSize||a.maxSize>f)&&(a.maxSize=f),!a.type&&(a.type=1),this.param=a,this.upBase64(a)},__events:function(){var a=this;e.on("GET_UPLOAD_TOKEN",function(b){a.__IsTokenFetching=!1,1e3===b.code?(a.__Token=b.data.token,a.onGetUpTokenSuccess(),setTimeout(function(){a.__Token=""},parseInt(b.data.expire)/3*2*1e3)):a.onGetUpTokenError()}),e.on("UPLOAD_IMAGE",function(b){a.timeout&&clearTimeout(a.timeout),a.timoeut=null,1e3==b.code?a.uploadSuccess(b):a.uploadError(b)})},getUpToken:function(){this.__IsTokenFetching||(this.__IsTokenFetching=!0,this.__Token?this.onGetUpTokenSuccess():this.messengerSender.call(this.Base,{action:"GET_UPLOAD_TOKEN"},!0))},upBase64:function(){var a=this.param.base64Str;return a=a.substring(a.indexOf(",")+1),this.param.base64StrForUpload=a,3*a.length/4>this.param.maxSize?this.param.error({code:-4,errorText:i[-4]}):void this.getUpToken()},onGetUpTokenSuccess:function(){this.__IsTokenFetching=!1,h.wx_web_token=this.__Token,h.base64ed_file_data=this.param.base64StrForUpload,h.mimetype=this.param.ext,h.user_id=this.Base.LoginInfo.prefix+this.Base.LoginInfo.uid,h.type=this.param.type,h.timeout=this.param.timeout||g,this.messengerSender.call(this.Base,{action:"UPLOAD_IMAGE",data:h},!0)},uploadSuccess:function(a){this.param.success&&this.param.success({code:1e3,resultCode:"SUCCESS",data:{url:a.data.url,base64Str:this.param.base64Str}}),this.clear()},uploadError:function(a){this.param.error&&this.param.error({code:-7,errorText:i[-7]+" "+a.resultText}),this.__Token="",this.clear()},clear:function(){this.form&&this.form.parentNode.removeChild(this.form),this.frame&&this.frame.parentNode.removeChild(this.frame),this.form=null,this.frame=null},onGetUpTokenError:function(){this.param.error&&this.param.error({code:-8,errorText:i[-8]})}},a.WSDKPlgs.Uploader=b}(this),function(a){function b(a){this.init(a)}var c=a.WSDKUtil,d=a.WSDKCons,e=d.UPLOAD_ERRORS;!a.WSDKPlgs&&(a.WSDKPlgs={}),b.prototype={constructor:b,init:function(a){this.Uploader=a.Plugin.Uploader},upload:function(a){c.checkParam(a,["success"]),!a.error&&(a.error=function(){});var b=a.error;this.param=a,a.target?this.upTarget(a):a.base64Img&&a.ext?this.upBase64(a):b({code:-1,errorText:e[-1]})},upTarget:function(){var a=this.param,b=a.target.files,c=a.target.value;if(!c)return a.error({code:-2,errorText:e[-3]});if(!this.isSupport()||!b||!b[0])return a.error({code:-3,errorText:e[-3]});var d=b[0],f=d.size,g=c.split("."),h=g[g.length-1];if(f>a.maxSize)return a.error({code:-4,errorText:e[-4]});var i=this;this.getImageWH(d,function(a){var b=i.getImageBase64(a,h);i.param.base64Img=b,i.param.ext=h,i.upBase64()},function(){a.error({code:-5,errorText:e[-5]})})},upBase64:function(){var a=this,b=this.param.base64Img;return 3*b.length/4>this.param.maxSize?this.param.error({code:-4,errorText:e[-4]}):void this.Uploader.upload({base64Str:b,ext:this.param.ext,type:1,timeout:this.param.timeout,maxSize:this.param.maxSize,success:function(b){a.param.success&&a.param.success({code:1e3,resultCode:"SUCCESS",data:{url:b.data.url,base64Str:b.data.base64Str}})},error:function(b){a.param.error&&a.param.error(b)}})},getImageWH:function(b,c,d){var f=this;try{var g=a.URL||a.webkitURL,h=g.createObjectURL(b),i=new Image;i.onload=function(){c&&c(this),i.onload=i.onerror=null},i.onerror=function(){d&&d(),i.onload=i.onerror=null},i.src=h}catch(j){return f.param.error({code:-3,errorText:e[-3]})}},getType:function(a){return a=a.toLowerCase(),"png"==a?"image/png":"image/jpeg"},getImageBase64:function(a,b){var c=this,d="";try{var f=document.createElement("canvas"),g=f.getContext("2d");f.width=a.width,f.height=a.height,g.drawImage(a,0,0,a.width,a.height),d=f.toDataURL(this.getType(b),1)}catch(h){c.param.error({code:-3,errorText:e[-3]})}return d},isSupport:function(){return!!document.createElement("canvas").getContext}},a.WSDKPlgs.ImgUp=b}(this),function(a){function b(){this.init()}function c(a){return a=a.replace(/\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi,"@#[$1]@#"),a.split("@#")}function d(a){return/\[([A-Z\u4e00-\u9fa5]{1,20}?)\]/gi.test(a)}function e(a){for(var b=a.replace("[","").replace("]",""),c=null,d=0,e=j.length;e>d;d++)if(j[d].title==b){c=j[d];break}return c}function f(a){var b=e(a);return b.code}function g(a,b,c){var d=b*c,e=[],f=0,g=0;return a.forEach(function(a){f==d&&(f=0),0==f&&(e[g++]=[]),d>f&&(f++,e[g-1].push(a))}),e}var h=a.WSDKUtil,i=["鍔犳补","鑹叉儏鐙�","濮斿眻","鎮叉常","椋炴満","鐢熺梾","涓嶄細鍚�","鐥涘摥","鎬€鐤�","鑺辩棿","鍋风瑧","鎻℃墜","鐜懓","浜彈","瀵逛笉璧�","鎰熷啋","鍑勫噳","鍥颁簡","灏村艾","鐢熸皵","娈嬭姳","鐢佃瘽","瀹崇緸","娴佸彛姘�","鐨辩湁","榧撴帉","杩锋儜","蹇т激","鏃堕挓","澶х瑧","閭伓","鍗曟寫","澶у摥","闅愬舰浜�","CS","I鏈嶄簡U","娆犳墎","鐐稿脊","鎯婂０灏栧彨","寰瑧","閽�","璐墿","濂界疮","鍢�","鎴愪氦","绾㈠攪","鎷涜储鐚�","鎶辨姳","濂戒富鎰�","寰堟櫄浜�","鏀堕偖浠�","涓炬澂搴嗙","鐤戦棶","鎯婅","闇查娇绗�","澶╀娇","鍛煎彨","闂槾","灏忔牱","璺宠垶","鏃犲","鏌ユ壘","澶ф€�","绠楀笎","鐖辨厱","鍐嶈","鎭枩鍙戣储","寮�","鑳滃埄","璐㈣糠","鎬濊€�","鏅�","娴佹睏","鐖卞績","鎽囧ご","鑳�","娌￠挶浜�","鎯婃剷","灏忎簩","鏀粯瀹�","閯欒浣�","鍚愯垖澶�","楝艰劯","璐㈢","绛夊緟","鍌荤瑧","瀛︿範闆烽攱","蹇冪","鍚�","婕備寒MM","浜蹭翰","椋炲惢","甯呭摜","绀肩墿","鏃犺亰","鍛嗚嫢鏈ㄩ浮","鍐嶈","鑰佸ぇ","瀹夋叞"],j=[{title:"鍔犳补",img:"10",code:"/:012"},{title:"鑹叉儏鐙�",img:"26",code:"/:015"},{title:"濮斿眻",img:"47",code:"/:>_<"},{title:"鎮叉常",img:"48",code:"/:018"},{title:"椋炴満",img:"97",code:"/:plane"},{title:"鐢熺梾",img:"56",code:"/:>M<"},{title:"涓嶄細鍚�",img:"40",code:"/:816"},{title:"鐥涘摥",img:"50",code:"/:020"},{title:"鎬€鐤�",img:"33",code:"/:817"},{title:"鑺辩棿",img:"14",code:"/:814"},{title:"鍋风瑧",img:"3",code:"/:815"},{title:"鎻℃墜",img:"82",code:"/:)-("},{title:"鐜懓",img:"84",code:"/:-F"},{title:"浜彈",img:"25",code:"/:818"},{title:"瀵逛笉璧�",img:"52",code:"/:819"},{title:"鎰熷啋",img:"37",code:"/:028"},{title:"鍑勫噳",img:"43",code:"/:027"},{title:"鍥颁簡",img:"44",code:"/:(Zz...)"},{title:"灏村艾",img:"38",code:"/:026"},{title:"鐢熸皵",img:"65",code:"/:>W<"},{title:"娈嬭姳",img:"85",code:"/:-W"},{title:"鐢佃瘽",img:"92",code:"/:~B"},{title:"瀹崇緸",img:"1",code:"/:^$^"},{title:"娴佸彛姘�",img:"24",code:"/:813"},{title:"鐨辩湁",img:"54",code:"/:812"},{title:"榧撴帉",img:"81",code:"/:8*8"},{title:"杩锋儜",img:"29",code:"/:811"},{title:"蹇т激",img:"46",code:"/:810"},{title:"鏃堕挓",img:"94",code:"/:clock"},{title:"澶х瑧",img:"5",code:"/:^O^"},{title:"閭伓",img:"71",code:"/:036"},{title:"鍗曟寫",img:"72",code:"/:039"},{title:"澶у摥",img:"49",code:"/:>O<"},{title:"闅愬舰浜�",img:"74",code:"/:046"},{title:"CS",img:"73",code:"/:045"},{title:"I鏈嶄簡U",img:"51",code:"/:044"},{title:"娆犳墎",img:"62",code:"/:043"},{title:"鐐稿脊",img:"75",code:"/:048"},{title:"鎯婂０灏栧彨",img:"76",code:"/:047"},{title:"寰瑧",img:"0",code:"/:^_^"},{title:"閽�",img:"88",code:"/:$"},{title:"璐墿",img:"89",code:"/:%"},{title:"濂界疮",img:"55",code:'/:"'},{title:"鍢�",img:"34",code:"/:!"},{title:"鎴愪氦",img:"80",code:"/:(OK)"},{title:"绾㈠攪",img:"83",code:"/:lip"},{title:"鎷涜储鐚�",img:"79",code:"/:052"},{title:"鎶辨姳",img:"9",code:"/:H"},{title:"濂戒富鎰�",img:"20",code:"/:071"},{title:"寰堟櫄浜�",img:"96",code:"/:C"},{title:"鏀堕偖浠�",img:"91",code:"/:@"},{title:"涓炬澂搴嗙",img:"93",code:"/:U*U"},{title:"鐤戦棶",img:"30",code:"/:?"},{title:"鎯婅",img:"59",code:"/:069"},{title:"闇查娇绗�",img:"15",code:"/:^W^"},{title:"澶╀娇",img:"22",code:"/:065"},{title:"鍛煎彨",img:"17",code:"/:066"},{title:"闂槾",img:"61",code:"/:067"},{title:"灏忔牱",img:"35",code:"/:068"},{title:"璺宠垶",img:"6",code:"/:081"},{title:"鏃犲",img:"41",code:'/:\'""'},{title:"鏌ユ壘",img:"16",code:"/:080"},{title:"澶ф€�",img:"64",code:"/:808"},{title:"绠楀笎",img:"18",code:"/:807"},{title:"鐖辨厱",img:"4",code:"/:809"},{title:"鍐嶈",img:"23",code:"/:804"},{title:"鎭枩鍙戣储",img:"68",code:"/:803"},{title:"寮�",img:"12",code:"/:b"},{title:"鑳滃埄",img:"11",code:"/:806"},{title:"璐㈣糠",img:"19",code:"/:805"},{title:"鎬濊€�",img:"28",code:"/:801"},{title:"鏅�",img:"45",code:"/:*&*"},{title:"娴佹睏",img:"42",code:"/:802"},{title:"鐖卞績",img:"86",code:"/:Y"},{title:"鎽囧ご",img:"36",code:"/:079"},{title:"鑳�",img:"58",code:"/:076"},{title:"娌￠挶浜�",img:"31",code:"/:077"},{title:"鑰佸ぇ",img:"70",code:"/:O=O"},{title:"灏忎簩",img:"69",code:"/:074"},{title:"鏀粯瀹�",img:"98",code:"/:075"},{title:"閯欒浣�",img:"63",code:"/:P"},{title:"鍚愯垖澶�",img:"2",code:"/:Q"},{title:"楝艰劯",img:"21",code:"/:072"},{title:"璐㈢",img:"66",code:"/:073"},{title:"绛夊緟",img:"95",code:"/:R"},{title:"鍌荤瑧",img:"39",code:"/:007"},{title:"瀛︿範闆烽攱",img:"67",code:"/:008"},{title:"蹇冪",img:"87",code:"/:qp"},{title:"鍚�",img:"57",code:"/:>@<"},{title:"婕備寒MM",img:"77",code:"/:girl"},{title:"浜蹭翰",img:"13",code:"/:^x^"},{title:"椋炲惢",img:"7",code:"/:087"},{title:"甯呭摜",img:"78",code:"/:man"},{title:"绀肩墿",img:"90",code:"/:(&)"},{title:"鏃犺亰",img:"32",code:"/:083"},{title:"鍛嗚嫢鏈ㄩ浮",img:"27",code:"/:084"},{title:"鍐嶈",img:"53",code:"/:085"},{title:"鎯婃剷",img:"60",code:"/:O"},{title:"瀹夋叞",img:"8",code:"/:086"}],k="https://g.alicdn.com/aliww/h5-openim/0.0.1/faces/",l="https://gw.alicdn.com/tps/TB1.eFIKXXXXXbUXFXXXXXXXXXX-320-675.jpg",m="https://img.alicdn.com/tps/TB1O2CKHVXXXXbMXVXXXXXXXXXX.jpg",n={trigger:!0,emots:i,emotsImg:l,emotSize:45,row:7,col:3,customStyle:!1,onEmotClick:function(){}};!a.WSDKPlgs&&(a.WSDKPlgs={}),b.prototype={constructor:b,emotTitles:i,emotW640:m,emotW320:l,init:function(){},render:function(b){h.checkParam(b,["container"]);var c=h.extend({},n,b),d="",e="",f=0,i=c.row*c.col,j=c.row*c.emotSize,k=c.emotSize*c.col,l=c.emotsImg==m?2:0,o=document.createElement("div"),p=g(c.emots,c.col,c.row);if(p.forEach(function(a,b){emotWrapItemStyle=c.customStyle?"":'style="display:'+(0==b?"block":"none")+";background:url("+c.emotsImg+") no-repeat 0 -"+b*(k-l)+"px;width:"+j+"px;height:"+k+"px;"+(l?"background-size:100%;":"")+'"',emotItemStyle=c.customStyle?"":'style="display:block;float:left;cursor:pointer;width:'+c.emotSize+"px;height:"+c.emotSize+'px;"',d+='<div class="wsdk-emot-wrap" '+emotWrapItemStyle+">",c.trigger&&(e+='<i class="wsdk-emot-trigger-item'+(0==b?" wsdk-active":"")+'" data-index="'+b+'"></i>'),a.forEach(function(a,c){d+='<span title="'+a+'" data-index="'+(c+b*i)+'" '+emotItemStyle+"></span>"}),d+="</div>"}),o.innerHTML=d,c.customStyle||(o.style.width=j+"px",o.style.height=k+"px",o.style.overflow="hidden"),o.className="wsdk-emot-con",c.container.appendChild(o),c.trigger){var q=document.createElement("div");q.innerHTML=e,q.className="wsdk-emot-trigger",c.container.appendChild(q);var r=q.getElementsByTagName("i")}var s=o.getElementsByTagName("div"),t=function(b){b=b||a.event;var d=b.target||b.srcElement;d&&"SPAN"==d.tagName.toUpperCase()&&c.onEmotClick("["+d.title+"]")},u=function(b){b=b||a.event;var c=b.target||b.srcElement;if(c&&"I"==c.tagName.toUpperCase()){var d=c.getAttribute("data-index");if(d==f)return;s[f].style.display="none",s[d].style.display="block",r[f].className="wsdk-emot-trigger-item",r[d].className="wsdk-emot-trigger-item wsdk-active",f=d}};a.addEventListener?(o.addEventListener("click",t,!1),c.trigger&&q.addEventListener("mouseover",u,!1)):a.attachEvent&&(o.attachEvent("onclick",t),c.trigger&&q.attachEvent("onmouseover",u))},encode:function(a){var b,e="";return a=c(a),a.forEach(function(a){e+=d(a)&&(b=f(a))?b:a}),e},htmlEncode:function(a){var b,e="";return a=c(a),a.forEach(function(a){e+=d(a)&&(b=f(a))?b:h.htmlEncode(a)}),e},htmlDecode:function(a){var b,f,g="";return a=c(a),a.forEach(function(a){d(a)&&(b=e(a))?(f=parseInt(b.img)+1,f=10>f?"0"+f:f,f="s0"+f+".png",g+='<img class="wsdk-emot" src="'+k+f+'" alt="'+b.title+'" />'):g+=h.htmlEncode(a)}),g},decode:function(){var a="",b=j.length;return j.forEach(function(b){a+="|"+b.code.substring(2)}),a=a.substring(1),a=a.replace(/([\^?()\.\*\$])/g,"\\$1"),a=new RegExp("/:("+a+")","g"),function(c){return c&&(c=c.replace(a,function(a){for(var c=!1,d="",e=0;b>e;e++)if(j[e].code==a){c=j[e].img,d=j[e].title;break}return c&&(a="["+d+"]"),a})),c=this.htmlDecode(c)}}(),isEmot:f,isEmotLike:d,splitByEmot:c},a.WSDKPlgs.Emot=b}(this),function(a){function b(a,b){this.init(a,b)}function c(a,b,c,h){d(b.frameObj);var k,m={__ProxyFrame:null,__ProxyForm:null,__ProxyFrameLoadTimeOut:null,__ProxyFrameCallback:function(){c&&(c.__IsProxyFrameLoad=!0,c.__setLoginInfo.call(c))}},n=b.timeout;delete b.timeout,delete b.frameObj;try{k=document.createElement('<iframe name="WSDK_FRAME">')}catch(o){k=document.createElement("iframe")}if(k.style.display="none",k.name="WSDK_FRAME",document.body.appendChild(k),m.__ProxyFrameLoadTimeOut=setTimeout(function(){m.__ProxyFrameLoadTimeOut=null,i.fire("LOGIN",{code:1002,resultText:j[1002]})},n),k.attachEvent?k.attachEvent("onload",m.__ProxyFrameCallback):k.onload=m.__ProxyFrameCallback,m.__ProxyFrame=k,k)try{c.context.__Messenger.addTarget(k.contentWindow,l)}catch(p){}c.context.__Messenger.listen(function(a){e(a)});var q;return h&&"POST"!=h.toUpperCase()?(a+="?"+g.param(b),k.src=a):q=f(a,b),m.__ProxyForm=q,m}function d(a){a&&(a.__ProxyFrame&&(a.__ProxyFrame.detachEvent?a.__ProxyFrame.detachEvent("onload",a.__ProxyFrameCallback):a.__ProxyFrame.onload=null,a.__ProxyFrame.parentNode.removeChild(a.__ProxyFrame),clearTimeout(a.__ProxyFrameLoadTimeOut),a.__ProxyFrameLoadTimeOut=null,a.__ProxyFrame=null),a.__ProxyForm&&(a.__ProxyForm.parentNode.removeChild(a.__ProxyForm),a.__ProxyForm=null))}function e(a){a=JSON.parse(a),i.fire(a.action,a.result),a.result&&1e3==a.result.code&&("CHAT_START_RECEIVE_MSG"===a.action?(i.fire("MSG_RECEIVED",a.result),16908304==a.result.data.cmdid&&i.fire("CHAT.MSG_RECEIVED",a.result)):"START_RECEIVE_ALL_MSG"===a.action&&(i.fire("MSG_RECEIVED",a.result),16908304==a.result.data.cmdid?i.fire("CHAT.MSG_RECEIVED",a.result):16908545==a.result.data.cmdid&&i.fire("TRIBE.MSG_RECEIVED",a.result)))}function f(a,b){var c=document.createElement("form"),d="";for(var e in b)d+='<input type="hidden" name="'+e+'" value="'+b[e]+'" />';return c.action=a,c.target="WSDK_FRAME",c.method="post",c.innerHTML=d,c.style.display="none",document.body.appendChild(c),c.submit(),c}var g=a.WSDKUtil,h=a.WSDKCons,i=g.Event,j=h.CODE,k=h.DEFAULT_LOGIN_TIMEOUT,l=h.PROXY_PAGE;!a.WSDKMods&&(a.WSDKMods={}),b.prototype={constructor:b,init:function(a,b){b&&b.debug&&"daily"===b.env&&(a.isDaily=!0),this.context=a,this.__events()},__events:function(){var a=this;i.on("SET_LOGIN_INFO",function(b){a.frameObj&&a.frameObj.__ProxyFrameLoadTimeOut&&(clearTimeout(a.frameObj.__ProxyFrameLoadTimeOut),a.__IsLogin=!0,a.LoginInfo.prefix=b.data.prefix,a.LoginInfo.toPrefix=b.data.toPrefix,a.context.LoginInfo=a.LoginInfo,i.fire("LOGIN",{code:1e3,resultText:j[1e3]}))}),i.on("KICK_OFF_INSIDE",function(){a.__IsLogin=!1})},login:function(a){if(this.context&&this.context.__Messenger&&this.context.__Messenger.clear(),a.anonymous){var b=this,c=!1;if(g.checkParam(a,["anonymous","appkey"]),store&&store.get("anonymous"))try{var d=JSON.parse(store.get("anonymous"));d.appkey===a.appkey&&d.uid&&d.pwd&&(a.uid=d.uid.substring(8),a.credential=d.pwd,a.tokenFlag=67,c=!0,b._login(a))}catch(e){}if(c)return;g.ajax({url:h.URLS.GET_ANONYMOUS,method:"POST",data:{appkey:a.appkey,deviceinfo:"{}"},success:function(c){if(!c)return void(a.error&&a.error({code:1003,resultText:"鑾峰彇鍖垮悕璐﹀彿澶辫触"}));try{if(c=JSON.parse(c),c.userid&&c.password){try{store.set("anonymous",JSON.stringify({appkey:a.appkey,uid:c.userid,pwd:c.password}))}catch(d){}a.uid=c.userid.substring(8),a.credential=c.password,a.tokenFlag=67,b._login(a)}else a.error&&a.error({code:1003,resultText:"鑾峰彇鍖垮悕璐﹀彿澶辫触"})}catch(d){a.error&&a.error({code:1004,resultText:j[1004]})}},error:function(b){console.log(b),a.error&&a.error({code:1005,resultText:j[1005]})}})}else g.checkParam(a,["uid","appkey","credential"]),this._login(a)},_login:function(a){g.checkParam(a,["uid","appkey","credential"]);var b=this,d=a.uid,e=a.appkey,f=a.toAppkey||e,l=a.credential,m=void 0===a.tokenFlag?64:a.tokenFlag,n=a.timeout||k,o=a.error||function(){};if(a.error=function(a){b.__IsLogin=!1,clearTimeout(b.frameObj&&b.frameObj.__ProxyFrameLoadTimeOut),o(a)},g.callbackHandler("LOGIN",a),this.__IsLogin)return void i.fire("LOGIN",{code:1008,resultText:j[1008]});this.LoginInfo={uid:d,appkey:e,toAppkey:f,credential:l,tokenFlag:m};var p={cross:!0,tokenFlag:m,uid:d,credential:l,appkey:e,toAppkey:f,ver:WSDK.version,lpath:"yw",timeout:n,frameObj:b.frameObj},q="POST";try{b.frameObj=c(h.URLS.LOGIN_URL,p,b,q)}catch(r){}return this},logout:function(a){!a&&(a={});var b=this,c=a.success;return a.success=function(a){b.__IsLogin=!1,b.destroy(),c&&c(a)},g.callbackHandler("LOGOUT",a),this.messengerSender({action:"LOGOUT",result:{}},!0),this},messengerSender:function(a,b){b&&!this.__IsLogin?i.fire(a.action,{code:1001,resultText:j[1001]}):this.context.__Messenger.targets[l].send(JSON.stringify(a))},getUnreadMsgCount:function(a){return g.callbackHandler("GET_UNREAD_MSG_COUNT",a),this.messengerSender({action:"GET_UNREAD_MSG_COUNT",result:{count:a&&a.count||30}},!0),this},getRecentContact:function(a){return g.callbackHandler("GET_RECENT_CONTACT_NEW",a),this.messengerSender({action:"GET_RECENT_CONTACT_NEW",result:{count:a&&a.count||30}},!0),this},startListenAllMsg:function(){if(!this.__IsLogin)throw new Error("鏈櫥褰�");var a=this;return this.__IsStartListen||(this.__IsStartListen=!0,this.messengerSender({action:"START_RECEIVE_ALL_MSG"},!0),i.one("STOP_RECEIVE_ALL_MSG",function(){a.__IsStartListen=!1})),this},stopListenAllMsg:function(){return this.__IsStartListen&&(this.__IsStartListen=!1,this.messengerSender({action:"STOP_RECEIVE_ALL_MSG"})),this},getNick:function(a){return a&&a.length>8&&(0==a.indexOf(this.LoginInfo.prefix)||0==a.indexOf(this.LoginInfo.toPrefix))?a.substring(8):a},destroy:function(){d(this.frameObj),this.stopListenAllMsg(),i.fire("$destroy"),this.__IsLogin=!1},getPrefixByAppkey:function(a){return g.checkParam(a,["appkey"]),g.jsonp(h.URLS.GET_APP_INFO_URL+"?appkey="+a.appkey,function(b){b.prefix?a.success&&a.success({code:1e3,data:{prefix:b.prefix}}):a.error&&a.error({code:1003,resultText:b.errmsg})},function(b){a.error&&a.error(b)}),this},__setLoginInfo:function(){this.messengerSender({action:"SET_LOGIN_INFO",result:{appkey:this.LoginInfo.appkey,uid:this.LoginInfo.uid,IMAGE_HOST:h.IMAGE_HOST}})}},a.WSDKMods.Base=b}(this),function(a){function b(a){this.init(a)}function c(b,c){a.online&&(d=a.online),a.online=[],e.getScript(g.URLS.GET_USER_STATUS_URL+"?"+e.param({uids:b,charset:c.charset||"utf-8",beginnum:0}),function(){c.success&&c.success({code:1e3,resultText:h[1e3],data:{status:a.online}}),d&&(a.online=d),d=null},function(){c.error&&c.error({code:1005,resultText:h[1005]})})}var d,e=a.WSDKUtil,f=e.Event,g=a.WSDKCons,h=g.CODE;!a.WSDKMods&&(a.WSDKMods={}),b.prototype={constructor:b,init:function(a){this.Base=a.Base,this.messengerSender=a.Base.messengerSender,this.__events()},__events:function(){var a=this;f.on("$destroy",function(){a.stopListenMsg()})},sendMsg:function(a){return e.checkParam(a,["touid","msg"]),e.callbackHandler("CHAT_SEND_MSG",a),this.messengerSender.call(this.Base,{action:"CHAT_SEND_MSG",result:{touid:a.touid,msg:a.msg,msgId:a.msgId,msgType:a.msgType||0,hasPrefix:!!a.hasPrefix,extinfo:a.extinfo||{}}},!0),this},sendCustomMsg:function(a){return e.checkParam(a,["touid","msg"]),e.callbackHandler("CHAT_SEND_CUSTOM_MSG",a),this.messengerSender.call(this.Base,{action:"CHAT_SEND_CUSTOM_MSG",result:{touid:a.touid,msg:a.msg,msgId:a.msgId,summary:a.summary,hasPrefix:!!a.hasPrefix}},!0),this},sendMsgToCustomService:function(a){return e.checkParam(a,["touid","msg"]),e.callbackHandler("CHAT_SEND_MSG_TO_CUSTOM_SERVICE",a),this.messengerSender.call(this.Base,{action:"CHAT_SEND_MSG_TO_CUSTOM_SERVICE",result:{touid:a.touid,msg:a.msg,msgId:a.msgId,msgType:a.msgType,nocache:a.nocache,groupid:a.groupid,hasPrefix:!!a.hasPrefix}},!0),this},sendCustomData:function(a){return e.checkParam(a,["touid","customData"]),"object"==typeof a.customData&&(a.customData=JSON.stringify(a.customData)),e.callbackHandler("CHAT_SEND_CUSTOM_DATA",a),this.messengerSender.call(this.Base,{action:"CHAT_SEND_CUSTOM_DATA",result:{touid:a.touid,msg:a.customData,nocache:a.nocache,groupid:a.groupid,hasPrefix:!!a.hasPrefix,sendMsgToCustomService:a.sendMsgToCustomService}},!0),this},getHistory:function(a){return e.checkParam(a,["touid"]),e.callbackHandler("GET_HISTORY_MSG",a),this.messengerSender.call(this.Base,{action:"GET_HISTORY_MSG",result:{touid:a.touid,count:a.count||20,
nextkey:a.nextkey||"",hasPrefix:!!a.hasPrefix,type:1}},!0),this},setReadState:function(a){return e.checkParam(a,["touid"]),e.callbackHandler("CHAT_SET_READ_STATE",a),this.messengerSender.call(this.Base,{action:"CHAT_SET_READ_STATE",result:{touid:a.touid,timestamp:a.timestamp,hasPrefix:!!a.hasPrefix}},!0),this},setMsgReadState:function(a){if(e.checkParam(a,["touid","msgs"]),!e.isArray(a.msgs))throw new Error("msgs蹇呴』涓烘暟缁�");var b=[];if(a.msgs.forEach(function(a){a.msgId&&a.time&&b.push(a)}),!b.length)throw new Error("msgs鍐呰嚦灏戝寘鍚竴涓獅id:xxx,time:xxx}");return e.callbackHandler("CHAT_SET_OPENIM_READ_STATE",a),this.messengerSender.call(this.Base,{action:"CHAT_SET_OPENIM_READ_STATE",result:{touid:a.touid,msgs:b,hasPrefix:!!a.hasPrefix}},!0),this},startListenMsg:function(a){e.checkParam(a,["touid"]);var b=this;return this.__IsStartRecv||(this.__IsStartRecv=!0,this.messengerSender.call(this.Base,{action:"CHAT_START_RECEIVE_MSG",result:{touid:a.touid,hasPrefix:!!a.hasPrefix}},!0),f.one("CHAT_STOP_RECEIVE_MSG",function(){b.__IsStartRecv=!1})),this},stopListenMsg:function(){return this.__IsStartRecv&&(this.__IsStartRecv=!1,this.messengerSender({action:"CHAT_STOP_RECEIVE_MSG"})),this},getRealChatId:function(a){return e.checkParam(a,["touid"]),e.callbackHandler("CHAT_GET_REAL_ID",a),this.messengerSender.call(this.Base,{action:"CHAT_GET_REAL_ID",result:{touid:a.touid,nocache:a.nocache,groupid:a.groupid,hasPrefix:!!a.hasPrefix}},!0),this},getUserStatus:function(a){if(e.checkParam(a,["uids"]),!e.isArray(a.uids))throw new Error("uids蹇呴』涓烘暟缁�");if(a.uids.length&&a.uids.length>30)throw new Error("涓€娆℃渶澶氫紶30涓敤鎴穒d");var b="";if(a.hasPrefix)b=a.uids.join(";"),c(b,a);else{if(!a.appkey)throw new Error("闇€瑕乤ppkey");this.Base.getPrefixByAppkey({appkey:a.appkey,success:function(d){var e=d.data.prefix,f=[];a.uids.forEach(function(a){f.push(e+a)}),b=f.join(";"),c(b,a)},error:function(){a.error&&a.error({code:1002,resultText:h[1002]})}})}return this}},a.WSDKMods.Chat=b}(this),function(a){function b(a){this.init(a)}var c=a.WSDKUtil;!a.WSDKMods&&(a.WSDKMods={}),b.prototype={constructor:b,init:function(a){this.Base=a.Base,this.messengerSender=a.Base.messengerSender},sendMsg:function(a){c.checkParam(a,["tid","msg"]),c.callbackHandler("TRIBE_SEND_MSG",a);var b=+new Date;return this.messengerSender.call(this.Base,{action:"TRIBE_SEND_MSG",result:{tid:parseInt(a.tid),msgTime:a.msgTime||parseInt(b/1e3),uuid:b,msgType:a.msgType||0,msg:a.msg}},!0),this},getHistory:function(a){return c.checkParam(a,["tid"]),c.callbackHandler("TRIBE_GET_HISTORY_MSG",a),this.messengerSender.call(this.Base,{action:"TRIBE_GET_HISTORY_MSG",result:{tid:a.tid+"",count:a.count||20,nextkey:a.nextkey||"",type:2}},!0),this},getTribeInfo:function(a){return c.checkParam(a,["tid"]),c.callbackHandler("TRIBE_GET_INTO",a),this.messengerSender.call(this.Base,{action:"TRIBE_GET_INTO",result:{tid:parseInt(a.tid),excludeFlag:a.excludeFlag||0}},!0),this},getTribeList:function(a){return c.callbackHandler("TRIBE_GET_LIST",a),this.messengerSender.call(this.Base,{action:"TRIBE_GET_LIST",result:{tribeTypes:a.types||[0,1,2]}},!0),this},getTribeMembers:function(a){return c.checkParam(a,["tid"]),c.callbackHandler("TRIBE_GET_MEMBERS",a),this.messengerSender.call(this.Base,{action:"TRIBE_GET_MEMBERS",result:{tid:parseInt(a.tid)}},!0),this},responseInviteIntoTribe:function(a){return c.checkParam(a,["tid","validatecode","manager","recommender"]),c.callbackHandler("TRIBE_RESPONSE_INVITE",a),this.messengerSender.call(this.Base,{action:"TRIBE_RESPONSE_INVITE",result:{tid:parseInt(a.tid),recommender:a.recommender,validatecode:a.validatecode,manager:a.manager}},!0),this}},a.WSDKMods.Tribe=b}(this),function(a,b){"use strict";"undefined"!=typeof module&&module.exports?module.exports=b():"function"==typeof define&&(define.amd||define.cmd)?define(b):a.WSDK=b.call(a)}(this,function(){function a(b){return this instanceof a?this.init(b):new a}var b=this.WSDKMods,c=this.WSDKCons,d=this.WSDKUtil,e=this.WSDKPlgs,f=c.PROJECT_NAME,g=c.CUSTOM_PAGE;return a.version="4.0.1",a.prototype={constructor:a,init:function(a){return a&&(a.host||a.imageHost)&&c.updateHost(a),this.__Messenger=new Messenger(g,f),this.Event=d.Event,this.Base=new b.Base(this,a),this.Chat=new b.Chat(this),b.Tribe&&(this.Tribe=new b.Tribe(this)),this.Plugin={},this.Plugin.Uploader=new e.Uploader(this),this.Plugin.Image=new e.ImgUp(this),this.Plugin.Emot=new e.Emot(this),this},LoginInfo:{}},a});