#! /usr/bin/env node
import { Command } from 'commander';
import He from 'simple-git';
import X from 'fs-extra';
import Be from 'ora';
import { exec } from 'child_process';
import ot from 'open';
import he from 'express';
import nt from 'cors';
import Ze from 'path';
import { z } from 'zod';
import M from 'chalk';
import it from 'inquirer';

var a=(e,t,i)=>new Promise((r,s)=>{var c=m=>{try{l(i.next(m));}catch(d){s(d);}},o=m=>{try{l(i.throw(m));}catch(d){s(d);}},l=m=>m.done?r(m.value):Promise.resolve(m.value).then(c,o);l((i=i.apply(e,t)).next());});function le(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];X.removeSync("./.git"),X.removeSync("./src/screens/XXXXX"),X.removeSync("./src/types/xxxxx.d.ts");let r=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(c=>s.includes(c)).length===0);X.writeFileSync("./src/main.tsx",r.join(`
`));}var N=(e=process.cwd())=>X.readdirSync(e).includes("kitconfig"),we=()=>{let e=process.cwd().split("/").at(-1);return (e==="webapp"||e==="server")&&X.readdirSync("..").includes("kitconfig")?e:N()?"root":null},g=(e,t)=>a(void 0,null,function*(){let i=process.cwd().split("/").at(-1),r;return i===e||N()&&e==="root"?r=yield t():N()?(process.chdir(e),r=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield t(),process.chdir(i)):(process.chdir(".."),process.chdir(e),r=yield t(),process.chdir(".."),process.chdir(i)),r}),U=(e,t)=>{let i=process.cwd().split("/").at(-1),r;return i===e||N()&&e==="root"?r=t():N()?(process.chdir(e),r=t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=t(),process.chdir(i)):(process.chdir(".."),process.chdir(e),r=t(),process.chdir(".."),process.chdir(i)),r},ee=()=>U("root",()=>X.readdirSync(".")),W=()=>U("root",()=>process.cwd()+"/.template");function me(){X.removeSync("./.git"),X.removeSync("./src/Microservices/XXXXX"),X.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function K(e){return a(this,null,function*(){return new Promise(t=>{exec(e,()=>{t(null);});})})}var be=()=>`REST_API_PORT=3005
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
`;var fe=z.object({name:z.string(),url:z.string(),only:z.union([z.literal("webapp"),z.literal("server")]).optional(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),datatype:z.union([z.literal("String"),z.literal("Number"),z.literal("Boolean")]).optional(),widget:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("InputSwitch"),z.literal("InputNumber"),z.literal("ImageFileUpload"),z.literal("Calendar"),z.literal("Password"),z.literal("ColorPicker"),z.literal("Editor"),z.literal("MultiSelect")]).optional(),options:z.array(z.object({name:z.string(),value:z.string()})).optional().default([])}))}),Ee=z.object({resources:z.array(fe)});var _=()=>a(void 0,null,function*(){return g("root",()=>a(void 0,null,function*(){let config={resources:[]};if(!X.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let kitConfigAbsolutePath=Ze.join(process.cwd(),"kitconfig"),screenFiles=X.readdirSync("kitconfig/resources");yield Promise.all(screenFiles.map(screenFile=>a(void 0,null,function*(){let configFileStr=X.readFileSync(`${kitConfigAbsolutePath}/resources/${screenFile}`).toString(),configFile=eval(configFileStr),parsedScreen=fe.safeParse(configFile);parsedScreen.success?config.resources.push(parsedScreen.data):console.log(`Couldn't parse screen '${screenFile}':`,parsedScreen.error.format());})));let parsedConfig=Ee.safeParse(config);return parsedConfig.success?parsedConfig.data:(console.error("Config parsing error",parsedConfig.error),null)}))});var w=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},R=e=>e.charAt(0).toUpperCase()+e.slice(1);var te=(e,t)=>{let i=e.toLowerCase(),r=`{
  name: "${R(i)}",
  url: "/${i}",
  collectionName: "${i}",
  crudFields: [
    // ...
  ],
}`;return t&&(r=JSON.stringify(t,null,2)),`/**
* @type {import('../types').Resource}
*/
const resource = ${r};

resource;
`};var Pe=Be({color:"blue",indent:2});function G(e){return a(this,null,function*(){let t=e.toLowerCase(),i=te(t);Pe.start(`Creating config template for ${M.cyan(t)}`),U("root",()=>{let r=`kitconfig/resources/${t}.cjs`;X.ensureFileSync(r),X.writeFileSync(r,i);}),Pe.succeed(`Created config template for ${M.cyan(t)}`);})}var H=Be({color:"blue",indent:2});function b(e,t){return a(this,null,function*(){let i=ee(),r=e.charAt(0).toUpperCase()+e.slice(1);i.includes("webapp")&&(!(t!=null&&t.places)||t.places.includes("webapp"))&&(yield g("webapp",()=>a(this,null,function*(){let s=`./src/types/${e}.d.ts`,c=`./src/screens/${r}`,o="./src/layout/items.json";if(!X.existsSync(c)){console.log("  Nothing to remove in webapp.");return}H.start(`Removing screen: ${e}`);let l=X.readFileSync(o),m=JSON.parse(l.toString());m[0].items=m[0].items.filter(P=>P.label.toLowerCase()!==r.toLowerCase()),X.writeFileSync(o,JSON.stringify(m,null,2)),X.removeSync(s),X.removeSync(c);let d=[`<Route path="${r.toLowerCase()}" element={<${r}Page />} />`,`<Route path="${r.toLowerCase()}/create" element={<Create${r}Page />} />`,`<Route path="${r.toLowerCase()}/edit/:id" element={<Edit${r}Page />} />`,`import ${r}Page from "./screens/${r}/${r}"`,`import Edit${r}Page from "./screens/${r}/Edit${r}"`,`import Create${r}Page from "./screens/${r}/Create${r}"`],D=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>d.filter(k=>P.includes(k)).length===0);X.writeFileSync("./src/main.tsx",D.join(`
`)),H.succeed(`Removed screen: ${e}`);}))),i.includes("server")&&(!(t!=null&&t.places)||t.places.includes("server"))&&(yield g("server",()=>a(this,null,function*(){let s=`./src/Microservices/${r}`,c=`./src/Database/Entities/${r}Entity.ts`,o="./src/Database/CollectionNames.ts",l="./src/Microservices/ApiRouter.ts";if(!X.existsSync(s)){console.log("  Nothing to remove in server.");return}H.start(`Removing CRUD: ${r}`),X.removeSync(s),X.removeSync(c);let m=X.readFileSync(o).toString().split(`
`).filter($=>!$.includes(`${r}Collection`)).join(`
`),d=X.readFileSync(l).toString().split(`
`).filter($=>!$.includes(`${r}Router`)).join(`
`);X.writeFileSync(o,m),X.writeFileSync(l,d),H.succeed(`Removed CRUD: ${r}`);}))),t!=null&&t.config&&(yield g("root",()=>a(this,null,function*(){let s=`./kitconfig/resources/${e}.cjs`;if(!X.existsSync(s)){console.log("  Nothing to remove in config.");return}H.start(`Removing config: ${e}`),X.removeSync(s),H.succeed(`Removed config: ${e}`);})));})}var Te=e=>`<FormInputNumber
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Re=e=>`<FormInputText
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,De=e=>`<FormInputTextarea
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Le=e=>`<FormInputDropdown
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,je=e=>`<FormInputRadio
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,Ae=e=>`<FormInputSwitch
fieldName="${e.name}"
control={control}
inline={${e.inline}}
/>
`,_e=e=>`<FormInputCalendar
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,ke=e=>`<FormInputPassword
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Oe=e=>`<FormInputColorPicker
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Ue=e=>`<FormInputEditor
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Ke=(e,t)=>`<FormInputUpload
folderName="${t}"
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Me=e=>`<FormInputMultiSelect
control={control}
fieldName="${e.name}"
options={${e.name}Options}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`;var E=e=>`<Column
  field="${e}"
  header="${R(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,qe=e=>`<Column header="${R(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var j={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ye(e,t){return a(this,null,function*(){let i=W(),r="",s="",c=[],o=[],l=[],m=[],d=["InputSwitch"];t.crudFields.forEach((n,O)=>{let y=n.widget||n.datatype,C="",S="";n.required&&!d.includes(n.widget||n.datatype||"")&&c.push(n.name),y==="InputText"||y==="String"?(n.tableDisplay&&l.push(E(n.name)),o.push(Re(n)),C="string",S='""'):y==="InputTextarea"?(n.tableDisplay&&l.push(E(n.name)),o.push(De(n)),C="string",S='""'):y==="InputNumber"||y==="Number"?(n.tableDisplay&&l.push(E(n.name)),o.push(Te(n)),C="number",S="0"):y==="Dropdown"?(n.tableDisplay&&l.push(E(n.name)),o.push(Le(n)),m.push({fieldName:n.name,options:n.options}),C="string",S='""'):y==="RadioButton"?(n.tableDisplay&&l.push(E(n.name)),o.push(je(n)),m.push({fieldName:n.name,options:n.options}),C="string",S='""'):y==="MultiSelect"?(n.tableDisplay&&l.push(E(n.name)),o.push(Me(n)),m.push({fieldName:n.name,options:n.options}),C="string[]",S="[]"):y==="ImageFileUpload"?(n.tableDisplay&&l.push(qe(n.name)),o.push(Ke(n,t.name.toLowerCase())),C="string",S='""'):y==="InputSwitch"||y==="Boolean"?(n.tableDisplay&&l.push(E(n.name)),o.push(Ae(n)),C="boolean",S="false"):y==="Calendar"?(n.tableDisplay&&l.push(E(n.name)),o.push(_e(n)),C="string",S='""'):y==="Password"?(n.tableDisplay&&l.push(E(n.name)),o.push(ke(n)),C="string",S='""'):y==="ColorPicker"?(n.tableDisplay&&l.push(E(n.name)),o.push(Oe(n)),C="string",S='""'):y==="Editor"&&(n.tableDisplay&&l.push(E(n.name)),o.push(Ue(n)),C="string",S='""'),O===0&&(r+=`id?: string;
