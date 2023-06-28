#! /usr/bin/env node
import { Command } from 'commander';
import We from 'simple-git';
import y from 'fs-extra';
import Oe from 'ora';
import { exec } from 'child_process';
import J from 'chalk';
import Qe from 'inquirer';
import Ye from 'path';
import { z as z$1 } from 'zod';

var c=(e,o,r)=>new Promise((t,s)=>{var p=d=>{try{i(r.next(d));}catch(X){s(X);}},a=d=>{try{i(r.throw(d));}catch(X){s(X);}},i=d=>d.done?t(d.value):Promise.resolve(d.value).then(p,a);i((r=r.apply(e,o)).next());});function ie(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];y.removeSync("./.git"),y.removeSync("./src/screens/XXXXX"),y.removeSync("./src/types/xxxxx.d.ts");let t=y.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(p=>s.includes(p)).length===0);y.writeFileSync("./src/main.tsx",t.join(`
`));}var N=(e=process.cwd())=>y.readdirSync(e).includes("kitconfig"),b=(e,o)=>c(void 0,null,function*(){let r=process.cwd().split("/").at(-1),t;return r===e||N()&&e==="root"?t=yield o():N()?(process.chdir(e),t=yield o(),process.chdir("..")):e==="root"?(process.chdir(".."),t=yield o(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=yield o(),process.chdir(".."),process.chdir(r)),t}),L=(e,o)=>{let r=process.cwd().split("/").at(-1),t;return r===e||N()&&e==="root"?t=o():N()?(process.chdir(e),t=o(),process.chdir("..")):e==="root"?(process.chdir(".."),t=o(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=o(),process.chdir(".."),process.chdir(r)),t},Y=()=>L("root",()=>{let e,o=y.readdirSync(".");return o.includes("webapp")&&o.includes("server")?e="both":o.includes("webapp")?e="webapp":o.includes("server")?e="server":e="INVALID_STATE",e}),K=()=>L("root",()=>process.cwd()+"/.template");function ce(){y.removeSync("./.git"),y.removeSync("./src/Microservices/XXXXX"),y.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function _(e){return c(this,null,function*(){return new Promise(o=>{exec(e,()=>{o(null);});})})}var $e=()=>`REST_API_PORT=3005
MONGO_CONNECTION_URL=

#REDIS_PORT=6379
#REDIS_HOST=redis_dev


AUTH_PRIVATE_BASE64=
AUTH_PUBLIC_BASE64=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_FROM_NAME=

S3_REGION=
S3_ACCESS_KEY=
S3_ACCESS_ID=
S3_BUCKET_NAME=

STATIC_S3_REGION=
STATIC_S3_BUCKET_NAME=
`;var Q=Oe({color:"blue",indent:2});function le(e,o){return c(this,null,function*(){let r=e.toLowerCase();Q.start("Scaffolding project..."),yield We().clone("https://github.com/oaktreeapps/admin-panel",r),process.chdir(r);let t=K();y.ensureDirSync(`${t}`),y.ensureDirSync(`${t}/webapp`),y.ensureDirSync(`${t}/server`),y.removeSync("./.git"),L("webapp",()=>{y.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${t}/webapp/XXXXX.tsx`),y.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${t}/webapp/CreateXXXXX.tsx`),y.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${t}/webapp/EditXXXXX.tsx`),y.copyFileSync("./src/types/xxxxx.d.ts",`${t}/webapp/xxxxx.d.ts`),y.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ie();}),L("server",()=>{y.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${t}/server/XXXXXRouter.ts`),y.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${t}/server/XXXXXController.ts`),y.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${t}/server/XXXXX.dto.ts`),y.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${t}/server/XXXXXEntity.ts`),y.writeFileSync("./.env",$e()),ce();}),Q.succeed(`Created "${r}" successfully!`),o.onlyServer&&y.removeSync("webapp"),o.onlyWebapp&&y.removeSync("server"),Q.start("Installing dependencies..."),o.onlyServer||(yield b("webapp",()=>c(this,null,function*(){yield _("yarn install");}))),o.onlyWebapp||(yield b("server",()=>c(this,null,function*(){yield _("yarn install");}))),Q.succeed("Installed dependencies successfully!");})}var C=e=>{let o=e.replace(/([A-Z])/g," $1");return o.charAt(0).toUpperCase()+o.slice(1)},I=e=>e.charAt(0).toUpperCase()+e.slice(1);var xe=e=>{let o=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${I(o)}",
  url: "/${o}",
  collectionName: "${o}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Se=Oe({color:"blue",indent:2});function pe(e){return c(this,null,function*(){let o=e.toLowerCase(),r=xe(o);Se.start(`Creating config template for ${J.cyan(o)}`),L("root",()=>{let t=`kitconfig/resources/${o}.cjs`;y.ensureFileSync(t),y.writeFileSync(t,r);}),Se.succeed(`Created config template for ${J.cyan(o)}`);})}var ue=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String"),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload"),z$1.literal("Calendar"),z$1.literal("Password"),z$1.literal("ColorPicker"),z$1.literal("Editor")]).optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional().default([])}))}),we=z$1.object({resources:z$1.array(ue)});var O=()=>c(void 0,null,function*(){return b("root",()=>c(void 0,null,function*(){let e={resources:[]};if(!y.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let o=Ye.join(process.cwd(),"kitconfig"),r=y.readdirSync("kitconfig/resources");yield Promise.all(r.map(s=>c(void 0,null,function*(){let p=yield import(`${o}/resources/${s}`),a=ue.safeParse(p.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let t=we.safeParse(e);return t.success?t.data:(console.error("Config parsing error",t.error),null)}))});var be=e=>`<FormInputNumber
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Te=e=>`<FormInputText
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Ie=e=>`<FormInputTextArea
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,ve=e=>`<FormInputDropdown
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
options={${e.name}Options}
/>
`,Pe=e=>`<FormInputRadio
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
options={${e.name}Options}
/>
`,Re=e=>`<FormInputSwitch
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,De=e=>`<FormInputCalendar
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Ae=e=>`<FormInputPassword
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Le=e=>`<FormInputColorPicker
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,_e=e=>`<FormInputEditor
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,je=(e,o)=>`<FormInputUpload
folderName="${o}"
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`;var T=e=>`<Column
  field="${e}"
  header="${I(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,Ue=e=>`<Column header="${I(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var P={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function me(e,o){return c(this,null,function*(){let r=K(),t="",s="",p=[],a=[],i=[],d=[],X=["InputSwitch"];o.crudFields.forEach((n,A)=>{let f=n.widget||n.datatype,x="",F="";n.required&&!X.includes(n.widget||n.datatype||"")&&p.push(n.name),f==="InputText"||f==="String"?(n.tableDisplay&&i.push(T(n.name)),a.push(Te(n)),x="string",F='""'):f==="InputTextarea"?(n.tableDisplay&&i.push(T(n.name)),a.push(Ie(n)),x="string",F='""'):f==="InputNumber"||f==="Number"?(n.tableDisplay&&i.push(T(n.name)),a.push(be(n)),x="number",F="0"):f==="Dropdown"?(n.tableDisplay&&i.push(T(n.name)),a.push(ve(n)),d.push({fieldName:n.name,options:n.options}),x="string",F='""'):f==="RadioButton"?(n.tableDisplay&&i.push(T(n.name)),a.push(Pe(n)),d.push({fieldName:n.name,options:n.options}),x="string",F='""'):f==="ImageFileUpload"?(n.tableDisplay&&i.push(Ue(n.name)),a.push(je(n,o.name.toLowerCase())),x="string",F='""'):f==="InputSwitch"||f==="Boolean"?(n.tableDisplay&&i.push(T(n.name)),a.push(Re(n)),x="boolean",F="false"):f==="Calendar"?(n.tableDisplay&&i.push(T(n.name)),a.push(De(n)),x="string",F='""'):f==="Password"?(n.tableDisplay&&i.push(T(n.name)),a.push(Ae(n)),x="string",F='""'):f==="ColorPicker"?(n.tableDisplay&&i.push(T(n.name)),a.push(Le(n)),x="string",F='""'):f==="Editor"&&(n.tableDisplay&&i.push(T(n.name)),a.push(_e(n)),x="string",F='""'),A===0&&(t+=`id?: string;
`,s+=`id: undefined,
`),t+=`${n.name}: ${x};
`,s+=`${n.name}: ${F},
`;});let w=`./src/screens/${e}`,v=`${w}/${e}.tsx`,M=`${w}/Create${e}.tsx`,te=`${w}/Edit${e}.tsx`,W="./src/layout/items.json",re=y.readFileSync(`${r}/webapp/XXXXX.tsx`).toString(),oe=y.readFileSync(`${r}/webapp/src/components/Datatable.tsx`).toString(),ne=y.readFileSync(`${r}/webapp/CreateXXXXX.tsx`).toString(),se=y.readFileSync(`${r}/webapp/EditXXXXX.tsx`).toString(),m=y.readFileSync(`${r}/webapp/xxxxx.d.ts`).toString(),$=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(P.initialState,s),D=[];$.split(`
`).forEach(n=>{n.includes(P.tableColumns)&&D.push(...i),D.push(n);}),y.writeFileSync(v,D.join(`
`));let E=oe.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());y.writeFileSync(`${r}/webapp/src/components/Datatable.tsx`,E);let q=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(P.input,a.join(`
`)).replace(P.validate,`if (${p.map(n=>`entity.${n}`).join(" && ")}) `),j=[];q.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(d.forEach(({fieldName:A,options:f})=>{j.push(`const ${A}Options = ${JSON.stringify(f,null,2)};
`);}),j.push(n)):(n.includes(P.initialState)&&j.push(s),j.push(n));}),y.writeFileSync(M,j.join(`
`));let ke=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(P.input,a.join(`
`)).replace(P.validate,`if (${p.map(n=>`entity.${n}`).join(" && ")}) `),U=[];ke.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(d.forEach(({fieldName:A,options:f})=>{U.push(`const ${A}Options = ${JSON.stringify(f,null,2)};
`);}),U.push(n)):(n.includes(P.initialState)&&U.push(s),U.push(n));}),y.writeFileSync(te,U.join(`
`));let Me=y.readFileSync(W),ge=JSON.parse(Me.toString());ge[0].items.push({label:e,to:`/${e.toLowerCase()}`,icon:"pi pi-box"}),y.writeFileSync(W,JSON.stringify(ge,null,2));let qe=m.replace(/XXXXX/g,e).replace(P.interface,t);y.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,qe);let Be=y.readFileSync("./src/main.tsx").toString().split(`
`),He=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Ve=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],G=[];G.push(...Ve),Be.forEach(n=>{n.includes("{/* --ROUTES-- */}")&&He.forEach(A=>{G.push(A);}),G.push(n);}),y.writeFileSync("./src/main.tsx",G.join(`
`));})}var H=(e,o)=>{let r="";return o.filter(t=>!!t).forEach(t=>{r+=`const existing${I(t)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${t},
  _id: { $ne: id },
});

if (existing${I(t)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r},V=(e,o)=>{let r=`const { ${o.join(", ")} } = input;
`;return o.filter(t=>!!t).forEach(t=>{r+=`
const existing${I(t)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
  });

if (existing${I(t)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function de(e,o){return c(this,null,function*(){let r=K(),t=o.crudFields.filter(m=>m.unique).map(m=>m.name),s=[],p=[],a=[],i=[];o.crudFields.forEach(({name:m,widget:$,datatype:D,required:E,unique:q})=>{s.push(`${m}: entity.${m},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"||$==="ImageFileUpload"||$==="Calendar"||$==="Password"||$==="ColorPicker"||$==="Editor"||D==="String"?(p.push(`${m}${E?"":"?"}: string;`),a.push(`${m}: { type: String, required: ${E}, unique: ${q} },`),i.push(`${m}: z.string()${E?".nonempty()":".optional().nullable()"},`)):$==="InputNumber"||D==="Number"?(p.push(`${m}${E?"":"?"}: number;`),a.push(`${m}: { type: Number, required: ${E}, unique: ${q} },`),i.push(`${m}: z.number()${E?"":".optional().nullable()"},`)):($==="InputSwitch"||D==="Boolean")&&(p.push(`${m}${E?"":"?"}: boolean;`),a.push(`${m}: { type: Boolean, required: ${E}, unique: ${q} },`),i.push(`${m}: z.boolean()${E?"":".optional().nullable()"},`));});let d=`./src/Microservices/${e}`,X=y.readFileSync(`${r}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,V(e,t)).replace(u.checkExistingUpdateEntity,H(e,t)),w=y.readFileSync(`${r}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,V(e,t)).replace(u.checkExistingUpdateEntity,H(e,t)),v=y.readFileSync(`${r}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,V(e,t)).replace(u.checkExistingUpdateEntity,H(e,t)),M=y.readFileSync(`${r}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,V(e,t)).replace(u.checkExistingUpdateEntity,H(e,t)),te=`${d}/${e}Controller.ts`,W=`${d}/${e}Router.ts`,re=`${d}/${e}.dto.ts`,oe=`./src/Database/Entities/${e}Entity.ts`;y.writeFileSync(te,X),y.writeFileSync(W,w),y.writeFileSync(re,v),y.writeFileSync(oe,M);let ne=y.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${o.collectionName}",`:m).join(`
`);y.writeFileSync("./src/Database/CollectionNames.ts",ne);let se=y.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);y.writeFileSync("./src/Microservices/ApiRouter.ts",se);})}var fe=Oe({color:"blue",indent:2}),Ke=Oe({color:"blue",indent:2});function Z(e){return c(this,null,function*(){var p,a;let o=Y(),r=e.toLowerCase(),t=(a=(p=yield O())==null?void 0:p.resources)==null?void 0:a.find(i=>i.name.toLowerCase()===r.toLowerCase());if(!t){fe.fail(`Resource ${J.cyan(r)} not found in config file`);return}let s=r.charAt(0).toUpperCase()+r.slice(1);(o==="both"||o==="webapp")&&(yield b("webapp",()=>c(this,null,function*(){let i=`./src/screens/${s}`;if(y.existsSync(i))return;fe.start(`Creating screen: ${J.cyan(s)}`);let d=`${i}/${s}.tsx`,X=`${i}/Create${s}.tsx`,w=`${i}/Edit${s}.tsx`,v=`./src/types/${s.toLowerCase()}.d.ts`;y.createFileSync(d),y.createFileSync(X),y.createFileSync(w),y.createFileSync(v),yield me(s,t),yield _("yarn prettify"),fe.succeed(`Created screen: ${J.cyan(s)}`);}))),(o==="both"||o==="server")&&(yield b("server",()=>c(this,null,function*(){let i=`./src/Microservices/${s}`;if(y.existsSync(i))return;Ke.start(`Creating CRUD for: ${J.cyan(s)}`);let d=`${i}/${s}Controller.ts`,X=`${i}/${s}Router.ts`,w=`${i}/${s}.dto.ts`;y.createFileSync(d),y.createFileSync(X),y.createFileSync(w),yield de(s,t),yield _("yarn prettify"),Ke.succeed(`Created CRUD for: ${J.cyan(s)}`);})));})}function Xe(e){return c(this,null,function*(){var t;let o=yield O(),r=(o==null?void 0:o.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)r.forEach(p=>c(this,[p],function*({name:s}){yield Z(s);}));else {let s=yield Qe.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:r}]);(t=s==null?void 0:s.resourceNames)==null||t.forEach(p=>c(this,null,function*(){yield Z(p);}));}})}var z=Oe({color:"blue",indent:2});function ee(e){return c(this,null,function*(){let o=Y(),r=e.charAt(0).toUpperCase()+e.slice(1);(o==="both"||o==="webapp")&&(yield b("webapp",()=>c(this,null,function*(){let t=`./src/types/${e}.d.ts`,s=`./src/screens/${r}`,p="./src/layout/items.json";if(!y.existsSync(s)){console.log("  Nothing to remove in webapp.");return}z.start(`Removing screen: ${e}`);let a=y.readFileSync(p),i=JSON.parse(a.toString());i[0].items=i[0].items.filter(v=>v.label.toLowerCase()!==r.toLowerCase()),y.writeFileSync(p,JSON.stringify(i,null,2)),y.removeSync(t),y.removeSync(s);let d=[`<Route path="${r.toLowerCase()}" element={<${r}Page />} />`,`<Route path="${r.toLowerCase()}/create" element={<Create${r}Page />} />`,`<Route path="${r.toLowerCase()}/edit/:id" element={<Edit${r}Page />} />`,`import ${r}Page from "./screens/${r}/${r}"`,`import Edit${r}Page from "./screens/${r}/Edit${r}"`,`import Create${r}Page from "./screens/${r}/Create${r}"`],w=y.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>d.filter(M=>v.includes(M)).length===0);y.writeFileSync("./src/main.tsx",w.join(`
`)),z.succeed(`Removed screen: ${e}`);}))),(o==="both"||o==="server")&&(yield b("server",()=>c(this,null,function*(){let t=`./src/Microservices/${r}`,s=`./src/Database/Entities/${r}Entity.ts`,p="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!y.existsSync(t)){console.log("  Nothing to remove in server.");return}z.start(`Removing CRUD: ${r}`),y.removeSync(t),y.removeSync(s);let i=y.readFileSync(p).toString().split(`
`).filter(X=>!X.includes(`${r}Collection`)).join(`
`),d=y.readFileSync(a).toString().split(`
`).filter(X=>!X.includes(`${r}Router`)).join(`
`);y.writeFileSync(p,i),y.writeFileSync(a,d),z.succeed(`Removed CRUD: ${r}`);})));})}function ye(e){return c(this,null,function*(){var t;let o=yield O(),r=(o==null?void 0:o.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)r.forEach(p=>c(this,[p],function*({name:s}){yield ee(s);}));else {let s=yield Qe.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:r}]);(t=s==null?void 0:s.resourceNames)==null||t.forEach(p=>c(this,null,function*(){yield ee(p);}));}})}var k=new Command;k.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");k.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(le);k.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(pe);k.command("add").description("Adds new resources").option("--all","All resources present in the kitconfig will be added").action(Xe);k.command("remove").description("Removes existing resources").option("--all","All resources present in the kitconfig will be removed").action(ye);k.parse();
