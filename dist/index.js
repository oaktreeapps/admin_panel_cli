#! /usr/bin/env node
import { Command } from 'commander';
import Ve from 'simple-git';
import h from 'fs-extra';
import Ke from 'ora';
import { exec } from 'child_process';
import V from 'chalk';
import Ge from 'inquirer';
import We from 'path';
import { z as z$1 } from 'zod';

var a=(e,o,r)=>new Promise((t,s)=>{var p=d=>{try{i(r.next(d));}catch(y){s(y);}},c=d=>{try{i(r.throw(d));}catch(y){s(y);}},i=d=>d.done?t(d.value):Promise.resolve(d.value).then(p,c);i((r=r.apply(e,o)).next());});function se(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];h.removeSync("./.git"),h.removeSync("./src/screens/XXXXX"),h.removeSync("./src/types/xxxxx.d.ts");let t=h.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(p=>s.includes(p)).length===0);h.writeFileSync("./src/main.tsx",t.join(`
`));}var W=(e=process.cwd())=>h.readdirSync(e).includes("kitconfig"),b=(e,o)=>a(void 0,null,function*(){let r=process.cwd().split("/").at(-1),t;return r===e||W()&&e==="root"?t=yield o():W()?(process.chdir(e),t=yield o(),process.chdir("..")):e==="root"?(process.chdir(".."),t=yield o(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=yield o(),process.chdir(".."),process.chdir(r)),t}),A=(e,o)=>{let r=process.cwd().split("/").at(-1),t;return r===e||W()&&e==="root"?t=o():W()?(process.chdir(e),t=o(),process.chdir("..")):e==="root"?(process.chdir(".."),t=o(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=o(),process.chdir(".."),process.chdir(r)),t},G=()=>A("root",()=>{let e,o=h.readdirSync(".");return o.includes("webapp")&&o.includes("server")?e="both":o.includes("webapp")?e="webapp":o.includes("server")?e="server":e="INVALID_STATE",e}),j=()=>A("root",()=>process.cwd()+"/.template");function ce(){h.removeSync("./.git"),h.removeSync("./src/Microservices/XXXXX"),h.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function L(e){return a(this,null,function*(){return new Promise(o=>{exec(e,()=>{o(null);});})})}var he=()=>`REST_API_PORT=3005
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
`;var Y=Ke({color:"blue",indent:2});function ae(e,o){return a(this,null,function*(){let r=e.toLowerCase();Y.start("Scaffolding project..."),yield Ve().clone("https://github.com/oaktreeapps/admin-panel",r),process.chdir(r);let t=j();h.ensureDirSync(`${t}`),h.ensureDirSync(`${t}/webapp`),h.ensureDirSync(`${t}/server`),h.removeSync("./.git"),A("webapp",()=>{h.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${t}/webapp/XXXXX.tsx`),h.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${t}/webapp/CreateXXXXX.tsx`),h.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${t}/webapp/EditXXXXX.tsx`),h.copyFileSync("./src/types/xxxxx.d.ts",`${t}/webapp/xxxxx.d.ts`),h.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),se();}),A("server",()=>{h.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${t}/server/XXXXXRouter.ts`),h.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${t}/server/XXXXXController.ts`),h.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${t}/server/XXXXX.dto.ts`),h.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${t}/server/XXXXXEntity.ts`),h.writeFileSync("./.env",he()),ce();}),Y.succeed(`Created "${r}" successfully!`),o.onlyServer&&h.removeSync("webapp"),o.onlyWebapp&&h.removeSync("server"),Y.start("Installing dependencies..."),o.onlyServer||(yield b("webapp",()=>a(this,null,function*(){yield L("yarn install");}))),o.onlyWebapp||(yield b("server",()=>a(this,null,function*(){yield L("yarn install");}))),Y.succeed("Installed dependencies successfully!");})}var C=e=>{let o=e.replace(/([A-Z])/g," $1");return o.charAt(0).toUpperCase()+o.slice(1)},T=e=>e.charAt(0).toUpperCase()+e.slice(1);var $e=e=>{let o=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${T(o)}",
  url: "/${o}",
  collectionName: "${o}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Ce=Ke({color:"blue",indent:2});function le(e){return a(this,null,function*(){let o=e.toLowerCase(),r=$e(o);Ce.start(`Creating config template for ${V.cyan(o)}`),A("root",()=>{let t=`kitconfig/resources/${o}.cjs`;h.ensureFileSync(t),h.writeFileSync(t,r);}),Ce.succeed(`Created config template for ${V.cyan(o)}`);})}var pe=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String"),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload"),z$1.literal("Calendar"),z$1.literal("Password"),z$1.literal("ColorPicker"),z$1.literal("Editor")]).optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional().default([])}))}),Se=z$1.object({resources:z$1.array(pe)});var U=()=>a(void 0,null,function*(){return b("root",()=>a(void 0,null,function*(){let e={resources:[]};if(!h.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let o=We.join(process.cwd(),"kitconfig"),r=h.readdirSync("kitconfig/resources");yield Promise.all(r.map(s=>a(void 0,null,function*(){let p=yield import(`${o}/resources/${s}`),c=pe.safeParse(p.default);c.success?e.resources.push(c.data):console.log(`Couldn't parse screen '${s}':`,c.error.format());})));let t=Se.safeParse(e);return t.success?t.data:(console.error("Config parsing error",t.error),null)}))});var Ee=e=>`<FormInputNumber
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,be=e=>`<FormInputText
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Ie=e=>`<FormInputTextarea
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Te=e=>`<FormInputDropdown
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
options={${e.name}Options}
/>
`,ve=e=>`<FormInputRadio
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
options={${e.name}Options}
/>
`,Pe=e=>`<FormInputSwitch
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Re=e=>`<FormInputCalendar
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,De=e=>`<FormInputPassword
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Ae=e=>`<FormInputColorPicker
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,Le=e=>`<FormInputEditor
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`,_e=(e,o)=>`<FormInputUpload
folderName="${o}"
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: "* ${C(e.name)} is required!" }}
/>
`;var I=e=>`<Column
  field="${e}"
  header="${T(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,je=e=>`<Column header="${T(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var P={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ue(e,o){return a(this,null,function*(){let r=j(),t="",s="",p=[],c=[],i=[],d=[],y=["InputSwitch"];o.crudFields.forEach((n,D)=>{let f=n.widget||n.datatype,x="",F="";n.required&&!y.includes(n.widget||n.datatype||"")&&p.push(n.name),f==="InputText"||f==="String"?(n.tableDisplay&&i.push(I(n.name)),c.push(be(n)),x="string",F='""'):f==="InputTextarea"?(n.tableDisplay&&i.push(I(n.name)),c.push(Ie(n)),x="string",F='""'):f==="InputNumber"||f==="Number"?(n.tableDisplay&&i.push(I(n.name)),c.push(Ee(n)),x="number",F="0"):f==="Dropdown"?(n.tableDisplay&&i.push(I(n.name)),c.push(Te(n)),d.push({fieldName:n.name,options:n.options}),x="string",F='""'):f==="RadioButton"?(n.tableDisplay&&i.push(I(n.name)),c.push(ve(n)),d.push({fieldName:n.name,options:n.options}),x="string",F='""'):f==="ImageFileUpload"?(n.tableDisplay&&i.push(je(n.name)),c.push(_e(n,o.name.toLowerCase())),x="string",F='""'):f==="InputSwitch"||f==="Boolean"?(n.tableDisplay&&i.push(I(n.name)),c.push(Pe(n)),x="boolean",F="false"):f==="Calendar"?(n.tableDisplay&&i.push(I(n.name)),c.push(Re(n)),x="string",F='""'):f==="Password"?(n.tableDisplay&&i.push(I(n.name)),c.push(De(n)),x="string",F='""'):f==="ColorPicker"?(n.tableDisplay&&i.push(I(n.name)),c.push(Ae(n)),x="string",F='""'):f==="Editor"&&(n.tableDisplay&&i.push(I(n.name)),c.push(Le(n)),x="string",F='""'),D===0&&(t+=`id?: string;
`,s+=`id: undefined,
`),t+=`${n.name}: ${x};
`,s+=`${n.name}: ${F},
`;});let E=`./src/screens/${e}`,v=`${E}/${e}.tsx`,O=`${E}/Create${e}.tsx`,ee=`${E}/Edit${e}.tsx`,J="./src/layout/items.json",te=h.readFileSync(`${r}/webapp/XXXXX.tsx`).toString(),re=h.readFileSync(`${r}/webapp/CreateXXXXX.tsx`).toString(),oe=h.readFileSync(`${r}/webapp/EditXXXXX.tsx`).toString(),ne=h.readFileSync(`${r}/webapp/xxxxx.d.ts`).toString(),m=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(P.initialState,s),X=[];m.split(`
`).forEach(n=>{n.includes(P.tableColumns)&&X.push(...i),X.push(n);}),h.writeFileSync(v,X.join(`
`));let k=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(P.input,c.join(`
`)).replace(P.validate,`if (${p.map(n=>`entity.${n}`).join(" && ")}) `),g=[];k.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(d.forEach(({fieldName:D,options:f})=>{g.push(`const ${D}Options = ${JSON.stringify(f,null,2)};
`);}),g.push(n)):(n.includes(P.initialState)&&g.push(s),g.push(n));}),h.writeFileSync(O,g.join(`
`));let M=oe.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(P.input,c.join(`
`)).replace(P.validate,`if (${p.map(n=>`entity.${n}`).join(" && ")}) `),_=[];M.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(d.forEach(({fieldName:D,options:f})=>{_.push(`const ${D}Options = ${JSON.stringify(f,null,2)};
`);}),_.push(n)):(n.includes(P.initialState)&&_.push(s),_.push(n));}),h.writeFileSync(ee,_.join(`
`));let Oe=h.readFileSync(J),Xe=JSON.parse(Oe.toString());Xe[0].items.push({label:e,to:`/${e.toLowerCase()}`,icon:"pi pi-box"}),h.writeFileSync(J,JSON.stringify(Xe,null,2));let ke=ne.replace(/XXXXX/g,e).replace(P.interface,t);h.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ke);let Me=h.readFileSync("./src/main.tsx").toString().split(`
`),qe=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Be=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],N=[];N.push(...Be),Me.forEach(n=>{n.includes("{/* --ROUTES-- */}")&&qe.forEach(D=>{N.push(D);}),N.push(n);}),h.writeFileSync("./src/main.tsx",N.join(`
`));})}var B=(e,o)=>{let r="";return o.filter(t=>!!t).forEach(t=>{r+=`const existing${T(t)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${t},
  _id: { $ne: id },
});

if (existing${T(t)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r},H=(e,o)=>{let r=`const { ${o.join(", ")} } = input;
`;return o.filter(t=>!!t).forEach(t=>{r+=`
const existing${T(t)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
  });

if (existing${T(t)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function me(e,o){return a(this,null,function*(){let r=j(),t=o.crudFields.filter(m=>m.unique).map(m=>m.name),s=[],p=[],c=[],i=[];o.crudFields.forEach(({name:m,widget:X,datatype:k,required:g,unique:M})=>{s.push(`${m}: entity.${m},`),X==="InputText"||X==="InputTextarea"||X==="Dropdown"||X==="RadioButton"||X==="ImageFileUpload"||X==="Calendar"||X==="Password"||X==="ColorPicker"||X==="Editor"||k==="String"?(p.push(`${m}${g?"":"?"}: string;`),c.push(`${m}: { type: String, required: ${g}, unique: ${M} },`),i.push(`${m}: z.string()${g?".nonempty()":".optional().nullable()"},`)):X==="InputNumber"||k==="Number"?(p.push(`${m}${g?"":"?"}: number;`),c.push(`${m}: { type: Number, required: ${g}, unique: ${M} },`),i.push(`${m}: z.number()${g?"":".optional().nullable()"},`)):(X==="InputSwitch"||k==="Boolean")&&(p.push(`${m}${g?"":"?"}: boolean;`),c.push(`${m}: { type: Boolean, required: ${g}, unique: ${M} },`),i.push(`${m}: z.boolean()${g?"":".optional().nullable()"},`));});let d=`./src/Microservices/${e}`,y=h.readFileSync(`${r}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,c.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,B(e,t)),E=h.readFileSync(`${r}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,c.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,B(e,t)),v=h.readFileSync(`${r}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,c.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,B(e,t)),O=h.readFileSync(`${r}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,c.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,B(e,t)),ee=`${d}/${e}Controller.ts`,J=`${d}/${e}Router.ts`,te=`${d}/${e}.dto.ts`,re=`./src/Database/Entities/${e}Entity.ts`;h.writeFileSync(ee,y),h.writeFileSync(J,E),h.writeFileSync(te,v),h.writeFileSync(re,O);let oe=h.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${o.collectionName}",`:m).join(`
`);h.writeFileSync("./src/Database/CollectionNames.ts",oe);let ne=h.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);h.writeFileSync("./src/Microservices/ApiRouter.ts",ne);})}var de=Ke({color:"blue",indent:2}),Ue=Ke({color:"blue",indent:2});function Q(e){return a(this,null,function*(){var p,c;let o=G(),r=e.toLowerCase(),t=(c=(p=yield U())==null?void 0:p.resources)==null?void 0:c.find(i=>i.name.toLowerCase()===r.toLowerCase());if(!t){de.fail(`Resource ${V.cyan(r)} not found in config file`);return}let s=r.charAt(0).toUpperCase()+r.slice(1);(o==="both"||o==="webapp")&&(yield b("webapp",()=>a(this,null,function*(){let i=`./src/screens/${s}`;if(h.existsSync(i))return;de.start(`Creating screen: ${V.cyan(s)}`);let d=`${i}/${s}.tsx`,y=`${i}/Create${s}.tsx`,E=`${i}/Edit${s}.tsx`,v=`./src/types/${s.toLowerCase()}.d.ts`;h.createFileSync(d),h.createFileSync(y),h.createFileSync(E),h.createFileSync(v),yield ue(s,t),yield L("yarn prettify"),de.succeed(`Created screen: ${V.cyan(s)}`);}))),(o==="both"||o==="server")&&(yield b("server",()=>a(this,null,function*(){let i=`./src/Microservices/${s}`;if(h.existsSync(i))return;Ue.start(`Creating CRUD for: ${V.cyan(s)}`);let d=`${i}/${s}Controller.ts`,y=`${i}/${s}Router.ts`,E=`${i}/${s}.dto.ts`;h.createFileSync(d),h.createFileSync(y),h.createFileSync(E),yield me(s,t),yield L("yarn prettify"),Ue.succeed(`Created CRUD for: ${V.cyan(s)}`);})));})}function fe(e){return a(this,null,function*(){var t;let o=yield U(),r=(o==null?void 0:o.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)r.forEach(p=>a(this,[p],function*({name:s}){yield Q(s);}));else {let s=yield Ge.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:r}]);(t=s==null?void 0:s.resourceNames)==null||t.forEach(p=>a(this,null,function*(){yield Q(p);}));}})}var Z=Ke({color:"blue",indent:2});function z(e){return a(this,null,function*(){let o=G(),r=e.charAt(0).toUpperCase()+e.slice(1);(o==="both"||o==="webapp")&&(yield b("webapp",()=>a(this,null,function*(){let t=`./src/types/${e}.d.ts`,s=`./src/screens/${r}`,p="./src/layout/items.json";if(!h.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Z.start(`Removing screen: ${e}`);let c=h.readFileSync(p),i=JSON.parse(c.toString());i[0].items=i[0].items.filter(v=>v.label.toLowerCase()!==r.toLowerCase()),h.writeFileSync(p,JSON.stringify(i,null,2)),h.removeSync(t),h.removeSync(s);let d=[`<Route path="${r.toLowerCase()}" element={<${r}Page />} />`,`<Route path="${r.toLowerCase()}/create" element={<Create${r}Page />} />`,`<Route path="${r.toLowerCase()}/edit/:id" element={<Edit${r}Page />} />`,`import ${r}Page from "./screens/${r}/${r}"`,`import Edit${r}Page from "./screens/${r}/Edit${r}"`,`import Create${r}Page from "./screens/${r}/Create${r}"`],E=h.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>d.filter(O=>v.includes(O)).length===0);h.writeFileSync("./src/main.tsx",E.join(`
`)),Z.succeed(`Removed screen: ${e}`);}))),(o==="both"||o==="server")&&(yield b("server",()=>a(this,null,function*(){let t=`./src/Microservices/${r}`,s=`./src/Database/Entities/${r}Entity.ts`,p="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!h.existsSync(t)){console.log("  Nothing to remove in server.");return}Z.start(`Removing CRUD: ${r}`),h.removeSync(t),h.removeSync(s);let i=h.readFileSync(p).toString().split(`
`).filter(y=>!y.includes(`${r}Collection`)).join(`
`),d=h.readFileSync(c).toString().split(`
`).filter(y=>!y.includes(`${r}Router`)).join(`
`);h.writeFileSync(p,i),h.writeFileSync(c,d),Z.succeed(`Removed CRUD: ${r}`);})));})}function ye(e){return a(this,null,function*(){var t;let o=yield U(),r=(o==null?void 0:o.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)r.forEach(p=>a(this,[p],function*({name:s}){yield z(s);}));else {let s=yield Ge.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:r}]);(t=s==null?void 0:s.resourceNames)==null||t.forEach(p=>a(this,null,function*(){yield z(p);}));}})}var K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ae);K.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(le);K.command("add").description("Adds new resources").option("--all","All resources present in the kitconfig will be added").action(fe);K.command("remove").description("Removes existing resources").option("--all","All resources present in the kitconfig will be removed").action(ye);K.parse();