`,s+=`id: undefined,
`),r+=`${n.name}: ${C};
`,s+=`${n.name}: ${S},
`;});let $=`./src/screens/${e}`,D=`${$}/${e}.tsx`,P=`${$}/Create${e}.tsx`,k=`${$}/Edit${e}.tsx`,Z="./src/layout/items.json",oe=X.readFileSync(`${i}/webapp/XXXXX.tsx`).toString(),se=X.readFileSync(`${i}/webapp/CreateXXXXX.tsx`).toString(),ie=X.readFileSync(`${i}/webapp/EditXXXXX.tsx`).toString(),ae=X.readFileSync(`${i}/webapp/xxxxx.d.ts`).toString(),ce=oe.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(j.initialState,s),u=[];ce.split(`
`).forEach(n=>{n.includes(j.tableColumns)&&u.push(...l),u.push(n);}),X.writeFileSync(D,u.join(`
`));let x=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(j.input,o.join(`
`)).replace(j.validate,`if (${c.map(n=>`entity.${n}`).join(" && ")}) `),T=[];x.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(m.forEach(({fieldName:O,options:y})=>{T.push(`const ${O}Options = ${JSON.stringify(y,null,2)};
`);}),T.push(n)):(n.includes(j.initialState)&&T.push(s),T.push(n));}),X.writeFileSync(P,T.join(`
`));let F=ie.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(j.input,o.join(`
`)).replace(j.validate,`if (${c.map(n=>`entity.${n}`).join(" && ")}) `),L=[];F.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(m.forEach(({fieldName:O,options:y})=>{L.push(`const ${O}Options = ${JSON.stringify(y,null,2)};
`);}),L.push(n)):(n.includes(j.initialState)&&L.push(s),L.push(n));}),X.writeFileSync(k,L.join(`
`));let Je=X.readFileSync(Z),Se=JSON.parse(Je.toString());Se[0].items.push({label:e,to:`/${e.toLowerCase()}`,icon:"pi pi-box"}),X.writeFileSync(Z,JSON.stringify(Se,null,2));let Ne=ae.replace(/XXXXX/g,e).replace(j.interface,r);X.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Ne);let Ge=X.readFileSync("./src/main.tsx").toString().split(`
`),Ve=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Ye=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],z=[];z.push(...Ye),Ge.forEach(n=>{n.includes("{/* --ROUTES-- */}")&&Ve.forEach(O=>{z.push(O);}),z.push(n);}),X.writeFileSync("./src/main.tsx",z.join(`
`));})}var V=(e,t)=>{let i="";return t.filter(r=>!!r).forEach(r=>{i+=`const existing${R(r)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${r},
  _id: { $ne: id },
});

