#! /usr/bin/env node
import { Command } from 'commander';
import Je from 'simple-git';
import X from 'fs-extra';
import Me from 'ora';
import { exec } from 'child_process';
import K from 'chalk';
import Qe from 'inquirer';
import Ve from 'path';
import { z as z$1 } from 'zod';

var p=(e,t,s)=>new Promise((r,i)=>{var u=m=>{try{a(s.next(m));}catch(y){i(y);}},o=m=>{try{a(s.throw(m));}catch(y){i(y);}},a=m=>m.done?r(m.value):Promise.resolve(m.value).then(u,o);a((s=s.apply(e,t)).next());});function ie(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];X.removeSync("./.git"),X.removeSync("./src/screens/XXXXX"),X.removeSync("./src/types/xxxxx.d.ts");let r=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(u=>i.includes(u)).length===0);X.writeFileSync("./src/main.tsx",r.join(`
`));}var Y=(e=process.cwd())=>X.readdirSync(e).includes("kitconfig"),I=(e,t)=>p(void 0,null,function*(){let s=process.cwd().split("/").at(-1),r;return s===e||Y()&&e==="root"?r=yield t():Y()?(process.chdir(e),r=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),r=yield t(),process.chdir(".."),process.chdir(s)),r}),O=(e,t)=>{let s=process.cwd().split("/").at(-1),r;return s===e||Y()&&e==="root"?r=t():Y()?(process.chdir(e),r=t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),r=t(),process.chdir(".."),process.chdir(s)),r},Q=()=>O("root",()=>X.readdirSync(".")),q=()=>O("root",()=>process.cwd()+"/.template");function ce(){X.removeSync("./.git"),X.removeSync("./src/Microservices/XXXXX"),X.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function M(e){return p(this,null,function*(){return new Promise(t=>{exec(e,()=>{t(null);});})})}var he=()=>`REST_API_PORT=3005
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
`;var Z=Me({color:"blue",indent:2});function le(e,t){return p(this,null,function*(){let s=e.toLowerCase();Z.start("Scaffolding project..."),yield Je().clone("https://github.com/oaktreeapps/admin-panel",s),process.chdir(s);let r=q();X.ensureDirSync(`${r}`),X.ensureDirSync(`${r}/webapp`),X.ensureDirSync(`${r}/server`),X.removeSync("./.git"),O("webapp",()=>{X.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${r}/webapp/XXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${r}/webapp/CreateXXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${r}/webapp/EditXXXXX.tsx`),X.copyFileSync("./src/types/xxxxx.d.ts",`${r}/webapp/xxxxx.d.ts`),X.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ie();}),O("server",()=>{X.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${r}/server/XXXXXRouter.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${r}/server/XXXXXController.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${r}/server/XXXXX.dto.ts`),X.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${r}/server/XXXXXEntity.ts`),X.writeFileSync("./.env",he()),ce();}),Z.succeed(`Created "${s}" successfully!`),t.onlyServer&&X.removeSync("webapp"),t.onlyWebapp&&X.removeSync("server"),Z.start("Installing dependencies..."),t.onlyServer||(yield I("webapp",()=>p(this,null,function*(){yield M("yarn install");}))),t.onlyWebapp||(yield I("server",()=>p(this,null,function*(){yield M("yarn install");}))),Z.succeed("Installed dependencies successfully!");})}var S=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},P=e=>e.charAt(0).toUpperCase()+e.slice(1);var xe=e=>{let t=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${P(t)}",
  url: "/${t}",
  collectionName: "${t}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Se=Me({color:"blue",indent:2});function pe(e){return p(this,null,function*(){let t=e.toLowerCase(),s=xe(t);Se.start(`Creating config template for ${K.cyan(t)}`),O("root",()=>{let r=`kitconfig/resources/${t}.cjs`;X.ensureFileSync(r),X.writeFileSync(r,s);}),Se.succeed(`Created config template for ${K.cyan(t)}`);})}var ue=z$1.object({name:z$1.string(),url:z$1.string(),only:z$1.union([z$1.literal("webapp"),z$1.literal("server")]).optional(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload"),z$1.literal("Calendar"),z$1.literal("Password"),z$1.literal("ColorPicker"),z$1.literal("Editor"),z$1.literal("MultiSelect")]).optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional().default([])}))}),we=z$1.object({resources:z$1.array(ue)});var k=()=>p(void 0,null,function*(){return I("root",()=>p(void 0,null,function*(){let e={resources:[]};if(!X.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let t=Ve.join(process.cwd(),"kitconfig"),s=X.readdirSync("kitconfig/resources");yield Promise.all(s.map(i=>p(void 0,null,function*(){let u=yield import(`${t}/resources/${i}`),o=ue.safeParse(u.default);o.success?e.resources.push(o.data):console.log(`Couldn't parse screen '${i}':`,o.error.format());})));let r=we.safeParse(e);return r.success?r.data:(console.error("Config parsing error",r.error),null)}))});var be=e=>`<FormInputNumber
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,ve=e=>`<FormInputText
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,Ie=e=>`<FormInputTextarea
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,Te=e=>`<FormInputDropdown
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,Pe=e=>`<FormInputRadio
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,Re=e=>`<FormInputSwitch
fieldName="${e.name}"
control={control}
inline={${e.inline}}
/>
`,De=e=>`<FormInputCalendar
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,Le=e=>`<FormInputPassword
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,Ae=e=>`<FormInputColorPicker
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,_e=e=>`<FormInputEditor
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,je=(e,t)=>`<FormInputUpload
folderName="${t}"
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`,Ue=e=>`<FormInputMultiSelect
control={control}
fieldName="${e.name}"
options={${e.name}Options}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${S(e.name)} is required!"`:"false"} }}
/>
`;var w=e=>`<Column
  field="${e}"
  header="${P(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,Oe=e=>`<Column header="${P(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var L={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function me(e,t){return p(this,null,function*(){let s=q(),r="",i="",u=[],o=[],a=[],m=[],y=["InputSwitch"];t.crudFields.forEach((n,U)=>{let d=n.widget||n.datatype,F="",C="";n.required&&!y.includes(n.widget||n.datatype||"")&&u.push(n.name),d==="InputText"||d==="String"?(n.tableDisplay&&a.push(w(n.name)),o.push(ve(n)),F="string",C='""'):d==="InputTextarea"?(n.tableDisplay&&a.push(w(n.name)),o.push(Ie(n)),F="string",C='""'):d==="InputNumber"||d==="Number"?(n.tableDisplay&&a.push(w(n.name)),o.push(be(n)),F="number",C="0"):d==="Dropdown"?(n.tableDisplay&&a.push(w(n.name)),o.push(Te(n)),m.push({fieldName:n.name,options:n.options}),F="string",C='""'):d==="RadioButton"?(n.tableDisplay&&a.push(w(n.name)),o.push(Pe(n)),m.push({fieldName:n.name,options:n.options}),F="string",C='""'):d==="MultiSelect"?(n.tableDisplay&&a.push(w(n.name)),o.push(Ue(n)),m.push({fieldName:n.name,options:n.options}),F="string[]",C="[]"):d==="ImageFileUpload"?(n.tableDisplay&&a.push(Oe(n.name)),o.push(je(n,t.name.toLowerCase())),F="string",C='""'):d==="InputSwitch"||d==="Boolean"?(n.tableDisplay&&a.push(w(n.name)),o.push(Re(n)),F="boolean",C="false"):d==="Calendar"?(n.tableDisplay&&a.push(w(n.name)),o.push(De(n)),F="string",C='""'):d==="Password"?(n.tableDisplay&&a.push(w(n.name)),o.push(Le(n)),F="string",C='""'):d==="ColorPicker"?(n.tableDisplay&&a.push(w(n.name)),o.push(Ae(n)),F="string",C='""'):d==="Editor"&&(n.tableDisplay&&a.push(w(n.name)),o.push(_e(n)),F="string",C='""'),U===0&&(r+=`id?: string;
`,i+=`id: undefined,
`),r+=`${n.name}: ${F};
`,i+=`${n.name}: ${C},
`;});let g=`./src/screens/${e}`,R=`${g}/${e}.tsx`,v=`${g}/Create${e}.tsx`,j=`${g}/Edit${e}.tsx`,G="./src/layout/items.json",te=X.readFileSync(`${s}/webapp/XXXXX.tsx`).toString(),re=X.readFileSync(`${s}/webapp/CreateXXXXX.tsx`).toString(),ne=X.readFileSync(`${s}/webapp/EditXXXXX.tsx`).toString(),oe=X.readFileSync(`${s}/webapp/xxxxx.d.ts`).toString(),se=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(L.initialState,i),l=[];se.split(`
`).forEach(n=>{n.includes(L.tableColumns)&&l.push(...a),l.push(n);}),X.writeFileSync(R,l.join(`
`));let $=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(L.input,o.join(`
`)).replace(L.validate,`if (${u.map(n=>`entity.${n}`).join(" && ")}) `),T=[];$.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(m.forEach(({fieldName:U,options:d})=>{T.push(`const ${U}Options = ${JSON.stringify(d,null,2)};
`);}),T.push(n)):(n.includes(L.initialState)&&T.push(i),T.push(n));}),X.writeFileSync(v,T.join(`
`));let h=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(L.input,o.join(`
`)).replace(L.validate,`if (${u.map(n=>`entity.${n}`).join(" && ")}) `),D=[];h.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(m.forEach(({fieldName:U,options:d})=>{D.push(`const ${U}Options = ${JSON.stringify(d,null,2)};
`);}),D.push(n)):(n.includes(L.initialState)&&D.push(i),D.push(n));}),X.writeFileSync(j,D.join(`
`));let Ke=X.readFileSync(G),ge=JSON.parse(Ke.toString());ge[0].items.push({label:e,to:`/${e.toLowerCase()}`,icon:"pi pi-box"}),X.writeFileSync(G,JSON.stringify(ge,null,2));let qe=oe.replace(/XXXXX/g,e).replace(L.interface,r);X.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,qe);let ke=X.readFileSync("./src/main.tsx").toString().split(`
`),Be=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],We=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],V=[];V.push(...We),ke.forEach(n=>{n.includes("{/* --ROUTES-- */}")&&Be.forEach(U=>{V.push(U);}),V.push(n);}),X.writeFileSync("./src/main.tsx",V.join(`
`));})}var H=(e,t)=>{let s="";return t.filter(r=>!!r).forEach(r=>{s+=`const existing${P(r)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${r},
  _id: { $ne: id },
});

if (existing${P(r)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),s},J=(e,t)=>{let s=`const { ${t.join(", ")} } = input;
`;return t.filter(r=>!!r).forEach(r=>{s+=`
const existing${P(r)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${r},
  });

if (existing${P(r)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),s};var f={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function fe(e,t){return p(this,null,function*(){let s=q(),r=["MultiSelect","Boolean","InputSwitch"],i=t.crudFields.filter(l=>l.unique&&!r.includes(l.name)).map(l=>l.name),u=[],o=[],a=[],m=[];t.crudFields.forEach(({name:l,widget:$,datatype:T,required:h,unique:D})=>{u.push(`${l}: entity.${l},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"||$==="ImageFileUpload"||$==="Calendar"||$==="Password"||$==="ColorPicker"||$==="Editor"||T==="String"?(o.push(`${l}${h?"":"?"}: string;`),a.push(`${l}: { type: String, required: ${h}, unique: ${D} },`),m.push(`${l}: z.string()${h?".nonempty()":".optional().nullable()"},`)):$==="InputNumber"||T==="Number"?(o.push(`${l}${h?"":"?"}: number;`),a.push(`${l}: { type: Number, required: ${h}, unique: ${D} },`),m.push(`${l}: z.number()${h?"":".optional().nullable()"},`)):$==="InputSwitch"||T==="Boolean"?(o.push(`${l}${h?"":"?"}: boolean;`),a.push(`${l}: { type: Boolean, required: ${h} },`),m.push(`${l}: z.boolean()${h?"":".optional().nullable()"},`)):$==="MultiSelect"&&(o.push(`${l}${h?"":"?"}: string[];`),a.push(`${l}: [{ type: String, required: ${h} }],`),m.push(`${l}: z.array(z.string())${h?".nonempty()":".optional().nullable()"},`));});let y=`./src/Microservices/${e}`,g=X.readFileSync(`${s}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,a.join(`
`)).replace(f.entity,u.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,J(e,i)).replace(f.checkExistingUpdateEntity,H(e,i)),R=X.readFileSync(`${s}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,a.join(`
`)).replace(f.entity,u.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,J(e,i)).replace(f.checkExistingUpdateEntity,H(e,i)),v=X.readFileSync(`${s}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,a.join(`
`)).replace(f.entity,u.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,J(e,i)).replace(f.checkExistingUpdateEntity,H(e,i)),j=X.readFileSync(`${s}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,a.join(`
`)).replace(f.entity,u.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,J(e,i)).replace(f.checkExistingUpdateEntity,H(e,i)),G=`${y}/${e}Controller.ts`,te=`${y}/${e}Router.ts`,re=`${y}/${e}.dto.ts`,ne=`./src/Database/Entities/${e}Entity.ts`;X.writeFileSync(G,g),X.writeFileSync(te,R),X.writeFileSync(re,v),X.writeFileSync(ne,j);let oe=X.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(l=>l.includes("export const ")?l+`
${e}Collection: "${t.collectionName}",`:l).join(`
`);X.writeFileSync("./src/Database/CollectionNames.ts",oe);let se=X.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(l=>l.includes("const ApiRouter =")?l+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:l.includes('import * as express from "express";')?l+`
import { ${e}Router } from "./${e}/${e}Router";`:l).join(`
`);X.writeFileSync("./src/Microservices/ApiRouter.ts",se);})}var z=Me({color:"blue",indent:2});function _(e,t){return p(this,null,function*(){let s=Q(),r=e.charAt(0).toUpperCase()+e.slice(1);s.includes("webapp")&&(!(t!=null&&t.places)||t.places.includes("webapp"))&&(yield I("webapp",()=>p(this,null,function*(){let i=`./src/types/${e}.d.ts`,u=`./src/screens/${r}`,o="./src/layout/items.json";if(!X.existsSync(u)){console.log("  Nothing to remove in webapp.");return}z.start(`Removing screen: ${e}`);let a=X.readFileSync(o),m=JSON.parse(a.toString());m[0].items=m[0].items.filter(v=>v.label.toLowerCase()!==r.toLowerCase()),X.writeFileSync(o,JSON.stringify(m,null,2)),X.removeSync(i),X.removeSync(u);let y=[`<Route path="${r.toLowerCase()}" element={<${r}Page />} />`,`<Route path="${r.toLowerCase()}/create" element={<Create${r}Page />} />`,`<Route path="${r.toLowerCase()}/edit/:id" element={<Edit${r}Page />} />`,`import ${r}Page from "./screens/${r}/${r}"`,`import Edit${r}Page from "./screens/${r}/Edit${r}"`,`import Create${r}Page from "./screens/${r}/Create${r}"`],R=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>y.filter(j=>v.includes(j)).length===0);X.writeFileSync("./src/main.tsx",R.join(`
`)),z.succeed(`Removed screen: ${e}`);}))),s.includes("server")&&(!(t!=null&&t.places)||t.places.includes("server"))&&(yield I("server",()=>p(this,null,function*(){let i=`./src/Microservices/${r}`,u=`./src/Database/Entities/${r}Entity.ts`,o="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!X.existsSync(i)){console.log("  Nothing to remove in server.");return}z.start(`Removing CRUD: ${r}`),X.removeSync(i),X.removeSync(u);let m=X.readFileSync(o).toString().split(`
`).filter(g=>!g.includes(`${r}Collection`)).join(`
`),y=X.readFileSync(a).toString().split(`
`).filter(g=>!g.includes(`${r}Router`)).join(`
`);X.writeFileSync(o,m),X.writeFileSync(a,y),z.succeed(`Removed CRUD: ${r}`);})));})}var ee=Me({color:"blue",indent:2}),ye=Me({color:"blue",indent:2});function N(e,t){return p(this,null,function*(){var a,m;let s=Q(),r=e.toLowerCase(),i=(m=(a=yield k())==null?void 0:a.resources)==null?void 0:m.find(y=>y.name.toLowerCase()===r.toLowerCase());if(!i){ee.fail(`Resource ${K.cyan(r)} not found in config file`);return}let u=t==null?void 0:t.places;i.only&&(i.only==="server"&&(u=["server"]),i.only==="webapp"&&(u=["webapp"]));let o=r.charAt(0).toUpperCase()+r.slice(1);s.includes("webapp")&&(!u||u.includes("webapp"))&&(yield I("webapp",()=>p(this,null,function*(){let y=`./src/screens/${o}`;if(X.existsSync(y)){if(!(t!=null&&t.force)){ee.fail(`Screen for ${K.cyan(o)} already exists`);return}yield _(r,{places:["webapp"]});}ee.start(`Creating screen: ${K.cyan(o)}`);let g=`${y}/${o}.tsx`,R=`${y}/Create${o}.tsx`,v=`${y}/Edit${o}.tsx`,j=`./src/types/${o.toLowerCase()}.d.ts`;X.createFileSync(g),X.createFileSync(R),X.createFileSync(v),X.createFileSync(j),yield me(o,i),yield M("yarn prettify"),ee.succeed(`Created screen: ${K.cyan(o)}`);}))),s.includes("server")&&(!u||u.includes("server"))&&(yield I("server",()=>p(this,null,function*(){let y=`./src/Microservices/${o}`;if(X.existsSync(y)){if(!(t!=null&&t.force)){ye.fail(`CRUD for ${K.cyan(o)} already exists`);return}yield _(r,{places:["server"]});}ye.start(`Creating CRUD for: ${K.cyan(o)}`);let g=`${y}/${o}Controller.ts`,R=`${y}/${o}Router.ts`,v=`${y}/${o}.dto.ts`;X.createFileSync(g),X.createFileSync(R),X.createFileSync(v),yield fe(o,i),yield M("yarn prettify"),ye.succeed(`Created CRUD for: ${K.cyan(o)}`);})));})}function de(e,t){return p(this,null,function*(){var u;let s=yield k(),r=(s==null?void 0:s.resources.map(o=>({name:o.name.toLowerCase()})))||[],i=["webapp","server"];if(t!=null&&t.onlyServer&&(i=["server"]),t!=null&&t.onlyWebapp&&(i=["webapp"]),t!=null&&t.all)r.forEach(a=>p(this,[a],function*({name:o}){yield N(o,{force:t==null?void 0:t.force,places:i});}));else if(e)e&&(yield N(e,{force:t==null?void 0:t.force,places:i}));else {let o=yield Qe.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:r}]);(u=o==null?void 0:o.resourceNames)==null||u.forEach(a=>p(this,null,function*(){yield N(a,{force:t==null?void 0:t.force,places:i});}));}})}function Xe(e,t){return p(this,null,function*(){var u;let s=yield k(),r=(s==null?void 0:s.resources.map(o=>({name:o.name.toLowerCase()})))||[],i=["webapp","server"];if(t!=null&&t.onlyServer&&(i=["server"]),t!=null&&t.onlyWebapp&&(i=["webapp"]),t!=null&&t.all)r.forEach(a=>p(this,[a],function*({name:o}){yield _(o,{places:i});}));else if(e)e&&(yield _(e,{places:i}));else {let o=yield Qe.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:r}]);(u=o==null?void 0:o.resourceNames)==null||u.forEach(a=>p(this,null,function*(){yield _(a,{places:i});}));}})}var B=new Command;B.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");B.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(le);B.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(pe);B.command("add").argument("[resourceName]","Name of the resource you want to add").option("--all","All resources present in the kitconfig will be added").option("-f, --force","Forcefully add the resource, overwriting existing files (if any).").option("--only-webapp","Only add the resource to webapp").option("--only-server","Only add the resource to server").description("Adds new resources").action(de);B.command("remove").argument("[resourceName]","Name of the resource you want to remove").option("--all","All resources present in the kitconfig will be removed").option("--only-webapp","Only remove the resource from webapp").option("--only-server","Only remove the resource from server").description("Removes existing resources").action(Xe);B.parse();
