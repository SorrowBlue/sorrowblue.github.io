(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{569:function(t,e,n){"use strict";n.r(e);var v=n(564),r=n.n(v),l=n(21),m=Object(l.b)({props:{comments:{type:Array,required:!1,default:null},authUser:{type:Object,required:!1,default:null}},setup:function(){var input=Object(l.f)("");r.a.setOptions({pedantic:!1,gfm:!0,breaks:!0,sanitize:!0,silent:!1});return{tabs:null,input:input,toMd:function(text){return r()(text)}}}}),o=n(46),c=n(58),d=n.n(c),_=n(244),f=n(229),V=n(91),h=n(539),I=n(224),k=n(191),y=n(225),L=n(146),C=n(226),w=n(227),x=n(52),T=n(126),U=n(542),M=n(538),O=n(594),j=n(610),A=n(609),P=n(591),S=n(595),component=Object(o.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"pa-1"},[n("v-list",[t.comments&&0===t.comments.length?[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",[t._v("この記事にコメントはありません。")])],1)],1),t._v(" "),n("v-divider")]:t._e(),t._v(" "),t._l(t.comments,(function(e,i){return[n("v-list-item",{key:e.id+"user"},[n("v-list-item-avatar",[n("v-img",{attrs:{src:e.user.profile_image_url}})],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{staticClass:"headline",domProps:{textContent:t._s(e.user.id)}}),t._v(" "),n("v-list-item-subtitle",{domProps:{textContent:t._s(e.updated_at+"に更新")}})],1),t._v(" "),null!=t.authUser&&e.user.id===t.authUser.id?n("v-list-item-action",[n("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var v=e.on;return[n("v-list-item-icon",[n("v-icon",t._g({},v),[t._v("mdi-dots-vertical")])],1)]}}],null,!0)},[t._v(" "),n("v-list",[n("v-list-item",[n("v-list-item-title",[t._v("削除")])],1),t._v(" "),n("v-list-item",[n("v-list-item-title",[t._v("編集")])],1)],1)],1)],1):t._e()],1),t._v(" "),n("v-list-item",{key:e.id+"comment"},[n("v-list-item-content",[n("div",{staticClass:"body-1",domProps:{innerHTML:t._s(e.rendered_body)}})])],1),t._v(" "),i+1<t.comments.length?n("v-divider",{key:e.id+"divider"}):t._e()]})),t._v(" "),t.authUser?[n("v-divider"),t._v(" "),n("v-list-item",[n("v-list-item-avatar",[n("img",{attrs:{src:t.authUser.profile_image_url,alt:""}})]),t._v(" "),n("v-list-item-content",[n("v-list-item-title",[t._v("投稿する")])],1)],1)]:t._e()],2),t._v(" "),t.authUser?[n("v-tabs",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[n("v-tab",{attrs:{href:"#input_comment"}},[t._v("編集")]),t._v(" "),n("v-tab",{attrs:{href:"#preview_comment"}},[t._v("プレビュー")])],1),t._v(" "),n("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[n("v-tab-item",{attrs:{value:"input_comment"}},[n("v-card",{attrs:{flat:""}},[n("v-textarea",{staticClass:"mt-1",attrs:{name:"comment",outlined:""},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}}),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",[t._v("投稿")])],1)],1)],1),t._v(" "),n("v-tab-item",{attrs:{value:"preview_comment"}},[n("div",{domProps:{innerHTML:t._s(t.toMd(t.input))}})])],1)]:t._e()],2)}),[],!1,null,null,null);e.default=component.exports;d()(component,{VBtn:_.a,VCard:f.a,VCardActions:V.a,VDivider:h.a,VIcon:I.a,VImg:k.a,VList:y.a,VListItem:L.a,VListItemAction:C.a,VListItemAvatar:w.a,VListItemContent:x.b,VListItemIcon:T.a,VListItemSubtitle:x.c,VListItemTitle:x.d,VMenu:U.a,VSpacer:M.a,VTab:O.a,VTabItem:j.a,VTabs:A.a,VTabsItems:P.a,VTextarea:S.a})}}]);