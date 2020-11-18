(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{29:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(13),c=a.n(s),i=a(2),o=a(10),l=a(4),u=(a(29),Object(n.createContext)()),m=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home"),r.a.createElement(o.b,{to:"/predict"},"Go To Predictor"),r.a.createElement("br",null),r.a.createElement(o.b,{to:"/auth"},"Go To Login/Register"))},d=a(11),p=a.n(d),b=a(12),g=function(){var e=Object(l.f)(),t=Object(n.useContext)(u),a=Object(n.useState)(0),s=Object(i.a)(a,2),c=s[0],m=s[1],d=Object(n.useState)(0),g=Object(i.a)(d,2),f=g[0],h=g[1],E=Object(n.useState)(0),O=Object(i.a)(E,2),j=O[0],v=O[1],N=Object(n.useState)(0),y=Object(i.a)(N,2),S=y[0],w=y[1],x=Object(n.useState)(0),k=Object(i.a)(x,2),C=k[0],T=k[1],A=Object(n.useState)(0),P=Object(i.a)(A,2),q=P[0],D=P[1],F=Object(n.useState)(0),G=Object(i.a)(F,2),L=G[0],R=G[1],z=Object(n.useState)(0),B=Object(i.a)(z,2),J=B[0],Y=B[1],H=function(){var a=Object(b.a)(p.a.mark((function a(n){var r,s;return p.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.next=3,fetch("/api/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pregnancies:c,glucose:f,bloodpressure:j,skinthickness:S,insulin:C,bmi:q,dpf:L,age:J})});case 3:return r=a.sent,a.next=6,r.json();case 6:s=a.sent,console.log(s[0]),t.assignPredictionFunction(s[0]),e.push("/results");case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null,"Predictor Form"),r.a.createElement("form",{onSubmit:H,className:"predict-container"},r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Pregnancies",onChange:function(e){return m(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Glucose",onChange:function(e){return h(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Bloodpressure",onChange:function(e){return v(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Skinthickness",onChange:function(e){return w(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Insulin",onChange:function(e){return T(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Bmi",onChange:function(e){return D(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Dpf",onChange:function(e){return R(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item",type:"text",placeholder:"Age",onChange:function(e){return Y(e.target.value)}}),r.a.createElement("button",{className:"predict-form-item",type:"submit"},"Predict")),r.a.createElement(o.b,{to:"/"},"Go Home"))},f=function(){var e;return e=Object(n.useContext)(u).statePrediction?r.a.createElement("h2",{className:"result-bad"},"Oops! You have DIABETES."):r.a.createElement("h2",{className:"result-good"},"Great! You DON'T have diabetes."),r.a.createElement("div",null,r.a.createElement("h1",null,"Results"),e,r.a.createElement(o.b,{to:"/predict"},"Go to Predictor"),r.a.createElement("br",null),r.a.createElement(o.b,{to:"/"},"Go home"))},h=(a(36),function(e){var t,a,s=Object(n.useContext)(u),c=Object(n.useState)(""),o=Object(i.a)(c,2),l=o[0],m=o[1],d=Object(n.useState)(""),g=Object(i.a)(d,2),f=g[0],h=g[1],E=Object(n.useState)(""),O=Object(i.a)(E,2),j=O[0],v=O[1],N=Object(n.useState)(""),y=Object(i.a)(N,2),S=y[0],w=y[1],x=Object(n.useState)(!1),k=Object(i.a)(x,2),C=k[0],T=k[1],A=function(){var e=Object(b.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:l,password:f})});case 3:return a=e.sent,e.next=6,a.json();case 6:if(n=e.sent,s.assignTokenFunction(n.token),console.log(n),!n.token){e.next=19;break}return e.next=12,fetch("/api/user",{headers:{"x-access-tokens":n.token}});case 12:return a=e.sent,e.next=15,a.json();case 15:n=e.sent,console.log(n.firstName),v(", "+n.firstName),w(n.lastName);case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return C?(t=r.a.createElement("div",{className:"hide-password",onClick:function(){return T(!1)}}),a="text"):(t=r.a.createElement("div",{className:"show-password",onClick:function(){return T(!0)}}),a="password"),r.a.createElement("div",{className:"login-container"},r.a.createElement("h1",{className:"welcome-message"},"Welcome",j," ",S),r.a.createElement("form",{className:"login-form",onSubmit:A},r.a.createElement("input",{className:"login-form-item login-input",type:"text",placeholder:"Email",onChange:function(e){return m(e.target.value)}}),r.a.createElement("div",{className:"password-container"},r.a.createElement("input",{className:"password-item login-input",type:a,placeholder:"Password",onChange:function(e){return h(e.target.value)}}),t),r.a.createElement("button",{className:"login-form-item login-button",type:"submit"},"Sign in")),r.a.createElement("h5",{className:"forgot-password"},"Forgot your password?"))}),E=(a(37),function(e){var t,a,s,c,o,l=Object(n.useState)(""),u=Object(i.a)(l,2),m=u[0],d=u[1],g=Object(n.useState)(""),f=Object(i.a)(g,2),h=f[0],E=f[1],O=Object(n.useState)(""),j=Object(i.a)(O,2),v=j[0],N=j[1],y=Object(n.useState)(""),S=Object(i.a)(y,2),w=S[0],x=S[1],k=Object(n.useState)(""),C=Object(i.a)(k,2),T=C[0],A=C[1],P=Object(n.useState)(""),q=Object(i.a)(P,2),D=q[0],F=q[1],G=Object(n.useState)(0),L=Object(i.a)(G,2),R=L[0],z=L[1],B=Object(n.useState)(!1),J=Object(i.a)(B,2),Y=J[0],H=J[1],I=Object(n.useState)(!1),Z=Object(i.a)(I,2),$=Z[0],U=Z[1],M=Object(n.useState)(!1),W=Object(i.a)(M,2),_=W[0],K=W[1],Q=Object(n.useState)(!1),V=Object(i.a)(Q,2),X=(V[0],V[1],Object(n.useState)("")),ee=Object(i.a)(X,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(""),re=Object(i.a)(ne,2),se=re[0],ce=re[1],ie=Object(n.useState)(""),oe=Object(i.a)(ie,2),le=oe[0],ue=oe[1],me=Object(n.useState)(""),de=Object(i.a)(me,2),pe=de[0],be=de[1],ge=Object(n.useState)(""),fe=Object(i.a)(ge,2),he=fe[0],Ee=fe[1],Oe=Object(n.useState)(""),je=Object(i.a)(Oe,2),ve=je[0],Ne=je[1],ye=Object(n.useState)(""),Se=Object(i.a)(ye,2),we=Se[0],xe=Se[1],ke=Object(n.useState)(""),Ce=Object(i.a)(ke,2),Te=Ce[0],Ae=Ce[1],Pe=Object(n.useState)(""),qe=Object(i.a)(Pe,2),De=qe[0],Fe=qe[1],Ge=Object(n.useState)(""),Le=Object(i.a)(Ge,2),Re=Le[0],ze=Le[1],Be="border-normal",Je="border-normal",Ye="border-normal",He="border-normal",Ie="border-normal",Ze=function(){var t=Object(b.a)(p.a.mark((function t(a){var n,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),K(!0),We(),!(te||se||le||pe||he)){t.next=5;break}return t.abrupt("return");case 5:return t.next=7,fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:v,lastName:w,email:m,healthCard:"",phoneNumber:D,password:h,confirmPassword:T})});case 7:return n=t.sent,t.next=10,n.json();case 10:r=t.sent,console.log(r),"User Created"===r.message?e.assignRegNotif(["Registration Successful!","Thank you for registering ".concat(v,", please verify your account by clicking the verification link sent to your email."),"success"]):"User already exists"===r.message&&e.assignRegNotif(["Email already in use!","A user with the email ".concat(m," already exists. Please use another email."),"danger"]);case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),$e=function(e){return/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e)},Ue=function(e){return/^\d*$/.test(e)},Me=function(){""!==Re&&ze(""),""!==Te&&Ae(""),""!==De&&Fe(""),""!==ve&&Ne(""),""!==we&&xe("")};Y?(c=r.a.createElement("div",{className:"hide-password",onClick:function(){return H(!1)}}),a="text"):(c=r.a.createElement("div",{className:"show-password",onClick:function(){return H(!0)}}),a="password"),$?(o=r.a.createElement("div",{className:"hide-password",onClick:function(){return U(!1)}}),s="text"):(o=r.a.createElement("div",{className:"show-password",onClick:function(){return U(!0)}}),s="password");var We=function(){""===h?(Ee("A password is required"),z(2),ze("shake-error")):h.length<8?(Ee("The password must be at least 8 characters long"),z(2),ze("shake-error")):h!==T?(Ee("The passwords do not match"),z(2),ze("shake-error")):(Ee(""),ze("")),""===m?(ue("An email is required"),z(1),Ae("shake-error")):$e(m)?(ue(""),Ae("")):(ue("You have entered an invalid email"),z(1),Ae("shake-error")),Ue(D)?(be(""),Fe("")):(be("The phone number may only contain numbers"),z(1),Fe("shake-error")),""===v?(ae("A first name is required"),z(0),Ne("shake-error")):(ae(""),Ne("")),""===w?(ce("A last name is required"),z(0),xe("shake-error")):(ce(""),xe(""))};return""===h?"A password is required"!==he&&Ee("A password is required"):h.length<8?"The password must be at least 8 characters long"!==he&&Ee("The password must be at least 8 characters long"):h!==T?"The passwords do not match"!==he&&Ee("The passwords do not match"):""!==he&&Ee(""),""===m?"An email is required"!==le&&ue("An email is required"):$e(m)?""!==le&&ue(""):"You have entered an invalid email"!==le&&ue("You have entered an invalid email"),Ue(D)?""!==pe&&be(""):"The phone number may only contain numbers"!==pe&&be("The phone number may only contain numbers"),""===v?"A first name is required"!==te&&ae("A first name is required"):""!==te&&ae(""),""===w?"A last name is required"!==se&&ce("A last name is required"):""!==se&&ce(""),te&&(Be="border-error"),se&&(Je="border-error"),le&&(Ye="border-error"),pe&&(He="border-error"),he&&(Ie="border-error"),t=0===R?r.a.createElement("form",{className:"register-form",onSubmit:function(e){e.preventDefault(),z(1),Me()}},r.a.createElement("h5",{className:"input-error-message"},_?te:null),r.a.createElement("input",{className:"register-form-item register-input ".concat(_?Be:"border-normal"," ").concat(ve),value:v,type:"text",placeholder:"First Name",onChange:function(e){return N(e.target.value)}}),r.a.createElement("h5",{className:"input-error-message"},_?se:null),r.a.createElement("input",{className:"register-form-item register-input ".concat(_?Je:"border-normal"," ").concat(we),value:w,type:"text",placeholder:"Last Name",onChange:function(e){return x(e.target.value)}}),r.a.createElement("div",{className:"submission-buttons"},r.a.createElement("button",{className:"register-form-item register-button",type:"submit"},"Next"))):1===R?r.a.createElement("form",{className:"register-form",onSubmit:function(e){e.preventDefault(),z(2),Me()}},r.a.createElement("h5",{className:"input-error-message"},_?le:null),r.a.createElement("input",{className:"register-form-item register-input ".concat(_?Ye:"border-normal"," ").concat(Te),value:m,type:"text",placeholder:"Email",onChange:function(e){return d(e.target.value)}}),r.a.createElement("h5",{className:"input-error-message"},_?pe:null),r.a.createElement("input",{className:"register-form-item register-input ".concat(_?He:"border-normal"," ").concat(De),value:D,type:"text",placeholder:"Phone Number",onChange:function(e){return F(e.target.value)}}),r.a.createElement("div",null),r.a.createElement("div",{className:"submission-buttons"},r.a.createElement("button",{className:"register-form-item back-button",type:"button",onClick:function(){return z(0)}},"Back"),r.a.createElement("div",{className:"register-form-item"}),r.a.createElement("button",{className:"register-form-item register-button",type:"submit"},"Next"))):r.a.createElement("form",{className:"register-form",onSubmit:Ze},r.a.createElement("h5",{className:"input-error-message"},_?he:null),r.a.createElement("div",{className:"password-container"},r.a.createElement("input",{className:"password-item register-input ".concat(_?Ie:"border-normal"," ").concat(Re),type:a,value:h,placeholder:"Password",onChange:function(e){return E(e.target.value)}}),c),r.a.createElement("div",{className:"password-container"},r.a.createElement("input",{className:"password-item register-input ".concat(_?Ie:"border-normal"," ").concat(Re),type:s,value:T,placeholder:"Confirm Password",onChange:function(e){return A(e.target.value)}}),o),undefined,r.a.createElement("div",{className:"submission-buttons"},r.a.createElement("button",{className:"register-form-item back-button",type:"button",onClick:function(){return z(1)}},"Back"),r.a.createElement("div",{className:"register-form-item"}),r.a.createElement("button",{className:"register-form-item register-button",type:"submit"},"Sign up"))),r.a.createElement("div",{className:"register-container"},r.a.createElement("h1",{className:"welcome-message"},"Create account"),t)}),O=a(45),j=a(44),v=(a(38),function(){var e,t,a,s,c=Object(n.useState)(!1),o=Object(i.a)(c,2),l=o[0],u=o[1],m=Object(n.useState)([]),d=Object(i.a)(m,2),p=d[0],b=d[1],g=Object(n.useState)([]),f=Object(i.a)(g,2),v=f[0],N=f[1],y=Object(n.useState)(!1),S=Object(i.a)(y,2),w=S[0],x=S[1],k=Object(n.useState)(!1),C=Object(i.a)(k,2),T=C[0],A=C[1];window.addEventListener("resize",(function(){document.body.classList.add("resize-animation-stopper"),clearTimeout(t),t=setTimeout((function(){document.body.classList.remove("resize-animation-stopper")}),400)}));return e=l?r.a.createElement("div",{className:"gradient-display-background gradient-display-background-register"},r.a.createElement("div",{className:"gradient-display gradient-display-register-rtrue"},r.a.createElement("h1",{className:"gradient-display-text"},"Already have an account?"),r.a.createElement("button",{onClick:function(){return u(!1)},className:"gradient-display-button gradient-display-button-red"},"Login")),r.a.createElement("div",{className:"gradient-display gradient-display-register-bfalse"})):r.a.createElement("div",{className:"gradient-display-background gradient-display-background-login"},r.a.createElement("div",{className:"gradient-display gradient-display-login-rfalse"}),r.a.createElement("div",{className:"gradient-display gradient-display-login-btrue"},r.a.createElement("h1",{className:"gradient-display-text"},"Don't have an account?"),r.a.createElement("button",{onClick:function(){return u(!0)},className:"gradient-display-button gradient-display-button-blue"},"Register"))),p.length&&(a=r.a.createElement(j.a,{className:"alert-align",variant:p[2],onClose:function(){return x(!0),void b([])},dismissible:!0},r.a.createElement(j.a.Heading,null,p[0]),r.a.createElement("p",null,p[1])),!0!==w&&x(!0)),v.length&&(s=r.a.createElement(j.a,{className:"alert-align",variant:v[2],onClose:function(){return A(!0),void N([])},dismissible:!0},r.a.createElement(j.a.Heading,null,v[0]),r.a.createElement("p",null,v[1])),!0!==T&&A(!0)),r.a.createElement("div",{className:"auth-container"},e,r.a.createElement("div",{className:"fill"},r.a.createElement(O.a,{in:l,timeout:500,classNames:"reg-transition",unmountOnExit:!0},r.a.createElement("div",{className:"auth-notification-container"},w&&a)),r.a.createElement(O.a,{in:l,timeout:500,classNames:"reg-transition",unmountOnExit:!0},r.a.createElement(E,{assignRegNotif:function(e){return function(e){b(e)}(e)}}))),r.a.createElement("div",{className:"fill"},r.a.createElement(O.a,{in:!l,timeout:500,classNames:"login-transition",unmountOnExit:!0},r.a.createElement("div",{className:"auth-notification-container"},T&&s)),r.a.createElement(O.a,{in:!l,timeout:500,classNames:"login-transition",unmountOnExit:!0},r.a.createElement(h,{assignLogNotif:function(e){return function(e){N(e)}(e)}}))))});var N=function(){var e=Object(n.useState)(!1),t=Object(i.a)(e,2),a=t[0],s=t[1],c=Object(n.useState)(),d=Object(i.a)(c,2),p=d[0],b=d[1];return r.a.createElement(u.Provider,{value:{statePrediction:a,assignPredictionFunction:function(e){return function(e){s(e)}(e)},stateToken:p,assignTokenFunction:function(e){return function(e){b(e)}(e)}}},r.a.createElement(o.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:m}),r.a.createElement(l.a,{exact:!0,path:"/predict",component:g}),r.a.createElement(l.a,{exact:!0,path:"/results",component:f}),r.a.createElement(l.a,{exact:!0,path:"/auth",component:v})))))};a(39),a(40);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(N,null)),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.9707bf9d.chunk.js.map