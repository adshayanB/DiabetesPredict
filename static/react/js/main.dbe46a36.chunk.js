(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t,a){},154:function(e,t,a){},155:function(e,t,a){},156:function(e,t,a){},161:function(e,t,a){},162:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(25),i=a.n(s),c=a(3),o=a(9),l=a(7),u=(a(96),Object(n.createContext)()),m=function(){var e=Object(n.useContext)(u);return Object(n.useLayoutEffect)((function(){e.assignShowNav(!0)}),[]),r.a.createElement("div",null,r.a.createElement("h1",null,"Home"))},d=a(11),p=a.n(d),b=a(16),f=(a(98),function(){var e=Object(l.f)(),t=Object(n.useContext)(u),a=Object(n.useState)(0),s=Object(c.a)(a,2),i=s[0],o=s[1],m=Object(n.useState)(0),d=Object(c.a)(m,2),f=d[0],g=d[1],h=Object(n.useState)(0),v=Object(c.a)(h,2),E=v[0],N=v[1],k=Object(n.useState)(0),x=Object(c.a)(k,2),O=x[0],j=x[1],y=Object(n.useState)(0),S=Object(c.a)(y,2),w=S[0],C=S[1],A=Object(n.useState)(0),T=Object(c.a)(A,2),L=T[0],P=T[1],D=Object(n.useState)(0),R=Object(c.a)(D,2),F=R[0],B=R[1],Y=Object(n.useState)(0),q=Object(c.a)(Y,2),G=q[0],I=q[1];Object(n.useLayoutEffect)((function(){t.assignShowNav(!0)}));var V=function(){var a=Object(b.a)(p.a.mark((function a(n){var r,s;return p.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.next=3,fetch("/api/predict",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pregnancies:i,glucose:f,bloodpressure:E,skinthickness:O,insulin:w,bmi:L,dpf:F,age:G})});case 3:return r=a.sent,a.next=6,r.json();case 6:s=a.sent,t.assignPredictionFunction(s[0]),e.push("/results");case 9:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement("div",{className:"predict-main-container"},r.a.createElement("div",{className:"predict-split-container"},r.a.createElement("h1",{className:"predict-title"},"Predictor Form"),r.a.createElement("form",{onSubmit:V,className:"predict-form"},r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Pregnancies",onChange:function(e){return o(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Glucose",onChange:function(e){return g(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Bloodpressure",onChange:function(e){return N(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Skinthickness",onChange:function(e){return j(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Insulin",onChange:function(e){return C(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Bmi",onChange:function(e){return P(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Dpf",onChange:function(e){return B(e.target.value)}}),r.a.createElement("input",{className:"predict-form-item predict-input",type:"text",placeholder:"Age",onChange:function(e){return I(e.target.value)}}),r.a.createElement("button",{className:"predict-form-item predict-button",type:"submit"},"Predict"))),r.a.createElement("div",{className:"predict-split-container"}))}),g=function(){var e;return e=Object(n.useContext)(u).statePrediction?r.a.createElement("h2",{className:"result-bad"},"Oops! You have DIABETES."):r.a.createElement("h2",{className:"result-good"},"Great! You DON'T have diabetes."),r.a.createElement("div",null,r.a.createElement("h1",null,"Results"),e,r.a.createElement(o.b,{to:"/predict"},"Go to Predictor"),r.a.createElement("br",null),r.a.createElement(o.b,{to:"/"},"Go home"))},h=(a(104),a(31)),v=a.n(h),E=a(37),N=function(e){var t,a,s=Object(n.useContext)(u),i=Object(l.f)(),o=Object(n.useState)(""),m=Object(c.a)(o,2),d=m[0],f=m[1],g=Object(n.useState)(""),h=Object(c.a)(g,2),N=h[0],k=h[1],x=Object(n.useState)(!1),O=Object(c.a)(x,2),j=O[0],y=O[1],S=Object(n.useState)(!1),w=Object(c.a)(S,2),C=w[0],A=w[1],T=Object(n.useRef)(null);Object(n.useEffect)((function(){T.current.focus()}),[T]);var L={loop:!0,autoplay:!0,animationData:E,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}},P=function(){var t=Object(b.a)(p.a.mark((function t(a){var n,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),A(!0),t.next=4,fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:d,password:N})});case 4:return n=t.sent,t.next=7,n.json();case 7:if(!(r=t.sent).token){t.next=23;break}return localStorage.setItem("token",r.token),t.next=12,fetch("/api/user",{headers:{"x-access-tokens":r.token}});case 12:return n=t.sent,t.next=15,n.json();case 15:r=t.sent,A(!1),s.assignFName(r.firstName),s.assignLName(r.lastName),e.assignLogNotif([]),i.push("/"),t.next=24;break;case 23:"User is not verified"===r.message?(A(!1),e.assignAuthEmail(d),e.assignLogNotif(["Account not verified!","This account has not yet been verified. If you are the owner of this account and did not recieve a verification email, please click Resend to send another verification link to your email.","warning"])):"A user with this email does not exist."===r.message?(A(!1),e.assignLogNotif(["Account not found!","A user with this email does not exist.","danger"])):"Your email or password is incorrect"===r.message&&(A(!1),e.assignLogNotif(["Invalid Credentials!","Your email or password is incorrect.","danger"]));case 24:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return j?(t=r.a.createElement("div",{className:"hide-password",onClick:function(){return y(!1)}}),a="text"):(t=r.a.createElement("div",{className:"show-password",onClick:function(){return y(!0)}}),a="password"),r.a.createElement("div",{className:"login-container"},r.a.createElement("h1",{className:"welcome-message"},"Welcome"),r.a.createElement("form",{className:"login-form",onSubmit:P},r.a.createElement("input",{ref:T,className:"login-form-item login-input",type:"text",placeholder:"Email",onChange:function(e){return f(e.target.value)}}),r.a.createElement("div",{className:"password-container"},r.a.createElement("input",{className:"password-item login-input",type:a,placeholder:"Password",onChange:function(e){return k(e.target.value)}}),t),r.a.createElement("button",{className:"login-form-item login-button",type:"submit",disabled:C},!C&&"Sign in",C&&r.a.createElement(v.a,{options:L,height:75,width:75}))),r.a.createElement("h5",{className:"forgot-password"},"Forgot your password?"))},k=(a(154),function(e){var t,a,s,i,o,l=Object(n.useState)(""),u=Object(c.a)(l,2),m=u[0],d=u[1],f=Object(n.useState)(""),g=Object(c.a)(f,2),h=g[0],N=g[1],k=Object(n.useState)(""),x=Object(c.a)(k,2),O=x[0],j=x[1],y=Object(n.useState)(""),S=Object(c.a)(y,2),w=S[0],C=S[1],A=Object(n.useState)(""),T=Object(c.a)(A,2),L=T[0],P=T[1],D=Object(n.useState)(""),R=Object(c.a)(D,2),F=R[0],B=R[1],Y=Object(n.useState)(0),q=Object(c.a)(Y,2),G=q[0],I=q[1],V=Object(n.useState)(!1),H=Object(c.a)(V,2),J=H[0],M=H[1],_=Object(n.useState)(!1),z=Object(c.a)(_,2),Z=z[0],$=z[1],U=Object(n.useState)(!1),W=Object(c.a)(U,2),K=W[0],Q=W[1],X=Object(n.useState)(!1),ee=Object(c.a)(X,2),te=(ee[0],ee[1],Object(n.useState)("")),ae=Object(c.a)(te,2),ne=ae[0],re=ae[1],se=Object(n.useState)(""),ie=Object(c.a)(se,2),ce=ie[0],oe=ie[1],le=Object(n.useState)(""),ue=Object(c.a)(le,2),me=ue[0],de=ue[1],pe=Object(n.useState)(""),be=Object(c.a)(pe,2),fe=be[0],ge=be[1],he=Object(n.useState)(""),ve=Object(c.a)(he,2),Ee=ve[0],Ne=ve[1],ke=Object(n.useState)(""),xe=Object(c.a)(ke,2),Oe=xe[0],je=xe[1],ye=Object(n.useState)(""),Se=Object(c.a)(ye,2),we=Se[0],Ce=Se[1],Ae=Object(n.useState)(""),Te=Object(c.a)(Ae,2),Le=Te[0],Pe=Te[1],De=Object(n.useState)(""),Re=Object(c.a)(De,2),Fe=Re[0],Be=Re[1],Ye=Object(n.useState)(""),qe=Object(c.a)(Ye,2),Ge=qe[0],Ie=qe[1],Ve=Object(n.useState)(!1),He=Object(c.a)(Ve,2),Je=He[0],Me=He[1],_e=Object(n.useRef)(null),ze=Object(n.useRef)(null),Ze=Object(n.useRef)(null),$e="border-normal",Ue="border-normal",We="border-normal",Ke="border-normal",Qe="border-normal";Object(n.useEffect)((function(){0===G?_e.current.focus():1===G?ze.current.focus():Ze.current.focus()}),[G]);var Xe={loop:!0,autoplay:!0,animationData:E,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}},et=function(){var t=Object(b.a)(p.a.mark((function t(a){var n,r;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),Me(!0),Q(!0),rt(),!(ne||ce||me||fe||Ee)){t.next=7;break}return Me(!1),t.abrupt("return");case 7:return t.next=9,fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:O,lastName:w,email:m,healthCard:"",phoneNumber:F,password:h,confirmPassword:L})});case 9:return n=t.sent,t.next=12,n.json();case 12:r=t.sent,e.assignAuthEmail(m),Me(!1),"User Created"===r.message?e.assignRegNotif(["Registration Successful!","Thank you for registering ".concat(O,", please verify your account by clicking the verification link sent to your email."),"success"]):"A user with this email already exists."===r.message&&e.assignRegNotif(["Email already in use!","A user with the email ".concat(m," already exists. Please use another email."),"danger"]);case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),tt=function(e){return/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e)},at=function(e){return/^\d*$/.test(e)},nt=function(){""!==Ge&&Ie(""),""!==Le&&Pe(""),""!==Fe&&Be(""),""!==Oe&&je(""),""!==we&&Ce("")},rt=function(){""===h?(Ne("A password is required"),I(2),Ie("shake-error")):h.length<8?(Ne("The password must be at least 8 characters long"),I(2),Ie("shake-error")):h!==L?(Ne("The passwords do not match"),I(2),Ie("shake-error")):(Ne(""),Ie("")),""===m?(de("An email is required"),I(1),Pe("shake-error")):tt(m)?(de(""),Pe("")):(de("You have entered an invalid email"),I(1),Pe("shake-error")),at(F)?(ge(""),Be("")):(ge("The phone number may only contain numbers"),I(1),Be("shake-error")),""===O?(re("A first name is required"),I(0),je("shake-error")):(re(""),je("")),""===w?(oe("A last name is required"),I(0),Ce("shake-error")):(oe(""),Ce(""))};return""===h?"A password is required"!==Ee&&Ne("A password is required"):h.length<8?"The password must be at least 8 characters long"!==Ee&&Ne("The password must be at least 8 characters long"):h!==L?"The passwords do not match"!==Ee&&Ne("The passwords do not match"):""!==Ee&&Ne(""),""===m?"An email is required"!==me&&de("An email is required"):tt(m)?""!==me&&de(""):"You have entered an invalid email"!==me&&de("You have entered an invalid email"),at(F)?""!==fe&&ge(""):"The phone number may only contain numbers"!==fe&&ge("The phone number may only contain numbers"),""===O?"A first name is required"!==ne&&re("A first name is required"):""!==ne&&re(""),""===w?"A last name is required"!==ce&&oe("A last name is required"):""!==ce&&oe(""),J?(i=r.a.createElement("div",{className:"hide-password ".concat(Ge),onClick:function(){return M(!1)}}),a="text"):(i=r.a.createElement("div",{className:"show-password ".concat(Ge),onClick:function(){return M(!0)}}),a="password"),Z?(o=r.a.createElement("div",{className:"hide-password ".concat(Ge),onClick:function(){return $(!1)}}),s="text"):(o=r.a.createElement("div",{className:"show-password ".concat(Ge),onClick:function(){return $(!0)}}),s="password"),ne&&($e="border-error"),ce&&(Ue="border-error"),me&&(We="border-error"),fe&&(Ke="border-error"),Ee&&(Qe="border-error"),t=0===G?r.a.createElement("form",{className:"register-form",onSubmit:function(e){e.preventDefault(),I(1),nt()}},r.a.createElement("h5",{className:"input-error-message"},K?ne:null),r.a.createElement("input",{ref:_e,className:"register-form-item register-input ".concat(K?$e:"border-normal"," ").concat(Oe),value:O,type:"text",placeholder:"First Name",onChange:function(e){return j(e.target.value)}}),r.a.createElement("h5",{className:"input-error-message"},K?ce:null),r.a.createElement("input",{className:"register-form-item register-input ".concat(K?Ue:"border-normal"," ").concat(we),value:w,type:"text",placeholder:"Last Name",onChange:function(e){return C(e.target.value)}}),r.a.createElement("div",{className:"submission-buttons"},r.a.createElement("button",{className:"register-form-item register-button",type:"submit"},"Next"))):1===G?r.a.createElement("form",{className:"register-form",onSubmit:function(e){e.preventDefault(),I(2),nt()}},r.a.createElement("h5",{className:"input-error-message"},K?me:null),r.a.createElement("input",{ref:ze,className:"register-form-item register-input ".concat(K?We:"border-normal"," ").concat(Le),value:m,type:"text",placeholder:"Email",onChange:function(e){return d(e.target.value)}}),r.a.createElement("h5",{className:"input-error-message"},K?fe:null),r.a.createElement("input",{className:"register-form-item register-input ".concat(K?Ke:"border-normal"," ").concat(Fe),value:F,type:"text",placeholder:"Phone Number",onChange:function(e){return B(e.target.value)}}),r.a.createElement("div",null),r.a.createElement("div",{className:"submission-buttons"},r.a.createElement("button",{className:"register-form-item back-button",type:"button",onClick:function(){return I(0)}},"Back"),r.a.createElement("div",{className:"register-form-item"}),r.a.createElement("button",{className:"register-form-item register-button",type:"submit"},"Next"))):r.a.createElement("form",{className:"register-form",onSubmit:et},r.a.createElement("h5",{className:"input-error-message"},K?Ee:null),r.a.createElement("div",{className:"password-container"},r.a.createElement("input",{ref:Ze,className:"password-item register-input ".concat(K?Qe:"border-normal"," ").concat(Ge),type:a,value:h,placeholder:"Password",onChange:function(e){return N(e.target.value)}}),i),r.a.createElement("div",{className:"password-container"},r.a.createElement("input",{className:"password-item register-input ".concat(K?Qe:"border-normal"," ").concat(Ge),type:s,value:L,placeholder:"Confirm Password",onChange:function(e){return P(e.target.value)}}),o),undefined,r.a.createElement("div",{className:"submission-buttons"},r.a.createElement("button",{className:"register-form-item back-button",type:"button",onClick:function(){return I(1)}},"Back"),r.a.createElement("div",{className:"register-form-item"}),r.a.createElement("button",{className:"register-form-item register-button",type:"submit",disabled:Je},!Je&&"Sign up",Je&&r.a.createElement(v.a,{options:Xe,height:75,width:75})))),r.a.createElement("div",{className:"register-container"},r.a.createElement("h1",{className:"welcome-message"},"Create account"),t)}),x=a(171),O=a(169),j=a(88),y=(a(155),function(e){var t,a,s,i,l=Object(n.useContext)(u),m=Object(n.useState)(!1),d=Object(c.a)(m,2),f=d[0],g=d[1],h=Object(n.useState)([]),y=Object(c.a)(h,2),S=y[0],w=y[1],C=Object(n.useState)([]),A=Object(c.a)(C,2),T=A[0],L=A[1],P=Object(n.useState)(!1),D=Object(c.a)(P,2),R=D[0],F=D[1],B=Object(n.useState)(!1),Y=Object(c.a)(B,2),q=Y[0],G=Y[1],I=Object(n.useState)(""),V=Object(c.a)(I,2),H=V[0],J=V[1],M=Object(n.useState)(!1),_=Object(c.a)(M,2),z=_[0],Z=_[1],$=e.match.params.token;Object(n.useLayoutEffect)((function(){l.assignShowNav(!1),"register"===$?g(!0):"login"===$&&g(!1)}),[]),Object(n.useEffect)(Object(b.a)(p.a.mark((function e(){var t,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(localStorage.getItem("token")&&(localStorage.removeItem("token"),l.assignFName(""),l.assignLName("")),!$){e.next=10;break}if("register"===$&&"login"===$){e.next=10;break}return e.next=5,fetch("/api/confirm_email/".concat($));case 5:return t=e.sent,e.next=8,t.json();case 8:"token_expired"===(a=e.sent).message?(L(["Verification Token Expired!","Your verification token session has expired. Please press Resend to send another verification link to your email.","danger"]),G(!0)):"email_already_confirmed"===a.message?(L(["Account already verified!","You have already verified this account.","warning"]),G(!0)):"email_confirm_success"===a.message&&(L(["Account verified successfully!","Thank you for verifying your account. You may now log in.","success"]),G(!0));case 10:case"end":return e.stop()}}),e)}))),[]),window.addEventListener("resize",(function(){document.body.classList.add("resize-animation-stopper"),clearTimeout(a),a=setTimeout((function(){document.body.classList.remove("resize-animation-stopper")}),400)}));var U={loop:!0,autoplay:!0,animationData:E,rendererSettings:{preserveAspectRatio:"xMidYMid slice"}},W=function(e){J(e)},K=function(){var e=Object(b.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!0),e.next=3,fetch("/api/resendToken",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:H})});case 3:return t=e.sent,e.next=6,t.json();case 6:e.sent,Z(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return t=f?r.a.createElement("div",{className:"gradient-display-background gradient-display-background-register"},r.a.createElement("div",{className:"gradient-display gradient-display-register-rtrue"},r.a.createElement("h1",{className:"gradient-display-text"},"Already have an account?"),r.a.createElement("button",{onClick:function(){F(!1),w([]),g(!1)},className:"gradient-display-button gradient-display-button-red"},"Login")),r.a.createElement("div",{className:"gradient-display gradient-display-register-bfalse"})):r.a.createElement("div",{className:"gradient-display-background gradient-display-background-login"},r.a.createElement("div",{className:"gradient-display gradient-display-login-rfalse"}),r.a.createElement("div",{className:"gradient-display gradient-display-login-btrue"},r.a.createElement("h1",{className:"gradient-display-text"},"Don't have an account?"),r.a.createElement("button",{onClick:function(){G(!1),L([]),g(!0)},className:"gradient-display-button gradient-display-button-blue"},"Register"))),S.length&&(s=r.a.createElement(O.a,{className:"alert-align auth-index",variant:S[2],onClose:function(){return F(!0),void w([])},dismissible:!0},r.a.createElement(O.a.Heading,null,S[0]),r.a.createElement("p",null,S[1]),"Registration Successful!"===S[0]&&r.a.createElement("div",{className:"d-flex justify-content-end"},r.a.createElement(j.a,{onClick:function(){return K()},variant:"outline-success",disabled:z},!z&&"Resend",z&&r.a.createElement(v.a,{options:U,height:35,width:35})))),!0!==R&&F(!0)),T.length&&(i=r.a.createElement(O.a,{className:"alert-align",variant:T[2],onClose:function(){return G(!0),void L([])},dismissible:!0},r.a.createElement(O.a.Heading,null,T[0]),r.a.createElement("p",null,T[1]),"Account not verified!"===T[0]&&r.a.createElement("div",{className:"d-flex justify-content-end"},r.a.createElement(j.a,{onClick:function(){return K()},variant:"outline-warning",disabled:z},!z&&"Resend",z&&r.a.createElement(v.a,{options:U,height:35,width:35})))),!0!==q&&G(!0)),r.a.createElement("div",{className:"auth-container"},r.a.createElement(o.b,{className:"auth-logo ".concat(f?"auth-logo-register":"auth-logo-login"),to:"/"},"Diabetes Doctor"),t,r.a.createElement("div",{className:"fill"},r.a.createElement(x.a,{in:f,timeout:500,classNames:"reg-transition",unmountOnExit:!0},r.a.createElement("div",{className:"auth-notification-container"},R&&s)),r.a.createElement(x.a,{in:f,timeout:500,classNames:"reg-transition",unmountOnExit:!0},r.a.createElement(k,{assignRegNotif:function(e){return function(e){w(e)}(e)},assignAuthEmail:function(e){return W(e)}}))),r.a.createElement("div",{className:"fill"},r.a.createElement(x.a,{in:!f,timeout:500,classNames:"login-transition",unmountOnExit:!0},r.a.createElement("div",{className:"auth-notification-container"},q&&i)),r.a.createElement(x.a,{in:!f,timeout:500,classNames:"login-transition",unmountOnExit:!0},r.a.createElement(N,{assignLogNotif:function(e){return function(e){L(e)}(e)},assignAuthEmail:function(e){return W(e)}}))))}),S=a(167),w=a(170),C=a(168),A=(a(156),function(){var e,t=Object(n.useContext)(u),a=Object(n.useState)("Home"),s=Object(c.a)(a,2),i=s[0],l=s[1],m=function(){var e=Object(b.a)(p.a.mark((function e(){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/user",{headers:{"x-access-tokens":localStorage.getItem("token")}});case 2:return a=e.sent,e.next=5,a.json();case 5:n=e.sent,t.assignFName(n.firstName),t.assignLName(n.lastName);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return localStorage.getItem("token")?(""===t.stateFName&&""===t.stateLName&&m(),e=r.a.createElement(n.Fragment,null,r.a.createElement(S.a,{alignRight:!0,title:"Welcome, ".concat(t.stateFName," ").concat(t.stateLName),id:"collasible-nav-dropdown",className:"navbar-profile-dropdown"},r.a.createElement(S.a.Item,{onClick:function(){return localStorage.removeItem("token"),t.assignFName(""),void t.assignLName("")}},"Sign out")))):e=r.a.createElement(n.Fragment,null,r.a.createElement(w.a.Link,null,r.a.createElement(o.b,{to:"/auth/register",onClick:function(){return l("Home")},className:"navbar-item-button-c"},r.a.createElement("button",{className:"navbar-signup-c"},"Sign up"))),r.a.createElement(w.a.Link,null,r.a.createElement(o.b,{to:"/auth/login",onClick:function(){return l("Home")},className:"navbar-item-button-c"},r.a.createElement("button",{className:"navbar-signin-c"},"Sign in")))),r.a.createElement(C.a,{collapseOnSelect:!0,expand:"lg",bg:"dark",className:"navbar-c"},r.a.createElement(C.a.Brand,null,r.a.createElement(o.b,{to:"/",onClick:function(){return l("Home")},className:"navbar-item-c navbar-item-width-height navbar-title"},"Diabetes Doctor")),r.a.createElement(C.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(C.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(w.a,{className:"m-auto navbar-item-font"},r.a.createElement(w.a.Link,null,r.a.createElement(o.b,{to:"/predict",onClick:function(){return l("Predictor")},className:"navbar-item-c navbar-item-width-height ".concat("Predictor"===i?"navbar-selected":"navbar-item-normal")},"Predictor")),r.a.createElement(w.a.Link,null,r.a.createElement(o.b,{to:"/track",onClick:function(){return l("Tracker")},className:"navbar-item-c navbar-item-width-height ".concat("Tracker"===i?"navbar-selected":"navbar-item-normal")},"Tracker"))),r.a.createElement(w.a,null,e)))}),T=function(){var e=Object(n.useContext)(u);return Object(n.useLayoutEffect)((function(){e.assignShowNav(!0)}),[]),r.a.createElement("div",null,r.a.createElement("h1",null,"Tracker"))};var L=function(){var e=Object(n.useState)(!1),t=Object(c.a)(e,2),a=t[0],s=t[1],i=Object(n.useState)(!0),d=Object(c.a)(i,2),p=d[0],b=d[1],h=Object(n.useState)(),v=Object(c.a)(h,2),E=v[0],N=v[1],k=Object(n.useState)(""),x=Object(c.a)(k,2),O=x[0],j=x[1],S=Object(n.useState)(""),w=Object(c.a)(S,2),C=w[0],L=w[1];return r.a.createElement(u.Provider,{value:{statePrediction:a,assignPredictionFunction:function(e){return function(e){s(e)}(e)},stateToken:E,assignTokenFunction:function(e){return function(e){N(e)}(e)},stateNav:p,assignShowNav:function(e){return function(e){b(e)}(e)},stateFName:O,assignFName:function(e){return function(e){j(e)}(e)},stateLName:C,assignLName:function(e){return function(e){L(e)}(e)}}},r.a.createElement(o.a,null,r.a.createElement("div",{className:"App"},p&&r.a.createElement(A,null),r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:m}),r.a.createElement(l.a,{exact:!0,path:"/predict",component:f}),r.a.createElement(l.a,{exact:!0,path:"/track",component:T}),r.a.createElement(l.a,{exact:!0,path:"/results",component:g}),r.a.createElement(l.a,{exact:!0,path:"/auth/:token?",component:y})))))};a(160),a(161);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root"))},37:function(e){e.exports=JSON.parse('{"v":"5.5.5","fr":25,"ip":0,"op":79,"w":300,"h":150,"nm":"Loading-2","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"icon 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":39,"s":[-90]},{"t":79,"s":[270]}],"ix":10},"p":{"a":0,"k":[150,75,0],"ix":2},"a":{"a":0,"k":[53,53,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-15.464],[15.464,0],[0,15.464],[-15.464,0]],"o":[[0,15.464],[-15.464,0],[0,-15.464],[15.464,0]],"v":[[28,0],[0,28],[-28,0],[0,-28]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":10,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[53,53],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":51,"s":[0]},{"t":79,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":39,"s":[0]},{"t":64,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":39,"op":79,"st":39,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"icon","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[-90]},{"t":40,"s":[270]}],"ix":10},"p":{"a":0,"k":[150,75,0],"ix":2},"a":{"a":0,"k":[53,53,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,-15.464],[15.464,0],[0,15.464],[-15.464,0]],"o":[[0,15.464],[-15.464,0],[0,-15.464],[15.464,0]],"v":[[28,0],[0,28],[-28,0],[0,-28]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"st","c":{"a":0,"k":[1,1,1,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":10,"ix":5},"lc":2,"lj":1,"ml":10,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[53,53],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":12,"s":[0]},{"t":40,"s":[100]}],"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[0]},{"t":25,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim Paths 1","mn":"ADBE Vector Filter - Trim","hd":false}],"ip":0,"op":40,"st":0,"bm":0}],"markers":[]}')},96:function(e,t,a){},98:function(e,t,a){}},[[162,1,2]]]);
//# sourceMappingURL=main.dbe46a36.chunk.js.map