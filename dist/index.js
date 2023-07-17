#! /usr/bin/env node
import { Command } from 'commander';
import Ve from 'simple-git';
import X from 'fs-extra';
import Ke from 'ora';
import { exec } from 'child_process';
import H from 'chalk';
import Ye from 'inquirer';
import Ge from 'path';
import { z } from 'zod';

var l=(e,n,t)=>new Promise((o,s)=>{var m=u=>{try{i(t.next(u));}catch(y){s(y);}},a=u=>{try{i(t.throw(u));}catch(y){s(y);}},i=u=>u.done?o(u.value):Promise.resolve(u.value).then(m,a);i((t=t.apply(e,n)).next());});function se(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];X.removeSync("./.git"),X.removeSync("./src/screens/XXXXX"),X.removeSync("./src/types/xxxxx.d.ts");let o=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(m=>s.includes(m)).length===0);X.writeFileSync("./src/main.tsx",o.join(`
`));}var J=(e=process.cwd())=>X.readdirSync(e).includes("kitconfig"),T=(e,n)=>l(void 0,null,function*(){let t=process.cwd().split("/").at(-1),o;return t===e||J()&&e==="root"?o=yield n():J()?(process.chdir(e),o=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),o=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),o=yield n(),process.chdir(".."),process.chdir(t)),o}),_=(e,n)=>{let t=process.cwd().split("/").at(-1),o;return t===e||J()&&e==="root"?o=n():J()?(process.chdir(e),o=n(),process.chdir("..")):e==="root"?(process.chdir(".."),o=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),o=n(),process.chdir(".."),process.chdir(t)),o},W=()=>_("root",()=>{let e,n=X.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e}),U=()=>_("root",()=>process.cwd()+"/.template");function ae(){X.removeSync("./.git"),X.removeSync("./src/Microservices/XXXXX"),X.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function j(e){return l(this,null,function*(){return new Promise(n=>{exec(e,()=>{n(null);});})})}var $e=()=>`REST_API_PORT=3005
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
`;var G=Ke({color:"blue",indent:2});function ce(e,n){return l(this,null,function*(){let t=e.toLowerCase();G.start("Scaffolding project..."),yield Ve().clone("https://github.com/oaktreeapps/admin-panel",t),process.chdir(t);let o=U();X.ensureDirSync(`${o}`),X.ensureDirSync(`${o}/webapp`),X.ensureDirSync(`${o}/server`),X.removeSync("./.git"),_("webapp",()=>{X.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${o}/webapp/XXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${o}/webapp/CreateXXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${o}/webapp/EditXXXXX.tsx`),X.copyFileSync("./src/types/xxxxx.d.ts",`${o}/webapp/xxxxx.d.ts`),X.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),se();}),_("server",()=>{X.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${o}/server/XXXXXRouter.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${o}/server/XXXXXController.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${o}/server/XXXXX.dto.ts`),X.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${o}/server/XXXXXEntity.ts`),X.writeFileSync("./.env",$e()),ae();}),G.succeed(`Created "${t}" successfully!`),n.onlyServer&&X.removeSync("webapp"),n.onlyWebapp&&X.removeSync("server"),G.start("Installing dependencies..."),n.onlyServer||(yield T("webapp",()=>l(this,null,function*(){yield j("yarn install");}))),n.onlyWebapp||(yield T("server",()=>l(this,null,function*(){yield j("yarn install");}))),G.succeed("Installed dependencies successfully!");})}var C=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},v=e=>e.charAt(0).toUpperCase()+e.slice(1);var he=e=>{let n=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${v(n)}",
  url: "/${n}",
  collectionName: "${n}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Ce=Ke({color:"blue",indent:2});function le(e){return l(this,null,function*(){let n=e.toLowerCase(),t=he(n);Ce.start(`Creating config template for ${H.cyan(n)}`),_("root",()=>{let o=`kitconfig/resources/${n}.cjs`;X.ensureFileSync(o),X.writeFileSync(o,t);}),Ce.succeed(`Created config template for ${H.cyan(n)}`);})}var pe=z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),datatype:z.union([z.literal("String"),z.literal("Number"),z.literal("Boolean")]).optional(),widget:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("InputSwitch"),z.literal("InputNumber"),z.literal("ImageFileUpload"),z.literal("Calendar"),z.literal("Password"),z.literal("ColorPicker"),z.literal("Editor"),z.literal("MultiSelect")]).optional(),options:z.array(z.object({name:z.string(),value:z.string()})).optional().default([])}))}),Se=z.object({resources:z.array(pe)});var M=()=>l(void 0,null,function*(){return T("root",()=>l(void 0,null,function*(){let e={resources:[]};if(!X.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=Ge.join(process.cwd(),"kitconfig"),t=X.readdirSync("kitconfig/resources");yield Promise.all(t.map(s=>l(void 0,null,function*(){let m=yield import(`${n}/resources/${s}`),a=pe.safeParse(m.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let o=Se.safeParse(e);return o.success?o.data:(console.error("Config parsing error",o.error),null)}))});var we=e=>`<FormInputNumber
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,be=e=>`<FormInputText
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,Ie=e=>`<FormInputTextarea
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,Te=e=>`<FormInputDropdown
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,ve=e=>`<FormInputRadio
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,Pe=e=>`<FormInputSwitch
fieldName="${e.name}"
control={control}
inline={${e.inline}}
/>
`,Re=e=>`<FormInputCalendar
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,De=e=>`<FormInputPassword
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,Ae=e=>`<FormInputColorPicker
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,Le=e=>`<FormInputEditor
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,_e=(e,n)=>`<FormInputUpload
folderName="${n}"
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`,je=e=>`<FormInputMultiSelect
control={control}
fieldName="${e.name}"
options={${e.name}Options}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${C(e.name)} is required!"`:"false"} }}
/>
`;var S=e=>`<Column
  field="${e}"
  header="${v(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,Ue=e=>`<Column header="${v(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var D={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ue(e,n){return l(this,null,function*(){let t=U(),o="",s="",m=[],a=[],i=[],u=[],y=["InputSwitch"];n.crudFields.forEach((r,L)=>{let d=r.widget||r.datatype,x="",F="";r.required&&!y.includes(r.widget||r.datatype||"")&&m.push(r.name),d==="InputText"||d==="String"?(r.tableDisplay&&i.push(S(r.name)),a.push(be(r)),x="string",F='""'):d==="InputTextarea"?(r.tableDisplay&&i.push(S(r.name)),a.push(Ie(r)),x="string",F='""'):d==="InputNumber"||d==="Number"?(r.tableDisplay&&i.push(S(r.name)),a.push(we(r)),x="number",F="0"):d==="Dropdown"?(r.tableDisplay&&i.push(S(r.name)),a.push(Te(r)),u.push({fieldName:r.name,options:r.options}),x="string",F='""'):d==="RadioButton"?(r.tableDisplay&&i.push(S(r.name)),a.push(ve(r)),u.push({fieldName:r.name,options:r.options}),x="string",F='""'):d==="MultiSelect"?(r.tableDisplay&&i.push(S(r.name)),a.push(je(r)),u.push({fieldName:r.name,options:r.options}),x="string[]",F="[]"):d==="ImageFileUpload"?(r.tableDisplay&&i.push(Ue(r.name)),a.push(_e(r,n.name.toLowerCase())),x="string",F='""'):d==="InputSwitch"||d==="Boolean"?(r.tableDisplay&&i.push(S(r.name)),a.push(Pe(r)),x="boolean",F="false"):d==="Calendar"?(r.tableDisplay&&i.push(S(r.name)),a.push(Re(r)),x="string",F='""'):d==="Password"?(r.tableDisplay&&i.push(S(r.name)),a.push(De(r)),x="string",F='""'):d==="ColorPicker"?(r.tableDisplay&&i.push(S(r.name)),a.push(Ae(r)),x="string",F='""'):d==="Editor"&&(r.tableDisplay&&i.push(S(r.name)),a.push(Le(r)),x="string",F='""'),L===0&&(o+=`id?: string;
`,s+=`id: undefined,
`),o+=`${r.name}: ${x};
`,s+=`${r.name}: ${F},
`;});let b=`./src/screens/${e}`,P=`${b}/${e}.tsx`,O=`${b}/Create${e}.tsx`,z=`${b}/Edit${e}.tsx`,N="./src/layout/items.json",ee=X.readFileSync(`${t}/webapp/XXXXX.tsx`).toString(),te=X.readFileSync(`${t}/webapp/CreateXXXXX.tsx`).toString(),re=X.readFileSync(`${t}/webapp/EditXXXXX.tsx`).toString(),ne=X.readFileSync(`${t}/webapp/xxxxx.d.ts`).toString(),oe=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.initialState,s),c=[];oe.split(`
`).forEach(r=>{r.includes(D.tableColumns)&&c.push(...i),c.push(r);}),X.writeFileSync(P,c.join(`
`));let g=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.input,a.join(`
`)).replace(D.validate,`if (${m.map(r=>`entity.${r}`).join(" && ")}) `),I=[];g.split(`
`).forEach(r=>{r.includes("const saveEntity = ")?(u.forEach(({fieldName:L,options:d})=>{I.push(`const ${L}Options = ${JSON.stringify(d,null,2)};
`);}),I.push(r)):(r.includes(D.initialState)&&I.push(s),I.push(r));}),X.writeFileSync(O,I.join(`
`));let $=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.input,a.join(`
`)).replace(D.validate,`if (${m.map(r=>`entity.${r}`).join(" && ")}) `),R=[];$.split(`
`).forEach(r=>{r.includes("const saveEntity = ")?(u.forEach(({fieldName:L,options:d})=>{R.push(`const ${L}Options = ${JSON.stringify(d,null,2)};
`);}),R.push(r)):(r.includes(D.initialState)&&R.push(s),R.push(r));}),X.writeFileSync(z,R.join(`
`));let Oe=X.readFileSync(N),Xe=JSON.parse(Oe.toString());Xe[0].items.push({label:e,to:`/${e.toLowerCase()}`,icon:"pi pi-box"}),X.writeFileSync(N,JSON.stringify(Xe,null,2));let qe=ne.replace(/XXXXX/g,e).replace(D.interface,o);X.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,qe);let ke=X.readFileSync("./src/main.tsx").toString().split(`
`),Be=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],He=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],V=[];V.push(...He),ke.forEach(r=>{r.includes("{/* --ROUTES-- */}")&&Be.forEach(L=>{V.push(L);}),V.push(r);}),X.writeFileSync("./src/main.tsx",V.join(`
`));})}var k=(e,n)=>{let t="";return n.filter(o=>!!o).forEach(o=>{t+=`const existing${v(o)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${o},
  _id: { $ne: id },
});

if (existing${v(o)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${o}' already exists",
  };
}
`;}),t},B=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(o=>!!o).forEach(o=>{t+=`
const existing${v(o)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${o},
  });

if (existing${v(o)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${o}' already exists",
  };
}
`;}),t};var f={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function me(e,n){return l(this,null,function*(){let t=U(),o=["MultiSelect","Boolean","InputSwitch"],s=n.crudFields.filter(c=>c.unique&&!o.includes(c.name)).map(c=>c.name),m=[],a=[],i=[],u=[];n.crudFields.forEach(({name:c,widget:g,datatype:I,required:$,unique:R})=>{m.push(`${c}: entity.${c},`),console.log(g,I),g==="InputText"||g==="InputTextarea"||g==="Dropdown"||g==="RadioButton"||g==="ImageFileUpload"||g==="Calendar"||g==="Password"||g==="ColorPicker"||g==="Editor"||I==="String"?(a.push(`${c}${$?"":"?"}: string;`),i.push(`${c}: { type: String, required: ${$}, unique: ${R} },`),u.push(`${c}: z.string()${$?".nonempty()":".optional().nullable()"},`)):g==="InputNumber"||I==="Number"?(a.push(`${c}${$?"":"?"}: number;`),i.push(`${c}: { type: Number, required: ${$}, unique: ${R} },`),u.push(`${c}: z.number()${$?"":".optional().nullable()"},`)):g==="InputSwitch"||I==="Boolean"?(a.push(`${c}${$?"":"?"}: boolean;`),i.push(`${c}: { type: Boolean, required: ${$} },`),u.push(`${c}: z.boolean()${$?"":".optional().nullable()"},`)):g==="MultiSelect"&&(a.push(`${c}${$?"":"?"}: string[];`),i.push(`${c}: [{ type: String, required: ${$} }],`),u.push(`${c}: z.array(z.string())${$?".nonempty()":".optional().nullable()"},`));});let y=`./src/Microservices/${e}`,b=X.readFileSync(`${t}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,a.join(`
`)).replace(f.schema,i.join(`
`)).replace(f.entity,m.join(`
`)).replace(f.zod,u.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,B(e,s)).replace(f.checkExistingUpdateEntity,k(e,s)),P=X.readFileSync(`${t}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,a.join(`
`)).replace(f.schema,i.join(`
`)).replace(f.entity,m.join(`
`)).replace(f.zod,u.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,B(e,s)).replace(f.checkExistingUpdateEntity,k(e,s)),O=X.readFileSync(`${t}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,a.join(`
`)).replace(f.schema,i.join(`
`)).replace(f.entity,m.join(`
`)).replace(f.zod,u.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,B(e,s)).replace(f.checkExistingUpdateEntity,k(e,s)),z=X.readFileSync(`${t}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,a.join(`
`)).replace(f.schema,i.join(`
`)).replace(f.entity,m.join(`
`)).replace(f.zod,u.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,B(e,s)).replace(f.checkExistingUpdateEntity,k(e,s)),N=`${y}/${e}Controller.ts`,ee=`${y}/${e}Router.ts`,te=`${y}/${e}.dto.ts`,re=`./src/Database/Entities/${e}Entity.ts`;X.writeFileSync(N,b),X.writeFileSync(ee,P),X.writeFileSync(te,O),X.writeFileSync(re,z);let ne=X.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(c=>c.includes("export const ")?c+`
${e}Collection: "${n.collectionName}",`:c).join(`
`);X.writeFileSync("./src/Database/CollectionNames.ts",ne);let oe=X.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(c=>c.includes("const ApiRouter =")?c+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:c.includes('import * as express from "express";')?c+`
import { ${e}Router } from "./${e}/${e}Router";`:c).join(`
`);X.writeFileSync("./src/Microservices/ApiRouter.ts",oe);})}var fe=Ke({color:"blue",indent:2}),Me=Ke({color:"blue",indent:2});function Y(e){return l(this,null,function*(){var m,a;let n=W(),t=e.toLowerCase(),o=(a=(m=yield M())==null?void 0:m.resources)==null?void 0:a.find(i=>i.name.toLowerCase()===t.toLowerCase());if(!o){fe.fail(`Resource ${H.cyan(t)} not found in config file`);return}let s=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield T("webapp",()=>l(this,null,function*(){let i=`./src/screens/${s}`;if(X.existsSync(i))return;fe.start(`Creating screen: ${H.cyan(s)}`);let u=`${i}/${s}.tsx`,y=`${i}/Create${s}.tsx`,b=`${i}/Edit${s}.tsx`,P=`./src/types/${s.toLowerCase()}.d.ts`;X.createFileSync(u),X.createFileSync(y),X.createFileSync(b),X.createFileSync(P),yield ue(s,o),yield j("yarn prettify"),fe.succeed(`Created screen: ${H.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield T("server",()=>l(this,null,function*(){let i=`./src/Microservices/${s}`;if(X.existsSync(i))return;Me.start(`Creating CRUD for: ${H.cyan(s)}`);let u=`${i}/${s}Controller.ts`,y=`${i}/${s}Router.ts`,b=`${i}/${s}.dto.ts`;X.createFileSync(u),X.createFileSync(y),X.createFileSync(b),yield me(s,o),yield j("yarn prettify"),Me.succeed(`Created CRUD for: ${H.cyan(s)}`);})));})}function de(e){return l(this,null,function*(){var o;let n=yield M(),t=(n==null?void 0:n.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)t.forEach(m=>l(this,[m],function*({name:s}){yield Y(s);}));else {let s=yield Ye.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:t}]);(o=s==null?void 0:s.resourceNames)==null||o.forEach(m=>l(this,null,function*(){yield Y(m);}));}})}var Q=Ke({color:"blue",indent:2});function Z(e){return l(this,null,function*(){let n=W(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield T("webapp",()=>l(this,null,function*(){let o=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,m="./src/layout/items.json";if(!X.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let a=X.readFileSync(m),i=JSON.parse(a.toString());i[0].items=i[0].items.filter(P=>P.label.toLowerCase()!==t.toLowerCase()),X.writeFileSync(m,JSON.stringify(i,null,2)),X.removeSync(o),X.removeSync(s);let u=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],b=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>u.filter(O=>P.includes(O)).length===0);X.writeFileSync("./src/main.tsx",b.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield T("server",()=>l(this,null,function*(){let o=`./src/Microservices/${t}`,s=`./src/Database/Entities/${t}Entity.ts`,m="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!X.existsSync(o)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),X.removeSync(o),X.removeSync(s);let i=X.readFileSync(m).toString().split(`
`).filter(y=>!y.includes(`${t}Collection`)).join(`
`),u=X.readFileSync(a).toString().split(`
`).filter(y=>!y.includes(`${t}Router`)).join(`
`);X.writeFileSync(m,i),X.writeFileSync(a,u),Q.succeed(`Removed CRUD: ${t}`);})));})}function ye(e){return l(this,null,function*(){var o;let n=yield M(),t=(n==null?void 0:n.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)t.forEach(m=>l(this,[m],function*({name:s}){yield Z(s);}));else {let s=yield Ye.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:t}]);(o=s==null?void 0:s.resourceNames)==null||o.forEach(m=>l(this,null,function*(){yield Z(m);}));}})}var K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ce);K.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(le);K.command("add").description("Adds new resources").option("--all","All resources present in the kitconfig will be added").action(de);K.command("remove").description("Removes existing resources").option("--all","All resources present in the kitconfig will be removed").action(ye);K.parse();
