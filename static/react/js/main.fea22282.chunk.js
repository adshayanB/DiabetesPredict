(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{23:function(e,t,a){},24:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),l=a.n(c),o=(a(23),a(6)),i=a(7),u=a(1),s=(a(24),Object(n.createContext)()),m=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home"),r.a.createElement(i.b,{to:"/predict"},"Go To Predictor"))},p=a(13),d=a.n(p),b=a(18),h=function(){var e=Object(u.f)(),t=Object(n.useContext)(s),a=Object(n.useState)(0),c=Object(o.a)(a,2),l=c[0],m=c[1],p=Object(n.useState)(0),h=Object(o.a)(p,2),f=h[0],E=h[1],g=Object(n.useState)(0),O=Object(o.a)(g,2),j=O[0],v=O[1],x=Object(n.useState)(0),N=Object(o.a)(x,2),S=N[0],y=N[1],C=Object(n.useState)(0),P=Object(o.a)(C,2),k=P[0],G=P[1],D=Object(n.useState)(0),T=Object(o.a)(D,2),w=T[0],B=T[1],A=Object(n.useState)(0),F=Object(o.a)(A,2),I=F[0],J=F[1],H=Object(n.useState)(0),Y=Object(o.a)(H,2),M=Y[0],R=Y[1],q=function(){var a=Object(b.a)(d.a.mark((function a(n){var r,c;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.next=3,fetch("/api/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pregnancies:l,glucose:f,bloodpressure:j,skinthickness:S,insulin:k,bmi:w,dpf:I,age:M})});case 3:return r=a.sent,a.next=6,r.json();case 6:c=a.sent,console.log(c[0]),t.assignPredictionFunction(c[0]),e.push("/results");case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Predictor Form"),r.a.createElement("form",{onSubmit:q,className:"predict-container"},r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Pregnancies",onChange:function(e){return m(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Glucose",onChange:function(e){return E(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Bloodpressure",onChange:function(e){return v(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Skinthickness",onChange:function(e){return y(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Insulin",onChange:function(e){return G(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Bmi",onChange:function(e){return B(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Dpf",onChange:function(e){return J(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Age",onChange:function(e){return R(e.target.value)}}),r.a.createElement("button",{className:"predict-form-item",type:"submit"},"Predict")),r.a.createElement(i.b,{to:"/"},"Go Home"))},f=function(){var e;return e=Object(n.useContext)(s).statePrediction?r.a.createElement("h2",{className:"result-bad"},"Oops! You have DIABETES."):r.a.createElement("h2",{className:"result-good"},"Great! You DON'T have diabetes."),r.a.createElement("div",null,r.a.createElement("h1",null,"Results"),e,r.a.createElement(i.b,{to:"/predict"},"Go to Predictor"),r.a.createElement("br",null),r.a.createElement(i.b,{to:"/"},"Go home"))};var E=function(){var e=Object(n.useState)(!1),t=Object(o.a)(e,2),a=t[0],c=t[1];return r.a.createElement(s.Provider,{value:{statePrediction:a,assignPredictionFunction:function(e){return function(e){c(e)}(e)}}},r.a.createElement(i.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("h1",null,"Diabetes Predictor"),r.a.createElement(u.c,null,r.a.createElement(u.a,{exact:!0,path:"/",component:m}),r.a.createElement(u.a,{exact:!0,path:"/predict",component:h}),r.a.createElement(u.a,{exact:!0,path:"/results",component:f})))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.fea22282.chunk.js.map