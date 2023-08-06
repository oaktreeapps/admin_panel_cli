#! /usr/bin/env node
import { Command } from 'commander';
import Ve from 'simple-git';
import X from 'fs-extra';
import Ne from 'ora';
import { exec } from 'child_process';
import dt from 'open';
import he from 'express';
import mt from 'cors';
import at from 'path';
import { z } from 'zod';
import M from 'chalk';
import gt from 'inquirer';

var tt=Object.defineProperty,rt=Object.defineProperties;var nt=Object.getOwnPropertyDescriptors;var we=Object.getOwnPropertySymbols;var ot=Object.prototype.hasOwnProperty,st=Object.prototype.propertyIsEnumerable;var be=(e,t,s)=>t in e?tt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Ee=(e,t)=>{for(var s in t||(t={}))ot.call(t,s)&&be(e,s,t[s]);if(we)for(var s of we(t))st.call(t,s)&&be(e,s,t[s]);return e},ve=(e,t)=>rt(e,nt(t));var a=(e,t,s)=>new Promise((r,i)=>{var l=m=>{try{c(s.next(m));}catch(d){i(d);}},o=m=>{try{c(s.throw(m));}catch(d){i(d);}},c=m=>m.done?r(m.value):Promise.resolve(m.value).then(l,o);c((s=s.apply(e,t)).next());});function le(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];X.removeSync("./.git"),X.removeSync("./src/screens/XXXXX"),X.removeSync("./src/types/xxxxx.d.ts");let r=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(l=>i.includes(l)).length===0);X.writeFileSync("./src/main.tsx",r.join(`
`));}var N=(e=process.cwd())=>X.readdirSync(e).includes("kitconfig"),Ie=()=>{let e=process.cwd().split("/").at(-1);return (e==="webapp"||e==="server")&&X.readdirSync("..").includes("kitconfig")?e:N()?"root":null},g=(e,t)=>a(void 0,null,function*(){let s=process.cwd().split("/").at(-1),r;return s===e||N()&&e==="root"?r=yield t():N()?(process.chdir(e),r=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),r=yield t(),process.chdir(".."),process.chdir(s)),r}),k=(e,t)=>{let s=process.cwd().split("/").at(-1),r;return s===e||N()&&e==="root"?r=t():N()?(process.chdir(e),r=t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),r=t(),process.chdir(".."),process.chdir(s)),r},ee=()=>k("root",()=>X.readdirSync(".")),W=()=>k("root",()=>process.cwd()+"/.template");function me(){X.removeSync("./.git"),X.removeSync("./src/Microservices/XXXXX"),X.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function K(e){return a(this,null,function*(){return new Promise(t=>{exec(e,()=>{t(null);});})})}var Pe=()=>`REST_API_PORT=3005
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
`;var fe=z.object({name:z.string(),url:z.string(),only:z.union([z.literal("webapp"),z.literal("server")]).optional(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),datatype:z.union([z.literal("String"),z.literal("Number"),z.literal("Boolean")]).optional(),widget:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("InputSwitch"),z.literal("InputNumber"),z.literal("ImageFileUpload"),z.literal("Calendar"),z.literal("Password"),z.literal("ColorPicker"),z.literal("Editor"),z.literal("MultiSelect")]).optional(),options:z.array(z.object({name:z.string(),value:z.string()})).optional().default([])}))}),Te=z.object({resources:z.array(fe)});var _=()=>a(void 0,null,function*(){return g("root",()=>a(void 0,null,function*(){let config={resources:[]};if(!X.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let kitConfigAbsolutePath=at.join(process.cwd(),"kitconfig"),screenFiles=X.readdirSync("kitconfig/resources");yield Promise.all(screenFiles.map(screenFile=>a(void 0,null,function*(){let configFileStr=X.readFileSync(`${kitConfigAbsolutePath}/resources/${screenFile}`).toString(),configFile=eval(configFileStr),parsedScreen=fe.safeParse(configFile);parsedScreen.success?config.resources.push(parsedScreen.data):console.log(`Couldn't parse screen '${screenFile}':`,parsedScreen.error.format());})));let parsedConfig=Te.safeParse(config);return parsedConfig.success?parsedConfig.data:(console.error("Config parsing error",parsedConfig.error),null)}))});var w=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},R=e=>e.charAt(0).toUpperCase()+e.slice(1);var te=(e,t)=>{let s=e.toLowerCase(),r=`{
  name: "${R(s)}",
  url: "/${s}",
  collectionName: "${s}",
  crudFields: [
    // ...
  ],
}`;return t&&(r=JSON.stringify(t,null,2)),`/**
* @type {import('../types').Resource}
*/
const resource = ${r};

resource;
`};var Le=Ne({color:"blue",indent:2});function G(e){return a(this,null,function*(){let t=e.toLowerCase(),s=te(t);Le.start(`Creating config template for ${M.cyan(t)}`),k("root",()=>{let r=`kitconfig/resources/${t}.cjs`;X.ensureFileSync(r),X.writeFileSync(r,s);}),Le.succeed(`Created config template for ${M.cyan(t)}`);})}var H=Ne({color:"blue",indent:2});function b(e,t){return a(this,null,function*(){let s=ee(),r=e.charAt(0).toUpperCase()+e.slice(1);s.includes("webapp")&&(!(t!=null&&t.places)||t.places.includes("webapp"))&&(yield g("webapp",()=>a(this,null,function*(){let i=`./src/types/${e}.d.ts`,l=`./src/screens/${r}`,o="./src/layout/items.json";if(!X.existsSync(l)){console.log("  Nothing to remove in webapp.");return}H.start(`Removing screen: ${e}`);let c=X.readFileSync(o),m=JSON.parse(c.toString());m[0].items=m[0].items.filter(P=>P.label.toLowerCase()!==r.toLowerCase()),X.writeFileSync(o,JSON.stringify(m,null,2)),X.removeSync(i),X.removeSync(l);let d=[`<Route path="${r.toLowerCase()}" element={<${r}Page />} />`,`<Route path="${r.toLowerCase()}/create" element={<Create${r}Page />} />`,`<Route path="${r.toLowerCase()}/edit/:id" element={<Edit${r}Page />} />`,`import ${r}Page from "./screens/${r}/${r}"`,`import Edit${r}Page from "./screens/${r}/Edit${r}"`,`import Create${r}Page from "./screens/${r}/Create${r}"`],D=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>d.filter(O=>P.includes(O)).length===0);X.writeFileSync("./src/main.tsx",D.join(`
`)),H.succeed(`Removed screen: ${e}`);}))),s.includes("server")&&(!(t!=null&&t.places)||t.places.includes("server"))&&(yield g("server",()=>a(this,null,function*(){let i=`./src/Microservices/${r}`,l=`./src/Database/Entities/${r}Entity.ts`,o="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!X.existsSync(i)){console.log("  Nothing to remove in server.");return}H.start(`Removing CRUD: ${r}`),X.removeSync(i),X.removeSync(l);let m=X.readFileSync(o).toString().split(`
`).filter($=>!$.includes(`${r}Collection`)).join(`
`),d=X.readFileSync(c).toString().split(`
`).filter($=>!$.includes(`${r}Router`)).join(`
`);X.writeFileSync(o,m),X.writeFileSync(c,d),H.succeed(`Removed CRUD: ${r}`);}))),t!=null&&t.config&&(yield g("root",()=>a(this,null,function*(){let i=`./kitconfig/resources/${e}.cjs`;if(!X.existsSync(i)){console.log("  Nothing to remove in config.");return}H.start(`Removing config: ${e}`),X.removeSync(i),H.succeed(`Removed config: ${e}`);})));})}var je=e=>`<FormInputNumber
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Ae=e=>`<FormInputText
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,_e=e=>`<FormInputTextarea
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Oe=e=>`<FormInputDropdown
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,Ue=e=>`<FormInputRadio
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
options={${e.name}Options}
/>
`,ke=e=>`<FormInputSwitch
fieldName="${e.name}"
control={control}
inline={${e.inline}}
/>
`,Ke=e=>`<FormInputCalendar
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Me=e=>`<FormInputPassword
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,qe=e=>`<FormInputColorPicker
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,Be=e=>`<FormInputEditor
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,We=(e,t)=>`<FormInputUpload
folderName="${t}"
fieldName="${e.name}"
control={control}
inline={${e.inline}}
rules={{ required: ${e.required?`"* ${w(e.name)} is required!"`:"false"} }}
/>
`,He=e=>`<FormInputMultiSelect
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
></Column>`,Je=e=>`<Column header="${R(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var j={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ye(e,t){return a(this,null,function*(){let s=W(),r="",i="",l=[],o=[],c=[],m=[],d=["InputSwitch"];t.crudFields.forEach((n,U)=>{let y=n.widget||n.datatype,C="",S="";n.required&&!d.includes(n.widget||n.datatype||"")&&l.push(n.name),y==="InputText"||y==="String"?(n.tableDisplay&&c.push(E(n.name)),o.push(Ae(n)),C="string",S='""'):y==="InputTextarea"?(n.tableDisplay&&c.push(E(n.name)),o.push(_e(n)),C="string",S='""'):y==="InputNumber"||y==="Number"?(n.tableDisplay&&c.push(E(n.name)),o.push(je(n)),C="number",S="0"):y==="Dropdown"?(n.tableDisplay&&c.push(E(n.name)),o.push(Oe(n)),m.push({fieldName:n.name,options:n.options}),C="string",S='""'):y==="RadioButton"?(n.tableDisplay&&c.push(E(n.name)),o.push(Ue(n)),m.push({fieldName:n.name,options:n.options}),C="string",S='""'):y==="MultiSelect"?(n.tableDisplay&&c.push(E(n.name)),o.push(He(n)),m.push({fieldName:n.name,options:n.options}),C="string[]",S="[]"):y==="ImageFileUpload"?(n.tableDisplay&&c.push(Je(n.name)),o.push(We(n,t.name.toLowerCase())),C="string",S='""'):y==="InputSwitch"||y==="Boolean"?(n.tableDisplay&&c.push(E(n.name)),o.push(ke(n)),C="boolean",S="false"):y==="Calendar"?(n.tableDisplay&&c.push(E(n.name)),o.push(Ke(n)),C="string",S='""'):y==="Password"?(n.tableDisplay&&c.push(E(n.name)),o.push(Me(n)),C="string",S='""'):y==="ColorPicker"?(n.tableDisplay&&c.push(E(n.name)),o.push(qe(n)),C="string",S='""'):y==="Editor"&&(n.tableDisplay&&c.push(E(n.name)),o.push(Be(n)),C="string",S='""'),U===0&&(r+=`id?: string;
`,i+=`id: undefined,
`),r+=`${n.name}: ${C};
`,i+=`${n.name}: ${S},
`;});let $=`./src/screens/${e}`,D=`${$}/${e}.tsx`,P=`${$}/Create${e}.tsx`,O=`${$}/Edit${e}.tsx`,Z="./src/layout/items.json",oe=X.readFileSync(`${s}/webapp/XXXXX.tsx`).toString(),se=X.readFileSync(`${s}/webapp/CreateXXXXX.tsx`).toString(),ie=X.readFileSync(`${s}/webapp/EditXXXXX.tsx`).toString(),ae=X.readFileSync(`${s}/webapp/xxxxx.d.ts`).toString(),ce=oe.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(j.initialState,i),u=[];ce.split(`
`).forEach(n=>{n.includes(j.tableColumns)&&u.push(...c),u.push(n);}),X.writeFileSync(D,u.join(`
`));let x=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(j.input,o.join(`
`)).replace(j.validate,`if (${l.map(n=>`entity.${n}`).join(" && ")}) `),T=[];x.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(m.forEach(({fieldName:U,options:y})=>{T.push(`const ${U}Options = ${JSON.stringify(y,null,2)};
`);}),T.push(n)):(n.includes(j.initialState)&&T.push(i),T.push(n));}),X.writeFileSync(P,T.join(`
`));let F=ie.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(j.input,o.join(`
`)).replace(j.validate,`if (${l.map(n=>`entity.${n}`).join(" && ")}) `),L=[];F.split(`
`).forEach(n=>{n.includes("const saveEntity = ")?(m.forEach(({fieldName:U,options:y})=>{L.push(`const ${U}Options = ${JSON.stringify(y,null,2)};
`);}),L.push(n)):(n.includes(j.initialState)&&L.push(i),L.push(n));}),X.writeFileSync(O,L.join(`
`));let Ye=X.readFileSync(Z),Se=JSON.parse(Ye.toString());Se[0].items.push({label:e,to:`/${e.toLowerCase()}`,icon:"pi pi-box"}),X.writeFileSync(Z,JSON.stringify(Se,null,2));let Qe=ae.replace(/XXXXX/g,e).replace(j.interface,r);X.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Qe);let Ze=X.readFileSync("./src/main.tsx").toString().split(`
`),ze=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],et=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],z=[];z.push(...et),Ze.forEach(n=>{n.includes("{/* --ROUTES-- */}")&&ze.forEach(U=>{z.push(U);}),z.push(n);}),X.writeFileSync("./src/main.tsx",z.join(`
`));})}var V=(e,t)=>{let s="";return t.filter(r=>!!r).forEach(r=>{s+=`const existing${R(r)}UpdateEntity: I${e}Entity | null =
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
`;}),s},Y=(e,t)=>{let s=`const { ${t.join(", ")} } = input;
`;return t.filter(r=>!!r).forEach(r=>{s+=`
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
`;}),s};var f={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ge(e,t){return a(this,null,function*(){let s=W(),r=["MultiSelect","Boolean","InputSwitch"],i=t.crudFields.filter(u=>u.unique&&!r.includes(u.name)).map(u=>u.name),l=[],o=[],c=[],m=[];t.crudFields.forEach(({name:u,widget:x,datatype:T,required:F,unique:L})=>{l.push(`${u}: entity.${u},`),x==="InputText"||x==="InputTextarea"||x==="Dropdown"||x==="RadioButton"||x==="ImageFileUpload"||x==="Calendar"||x==="Password"||x==="ColorPicker"||x==="Editor"||T==="String"?(o.push(`${u}${F?"":"?"}: string;`),c.push(`${u}: { type: String, required: ${F}, unique: ${L} },`),m.push(`${u}: z.string()${F?".nonempty()":".optional().nullable()"},`)):x==="InputNumber"||T==="Number"?(o.push(`${u}${F?"":"?"}: number;`),c.push(`${u}: { type: Number, required: ${F}, unique: ${L} },`),m.push(`${u}: z.number()${F?"":".optional().nullable()"},`)):x==="InputSwitch"||T==="Boolean"?(o.push(`${u}${F?"":"?"}: boolean;`),c.push(`${u}: { type: Boolean, required: ${F} },`),m.push(`${u}: z.boolean()${F?"":".optional().nullable()"},`)):x==="MultiSelect"&&(o.push(`${u}${F?"":"?"}: string[];`),c.push(`${u}: [{ type: String, required: ${F} }],`),m.push(`${u}: z.array(z.string())${F?".nonempty()":".optional().nullable()"},`));});let d=`./src/Microservices/${e}`,$=X.readFileSync(`${s}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,c.join(`
`)).replace(f.entity,l.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,Y(e,i)).replace(f.checkExistingUpdateEntity,V(e,i)),D=X.readFileSync(`${s}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,c.join(`
`)).replace(f.entity,l.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,Y(e,i)).replace(f.checkExistingUpdateEntity,V(e,i)),P=X.readFileSync(`${s}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,c.join(`
`)).replace(f.entity,l.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,Y(e,i)).replace(f.checkExistingUpdateEntity,V(e,i)),O=X.readFileSync(`${s}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(f.interface,o.join(`
`)).replace(f.schema,c.join(`
`)).replace(f.entity,l.join(`
`)).replace(f.zod,m.join(`
`)).replace(f.uniqueFields,", "+i.join(", ")).replace(f.checkExistingCreateEntity,Y(e,i)).replace(f.checkExistingUpdateEntity,V(e,i)),Z=`${d}/${e}Controller.ts`,oe=`${d}/${e}Router.ts`,se=`${d}/${e}.dto.ts`,ie=`./src/Database/Entities/${e}Entity.ts`;X.writeFileSync(Z,$),X.writeFileSync(oe,D),X.writeFileSync(se,P),X.writeFileSync(ie,O);let ae=X.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${t.collectionName}",`:u).join(`
`);X.writeFileSync("./src/Database/CollectionNames.ts",ae);let ce=X.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);X.writeFileSync("./src/Microservices/ApiRouter.ts",ce);})}var re=Ne({color:"blue",indent:2}),Xe=Ne({color:"blue",indent:2});function q(e,t){return a(this,null,function*(){var c,m;let s=ee(),r=e.toLowerCase(),i=(m=(c=yield _())==null?void 0:c.resources)==null?void 0:m.find(d=>d.name.toLowerCase()===r.toLowerCase());if(!i){re.fail(`Resource ${M.cyan(r)} not found in config file`);return}let l=t==null?void 0:t.places;i.only&&(i.only==="server"&&(l=["server"]),i.only==="webapp"&&(l=["webapp"]));let o=r.charAt(0).toUpperCase()+r.slice(1);s.includes("webapp")&&(!l||l.includes("webapp"))&&(yield g("webapp",()=>a(this,null,function*(){let d=`./src/screens/${o}`;if(X.existsSync(d)){if(!(t!=null&&t.force)){re.fail(`Screen for ${M.cyan(o)} already exists`);return}yield b(r,{places:["webapp"]});}re.start(`Creating screen: ${M.cyan(o)}`);let $=`${d}/${o}.tsx`,D=`${d}/Create${o}.tsx`,P=`${d}/Edit${o}.tsx`,O=`./src/types/${o.toLowerCase()}.d.ts`;X.createFileSync($),X.createFileSync(D),X.createFileSync(P),X.createFileSync(O),yield ye(o,i),yield K("yarn prettify"),re.succeed(`Created screen: ${M.cyan(o)}`);}))),s.includes("server")&&(!l||l.includes("server"))&&(yield g("server",()=>a(this,null,function*(){let d=`./src/Microservices/${o}`;if(X.existsSync(d)){if(!(t!=null&&t.force)){Xe.fail(`CRUD for ${M.cyan(o)} already exists`);return}yield b(r,{places:["server"]});}Xe.start(`Creating CRUD for: ${M.cyan(o)}`);let $=`${d}/${o}Controller.ts`,D=`${d}/${o}Router.ts`,P=`${d}/${o}.dto.ts`;X.createFileSync($),X.createFileSync(D),X.createFileSync(P),yield ge(o,i),yield K("yarn prettify"),Xe.succeed(`Created CRUD for: ${M.cyan(o)}`);})));})}var ut=(e,t)=>g("root",()=>a(void 0,null,function*(){let s=`./kitconfig/resources/${e.toLowerCase()}.cjs`;X.writeFileSync(s,te(t.name.toLowerCase(),t)),yield b(t.name.toLowerCase()),yield q(t.name.toLowerCase());})),Ge=ut;function $e(e){g("root",()=>a(this,null,function*(){let t=he();t.use(he.json()),t.use(mt()),t.use("/",he.static("kitconfig/.app/dist",{index:"index.html"}));let s=t.listen(e||5179,()=>{console.log("Config server is running on port 5179...");});t.post("/api/config/create",(r,i)=>a(this,null,function*(){let{name:l}=r.body;return yield G(l),i.status(201).send(null)})),t.post("/api/config/delete",(r,i)=>a(this,null,function*(){let{name:l}=r.body;return yield b(l,{config:!0}),i.status(200).send(null)})),t.post("/api/config/update",(r,i)=>a(this,null,function*(){let{name:l,resource:o}=r.body;return yield Ge(l,o),i.status(200).send(null)})),t.get("/api/config",(r,i)=>a(this,null,function*(){let l=yield _(),o,c=X.readdirSync(".");return c.includes("webapp")&&c.includes("server")?o=void 0:c.includes("webapp")?o="webapp":c.includes("server")&&(o="server"),i.status(200).json(ve(Ee({},l),{hasOnly:o}))})),t.get("/api/close",(r,i)=>{i.status(200).send(null),s.close();});}));}function Q(e){return a(this,null,function*(){if(!Ie())return console.log("You must be in an admin project folder to run this command...");let t=e?parseInt(e):5179;$e(t),yield dt(`http://localhost:${t}`);})}var ne=Ne({color:"blue",indent:2});function xe(e,t){return a(this,null,function*(){let s=e.toLowerCase();ne.start("Scaffolding project..."),yield Ve().clone("https://github.com/oaktreeapps/admin-panel",s),yield Ve().clone("https://github.com/oaktreeapps/admin-config",`${s}/kitconfig/.app`),process.chdir(s);let r=W();X.ensureDirSync(`${r}`),X.ensureDirSync(`${r}/webapp`),X.ensureDirSync(`${r}/server`),X.removeSync("./.git"),k("webapp",()=>{X.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${r}/webapp/XXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${r}/webapp/CreateXXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${r}/webapp/EditXXXXX.tsx`),X.copyFileSync("./src/types/xxxxx.d.ts",`${r}/webapp/xxxxx.d.ts`),X.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),le();}),k("server",()=>{X.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${r}/server/XXXXXRouter.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${r}/server/XXXXXController.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${r}/server/XXXXX.dto.ts`),X.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${r}/server/XXXXXEntity.ts`),X.writeFileSync("./.env",Pe()),me();}),ne.succeed(`Created "${s}" successfully!`),t.onlyServer&&X.removeSync("webapp"),t.onlyWebapp&&X.removeSync("server"),ne.start("Installing dependencies..."),t.onlyServer||(yield g("webapp",()=>a(this,null,function*(){yield K("yarn install");}))),t.onlyWebapp||(yield g("server",()=>a(this,null,function*(){yield K("yarn install");}))),ne.succeed("Installed dependencies successfully!"),console.log(`
Opening project configurations...`),setTimeout(()=>Q("5179"),500);})}function Fe(e,t){return a(this,null,function*(){var l;let s=yield _(),r=(s==null?void 0:s.resources.map(o=>({name:o.name.toLowerCase()})))||[],i=["webapp","server"];if(t!=null&&t.onlyServer&&(i=["server"]),t!=null&&t.onlyWebapp&&(i=["webapp"]),t!=null&&t.all)r.forEach(c=>a(this,[c],function*({name:o}){yield q(o,{force:t==null?void 0:t.force,places:i});}));else if(e)e&&(yield q(e,{force:t==null?void 0:t.force,places:i}));else {let o=yield gt.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:r}]);(l=o==null?void 0:o.resourceNames)==null||l.forEach(c=>a(this,null,function*(){yield q(c,{force:t==null?void 0:t.force,places:i});}));}})}function Ce(e,t){return a(this,null,function*(){var l;let s=yield _(),r=(s==null?void 0:s.resources.map(o=>({name:o.name.toLowerCase()})))||[],i=["webapp","server"];if(t!=null&&t.onlyServer&&(i=["server"]),t!=null&&t.onlyWebapp&&(i=["webapp"]),t!=null&&t.all)r.forEach(c=>a(this,[c],function*({name:o}){yield b(o,{places:i});}));else if(e)e&&(yield b(e,{places:i}));else {let o=yield gt.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:r}]);(l=o==null?void 0:o.resourceNames)==null||l.forEach(c=>a(this,null,function*(){yield b(c,{places:i});}));}})}var B=new Command;B.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");B.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(xe);B.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(G);B.command("add").argument("[resourceName]","Name of the resource you want to add").option("--all","All resources present in the kitconfig will be added").option("-f, --force","Forcefully add the resource, overwriting existing files (if any).").option("--only-webapp","Only add the resource to webapp").option("--only-server","Only add the resource to server").description("Adds new resources").action(Fe);B.command("remove").argument("[resourceName]","Name of the resource you want to remove").option("--all","All resources present in the kitconfig will be removed").option("--only-webapp","Only remove the resource from webapp").option("--only-server","Only remove the resource from server").description("Removes existing resources").action(Ce);B.command("configure").argument("[port]","Port number for the config server").description("Starts the config server").action(Q);B.parse();
