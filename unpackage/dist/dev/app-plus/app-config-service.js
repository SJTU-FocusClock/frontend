
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/register/register","pages/login/login","pages/clocklist/clocklist","pages/friendlist/friendlist","pages/userinfo/userinfo","pages/focus/focus","pages/data/data","pages/set/set","pages/friendlist/friendInfo","pages/focus/timeOut","pages/friendlist/requestlist","pages/friendlist/dealrequest","pages/clocklist/quickclock","pages/normalclock/normalclock"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"","navigationBarBackgroundColor":"#c4c4e9","backgroundColor":"#c4c4e9"},"tabBar":{"color":"#7A7E83","selectedColor":"#aaaaff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/clocklist/clocklist","iconPath":"static/clock.png","selectedIconPath":"static/clock.png","text":"闹钟"},{"pagePath":"pages/focus/focus","iconPath":"static/lock.png","selectedIconPath":"static/lock.png","text":"专注"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"test","compilerVersion":"2.8.11","entryPagePath":"pages/register/register","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/register/register","meta":{"isQuit":true},"window":{"navigationBarTitleText":"Register"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"Login"}},{"path":"/pages/clocklist/clocklist","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/friendlist/friendlist","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"Me"}},{"path":"/pages/focus/focus","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/data/data","meta":{},"window":{"navigationBarTitleText":"Statistics"}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"Settings"}},{"path":"/pages/friendlist/friendInfo","meta":{},"window":{"transparentTitle":"auto","navigationBarBackgroundColor":"#c4c4e9"}},{"path":"/pages/focus/timeOut","meta":{},"window":{}},{"path":"/pages/friendlist/requestlist","meta":{},"window":{"navigationBarTitleText":"好友请求"}},{"path":"/pages/friendlist/dealrequest","meta":{},"window":{"transparentTitle":"auto","navigationBarBackgroundColor":"#c4c4e9"}},{"path":"/pages/clocklist/quickclock","meta":{},"window":{"transparentTitle":"auto","navigationBarBackgroundColor":"#c4c4e9"}},{"path":"/pages/normalclock/normalclock","meta":{},"window":{"navigationStyle":"custom","navigationBarBackgroundColor":"#c4c4e9"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
