(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"1e5b":function(t,a,e){},"2da0":function(t,a,e){"use strict";e("1e5b")},"4e61":function(t,a,e){t.exports=e.p+"img/logocf.8c8c9f23.svg"},"713b":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"bg font"},[i("q-layout",{attrs:{view:"hHh Lpr lff"}},[i("q-header",{attrs:{elevated:""}},[i("q-toolbar",[i("q-btn",{attrs:{flat:"",round:"",dense:"",icon:"menu"},on:{click:function(a){t.drawer=!t.drawer}}}),i("a",{attrs:{href:"/#/"}},[i("q-avatar",[i("img",{attrs:{src:e("4e61")}})])],1),t.$q.platform.is.mobile?t._e():i("q-toolbar-title",[t._v("\n          Fundamenta Staking and Liquidity Mining\n        ")]),!1===t.inited?i("div",[i("q-btn",{attrs:{color:"white","text-color":"black",label:"Sign In"},on:{click:function(a){return t.init()}}})],1):i("div",[t._v("\n          Signed in - V3.0.0\n        ")])],1)],1),i("q-drawer",{staticStyle:{"text-decoration":"none"},attrs:{width:200,breakpoint:500,bordered:"",dark:""},model:{value:t.drawer,callback:function(a){t.drawer=a},expression:"drawer"}},[i("q-scroll-area",{staticClass:"fit"},[i("q-list",[i("router-link",{attrs:{to:"/"}},[i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}]},[i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:"fas fa-home"}})],1),i("q-item-section",[t._v("\n                Home\n              ")])],1)],1),i("q-separator"),i("router-link",{attrs:{to:"/Staking"}},[i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}]},[i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:"fas fa-money-bill-wave"}})],1),i("q-item-section",[t._v("\n                Staking Dashboard\n              ")])],1)],1),i("q-separator"),i("router-link",{attrs:{to:"/Mining"}},[i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}]},[i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:"fas fa-coins"}})],1),i("q-item-section",[t._v("\n                Liquidity Mining Dashboard\n              ")])],1)],1),i("q-separator"),i("router-link",{attrs:{to:"/Stats"}},[i("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}]},[i("q-item-section",{attrs:{avatar:""}},[i("q-icon",{attrs:{name:"fas fa-hammer"}})],1),i("q-item-section",[t._v("\n                Stats and Tools\n              ")])],1)],1),i("q-separator")],1)],1)],1),i("q-page-container",[i("router-view")],1)],1)],1)},r=[],n=(e("e6cf"),{name:"MainLayout",data(){return{drawer:!1,inited:!1}},mounted(){this.init()},methods:{async init(){void 0===this.$API.userAccount&&(await this.$API.init(),this.inited=!0)}}}),o=n,s=(e("2da0"),e("2877")),c=e("4d5a"),l=e("e359"),d=e("65c6"),m=e("9c40"),p=e("cb32"),u=e("6ac5"),q=e("9404"),v=e("4983"),f=e("1c1c"),b=e("66e5"),w=e("4074"),h=e("0016"),g=e("eb85"),k=e("09e3"),Q=e("714f"),S=e("eebe"),_=e.n(S),y=Object(s["a"])(o,i,r,!1,null,null,null);a["default"]=y.exports;_()(y,"components",{QLayout:c["a"],QHeader:l["a"],QToolbar:d["a"],QBtn:m["a"],QAvatar:p["a"],QToolbarTitle:u["a"],QDrawer:q["a"],QScrollArea:v["a"],QList:f["a"],QItem:b["a"],QItemSection:w["a"],QIcon:h["a"],QSeparator:g["a"],QPageContainer:k["a"]}),_()(y,"directives",{Ripple:Q["a"]})}}]);