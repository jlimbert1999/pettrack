import{c as g,i as d}from"./chunk-HCUTLELD.js";import{Bb as l,I as u,Kc as p,ba as m,fa as h,ka as f,r as s,w as c}from"./chunk-2UWQULQ5.js";var n=class extends Error{};n.prototype.name="InvalidTokenError";function w(r){return decodeURIComponent(atob(r).replace(/(.)/g,(t,e)=>{let o=e.charCodeAt(0).toString(16).toUpperCase();return o.length<2&&(o="0"+o),"%"+o}))}function k(r){let t=r.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return w(t)}catch{return atob(t)}}function b(r,t){if(typeof r!="string")throw new n("Invalid token specified: must be a string");t||(t={});let e=t.header===!0?0:1,o=r.split(".")[e];if(typeof o!="string")throw new n(`Invalid token specified: missing part #${e+1}`);let i;try{i=k(o)}catch(a){throw new n(`Invalid token specified: invalid base64 for part #${e+1} (${a.message})`)}try{return JSON.parse(i)}catch(a){throw new n(`Invalid token specified: invalid json for part #${e+1} (${a.message})`)}}var v=class r{constructor(t){this.http=t}base_url=d.apiUrl;_user=l(null);_menu=l([]);user=p(()=>this._user());menu=p(()=>this._menu());login({login:t,password:e,remember:o}){return o?localStorage.setItem("login",t):localStorage.removeItem("login"),this.http.post(`${this.base_url}/auth`,{login:t,password:e}).pipe(c(({token:i})=>this._setAuthentication(i)))}logout(){localStorage.removeItem("token"),this._user.set(null)}checkAuthStatus(){return localStorage.getItem("token")?this.http.get(`${this.base_url}/auth`).pipe(m(({menu:e})=>this._menu.set(e)),c(({token:e})=>this._setAuthentication(e)),u(()=>s(!1))):(this.logout(),s(!1))}_setAuthentication(t){return this._user.set(b(t)),localStorage.setItem("token",t),!0}static \u0275fac=function(e){return new(e||r)(f(g))};static \u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"})};export{v as a};