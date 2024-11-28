import{d as Be}from"./chunk-Y4E2U47I.js";import{a as de,b as pe}from"./chunk-GYOEYZV6.js";import"./chunk-RNZI2LTQ.js";import{a as ge,b as he,c as Ce,d as _e,e as Me,f as ve,g as be,h as xe,i as Se,j as De,k as we,l as Ue,m as ye,n as Ee}from"./chunk-AYFB3NRK.js";import{b as ce}from"./chunk-FESQCAAM.js";import{a as Ie,b as Te,c as Re,d as ke,e as Fe,f as Ne,g as Pe,h as Ae}from"./chunk-5VRKR4PS.js";import{a as ue,b as fe}from"./chunk-AJNVVCZR.js";import{b as ne,d as oe,g as re,h as le,j as me,k as se}from"./chunk-RFB2B4XO.js";import"./chunk-55VYKXYZ.js";import{B as ie,Ba as ae,Ha as D,Ja as w,Ka as U,La as y,Ma as E,a as L,c as J,i as K,k as Q,m as g,p as W,q as X,t as Y,v as Z,y as ee,z as te}from"./chunk-HCUTLELD.js";import{Bb as h,Ib as f,Jb as N,Kb as d,Kc as V,Pb as P,Qb as A,Sb as B,Tb as H,Ub as n,Vb as o,Wb as p,Xb as _,Yb as M,_b as z,a as T,bc as c,cd as $,dc as j,fa as R,fd as q,ib as l,la as s,oc as r,pc as v,qc as S,rb as x,ua as k,va as F,yc as G,zc as O}from"./chunk-2UWQULQ5.js";var C=class e{url=`${K.apiUrl}/users`;http=s(J);findAll(t,i,a){let m=new L({fromObject:T({limit:t,offset:i},a&&{term:a})});return this.http.get(this.url,{params:m})}create(t){return this.http.post(this.url,t)}update(t,i){return i.password===""&&delete i.password,this.http.patch(`${this.url}/${t}`,i)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=R({token:e,factory:e.\u0275fac,providedIn:"root"})};function Ve(e,t){if(e&1&&(n(0,"mat-option",7),r(1),o()),e&2){let i=t.$implicit;d("value",i.value),l(),v(i.label)}}var b=class e{formBuilder=s(te);userService=s(C);dialogRef=s(Ie);data=s(Te);hidePassword=!0;formUser=this.formBuilder.group({fullname:["",g.required],login:["",g.required],password:["",g.required],roles:["",g.required],isActive:[!0,g.required]});roles=[{value:"admin",label:"Administrador"},{value:"officer",label:"Funcionario"}];ngOnInit(){this.data&&(this.formUser.patchValue(this.data),this.formUser.get("password")?.removeValidators([g.required]))}save(){(this.data?this.userService.update(this.data.id,this.formUser.value):this.userService.create(this.formUser.value)).subscribe(i=>{this.dialogRef.close(i)})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=x({type:e,selectors:[["app-user-dialog"]],decls:38,vars:7,consts:[["mat-dialog-title",""],[1,"py-2",3,"formGroup"],[1,"grid","grid-cols-2","gap-x-2"],[1,"col-span-2"],["appearance","outline"],["matInput","","formControlName","fullname","placeholder","Ingrese un nombre"],["formControlName","roles","multiple",""],[3,"value"],["matInput","","formControlName","login","placeholder","Ingrese el login"],["matInput","","placeholder","Ingrese una contrase\xF1a","formControlName","password",3,"type"],["mat-icon-button","","matSuffix","",3,"click"],[1,"py-2"],["formControlName","isActive"],["align","end"],["mat-button","","color","warn","mat-dialog-close",""],["mat-button","","color","primary",3,"click","disabled"]],template:function(i,a){i&1&&(n(0,"h2",0),r(1),o(),n(2,"mat-dialog-content")(3,"form",1)(4,"div",2)(5,"div",3)(6,"mat-form-field",4)(7,"mat-label"),r(8,"Nombre completo"),o(),p(9,"input",5),o()(),n(10,"div",3)(11,"mat-form-field",4)(12,"mat-label"),r(13,"Rol"),o(),n(14,"mat-select",6),B(15,Ve,2,2,"mat-option",7,A),o()()(),n(17,"div")(18,"mat-form-field",4)(19,"mat-label"),r(20,"Login"),o(),p(21,"input",8),o()(),n(22,"div")(23,"mat-form-field",4)(24,"mat-label"),r(25,"Contrase\xF1a"),o(),p(26,"input",9),n(27,"button",10),c("click",function(){return a.hidePassword=!a.hidePassword}),n(28,"mat-icon"),r(29),o()()()(),n(30,"div",11)(31,"mat-checkbox",12),r(32," Habilitado "),o()()()()(),n(33,"mat-dialog-actions",13)(34,"button",14),r(35,"Cancelar"),o(),n(36,"button",15),c("click",function(){return a.save()}),r(37," Guardar "),o()()),i&2&&(l(),S("",a.data?"Editar":"Crear"," Usuario"),l(2),d("formGroup",a.formUser),l(12),H(a.roles),l(11),d("type",a.hidePassword?"password":"text"),l(),N("aria-label","Hide password")("aria-pressed",a.hidePassword),l(2),v(a.hidePassword?"visibility_off":"visibility"),l(7),d("disabled",a.formUser.invalid))},dependencies:[ie,Y,Q,W,X,Z,ee,Ae,ke,Fe,Pe,Ne,se,me,re,ne,oe,le,fe,ue,ae,E,y,U,D,w,pe,de],encapsulation:2,changeDetection:0})};function $e(e,t){e&1&&(n(0,"th",23),r(1,"Login"),o())}function qe(e,t){if(e&1&&(n(0,"td",24),r(1),o()),e&2){let i=t.$implicit;l(),v(i.login)}}function Le(e,t){e&1&&(n(0,"th",23),r(1,"Usuario"),o())}function Je(e,t){if(e&1&&(n(0,"td",24),r(1),G(2,"titlecase"),o()),e&2){let i=t.$implicit;l(),S(" ",O(2,1,i.fullname)," ")}}function Ke(e,t){e&1&&(n(0,"th",23),r(1,"Estado"),o())}function Qe(e,t){e&1&&(n(0,"span",26),r(1,"Activo "),o())}function We(e,t){e&1&&(n(0,"span",27),r(1," Inactivo "),o())}function Xe(e,t){if(e&1&&(n(0,"td",25),f(1,Qe,2,0,"span",26)(2,We,2,0,"span",27),o()),e&2){let i=t.$implicit;l(),P(i.isActive?1:2)}}function Ye(e,t){e&1&&p(0,"th",23)}function Ze(e,t){if(e&1){let i=z();n(0,"td",28)(1,"button",29),c("click",function(){let m=k(i).$implicit,u=j();return F(u.update(m))}),n(2,"mat-icon"),r(3,"edit"),o()()()}}function et(e,t){e&1&&p(0,"tr",30)}function tt(e,t){e&1&&p(0,"tr",31)}function it(e,t){e&1&&(n(0,"tr",32)(1,"td",33),r(2,"Sin resultados"),o()())}var I=class e{userService=s(C);dialogRef=s(Re);datasource=h([]);datasize=h(0);limit=h(10);index=h(0);offset=V(()=>this.limit()*this.index());term=h("");displayedColumns=["login","fullname","status","options"];ngOnInit(){this.getData()}getData(){this.userService.findAll(this.limit(),this.offset(),this.term()).subscribe(({users:t,length:i})=>{this.datasource.set(t),this.datasize.set(i)})}create(){this.dialogRef.open(b,{width:"600px"}).afterClosed().subscribe(i=>{i&&(this.datasource.update(a=>[i,...a]),this.datasize.update(a=>a+=1))})}update(t){this.dialogRef.open(b,{width:"600px",data:t}).afterClosed().subscribe(a=>{a&&this.datasource.update(m=>{let u=m.findIndex(ze=>ze.id===a.id);return m[u]=a,[...m]})})}onPageChange(t){this.limit.set(t.pageSize),this.index.set(t.pageIndex),this.getData()}search(t){this.index.set(0),this.term.set(t),this.getData()}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=x({type:e,selectors:[["app-users-manage"]],decls:32,vars:6,consts:[[1,"animate-fade"],[1,"flex","px-4","py-3","items-center"],[1,"text-2xl"],[1,"flex-1"],["mat-flat-button","",3,"click"],[1,"flex","justify-end","py-3"],[1,"w-full","px-2","sm:w-1/4","h-11"],[3,"onSearch"],[1,"px-2"],[1,"relative","mat-elevation-z8"],["mat-table","",3,"dataSource"],["matColumnDef","login"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","fullname"],["matColumnDef","status"],["mat-cell","","class","w-32",4,"matCellDef"],["matColumnDef","options"],["mat-cell","","class","w-8",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],["aria-label","Select page of users search results","showFirstLastButtons","",3,"page","length","pageSize","pageIndex"],["mat-header-cell",""],["mat-cell",""],["mat-cell","",1,"w-32"],[1,"inline-flex","items-center","rounded-md","bg-green-100","px-2","py-1","text-xs","font-medium","text-green-800","ring-1","ring-inset","ring-green-600/20"],[1,"inline-flex","items-center","rounded-md","bg-red-100","px-2","py-1","text-xs","font-medium","text-red-700","ring-1","ring-inset","ring-red-600/10"],["mat-cell","",1,"w-8"],["mat-icon-button","","aria-label","Edit user",3,"click"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","4",1,"p-3"]],template:function(i,a){i&1&&(n(0,"div",0)(1,"div",1)(2,"div",2),r(3,"Razas"),o(),p(4,"div",3),n(5,"div")(6,"button",4),c("click",function(){return a.create()}),n(7,"mat-icon"),r(8,"add"),o(),r(9," Agregar "),o()()(),n(10,"div",5)(11,"div",6)(12,"search-input",7),c("onSearch",function(u){return a.search(u)}),o()()(),n(13,"div",8)(14,"div",9)(15,"table",10),_(16,11),f(17,$e,2,0,"th",12)(18,qe,2,1,"td",13),M(),_(19,14),f(20,Le,2,0,"th",12)(21,Je,3,3,"td",13),M(),_(22,15),f(23,Ke,2,0,"th",12)(24,Xe,3,1,"td",16),M(),_(25,17),f(26,Ye,1,0,"th",12)(27,Ze,4,0,"td",18),M(),f(28,et,1,0,"tr",19)(29,tt,1,0,"tr",20)(30,it,3,0,"tr",21),o(),n(31,"mat-paginator",22),c("page",function(u){return a.onPageChange(u)}),o()()()()),i&2&&(l(15),d("dataSource",a.datasource()),l(13),d("matHeaderRowDef",a.displayedColumns),l(),d("matRowDefColumns",a.displayedColumns),l(2),d("length",a.datasize())("pageSize",10)("pageIndex",a.index()))},dependencies:[q,$,Ee,Ce,Me,Se,ve,_e,De,be,xe,we,Ue,ye,U,D,w,he,ge,ce,E,y,Be],encapsulation:2,changeDetection:0})};export{I as default};
