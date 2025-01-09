import{g as W,o as q,h as v,_ as i,i as F,r as f,k as M,b as S,j as C,d as I,f as R,Y as J}from"./index-9ed829b0.js";import{i as K,d as w,F as Q,a as O,f as B}from"./Select-90119a6b.js";import{i as $}from"./isMuiElement-1bc5abbc.js";function V(r){return W("MuiFormControl",r)}q("MuiFormControl",["root","marginNone","marginNormal","marginDense","fullWidth","disabled"]);const X=["children","className","color","component","disabled","error","focused","fullWidth","hiddenLabel","margin","required","size","variant"],Z=r=>{const{classes:e,margin:s,fullWidth:o}=r,n={root:["root",s!=="none"&&`margin${F(s)}`,o&&"fullWidth"]};return R(n,V,e)},rr=v("div",{name:"MuiFormControl",slot:"Root",overridesResolver:({ownerState:r},e)=>i({},e.root,e[`margin${F(r.margin)}`],r.fullWidth&&e.fullWidth)})(({ownerState:r})=>i({display:"inline-flex",flexDirection:"column",position:"relative",minWidth:0,padding:0,margin:0,border:0,verticalAlign:"top"},r.margin==="normal"&&{marginTop:16,marginBottom:8},r.margin==="dense"&&{marginTop:8,marginBottom:4},r.fullWidth&&{width:"100%"})),er=f.forwardRef(function(e,s){const o=M({props:e,name:"MuiFormControl"}),{children:n,className:c,color:l="primary",component:u="div",disabled:t=!1,error:a=!1,focused:d,fullWidth:m=!1,hiddenLabel:x=!1,margin:D="none",required:g=!1,size:k="medium",variant:L="outlined"}=o,T=S(o,X),y=i({},o,{color:l,component:u,disabled:t,error:a,fullWidth:m,hiddenLabel:x,margin:D,required:g,size:k,variant:L}),H=Z(y),[N,Y]=f.useState(()=>{let b=!1;return n&&f.Children.forEach(n,p=>{if(!$(p,["Input","Select"]))return;const _=$(p,["Select"])?p.props.input:p;_&&K(_.props)&&(b=!0)}),b}),[A,E]=f.useState(()=>{let b=!1;return n&&f.Children.forEach(n,p=>{$(p,["Input","Select"])&&(w(p.props,!0)||w(p.props.inputProps,!0))&&(b=!0)}),b}),[j,z]=f.useState(!1);t&&j&&z(!1);const U=d!==void 0&&!t?d:j;let P;const G=f.useMemo(()=>({adornedStart:N,setAdornedStart:Y,color:l,disabled:t,error:a,filled:A,focused:U,fullWidth:m,hiddenLabel:x,size:k,onBlur:()=>{z(!1)},onEmpty:()=>{E(!1)},onFilled:()=>{E(!0)},onFocus:()=>{z(!0)},registerEffect:P,required:g,variant:L}),[N,l,t,a,A,U,m,x,P,g,k,L]);return C.jsx(Q.Provider,{value:G,children:C.jsx(rr,i({as:u,ownerState:y,className:I(H.root,c),ref:s},T,{children:n}))})}),Cr=er;function or(r){return W("MuiFormLabel",r)}const sr=q("MuiFormLabel",["root","colorSecondary","focused","disabled","error","filled","required","asterisk"]),h=sr,tr=["children","className","color","component","disabled","error","filled","focused","required"],ar=r=>{const{classes:e,color:s,focused:o,disabled:n,error:c,filled:l,required:u}=r,t={root:["root",`color${F(s)}`,n&&"disabled",c&&"error",l&&"filled",o&&"focused",u&&"required"],asterisk:["asterisk",c&&"error"]};return R(t,or,e)},nr=v("label",{name:"MuiFormLabel",slot:"Root",overridesResolver:({ownerState:r},e)=>i({},e.root,r.color==="secondary"&&e.colorSecondary,r.filled&&e.filled)})(({theme:r,ownerState:e})=>i({color:(r.vars||r).palette.text.secondary},r.typography.body1,{lineHeight:"1.4375em",padding:0,position:"relative",[`&.${h.focused}`]:{color:(r.vars||r).palette[e.color].main},[`&.${h.disabled}`]:{color:(r.vars||r).palette.text.disabled},[`&.${h.error}`]:{color:(r.vars||r).palette.error.main}})),ir=v("span",{name:"MuiFormLabel",slot:"Asterisk",overridesResolver:(r,e)=>e.asterisk})(({theme:r})=>({[`&.${h.error}`]:{color:(r.vars||r).palette.error.main}})),lr=f.forwardRef(function(e,s){const o=M({props:e,name:"MuiFormLabel"}),{children:n,className:c,component:l="label"}=o,u=S(o,tr),t=O(),a=B({props:o,muiFormControl:t,states:["color","required","focused","disabled","error","filled"]}),d=i({},o,{color:a.color||"primary",component:l,disabled:a.disabled,error:a.error,filled:a.filled,focused:a.focused,required:a.required}),m=ar(d);return C.jsxs(nr,i({as:l,ownerState:d,className:I(m.root,c),ref:s},u,{children:[n,a.required&&C.jsxs(ir,{ownerState:d,"aria-hidden":!0,className:m.asterisk,children:[" ","*"]})]}))}),dr=lr;function cr(r){return W("MuiInputLabel",r)}q("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);const ur=["disableAnimation","margin","shrink","variant","className"],mr=r=>{const{classes:e,formControl:s,size:o,shrink:n,disableAnimation:c,variant:l,required:u}=r,t={root:["root",s&&"formControl",!c&&"animated",n&&"shrink",o&&o!=="normal"&&`size${F(o)}`,l],asterisk:[u&&"asterisk"]},a=R(t,cr,e);return i({},e,a)},fr=v(dr,{shouldForwardProp:r=>J(r)||r==="classes",name:"MuiInputLabel",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[{[`& .${h.asterisk}`]:e.asterisk},e.root,s.formControl&&e.formControl,s.size==="small"&&e.sizeSmall,s.shrink&&e.shrink,!s.disableAnimation&&e.animated,s.focused&&e.focused,e[s.variant]]}})(({theme:r,ownerState:e})=>i({display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},e.formControl&&{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"},e.size==="small"&&{transform:"translate(0, 17px) scale(1)"},e.shrink&&{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"},!e.disableAnimation&&{transition:r.transitions.create(["color","transform","max-width"],{duration:r.transitions.duration.shorter,easing:r.transitions.easing.easeOut})},e.variant==="filled"&&i({zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},e.size==="small"&&{transform:"translate(12px, 13px) scale(1)"},e.shrink&&i({userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"},e.size==="small"&&{transform:"translate(12px, 4px) scale(0.75)"})),e.variant==="outlined"&&i({zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},e.size==="small"&&{transform:"translate(14px, 9px) scale(1)"},e.shrink&&{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 32px)",transform:"translate(14px, -9px) scale(0.75)"}))),pr=f.forwardRef(function(e,s){const o=M({name:"MuiInputLabel",props:e}),{disableAnimation:n=!1,shrink:c,className:l}=o,u=S(o,ur),t=O();let a=c;typeof a>"u"&&t&&(a=t.filled||t.focused||t.adornedStart);const d=B({props:o,muiFormControl:t,states:["size","variant","required","focused"]}),m=i({},o,{disableAnimation:n,formControl:t,shrink:a,size:d.size,variant:d.variant,required:d.required,focused:d.focused}),x=mr(m);return C.jsx(fr,i({"data-shrink":a,ownerState:m,ref:s,className:I(x.root,l)},u,{classes:x}))}),vr=pr;export{Cr as F,vr as I};