if (existing${R(r)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),i},Y=(e,t)=>{let i=`const { ${t.join(", ")} } = input;
`;return t.filter(r=>!!r).forEach(r=>{i+=`
const existing${R(r)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${r},
  });

if (existing${R(r)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),i};var f={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ge(e,t){return a(this,null,function*(){let i=W(),r=["MultiSelect","Boolean","InputSwitch"],s=t.crudFields.filter(u=>u.unique&&!r.includes(u.name)).map(u=>u.name),c=[],o=[],l=[],m=[];t.crudFields.forEach(({name:u,widget:x,datatype:T,required:F,unique:L})=>{c.push(`${u}: entity.${u},`),x==="InputText"||x==="InputTextarea"||x==="Dropdown"||x==="RadioButton"||x==="ImageFileUpload"||x==="Calendar"||x==="Password"||x==="ColorPicker"||x==="Editor"||T==="String"?(o.push(`${u}${F?"":"?"}: string;`),l.push(`${u}: { type: String, required: ${F}, unique: ${L} },`),m.push(`${u}: z.string()${F?".nonempty()":".optional().nullable()"},`)):x==="InputNumber"||T==="Number"?(o.push(`${u}${F?"":"?"}: number;`),l.push(`${u}: { type: Number, required: ${F}, unique: ${L} },`),m.push(`${u}: z.number()${F?"":".optional().nullable()"},`)):x==="InputSwitch"||T==="Boolean"?(o.push(`${u}${F?"":"?"}: boolean;`),l.push(`${u}: { type: Boolean, required: ${F} },`),m.push(`${u}: z.boolean()${F?"":".optional().nullable()"},`)):x==="MultiSelect"&&(o.push(`${u}${F?"":"?"}: string[];`),l.push(`${u}: [{ type: String, required: ${F} }],`),m.push(`${u}: z.array(z.string())${F?".nonempty()":".optional().nullable()"},`));});let d=`./src/Microservices/${e}`,$=X.readFileSync(`${i}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,l.join(`
`)).replace(f.entity,c.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,Y(e,s)).replace(f.checkExistingUpdateEntity,V(e,s)),D=X.readFileSync(`${i}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,l.join(`
`)).replace(f.entity,c.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,Y(e,s)).replace(f.checkExistingUpdateEntity,V(e,s)),P=X.readFileSync(`${i}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,l.join(`
`)).replace(f.entity,c.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,Y(e,s)).replace(f.checkExistingUpdateEntity,V(e,s)),k=X.readFileSync(`${i}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,l.join(`
`)).replace(f.entity,c.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+s.join(", ")).replace(f.checkExistingCreateEntity,Y(e,s)).replace(f.checkExistingUpdateEntity,V(e,s)),Z=`${d}/${e}Controller.ts`,oe=`${d}/${e}Router.ts`,se=`${d}/${e}.dto.ts`,ie=`./src/Database/Entities/${e}Entity.ts`;X.writeFileSync(Z,$),X.writeFileSync(oe,D),X.writeFileSync(se,P),X.writeFileSync(ie,k);let ae=X.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${t.collectionName}",`:u).join(`
`);X.writeFileSync("./src/Database/CollectionNames.ts",ae);let ce=X.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);X.writeFileSync("./src/Microservices/ApiRouter.ts",ce);})}var re=Be({color:"blue",indent:2}),Xe=Be({color:"blue",indent:2});function q(e,t){return a(this,null,function*(){var l,m;let i=ee(),r=e.toLowerCase(),s=(m=(l=yield _())==null?void 0:l.resources)==null?void 0:m.find(d=>d.name.toLowerCase()===r.toLowerCase());if(!s){re.fail(`Resource ${M.cyan(r)} not found in config file`);return}let c=t==null?void 0:t.places;s.only&&(s.only==="server"&&(c=["server"]),s.only==="webapp"&&(c=["webapp"]));let o=r.charAt(0).toUpperCase()+r.slice(1);i.includes("webapp")&&(!c||c.includes("webapp"))&&(yield g("webapp",()=>a(this,null,function*(){let d=`./src/screens/${o}`;if(X.existsSync(d)){if(!(t!=null&&t.force)){re.fail(`Screen for ${M.cyan(o)} already exists`);return}yield b(r,{places:["webapp"]});}re.start(`Creating screen: ${M.cyan(o)}`);let $=`${d}/${o}.tsx`,D=`${d}/Create${o}.tsx`,P=`${d}/Edit${o}.tsx`,k=`./src/types/${o.toLowerCase()}.d.ts`;X.createFileSync($),X.createFileSync(D),X.createFileSync(P),X.createFileSync(k),yield ye(o,s),yield K("yarn prettify"),re.succeed(`Created screen: ${M.cyan(o)}`);}))),i.includes("server")&&(!c||c.includes("server"))&&(yield g("server",()=>a(this,null,function*(){let d=`./src/Microservices/${o}`;if(X.existsSync(d)){if(!(t!=null&&t.force)){Xe.fail(`CRUD for ${M.cyan(o)} already exists`);return}yield b(r,{places:["server"]});}Xe.start(`Creating CRUD for: ${M.cyan(o)}`);let $=`${d}/${o}Controller.ts`,D=`${d}/${o}Router.ts`,P=`${d}/${o}.dto.ts`;X.createFileSync($),X.createFileSync(D),X.createFileSync(P),yield ge(o,s),yield K("yarn prettify"),Xe.succeed(`Created CRUD for: ${M.cyan(o)}`);})));})}var rt=(e,t)=>g("root",()=>a(void 0,null,function*(){let i=`./kitconfig/resources/${e.toLowerCase()}.cjs`;X.writeFileSync(i,te(t.name.toLowerCase(),t)),yield b(t.name.toLowerCase()),yield q(t.name.toLowerCase());})),We=rt;function $e(e){g("root",()=>a(this,null,function*(){let t=he();t.use(he.json()),t.use(nt()),t.use("/",he.static("kitconfig/.app/dist",{index:"index.html"}));let i=t.listen(e||5179,()=>{console.log("Config server is running on port 5179...");});t.post("/api/config/create",(r,s)=>a(this,null,function*(){let{name:c}=r.body;return yield G(c),s.status(201).send(null)})),t.post("/api/config/delete",(r,s)=>a(this,null,function*(){let{name:c}=r.body;return yield b(c,{config:!0}),s.status(200).send(null)})),t.post("/api/config/update",(r,s)=>a(this,null,function*(){let{name:c,resource:o}=r.body;return yield We(c,o),s.status(200).send(null)})),t.get("/api/config",(r,s)=>a(this,null,function*(){let c=yield _();return s.status(200).json(c)})),t.get("/api/close",(r,s)=>{s.status(200).send(null),i.close();});}));}function Q(e){return a(this,null,function*(){if(!we())return console.log("You must be in an admin project folder to run this command...");let t=e?parseInt(e):5179;$e(t),yield ot(`http://localhost:${t}`);})}var ne=Be({color:"blue",indent:2});function xe(e,t){return a(this,null,function*(){let i=e.toLowerCase();ne.start("Scaffolding project..."),yield He().clone("https://github.com/oaktreeapps/admin-panel",i),yield He().clone("https://github.com/kuvam-oaktreeapps/admin-config",`${i}/kitconfig/.app`),process.chdir(i);let r=W();X.ensureDirSync(`${r}`),X.ensureDirSync(`${r}/webapp`),X.ensureDirSync(`${r}/server`),X.removeSync("./.git"),U("webapp",()=>{X.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${r}/webapp/XXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${r}/webapp/CreateXXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${r}/webapp/EditXXXXX.tsx`),X.copyFileSync("./src/types/xxxxx.d.ts",`${r}/webapp/xxxxx.d.ts`),X.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),le();}),U("server",()=>{X.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${r}/server/XXXXXRouter.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${r}/server/XXXXXController.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${r}/server/XXXXX.dto.ts`),X.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${r}/server/XXXXXEntity.ts`),X.writeFileSync("./.env",be()),me();}),ne.succeed(`Created "${i}" successfully!`),t.onlyServer&&X.removeSync("webapp"),t.onlyWebapp&&X.removeSync("server"),ne.start("Installing dependencies..."),t.onlyServer||(yield g("webapp",()=>a(this,null,function*(){yield K("yarn install");}))),t.onlyWebapp||(yield g("server",()=>a(this,null,function*(){yield K("yarn install");}))),ne.succeed("Installed dependencies successfully!"),console.log(`
Opening project configurations...`),setTimeout(()=>Q("5179"),500);})}function Fe(e,t){return a(this,null,function*(){var c;let i=yield _(),r=(i==null?void 0:i.resources.map(o=>({name:o.name.toLowerCase()})))||[],s=["webapp","server"];if(t!=null&&t.onlyServer&&(s=["server"]),t!=null&&t.onlyWebapp&&(s=["webapp"]),t!=null&&t.all)r.forEach(l=>a(this,[l],function*({name:o}){yield q(o,{force:t==null?void 0:t.force,places:s});}));else if(e)e&&(yield q(e,{force:t==null?void 0:t.force,places:s}));else {let o=yield it.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:r}]);(c=o==null?void 0:o.resourceNames)==null||c.forEach(l=>a(this,null,function*(){yield q(l,{force:t==null?void 0:t.force,places:s});}));}})}function Ce(e,t){return a(this,null,function*(){var c;let i=yield _(),r=(i==null?void 0:i.resources.map(o=>({name:o.name.toLowerCase()})))||[],s=["webapp","server"];if(t!=null&&t.onlyServer&&(s=["server"]),t!=null&&t.onlyWebapp&&(s=["webapp"]),t!=null&&t.all)r.forEach(l=>a(this,[l],function*({name:o}){yield b(o,{places:s});}));else if(e)e&&(yield b(e,{places:s}));else {let o=yield it.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:r}]);(c=o==null?void 0:o.resourceNames)==null||c.forEach(l=>a(this,null,function*(){yield b(l,{places:s});}));}})}var B=new Command;B.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");B.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(xe);B.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(G);B.command("add").argument("[resourceName]","Name of the resource you want to add").option("--all","All resources present in the kitconfig will be added").option("-f, --force","Forcefully add the resource, overwriting existing files (if any).").option("--only-webapp","Only add the resource to webapp").option("--only-server","Only add the resource to server").description("Adds new resources").action(Fe);B.command("remove").argument("[resourceName]","Name of the resource you want to remove").option("--all","All resources present in the kitconfig will be removed").option("--only-webapp","Only remove the resource from webapp").option("--only-server","Only remove the resource from server").description("Removes existing resources").action(Ce);B.command("configure").argument("[port]","Port number for the config server").description("Starts the config server").action(Q);B.parse();
