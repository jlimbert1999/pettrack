import{a as l,c as g,i as u}from"./chunk-HCUTLELD.js";import{a as s,b as h,c as w,fa as f,ka as D,la as v,w as p}from"./chunk-2UWQULQ5.js";var y=class{id;first_name;middle_name;last_name;dni;address;phone;createdAt;district;birthDate;constructor({id:e,first_name:t,middle_name:r,last_name:n,dni:o,address:c,phone:a,createdAt:b,district:j,birthDate:$}){this.id=e,this.first_name=t,this.middle_name=r,this.last_name=n,this.dni=o,this.address=c,this.phone=a,this.createdAt=b,this.district=j,this.birthDate=$}get fullname(){return`${this.first_name} ${this.middle_name} ${this.last_name}`}};var x=class{id;name;code;image;breed;color;sex;createdAt;description;is_neutered;neuter_date;birthDate;owner;constructor({id:e,name:t,code:r,image:n,breed:o,color:c,sex:a,createdAt:b,description:j,is_neutered:$,neuter_date:R,owner:H,birthDate:P}){this.id=e,this.name=t,this.code=r,this.image=n,this.breed=o,this.color=c,this.sex=a,this.createdAt=b,this.description=j,this.is_neutered=$,this.neuter_date=R,this.owner=H,this.birthDate=P}calculateAge(){if(!this.birthDate)return"Sin registro";let e=new Date,t=e.getFullYear()-this.birthDate.getFullYear(),r=e.getMonth()-this.birthDate.getMonth();return(r<0||r===0&&e.getDate()<this.birthDate.getDate())&&t--,t.toString()}};var d=class{static fromResponse(n){var o=n,{createdAt:e,birthDate:t}=o,r=w(o,["createdAt","birthDate"]);return new y(h(s({},r),{createdAt:new Date(e),birthDate:new Date(t)}))}};var m=class{static fromResponse(c){var a=c,{createdAt:e,birthDate:t,neuter_date:r,owner:n}=a,o=w(a,["createdAt","birthDate","neuter_date","owner"]);return new x(h(s({},o),{owner:n?d.fromResponse(n):void 0,createdAt:new Date(e),birthDate:t?new Date(t):null,neuter_date:r?new Date(r):null}))}};var O=class i{constructor(e){this.http=e}url=`${u.apiUrl}/owners`;create(e){return this.http.post(this.url,e).pipe(p(t=>({owner:d.fromResponse(t),pets:t.pets.map(r=>m.fromResponse(r))})))}update(e,t){return this.http.patch(`${this.url}/${e}`,t).pipe(p(r=>({owner:d.fromResponse(r),pets:r.pets.map(n=>m.fromResponse(n))})))}findAll(e,t,r){let n=new l({fromObject:s({limit:e,offset:t},r&&{term:r})});return this.http.get(this.url,{params:n}).pipe(p(({owners:o,length:c})=>({data:o.map(a=>({owner:d.fromResponse(a),pets:a.pets.map(b=>m.fromResponse(b))})),length:c})))}getDistricts(){return this.http.get(`${this.url}/districts`)}static \u0275fac=function(t){return new(t||i)(D(g))};static \u0275prov=f({token:i,factory:i.\u0275fac,providedIn:"root"})};var A=class i{constructor(e){this.http=e}url=`${u.apiUrl}/pets`;findAll(e,t,r){let n=new l({fromObject:s({limit:e,offset:t},r&&{term:r})});return this.http.get(this.url,{params:n}).pipe(p(({pets:o,length:c})=>({pets:o.map(a=>m.fromResponse(a)),length:c})))}getDetail(e){return this.http.get(`${this.url}/${e}`).pipe(p(t=>m.fromResponse(t)))}getBreeds(e){let t=new l({fromObject:s({},e&&{species:e})});return this.http.get(`${this.url}/types/breeds`,{params:t})}static \u0275fac=function(t){return new(t||i)(D(g))};static \u0275prov=f({token:i,factory:i.\u0275fac,providedIn:"root"})};var C=class i{http=v(g);url=`${u.apiUrl}/treatments`;getMedicalCenters(){return this.http.get(`${this.url}/centers`)}getCategoires(){return this.http.get(`${this.url}/categories`).pipe(p(e=>e.map(t=>t.category)))}getPetTreatments(e,t){let r=new l({fromObject:s({},t&&{category:t})});return this.http.get(`${this.url}/pet/${e}`,{params:r})}getTypeTreatments(e){let t=new l({fromObject:s({},e&&{category:e})});return this.http.get(`${this.url}/types`,{params:t})}create(e,t){return this.http.post(this.url,h(s({},e),{petId:t}))}static \u0275fac=function(t){return new(t||i)};static \u0275prov=f({token:i,factory:i.\u0275fac,providedIn:"root"})};export{O as a,A as b,C as c};