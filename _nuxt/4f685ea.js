(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{581:function(e,t,n){"use strict";n.r(t);var r=n(11),o=(n(78),n(46),n(25),n(88),n(51),n(17)),c=n(102),l=n(256),d=Object(o.defineComponent)({components:{QiitaTrendItem:l.default},layout:"qiichan",setup:function(){var e=Object(o.ref)(!1),t=Object(o.useRoute)().value.query,n=Object(o.useAsync)(Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.value=!0,t.next=3,c.qiitaStore.scrap.trend();case 3:return n=t.sent,e.value=!1,t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)}))),"JUNndjyGEYVn4IZCF0WDFw==");return Object(o.useFetch)(Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.code||!t.state){e.next=5;break}return e.next=3,Object(o.useRouter)().replace({query:{}});case 3:return e.next=5,c.qiitaStore.authenticate({code:t.code.toString(),state:t.state.toString()});case 5:case"end":return e.stop()}}),e)})))),{loading:e,trends:n}}}),f=n(30),m=n(37),v=n.n(m),w=n(228),h=n(561),j=n(562),k=n(578),component=Object(f.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",[e.loading?e._l(20,(function(i){return n("v-col",{key:i},[n("v-card",{attrs:{height:"100%",width:"344"}},[n("v-skeleton-loader",{attrs:{type:"list-item-three-line, list-item-two-line, list-item-avatar"}})],1)],1)})):e._l(e.trends,(function(e){return n("v-col",{key:e.node.uuid},[n("qiita-trend-item",{attrs:{"trend-item":e}})],1)}))],2)}),[],!1,null,null,null);t.default=component.exports;v()(component,{VCard:w.a,VCol:h.a,VRow:j.a,VSkeletonLoader:k.a})}}]);