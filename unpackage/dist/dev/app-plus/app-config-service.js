
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/phonelogin","pages/login/Passwordlogin","pages/login/oneClickLogin","pages/login/login","pages/register/register","pages/clocklist/clocklist","pages/friendlist/friendlist","pages/userinfo/userinfo","pages/focus/focus","pages/data/data","pages/set/set","pages/friendlist/friendInfo","pages/friendlist/requestlist","pages/friendlist/dealrequest","pages/clocklist/handlerequest","pages/normalclock/normalclock","pages/normalclock/friendclock","pages/game/caculate","pages/game/game2048","pages/game/typist","pages/game/puzzle","pages/game/catchMouse","pages/normalclock/modifyclock","pages/friendlist/searchInfo"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"","navigationBarBackgroundColor":"#aaaaff","backgroundColor":"#aaaaff"},"tabBar":{"color":"#7A7E83","selectedColor":"#aaaaff","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/clocklist/clocklist","iconPath":"static/clock.png","selectedIconPath":"static/clock.png","text":"闹钟"},{"pagePath":"pages/focus/focus","iconPath":"static/lock.png","selectedIconPath":"static/lock.png","text":"专注"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"test","compilerVersion":"3.0.4","entryPagePath":"pages/login/phonelogin","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/phonelogin","meta":{"isQuit":true},"window":{"navigationBarTitleText":"手机号登录","navigationBarBackgroundColor":"#c4c4e9"}},{"path":"/pages/login/Passwordlogin","meta":{},"window":{"navigationBarTitleText":"用户名登录"}},{"path":"/pages/login/oneClickLogin","meta":{},"window":{}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/clocklist/clocklist","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/friendlist/friendlist","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/userinfo/userinfo","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/focus/focus","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/data/data","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/set/set","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/friendlist/friendInfo","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/friendlist/requestlist","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/friendlist/dealrequest","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/clocklist/handlerequest","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/normalclock/normalclock","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/normalclock/friendclock","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/game/caculate","meta":{},"window":{"navigationBarTitleText":"算数游戏"}},{"path":"/pages/game/game2048","meta":{},"window":{"navigationBarTitleText":"2048"}},{"path":"/pages/game/typist","meta":{},"window":{"navigationBarTitleText":"typist"}},{"path":"/pages/game/puzzle","meta":{},"window":{"navigationBarTitleText":"puzzle"}},{"path":"/pages/game/catchMouse","meta":{},"window":{"navigationBarTitleText":"打地鼠"}},{"path":"/pages/normalclock/modifyclock","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/friendlist/searchInfo","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
