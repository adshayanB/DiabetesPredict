(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{23:function(e,t,a){},24:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(16),i=a.n(c),l=(a(23),a(2)),o=a(7),s=a(1),u=(a(24),Object(n.createContext)()),m=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home"),r.a.createElement(o.b,{to:"/predict"},"Go To Predictor"))},p=a(13),d=a.n(p),g=a(18),f=function(){var e=Object(s.f)(),t=Object(n.useContext)(u),a=Object(n.useState)(0),c=Object(l.a)(a,2),i=c[0],m=c[1],p=Object(n.useState)(0),f=Object(l.a)(p,2),b=f[0],E=f[1],h=Object(n.useState)(0),v=Object(l.a)(h,2),y=v[0],N=v[1],O=Object(n.useState)(0),j=Object(l.a)(O,2),x=j[0],S=j[1],C=Object(n.useState)(0),P=Object(l.a)(C,2),k=P[0],w=P[1],D=Object(n.useState)(0),G=Object(l.a)(D,2),T=G[0],A=G[1],B=Object(n.useState)(0),F=Object(l.a)(B,2),R=F[0],I=F[1],J=Object(n.useState)(0),L=Object(l.a)(J,2),H=L[0],U=L[1],Y=function(){var a=Object(g.a)(d.a.mark((function a(n){var r,c;return d.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.next=3,fetch("/api/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pregnancies:i,glucose:b,bloodpressure:y,skinthickness:x,insulin:k,bmi:T,dpf:R,age:H})});case 3:return r=a.sent,a.next=6,r.json();case 6:c=a.sent,console.log(c[0]),t.assignPredictionFunction(c[0]),e.push("/results");case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Predictor Form"),r.a.createElement("form",{onSubmit:Y,className:"predict-container"},r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Pregnancies",onChange:function(e){return m(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Glucose",onChange:function(e){return E(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Bloodpressure",onChange:function(e){return N(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Skinthickness",onChange:function(e){return S(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Insulin",onChange:function(e){return w(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Bmi",onChange:function(e){return A(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Dpf",onChange:function(e){return I(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Age",onChange:function(e){return U(e.target.value)}}),r.a.createElement("button",{className:"predict-form-item",type:"submit"},"Predict")),r.a.createElement(o.b,{to:"/"},"Go Home"))},b=function(){var e;return e=Object(n.useContext)(u).statePrediction?r.a.createElement("h2",{className:"result-bad"},"Oops! You have DIABETES."):r.a.createElement("h2",{className:"result-good"},"Great! You DON'T have diabetes."),r.a.createElement("div",null,r.a.createElement("h1",null,"Results"),e,r.a.createElement(o.b,{to:"/predict"},"Go to Predictor"),r.a.createElement("br",null),r.a.createElement(o.b,{to:"/"},"Go home"))},E=(a(31),function(e){var t=Object(n.useState)(""),a=Object(l.a)(t,2),c=(a[0],a[1]),i=Object(n.useState)(""),o=Object(l.a)(i,2),s=(o[0],o[1]);return r.a.createElement("div",{className:"login-container"},r.a.createElement("h1",{className:"welcome-message"},"Welcome"),r.a.createElement("form",{className:"login-form",onSubmit:function(e){e.preventDefault()}},r.a.createElement("input",{className:"login-form-item login-input",type:"text",placeholder:"Username",onChange:function(e){return c(e.target.value)}}),r.a.createElement("input",{className:"login-form-item login-input",type:"text",placeholder:"Password",onChange:function(e){return s(e.target.value)}}),r.a.createElement("button",{className:"login-form-item login-button",type:"submit"},"Sign in")),r.a.createElement("h3",{className:"forgot-password"},"Forgot your password?"))}),h=(a(32),function(e){var t=Object(n.useState)(""),a=Object(l.a)(t,2),c=(a[0],a[1]),i=Object(n.useState)(""),o=Object(l.a)(i,2),s=(o[0],o[1]),u=Object(n.useState)(""),m=Object(l.a)(u,2),p=(m[0],m[1]),d=Object(n.useState)(""),g=Object(l.a)(d,2),f=(g[0],g[1]);return r.a.createElement("div",{className:"register-container"},r.a.createElement("h1",{className:"welcome-message"},"Create account"),r.a.createElement("form",{className:"register-form",onSubmit:function(e){e.preventDefault()}},r.a.createElement("input",{className:"register-form-item register-input",type:"text",placeholder:"Email",onChange:function(e){return c(e.target.value)}}),r.a.createElement("input",{className:"register-form-item register-input",type:"text",placeholder:"Username",onChange:function(e){return s(e.target.value)}}),r.a.createElement("input",{className:"register-form-item register-input",type:"text",placeholder:"Password",onChange:function(e){return p(e.target.value)}}),r.a.createElement("input",{className:"register-form-item register-input",type:"text",placeholder:"Confirm Password",onChange:function(e){return f(e.target.value)}}),r.a.createElement("button",{className:"register-form-item register-button",type:"submit"},"Sign up")))}),v=(a(33),function(){var e,t=Object(n.useState)(!1),a=Object(l.a)(t,2),c=a[0],i=a[1],o=function(e){i(e)};return e=c?r.a.createElement("div",{className:"gradient-display-background gradient-display-background-register"},r.a.createElement("div",{className:"gradient-display gradient-display-register-rtrue"},r.a.createElement("h1",{className:"gradient-display-text"},"Already have an account?"),r.a.createElement("button",{onClick:function(){return i(!1)},className:"gradient-display-button gradient-display-button-red"},"Login")),r.a.createElement("div",{className:"gradient-display gradient-display-register-bfalse"})):r.a.createElement("div",{className:"gradient-display-background gradient-display-background-login"},r.a.createElement("div",{className:"gradient-display gradient-display-login-rfalse"}),r.a.createElement("div",{className:"gradient-display gradient-display-login-btrue"},r.a.createElement("h1",{className:"gradient-display-text"},"Don't have an account?"),r.a.createElement("button",{onClick:function(){return i(!0)},className:"gradient-display-button gradient-display-button-blue"},"Register"))),r.a.createElement("div",{className:"auth-container"},e,r.a.createElement(h,{assignLoginReg:function(e){return o(e)}}),r.a.createElement(E,{assignLoginReg:function(e){return o(e)}}))});var y=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],c=t[1];return r.a.createElement(u.Provider,{value:{statePrediction:a,assignPredictionFunction:function(e){return function(e){c(e)}(e)}}},r.a.createElement(o.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",component:m}),r.a.createElement(s.a,{exact:!0,path:"/predict",component:f}),r.a.createElement(s.a,{exact:!0,path:"/results",component:b}),r.a.createElement(s.a,{exact:!0,path:"/auth",component:v})))))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root"))}},[[34,1,2]]]);
//# sourceMappingURL=main.3077a7b2.chunk.js.map