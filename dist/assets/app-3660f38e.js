import{_ as se,c as Ae,s as De,u as ze,r as T,a as qe,e as We,b as He,j as $,d as X,f as Ve,g as Xe,h as ke,i as Ke,k as Ie,R as S,l as Ue,m as Ye,S as $e,B as Je,T as ae,P as Q,n as Pe,W as Qe}from"./index-9ed829b0.js";import{a as oe}from"./axios-6d17da38.js";import{C as Ze}from"./Card-83db6a16.js";import{c as et}from"./createContainer-610eb01d.js";import{i as tt}from"./isMuiElement-1bc5abbc.js";const nt=(t,e)=>t.filter(i=>e.includes(i)),re=(t,e,i)=>{const f=t.keys[0];Array.isArray(e)?e.forEach((d,p)=>{i((u,b)=>{p<=t.keys.length-1&&(p===0?Object.assign(u,b):u[t.up(t.keys[p])]=b)},d)}):e&&typeof e=="object"?(Object.keys(e).length>t.keys.length?t.keys:nt(t.keys,Object.keys(e))).forEach(p=>{if(t.keys.indexOf(p)!==-1){const u=e[p];u!==void 0&&i((b,x)=>{f===p?Object.assign(b,x):b[t.up(p)]=x},u)}}):(typeof e=="number"||typeof e=="string")&&i((d,p)=>{Object.assign(d,p)},e)};function K(t){return t?`Level${t}`:""}function ue(t){return t.unstable_level>0&&t.container}function Fe(t){return function(i){return`var(--Grid-${i}Spacing${K(t.unstable_level)})`}}function Ne(t){return function(i){return t.unstable_level===0?`var(--Grid-${i}Spacing)`:`var(--Grid-${i}Spacing${K(t.unstable_level-1)})`}}function we(t){return t.unstable_level===0?"var(--Grid-columns)":`var(--Grid-columns${K(t.unstable_level-1)})`}const rt=({theme:t,ownerState:e})=>{const i=Fe(e),f={};return re(t.breakpoints,e.gridSize,(d,p)=>{let u={};p===!0&&(u={flexBasis:0,flexGrow:1,maxWidth:"100%"}),p==="auto"&&(u={flexBasis:"auto",flexGrow:0,flexShrink:0,maxWidth:"none",width:"auto"}),typeof p=="number"&&(u={flexGrow:0,flexBasis:"auto",width:`calc(100% * ${p} / ${we(e)}${ue(e)?` + ${i("column")}`:""})`}),d(f,u)}),f},ot=({theme:t,ownerState:e})=>{const i={};return re(t.breakpoints,e.gridOffset,(f,d)=>{let p={};d==="auto"&&(p={marginLeft:"auto"}),typeof d=="number"&&(p={marginLeft:d===0?"0px":`calc(100% * ${d} / ${we(e)})`}),f(i,p)}),i},st=({theme:t,ownerState:e})=>{if(!e.container)return{};const i=ue(e)?{[`--Grid-columns${K(e.unstable_level)}`]:we(e)}:{"--Grid-columns":12};return re(t.breakpoints,e.columns,(f,d)=>{f(i,{[`--Grid-columns${K(e.unstable_level)}`]:d})}),i},at=({theme:t,ownerState:e})=>{if(!e.container)return{};const i=Ne(e),f=ue(e)?{[`--Grid-rowSpacing${K(e.unstable_level)}`]:i("row")}:{};return re(t.breakpoints,e.rowSpacing,(d,p)=>{var u;d(f,{[`--Grid-rowSpacing${K(e.unstable_level)}`]:typeof p=="string"?p:(u=t.spacing)==null?void 0:u.call(t,p)})}),f},it=({theme:t,ownerState:e})=>{if(!e.container)return{};const i=Ne(e),f=ue(e)?{[`--Grid-columnSpacing${K(e.unstable_level)}`]:i("column")}:{};return re(t.breakpoints,e.columnSpacing,(d,p)=>{var u;d(f,{[`--Grid-columnSpacing${K(e.unstable_level)}`]:typeof p=="string"?p:(u=t.spacing)==null?void 0:u.call(t,p)})}),f},lt=({theme:t,ownerState:e})=>{if(!e.container)return{};const i={};return re(t.breakpoints,e.direction,(f,d)=>{f(i,{flexDirection:d})}),i},ct=({ownerState:t})=>{const e=Fe(t),i=Ne(t);return se({minWidth:0,boxSizing:"border-box"},t.container&&se({display:"flex",flexWrap:"wrap"},t.wrap&&t.wrap!=="wrap"&&{flexWrap:t.wrap},{margin:`calc(${e("row")} / -2) calc(${e("column")} / -2)`},t.disableEqualOverflow&&{margin:`calc(${e("row")} * -1) 0px 0px calc(${e("column")} * -1)`}),(!t.container||ue(t))&&se({padding:`calc(${i("row")} / 2) calc(${i("column")} / 2)`},(t.disableEqualOverflow||t.parentDisableEqualOverflow)&&{padding:`${i("row")} 0px 0px ${i("column")}`}))},ut=t=>{const e=[];return Object.entries(t).forEach(([i,f])=>{f!==!1&&f!==void 0&&e.push(`grid-${i}-${String(f)}`)}),e},dt=(t,e="xs")=>{function i(f){return f===void 0?!1:typeof f=="string"&&!Number.isNaN(Number(f))||typeof f=="number"&&f>0}if(i(t))return[`spacing-${e}-${String(t)}`];if(typeof t=="object"&&!Array.isArray(t)){const f=[];return Object.entries(t).forEach(([d,p])=>{i(p)&&f.push(`spacing-${d}-${String(p)}`)}),f}return[]},ft=t=>t===void 0?[]:typeof t=="object"?Object.entries(t).map(([e,i])=>`direction-${e}-${i}`):[`direction-xs-${String(t)}`],pt=["className","children","columns","container","component","direction","wrap","spacing","rowSpacing","columnSpacing","disableEqualOverflow","unstable_level"],mt=Ae(),gt=De("div",{name:"MuiGrid",slot:"Root",overridesResolver:(t,e)=>e.root});function ht(t){return ze({props:t,name:"MuiGrid",defaultTheme:mt})}function bt(t={}){const{createStyledComponent:e=gt,useThemeProps:i=ht,componentName:f="MuiGrid"}=t,d=T.createContext(void 0),p=(x,n)=>{const{container:r,direction:l,spacing:a,wrap:o,gridSize:s}=x,c={root:["root",r&&"container",o!=="wrap"&&`wrap-xs-${String(o)}`,...ft(l),...ut(s),...r?dt(a,n.breakpoints.keys[0]):[]]};return Ve(c,m=>Xe(f,m),{})},u=e(st,it,at,rt,lt,ct,ot),b=T.forwardRef(function(n,r){var l,a,o,s,c,m,y,g;const h=qe(),E=i(n),w=We(E),k=T.useContext(d),{className:N,children:v,columns:_=12,container:C=!1,component:F="div",direction:M="row",wrap:I="wrap",spacing:j=0,rowSpacing:U=j,columnSpacing:ee=j,disableEqualOverflow:D,unstable_level:P=0}=w,Y=He(w,pt);let z=D;P&&D!==void 0&&(z=n.disableEqualOverflow);const H={},R={},B={};Object.entries(Y).forEach(([W,te])=>{h.breakpoints.values[W]!==void 0?H[W]=te:h.breakpoints.values[W.replace("Offset","")]!==void 0?R[W.replace("Offset","")]=te:B[W]=te});const G=(l=n.columns)!=null?l:P?void 0:_,q=(a=n.spacing)!=null?a:P?void 0:j,V=(o=(s=n.rowSpacing)!=null?s:n.spacing)!=null?o:P?void 0:U,J=(c=(m=n.columnSpacing)!=null?m:n.spacing)!=null?c:P?void 0:ee,de=se({},w,{level:P,columns:G,container:C,direction:M,wrap:I,spacing:q,rowSpacing:V,columnSpacing:J,gridSize:H,gridOffset:R,disableEqualOverflow:(y=(g=z)!=null?g:k)!=null?y:!1,parentDisableEqualOverflow:k}),Ge=p(de,h);let ye=$.jsx(u,se({ref:r,as:F,ownerState:de,className:X(Ge.root,N)},B,{children:T.Children.map(v,W=>{if(T.isValidElement(W)&&tt(W,["Grid"])){var te;return T.cloneElement(W,{unstable_level:(te=W.props.unstable_level)!=null?te:P+1})}return W})}));return z!==void 0&&z!==(k??!1)&&(ye=$.jsx(d.Provider,{value:z,children:ye})),ye});return b.muiName="Grid",b}const yt=et({createStyledComponent:ke("div",{name:"MuiContainer",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:i}=t;return[e.root,e[`maxWidth${Ke(String(i.maxWidth))}`],i.fixed&&e.fixed,i.disableGutters&&e.disableGutters]}}),useThemeProps:t=>Ie({props:t,name:"MuiContainer"})}),vt=yt,_t=bt({createStyledComponent:ke("div",{name:"MuiGrid2",slot:"Root",overridesResolver:(t,e)=>e.root}),componentName:"MuiGrid2",useThemeProps:t=>Ie({props:t,name:"MuiGrid2"})}),ve=_t;const le=t=>typeof t=="number"&&!isNaN(t),Z=t=>typeof t=="string",A=t=>typeof t=="function",me=t=>Z(t)||A(t)?t:null,xe=t=>T.isValidElement(t)||Z(t)||A(t)||le(t);function xt(t,e,i){i===void 0&&(i=300);const{scrollHeight:f,style:d}=t;requestAnimationFrame(()=>{d.minHeight="initial",d.height=f+"px",d.transition=`all ${i}ms`,requestAnimationFrame(()=>{d.height="0",d.padding="0",d.margin="0",setTimeout(e,i)})})}function he(t){let{enter:e,exit:i,appendPosition:f=!1,collapse:d=!0,collapseDuration:p=300}=t;return function(u){let{children:b,position:x,preventExitTransition:n,done:r,nodeRef:l,isIn:a,playToast:o}=u;const s=f?`${e}--${x}`:e,c=f?`${i}--${x}`:i,m=T.useRef(0);return T.useLayoutEffect(()=>{const y=l.current,g=s.split(" "),h=E=>{E.target===l.current&&(o(),y.removeEventListener("animationend",h),y.removeEventListener("animationcancel",h),m.current===0&&E.type!=="animationcancel"&&y.classList.remove(...g))};y.classList.add(...g),y.addEventListener("animationend",h),y.addEventListener("animationcancel",h)},[]),T.useEffect(()=>{const y=l.current,g=()=>{y.removeEventListener("animationend",g),d?xt(y,r,p):r()};a||(n?g():(m.current=1,y.className+=` ${c}`,y.addEventListener("animationend",g)))},[a]),S.createElement(S.Fragment,null,b)}}function Ce(t,e){return t!=null?{content:t.content,containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,status:e}:{}}const L=new Map;let ce=[];const Ee=new Set,Et=t=>Ee.forEach(e=>e(t)),je=()=>L.size>0;function Be(t,e){var i;if(e)return!((i=L.get(e))==null||!i.isToastActive(t));let f=!1;return L.forEach(d=>{d.isToastActive(t)&&(f=!0)}),f}function Le(t,e){xe(t)&&(je()||ce.push({content:t,options:e}),L.forEach(i=>{i.buildToast(t,e)}))}function Se(t,e){L.forEach(i=>{e!=null&&e!=null&&e.containerId?(e==null?void 0:e.containerId)===i.id&&i.toggle(t,e==null?void 0:e.id):i.toggle(t,e==null?void 0:e.id)})}function Tt(t){const{subscribe:e,getSnapshot:i,setProps:f}=T.useRef(function(p){const u=p.containerId||1;return{subscribe(b){const x=function(r,l,a){let o=1,s=0,c=[],m=[],y=[],g=l;const h=new Map,E=new Set,w=()=>{y=Array.from(h.values()),E.forEach(v=>v())},k=v=>{m=v==null?[]:m.filter(_=>_!==v),w()},N=v=>{const{toastId:_,onOpen:C,updateId:F,children:M}=v.props,I=F==null;v.staleId&&h.delete(v.staleId),h.set(_,v),m=[...m,v.props.toastId].filter(j=>j!==v.staleId),w(),a(Ce(v,I?"added":"updated")),I&&A(C)&&C(T.isValidElement(M)&&M.props)};return{id:r,props:g,observe:v=>(E.add(v),()=>E.delete(v)),toggle:(v,_)=>{h.forEach(C=>{_!=null&&_!==C.props.toastId||A(C.toggle)&&C.toggle(v)})},removeToast:k,toasts:h,clearQueue:()=>{s-=c.length,c=[]},buildToast:(v,_)=>{if((R=>{let{containerId:B,toastId:G,updateId:q}=R;const V=B?B!==r:r!==1,J=h.has(G)&&q==null;return V||J})(_))return;const{toastId:C,updateId:F,data:M,staleId:I,delay:j}=_,U=()=>{k(C)},ee=F==null;ee&&s++;const D={...g,style:g.toastStyle,key:o++,...Object.fromEntries(Object.entries(_).filter(R=>{let[B,G]=R;return G!=null})),toastId:C,updateId:F,data:M,closeToast:U,isIn:!1,className:me(_.className||g.toastClassName),bodyClassName:me(_.bodyClassName||g.bodyClassName),progressClassName:me(_.progressClassName||g.progressClassName),autoClose:!_.isLoading&&(P=_.autoClose,Y=g.autoClose,P===!1||le(P)&&P>0?P:Y),deleteToast(){const R=h.get(C),{onClose:B,children:G}=R.props;A(B)&&B(T.isValidElement(G)&&G.props),a(Ce(R,"removed")),h.delete(C),s--,s<0&&(s=0),c.length>0?N(c.shift()):w()}};var P,Y;D.closeButton=g.closeButton,_.closeButton===!1||xe(_.closeButton)?D.closeButton=_.closeButton:_.closeButton===!0&&(D.closeButton=!xe(g.closeButton)||g.closeButton);let z=v;T.isValidElement(v)&&!Z(v.type)?z=T.cloneElement(v,{closeToast:U,toastProps:D,data:M}):A(v)&&(z=v({closeToast:U,toastProps:D,data:M}));const H={content:z,props:D,staleId:I};g.limit&&g.limit>0&&s>g.limit&&ee?c.push(H):le(j)?setTimeout(()=>{N(H)},j):N(H)},setProps(v){g=v},setToggle:(v,_)=>{h.get(v).toggle=_},isToastActive:v=>m.some(_=>_===v),getSnapshot:()=>y}}(u,p,Et);L.set(u,x);const n=x.observe(b);return ce.forEach(r=>Le(r.content,r.options)),ce=[],()=>{n(),L.delete(u)}},setProps(b){var x;(x=L.get(u))==null||x.setProps(b)},getSnapshot(){var b;return(b=L.get(u))==null?void 0:b.getSnapshot()}}}(t)).current;f(t);const d=T.useSyncExternalStore(e,i,i);return{getToastToRender:function(p){if(!d)return[];const u=new Map;return t.newestOnTop&&d.reverse(),d.forEach(b=>{const{position:x}=b.props;u.has(x)||u.set(x,[]),u.get(x).push(b)}),Array.from(u,b=>p(b[0],b[1]))},isToastActive:Be,count:d==null?void 0:d.length}}function Nt(t){const[e,i]=T.useState(!1),[f,d]=T.useState(!1),p=T.useRef(null),u=T.useRef({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:b,pauseOnHover:x,closeToast:n,onClick:r,closeOnClick:l}=t;var a,o;function s(){i(!0)}function c(){i(!1)}function m(h){const E=p.current;u.canDrag&&E&&(u.didMove=!0,e&&c(),u.delta=t.draggableDirection==="x"?h.clientX-u.start:h.clientY-u.start,u.start!==h.clientX&&(u.canCloseOnClick=!1),E.style.transform=`translate3d(${t.draggableDirection==="x"?`${u.delta}px, var(--y)`:`0, calc(${u.delta}px + var(--y))`},0)`,E.style.opacity=""+(1-Math.abs(u.delta/u.removalDistance)))}function y(){document.removeEventListener("pointermove",m),document.removeEventListener("pointerup",y);const h=p.current;if(u.canDrag&&u.didMove&&h){if(u.canDrag=!1,Math.abs(u.delta)>u.removalDistance)return d(!0),t.closeToast(),void t.collapseAll();h.style.transition="transform 0.2s, opacity 0.2s",h.style.removeProperty("transform"),h.style.removeProperty("opacity")}}(o=L.get((a={id:t.toastId,containerId:t.containerId,fn:i}).containerId||1))==null||o.setToggle(a.id,a.fn),T.useEffect(()=>{if(t.pauseOnFocusLoss)return document.hasFocus()||c(),window.addEventListener("focus",s),window.addEventListener("blur",c),()=>{window.removeEventListener("focus",s),window.removeEventListener("blur",c)}},[t.pauseOnFocusLoss]);const g={onPointerDown:function(h){if(t.draggable===!0||t.draggable===h.pointerType){u.didMove=!1,document.addEventListener("pointermove",m),document.addEventListener("pointerup",y);const E=p.current;u.canCloseOnClick=!0,u.canDrag=!0,E.style.transition="none",t.draggableDirection==="x"?(u.start=h.clientX,u.removalDistance=E.offsetWidth*(t.draggablePercent/100)):(u.start=h.clientY,u.removalDistance=E.offsetHeight*(t.draggablePercent===80?1.5*t.draggablePercent:t.draggablePercent)/100)}},onPointerUp:function(h){const{top:E,bottom:w,left:k,right:N}=p.current.getBoundingClientRect();h.nativeEvent.type!=="touchend"&&t.pauseOnHover&&h.clientX>=k&&h.clientX<=N&&h.clientY>=E&&h.clientY<=w?c():s()}};return b&&x&&(g.onMouseEnter=c,t.stacked||(g.onMouseLeave=s)),l&&(g.onClick=h=>{r&&r(h),u.canCloseOnClick&&n()}),{playToast:s,pauseToast:c,isRunning:e,preventExitTransition:f,toastRef:p,eventHandlers:g}}function wt(t){let{delay:e,isRunning:i,closeToast:f,type:d="default",hide:p,className:u,style:b,controlledProgress:x,progress:n,rtl:r,isIn:l,theme:a}=t;const o=p||x&&n===0,s={...b,animationDuration:`${e}ms`,animationPlayState:i?"running":"paused"};x&&(s.transform=`scaleX(${n})`);const c=X("Toastify__progress-bar",x?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${a}`,`Toastify__progress-bar--${d}`,{"Toastify__progress-bar--rtl":r}),m=A(u)?u({rtl:r,type:d,defaultClassName:c}):X(c,u),y={[x&&n>=1?"onTransitionEnd":"onAnimationEnd"]:x&&n<1?null:()=>{l&&f()}};return S.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":o},S.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${a} Toastify__progress-bar--${d}`}),S.createElement("div",{role:"progressbar","aria-hidden":o?"true":"false","aria-label":"notification timer",className:m,style:s,...y}))}let $t=1;const Me=()=>""+$t++;function Ct(t){return t&&(Z(t.toastId)||le(t.toastId))?t.toastId:Me()}function ie(t,e){return Le(t,e),e.toastId}function ge(t,e){return{...e,type:e&&e.type||t,toastId:Ct(e)}}function fe(t){return(e,i)=>ie(e,ge(t,i))}function O(t,e){return ie(t,ge("default",e))}O.loading=(t,e)=>ie(t,ge("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...e})),O.promise=function(t,e,i){let f,{pending:d,error:p,success:u}=e;d&&(f=Z(d)?O.loading(d,i):O.loading(d.render,{...i,...d}));const b={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},x=(r,l,a)=>{if(l==null)return void O.dismiss(f);const o={type:r,...b,...i,data:a},s=Z(l)?{render:l}:l;return f?O.update(f,{...o,...s}):O(s.render,{...o,...s}),a},n=A(t)?t():t;return n.then(r=>x("success",u,r)).catch(r=>x("error",p,r)),n},O.success=fe("success"),O.info=fe("info"),O.error=fe("error"),O.warning=fe("warning"),O.warn=O.warning,O.dark=(t,e)=>ie(t,ge("default",{theme:"dark",...e})),O.dismiss=function(t){(function(e){var i;if(je()){if(e==null||Z(i=e)||le(i))L.forEach(f=>{f.removeToast(e)});else if(e&&("containerId"in e||"id"in e)){const f=L.get(e.containerId);f?f.removeToast(e.id):L.forEach(d=>{d.removeToast(e.id)})}}else ce=ce.filter(f=>e!=null&&f.options.toastId!==e)})(t)},O.clearWaitingQueue=function(t){t===void 0&&(t={}),L.forEach(e=>{!e.props.limit||t.containerId&&e.id!==t.containerId||e.clearQueue()})},O.isActive=Be,O.update=function(t,e){e===void 0&&(e={});const i=((f,d)=>{var p;let{containerId:u}=d;return(p=L.get(u||1))==null?void 0:p.toasts.get(f)})(t,e);if(i){const{props:f,content:d}=i,p={delay:100,...f,...e,toastId:e.toastId||t,updateId:Me()};p.toastId!==t&&(p.staleId=t);const u=p.render||d;delete p.render,ie(u,p)}},O.done=t=>{O.update(t,{progress:1})},O.onChange=function(t){return Ee.add(t),()=>{Ee.delete(t)}},O.play=t=>Se(!0,t),O.pause=t=>Se(!1,t);const St=typeof window<"u"?T.useLayoutEffect:T.useEffect,pe=t=>{let{theme:e,type:i,isLoading:f,...d}=t;return S.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:e==="colored"?"currentColor":`var(--toastify-icon-color-${i})`,...d})},_e={info:function(t){return S.createElement(pe,{...t},S.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(t){return S.createElement(pe,{...t},S.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(t){return S.createElement(pe,{...t},S.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(t){return S.createElement(pe,{...t},S.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return S.createElement("div",{className:"Toastify__spinner"})}},Ot=t=>{const{isRunning:e,preventExitTransition:i,toastRef:f,eventHandlers:d,playToast:p}=Nt(t),{closeButton:u,children:b,autoClose:x,onClick:n,type:r,hideProgressBar:l,closeToast:a,transition:o,position:s,className:c,style:m,bodyClassName:y,bodyStyle:g,progressClassName:h,progressStyle:E,updateId:w,role:k,progress:N,rtl:v,toastId:_,deleteToast:C,isIn:F,isLoading:M,closeOnClick:I,theme:j}=t,U=X("Toastify__toast",`Toastify__toast-theme--${j}`,`Toastify__toast--${r}`,{"Toastify__toast--rtl":v},{"Toastify__toast--close-on-click":I}),ee=A(c)?c({rtl:v,position:s,type:r,defaultClassName:U}):X(U,c),D=function(H){let{theme:R,type:B,isLoading:G,icon:q}=H,V=null;const J={theme:R,type:B};return q===!1||(A(q)?V=q({...J,isLoading:G}):T.isValidElement(q)?V=T.cloneElement(q,J):G?V=_e.spinner():(de=>de in _e)(B)&&(V=_e[B](J))),V}(t),P=!!N||!x,Y={closeToast:a,type:r,theme:j};let z=null;return u===!1||(z=A(u)?u(Y):T.isValidElement(u)?T.cloneElement(u,Y):function(H){let{closeToast:R,theme:B,ariaLabel:G="close"}=H;return S.createElement("button",{className:`Toastify__close-button Toastify__close-button--${B}`,type:"button",onClick:q=>{q.stopPropagation(),R(q)},"aria-label":G},S.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},S.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}(Y)),S.createElement(o,{isIn:F,done:C,position:s,preventExitTransition:i,nodeRef:f,playToast:p},S.createElement("div",{id:_,onClick:n,"data-in":F,className:ee,...d,style:m,ref:f},S.createElement("div",{...F&&{role:k},className:A(y)?y({type:r}):X("Toastify__toast-body",y),style:g},D!=null&&S.createElement("div",{className:X("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!M})},D),S.createElement("div",null,b)),z,S.createElement(wt,{...w&&!P?{key:`pb-${w}`}:{},rtl:v,theme:j,delay:x,isRunning:e,isIn:F,closeToast:a,hide:l,type:r,style:E,className:h,controlledProgress:P,progress:N||0})))},be=function(t,e){return e===void 0&&(e=!1),{enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:e}},kt=he(be("bounce",!0));he(be("slide",!0));he(be("zoom"));he(be("flip"));const It={position:"top-right",transition:kt,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};function Oe(t){let e={...It,...t};const i=t.stacked,[f,d]=T.useState(!0),p=T.useRef(null),{getToastToRender:u,isToastActive:b,count:x}=Tt(e),{className:n,style:r,rtl:l,containerId:a}=e;function o(c){const m=X("Toastify__toast-container",`Toastify__toast-container--${c}`,{"Toastify__toast-container--rtl":l});return A(n)?n({position:c,rtl:l,defaultClassName:m}):X(m,me(n))}function s(){i&&(d(!0),O.play())}return St(()=>{if(i){var c;const m=p.current.querySelectorAll('[data-in="true"]'),y=12,g=(c=e.position)==null?void 0:c.includes("top");let h=0,E=0;Array.from(m).reverse().forEach((w,k)=>{const N=w;N.classList.add("Toastify__toast--stacked"),k>0&&(N.dataset.collapsed=`${f}`),N.dataset.pos||(N.dataset.pos=g?"top":"bot");const v=h*(f?.2:1)+(f?0:y*k);N.style.setProperty("--y",`${g?v:-1*v}px`),N.style.setProperty("--g",`${y}`),N.style.setProperty("--s",""+(1-(f?E:0))),h+=N.offsetHeight,E+=.025})}},[f,x,i]),S.createElement("div",{ref:p,className:"Toastify",id:a,onMouseEnter:()=>{i&&(d(!1),O.pause())},onMouseLeave:s},u((c,m)=>{const y=m.length?{...r}:{...r,pointerEvents:"none"};return S.createElement("div",{className:o(c),style:y,key:`container-${c}`},m.map(g=>{let{content:h,props:E}=g;return S.createElement(Ot,{...E,stacked:i,collapseAll:s,isIn:b(E.toastId,E.containerId),style:E.style,key:`toast-${E.key}`},h)}))}))}var Re={exports:{}};/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */(function(t){(function(e,i){t.exports?t.exports=i():e.numeral=i()})(Ue,function(){var e,i,f="2.0.6",d={},p={},u={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},b={currentLocale:u.currentLocale,zeroFormat:u.zeroFormat,nullFormat:u.nullFormat,defaultFormat:u.defaultFormat,scalePercentBy100:u.scalePercentBy100};function x(n,r){this._input=n,this._value=r}return e=function(n){var r,l,a,o;if(e.isNumeral(n))r=n.value();else if(n===0||typeof n>"u")r=0;else if(n===null||i.isNaN(n))r=null;else if(typeof n=="string")if(b.zeroFormat&&n===b.zeroFormat)r=0;else if(b.nullFormat&&n===b.nullFormat||!n.replace(/[^0-9]+/g,"").length)r=null;else{for(l in d)if(o=typeof d[l].regexps.unformat=="function"?d[l].regexps.unformat():d[l].regexps.unformat,o&&n.match(o)){a=d[l].unformat;break}a=a||e._.stringToNumber,r=a(n)}else r=Number(n)||null;return new x(n,r)},e.version=f,e.isNumeral=function(n){return n instanceof x},e._=i={numberToFormat:function(n,r,l){var a=p[e.options.currentLocale],o=!1,s=!1,c=0,m="",y=1e12,g=1e9,h=1e6,E=1e3,w="",k=!1,N,v,_,C,F,M,I;if(n=n||0,v=Math.abs(n),e._.includes(r,"(")?(o=!0,r=r.replace(/[\(|\)]/g,"")):(e._.includes(r,"+")||e._.includes(r,"-"))&&(F=e._.includes(r,"+")?r.indexOf("+"):n<0?r.indexOf("-"):-1,r=r.replace(/[\+|\-]/g,"")),e._.includes(r,"a")&&(N=r.match(/a(k|m|b|t)?/),N=N?N[1]:!1,e._.includes(r," a")&&(m=" "),r=r.replace(new RegExp(m+"a[kmbt]?"),""),v>=y&&!N||N==="t"?(m+=a.abbreviations.trillion,n=n/y):v<y&&v>=g&&!N||N==="b"?(m+=a.abbreviations.billion,n=n/g):v<g&&v>=h&&!N||N==="m"?(m+=a.abbreviations.million,n=n/h):(v<h&&v>=E&&!N||N==="k")&&(m+=a.abbreviations.thousand,n=n/E)),e._.includes(r,"[.]")&&(s=!0,r=r.replace("[.]",".")),_=n.toString().split(".")[0],C=r.split(".")[1],M=r.indexOf(","),c=(r.split(".")[0].split(",")[0].match(/0/g)||[]).length,C?(e._.includes(C,"[")?(C=C.replace("]",""),C=C.split("["),w=e._.toFixed(n,C[0].length+C[1].length,l,C[1].length)):w=e._.toFixed(n,C.length,l),_=w.split(".")[0],e._.includes(w,".")?w=a.delimiters.decimal+w.split(".")[1]:w="",s&&Number(w.slice(1))===0&&(w="")):_=e._.toFixed(n,0,l),m&&!N&&Number(_)>=1e3&&m!==a.abbreviations.trillion)switch(_=String(Number(_)/1e3),m){case a.abbreviations.thousand:m=a.abbreviations.million;break;case a.abbreviations.million:m=a.abbreviations.billion;break;case a.abbreviations.billion:m=a.abbreviations.trillion;break}if(e._.includes(_,"-")&&(_=_.slice(1),k=!0),_.length<c)for(var j=c-_.length;j>0;j--)_="0"+_;return M>-1&&(_=_.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+a.delimiters.thousands)),r.indexOf(".")===0&&(_=""),I=_+w+(m||""),o?I=(o&&k?"(":"")+I+(o&&k?")":""):F>=0?I=F===0?(k?"-":"+")+I:I+(k?"-":"+"):k&&(I="-"+I),I},stringToNumber:function(n){var r=p[b.currentLocale],l=n,a={thousand:3,million:6,billion:9,trillion:12},o,s,c;if(b.zeroFormat&&n===b.zeroFormat)s=0;else if(b.nullFormat&&n===b.nullFormat||!n.replace(/[^0-9]+/g,"").length)s=null;else{s=1,r.delimiters.decimal!=="."&&(n=n.replace(/\./g,"").replace(r.delimiters.decimal,"."));for(o in a)if(c=new RegExp("[^a-zA-Z]"+r.abbreviations[o]+"(?:\\)|(\\"+r.currency.symbol+")?(?:\\))?)?$"),l.match(c)){s*=Math.pow(10,a[o]);break}s*=(n.split("-").length+Math.min(n.split("(").length-1,n.split(")").length-1))%2?1:-1,n=n.replace(/[^0-9\.]+/g,""),s*=Number(n)}return s},isNaN:function(n){return typeof n=="number"&&isNaN(n)},includes:function(n,r){return n.indexOf(r)!==-1},insert:function(n,r,l){return n.slice(0,l)+r+n.slice(l)},reduce:function(n,r){if(this===null)throw new TypeError("Array.prototype.reduce called on null or undefined");if(typeof r!="function")throw new TypeError(r+" is not a function");var l=Object(n),a=l.length>>>0,o=0,s;if(arguments.length===3)s=arguments[2];else{for(;o<a&&!(o in l);)o++;if(o>=a)throw new TypeError("Reduce of empty array with no initial value");s=l[o++]}for(;o<a;o++)o in l&&(s=r(s,l[o],o,l));return s},multiplier:function(n){var r=n.toString().split(".");return r.length<2?1:Math.pow(10,r[1].length)},correctionFactor:function(){var n=Array.prototype.slice.call(arguments);return n.reduce(function(r,l){var a=i.multiplier(l);return r>a?r:a},1)},toFixed:function(n,r,l,a){var o=n.toString().split("."),s=r-(a||0),c,m,y,g;return o.length===2?c=Math.min(Math.max(o[1].length,s),r):c=s,y=Math.pow(10,c),g=(l(n+"e+"+c)/y).toFixed(c),a>r-c&&(m=new RegExp("\\.?0{1,"+(a-(r-c))+"}$"),g=g.replace(m,"")),g}},e.options=b,e.formats=d,e.locales=p,e.locale=function(n){return n&&(b.currentLocale=n.toLowerCase()),b.currentLocale},e.localeData=function(n){if(!n)return p[b.currentLocale];if(n=n.toLowerCase(),!p[n])throw new Error("Unknown locale : "+n);return p[n]},e.reset=function(){for(var n in u)b[n]=u[n]},e.zeroFormat=function(n){b.zeroFormat=typeof n=="string"?n:null},e.nullFormat=function(n){b.nullFormat=typeof n=="string"?n:null},e.defaultFormat=function(n){b.defaultFormat=typeof n=="string"?n:"0.0"},e.register=function(n,r,l){if(r=r.toLowerCase(),this[n+"s"][r])throw new TypeError(r+" "+n+" already registered.");return this[n+"s"][r]=l,l},e.validate=function(n,r){var l,a,o,s,c,m,y,g;if(typeof n!="string"&&(n+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",n)),n=n.trim(),n.match(/^\d+$/))return!0;if(n==="")return!1;try{y=e.localeData(r)}catch{y=e.localeData(e.locale())}return o=y.currency.symbol,c=y.abbreviations,l=y.delimiters.decimal,y.delimiters.thousands==="."?a="\\.":a=y.delimiters.thousands,g=n.match(/^[^\d]+/),g!==null&&(n=n.substr(1),g[0]!==o)||(g=n.match(/[^\d]+$/),g!==null&&(n=n.slice(0,-1),g[0]!==c.thousand&&g[0]!==c.million&&g[0]!==c.billion&&g[0]!==c.trillion))?!1:(m=new RegExp(a+"{2}"),n.match(/[^\d.,]/g)?!1:(s=n.split(l),s.length>2?!1:s.length<2?!!s[0].match(/^\d+.*\d$/)&&!s[0].match(m):s[0].length===1?!!s[0].match(/^\d+$/)&&!s[0].match(m)&&!!s[1].match(/^\d+$/):!!s[0].match(/^\d+.*\d$/)&&!s[0].match(m)&&!!s[1].match(/^\d+$/)))},e.fn=x.prototype={clone:function(){return e(this)},format:function(n,r){var l=this._value,a=n||b.defaultFormat,o,s,c;if(r=r||Math.round,l===0&&b.zeroFormat!==null)s=b.zeroFormat;else if(l===null&&b.nullFormat!==null)s=b.nullFormat;else{for(o in d)if(a.match(d[o].regexps.format)){c=d[o].format;break}c=c||e._.numberToFormat,s=c(l,a,r)}return s},value:function(){return this._value},input:function(){return this._input},set:function(n){return this._value=Number(n),this},add:function(n){var r=i.correctionFactor.call(null,this._value,n);function l(a,o,s,c){return a+Math.round(r*o)}return this._value=i.reduce([this._value,n],l,0)/r,this},subtract:function(n){var r=i.correctionFactor.call(null,this._value,n);function l(a,o,s,c){return a-Math.round(r*o)}return this._value=i.reduce([n],l,Math.round(this._value*r))/r,this},multiply:function(n){function r(l,a,o,s){var c=i.correctionFactor(l,a);return Math.round(l*c)*Math.round(a*c)/Math.round(c*c)}return this._value=i.reduce([this._value,n],r,1),this},divide:function(n){function r(l,a,o,s){var c=i.correctionFactor(l,a);return Math.round(l*c)/Math.round(a*c)}return this._value=i.reduce([this._value,n],r),this},difference:function(n){return Math.abs(e(this._value).subtract(n).value())}},e.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(n){var r=n%10;return~~(n%100/10)===1?"th":r===1?"st":r===2?"nd":r===3?"rd":"th"},currency:{symbol:"$"}}),function(){e.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(n,r,l){var a=e._.includes(r," BPS")?" ":"",o;return n=n*1e4,r=r.replace(/\s?BPS/,""),o=e._.numberToFormat(n,r,l),e._.includes(o,")")?(o=o.split(""),o.splice(-1,0,a+"BPS"),o=o.join("")):o=o+a+"BPS",o},unformat:function(n){return+(e._.stringToNumber(n)*1e-4).toFixed(15)}})}(),function(){var n={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},r={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},l=n.suffixes.concat(r.suffixes.filter(function(o){return n.suffixes.indexOf(o)<0})),a=l.join("|");a="("+a.replace("B","B(?!PS)")+")",e.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(a)},format:function(o,s,c){var m,y=e._.includes(s,"ib")?r:n,g=e._.includes(s," b")||e._.includes(s," ib")?" ":"",h,E,w;for(s=s.replace(/\s?i?b/,""),h=0;h<=y.suffixes.length;h++)if(E=Math.pow(y.base,h),w=Math.pow(y.base,h+1),o===null||o===0||o>=E&&o<w){g+=y.suffixes[h],E>0&&(o=o/E);break}return m=e._.numberToFormat(o,s,c),m+g},unformat:function(o){var s=e._.stringToNumber(o),c,m;if(s){for(c=n.suffixes.length-1;c>=0;c--){if(e._.includes(o,n.suffixes[c])){m=Math.pow(n.base,c);break}if(e._.includes(o,r.suffixes[c])){m=Math.pow(r.base,c);break}}s*=m||1}return s}})}(),function(){e.register("format","currency",{regexps:{format:/(\$)/},format:function(n,r,l){var a=e.locales[e.options.currentLocale],o={before:r.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:r.match(/([\+|\-|\)|\s|\$]*)$/)[0]},s,c,m;for(r=r.replace(/\s?\$\s?/,""),s=e._.numberToFormat(n,r,l),n>=0?(o.before=o.before.replace(/[\-\(]/,""),o.after=o.after.replace(/[\-\)]/,"")):n<0&&!e._.includes(o.before,"-")&&!e._.includes(o.before,"(")&&(o.before="-"+o.before),m=0;m<o.before.length;m++)switch(c=o.before[m],c){case"$":s=e._.insert(s,a.currency.symbol,m);break;case" ":s=e._.insert(s," ",m+a.currency.symbol.length-1);break}for(m=o.after.length-1;m>=0;m--)switch(c=o.after[m],c){case"$":s=m===o.after.length-1?s+a.currency.symbol:e._.insert(s,a.currency.symbol,-(o.after.length-(1+m)));break;case" ":s=m===o.after.length-1?s+" ":e._.insert(s," ",-(o.after.length-(1+m)+a.currency.symbol.length-1));break}return s}})}(),function(){e.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(n,r,l){var a,o=typeof n=="number"&&!e._.isNaN(n)?n.toExponential():"0e+0",s=o.split("e");return r=r.replace(/e[\+|\-]{1}0/,""),a=e._.numberToFormat(Number(s[0]),r,l),a+"e"+s[1]},unformat:function(n){var r=e._.includes(n,"e+")?n.split("e+"):n.split("e-"),l=Number(r[0]),a=Number(r[1]);a=e._.includes(n,"e-")?a*=-1:a;function o(s,c,m,y){var g=e._.correctionFactor(s,c),h=s*g*(c*g)/(g*g);return h}return e._.reduce([l,Math.pow(10,a)],o,1)}})}(),function(){e.register("format","ordinal",{regexps:{format:/(o)/},format:function(n,r,l){var a=e.locales[e.options.currentLocale],o,s=e._.includes(r," o")?" ":"";return r=r.replace(/\s?o/,""),s+=a.ordinal(n),o=e._.numberToFormat(n,r,l),o+s}})}(),function(){e.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(n,r,l){var a=e._.includes(r," %")?" ":"",o;return e.options.scalePercentBy100&&(n=n*100),r=r.replace(/\s?\%/,""),o=e._.numberToFormat(n,r,l),e._.includes(o,")")?(o=o.split(""),o.splice(-1,0,a+"%"),o=o.join("")):o=o+a+"%",o},unformat:function(n){var r=e._.stringToNumber(n);return e.options.scalePercentBy100?r*.01:r}})}(),function(){e.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(n,r,l){var a=Math.floor(n/60/60),o=Math.floor((n-a*60*60)/60),s=Math.round(n-a*60*60-o*60);return a+":"+(o<10?"0"+o:o)+":"+(s<10?"0"+s:s)},unformat:function(n){var r=n.split(":"),l=0;return r.length===3?(l=l+Number(r[0])*60*60,l=l+Number(r[1])*60,l=l+Number(r[2])):r.length===2&&(l=l+Number(r[0])*60,l=l+Number(r[1])),Number(l)}})}(),e})})(Re);var Pt=Re.exports;const Ft=Ye(Pt);function jt(t){const e=t?Ft(t).format("0.00a"):"";return Bt(e,".00")}function Bt(t,e=".00"){return t.includes(e)?t.replace(e,""):t}function Te({title:t,total:e,icon:i,color:f="primary",sx:d,...p}){return $.jsxs(Ze,{component:$e,spacing:3,direction:"row",sx:{px:3,py:5,borderRadius:2,...d},...p,children:[i&&$.jsx(Je,{sx:{width:64,height:64},children:i}),$.jsxs($e,{spacing:.5,children:[$.jsx(ae,{variant:"h4",children:jt(e)}),$.jsx(ae,{variant:"subtitle2",sx:{color:"text.disabled"},children:t})]})]})}Te.propTypes={color:Q.string,icon:Q.oneOfType([Q.element,Q.string]),sx:Q.object,title:Q.string,total:Q.number};let ne=Pe("token").split(":")[0];function Lt(){const[t,e]=T.useState([]),[i,f]=T.useState(!0),[d,p]=T.useState(""),[u,b]=T.useState(""),[x,n]=T.useState(0),r=async()=>{var l,a;try{const o=await oe.get("https://otpninja.com/api/v1/getprofile",{headers:{"X-OTPNINJA-TOKEN":ne}});b(((l=o.data.data[0])==null?void 0:l.username)||""),O.success(`Welcome back ${((a=o.data.data[0])==null?void 0:a.username)||"User"}!`,{position:"top-right",autoClose:7e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,style:{backgroundColor:"green",color:"white",fontWeight:"bold"}});const s=await oe.get("https://otpninja.com/api/v1/listnumbers?type=mdn",{headers:{"X-OTPNINJA-TOKEN":ne}}),c=await oe.get("https://otpninja.com/api/v1/listnumbers?type=otp",{headers:{"X-OTPNINJA-TOKEN":ne}}),m=[...new Set(s.data.data.map(w=>w.number))],y=[...new Set(c.data.data.map(w=>w.number))],g=m.length,h=y.length;e([{title:"Total Rentals Numbers",total:g,color:"primary",icon:"ic_globe"},{title:"Total Verification Numbers",total:h,color:"secondary",icon:"ic_flag"}]);const E=await oe.get("https://otpninja.com/api/v1/getbalance",{headers:{"X-OTPNINJA-TOKEN":ne}});n(E.data.balance)}catch{p("Failed to fetch data.")}finally{f(!1)}};return T.useEffect(()=>{(async()=>{ne=Pe("token").split(":")[0];const a=await oe.get("https://otpninja.com/api/v1/getsession",{headers:{"X-OTPNINJA-TOKEN":ne}});console.log(a.data);const o=a.data;if(o.data){console.log(o.data[0]);const s=o.data[0];localStorage.setItem("loginResponse",s),s.token||(p("User is not authenticated."),f(!1),window.location.href="https://otpninja.com/login"),r()}else p("User is not authenticated."),f(!1),window.location.href="https://otpninja.com/login"})()},[]),i?$.jsxs("div",{children:[$.jsx(ae,{children:"Loading..."}),$.jsx(Oe,{})," "]}):d?$.jsx(ae,{color:"error",children:d}):$.jsxs(vt,{maxWidth:"xl",children:[$.jsx(ae,{variant:"h4",sx:{mb:5},children:u?`Hi, Welcome back ${u} 👋`:"Hi, Welcome back 👋"}),$.jsxs(ve,{container:!0,spacing:4,justifyContent:"center",children:[$.jsx(ve,{item:!0,xs:11,sm:6,md:3,justifyContent:"center",children:$.jsx(Te,{title:"Balance",total:x,color:"success",icon:$.jsx("div",{style:{backgroundColor:"hsl(201, 95%, 60%)",padding:"8px",borderRadius:"50%",display:"inline-block"},children:$.jsx("img",{src:"/assets/icons/navbar/ic_walllet.svg",alt:"wallet icon",style:{width:24,height:24,display:"block"}})})})}),Array.isArray(t)&&t.map((l,a)=>$.jsx(ve,{item:!0,xs:11,sm:6,md:3,children:$.jsx(Te,{title:l.title||"Work Ongoing",total:l.total||0,color:l.color||"blue",icon:$.jsx("div",{style:{backgroundColor:"hsl(201, 95%, 60%)",padding:"8px",borderRadius:"50%",display:"inline-block"},children:$.jsx("img",{src:l.icon?`/assets/icons/navbar/${l.icon}.svg`:"/assets/icons/navbar/ic_default.svg",alt:l.icon?`${l.icon} icon`:"default icon",style:{width:24,height:24,display:"block"}})})})},a))]}),$.jsx(Oe,{})," "]})}function zt(){return $.jsxs($.Fragment,{children:[$.jsx(Qe,{children:$.jsx("title",{children:" Dashboard | Otp Ninja "})}),$.jsx(Lt,{})]})}export{zt as default};
