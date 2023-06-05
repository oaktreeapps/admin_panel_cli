#! /usr/bin/env node
import { Command } from 'commander';
import Ve from 'os';
import g from 'fs-extra';
import k from 'chalk';
import Ke from 'path';
import { z } from 'zod';
import we from 'ora';
import ke from 'simple-git';
import { exec } from 'child_process';

var a=(e,n,t)=>new Promise((r,s)=>{var i=X=>{try{p(t.next(X));}catch(d){s(d);}},c=X=>{try{p(t.throw(X));}catch(d){s(d);}},p=X=>X.done?r(X.value):Promise.resolve(X.value).then(i,c);p((t=t.apply(e,n)).next());});var R=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},I=e=>e.charAt(0).toUpperCase()+e.slice(1);var E=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${R(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${R(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?E(e.name)[0]:""}
  />
  ${e.required?E(e.name)[1]:""}
</div>`,de=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${R(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${R(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${R(e.name)}"
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,je=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?E(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,$e=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${R(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(t=>je(e,t)).join(`
`)}
  </div>
  ${e.required?E(e.name)[1]:""}
</div>
`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${R(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var A=e=>`<Column
  field="${e}"
  header="${I(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var T={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ne(e,n){return a(this,null,function*(){let t="",r="",s=[],i=[],c=[],p=[],X=["InputSwitch"];n.crudFields.forEach((o,D)=>{let S="",L="";o.required&&!X.includes(o.type)&&s.push(o.name),o.type==="InputText"||o.type==="String"?(o.tableDisplay&&c.push(A(o.name)),i.push(de(o)),S="string",L='""'):o.type==="InputTextarea"?(o.tableDisplay&&c.push(A(o.name)),i.push(ge(o)),S="string",L='""'):o.type==="InputNumber"||o.type==="Number"?(o.tableDisplay&&c.push(A(o.name)),i.push(Xe(o)),S="number",L="0"):o.type==="Dropdown"?(o.tableDisplay&&c.push(A(o.name)),i.push(fe(o)),p.push({fieldName:o.name,options:o.options||[]}),S="string",L='""'):o.type==="RadioButton"?(o.tableDisplay&&c.push(A(o.name)),i.push($e(o,o.options||[])),S="string",L='""'):(o.type==="InputSwitch"||o.type==="Boolean")&&(o.tableDisplay&&c.push(A(o.name)),i.push(he(o)),S="boolean",L="false"),D===0&&(t+=`id?: string;
`,r+=`id: undefined,
`),t+=`${o.name}: ${S};
`,r+=`${o.name}: ${L},
`;});let d=`./src/screens/${e}`,v=`${d}/${e}.tsx`,b=`${d}/Create${e}.tsx`,O=`${d}/Edit${e}.tsx`,H="./src/layout/items.json",Z=g.readFileSync(`${y}/webapp/XXXXX.tsx`).toString(),z=g.readFileSync(`${y}/webapp/CreateXXXXX.tsx`).toString(),ee=g.readFileSync(`${y}/webapp/EditXXXXX.tsx`).toString(),te=g.readFileSync(`${y}/webapp/xxxxx.d.ts`).toString(),u=Z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.initialState,r),f=[];u.split(`
`).forEach(o=>{o.includes(T.tableColumns)&&f.push(...c),f.push(o);}),g.writeFileSync(v,f.join(`
`));let C=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,i.join(`
`)).replace(T.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),w=[];C.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:D,options:S})=>{w.push(`const ${D}Options = ${JSON.stringify(S,null,2)};
`);}),w.push(o)):(o.includes(T.initialState)&&w.push(r),w.push(o));}),g.writeFileSync(b,w.join(`
`));let Pe=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,i.join(`
`)).replace(T.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),j=[];Pe.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:D,options:S})=>{j.push(`const ${D}Options = ${JSON.stringify(S,null,2)};
`);}),j.push(o)):(o.includes(T.initialState)&&j.push(r),j.push(o));}),g.writeFileSync(O,j.join(`
`));let Re=g.readFileSync(H),ye=JSON.parse(Re.toString());ye[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(H,JSON.stringify(ye,null,2));let De=te.replace(/XXXXX/g,e).replace(T.interface,t);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,De);let Le=g.readFileSync("./src/main.tsx").toString().split(`
`),Ae=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],_e=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],V=[];V.push(..._e),Le.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&Ae.forEach(D=>{V.push(D);}),V.push(o);}),g.writeFileSync("./src/main.tsx",V.join(`
`));})}var re=z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("String"),z.literal("InputSwitch"),z.literal("Boolean"),z.literal("InputNumber"),z.literal("Number")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}),xe=z.object({resources:z.array(re)});var G=(e=process.cwd())=>g.readdirSync(e).includes("kitconfig"),F=(e,n)=>a(void 0,null,function*(){let t=process.cwd().split("/").at(-1),r;return t===e||G()&&e==="root"?r=yield n():G()?(process.chdir(e),r=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=yield n(),process.chdir(".."),process.chdir(t)),r}),K=(e,n)=>{let t=process.cwd().split("/").at(-1),r;return t===e||G()&&e==="root"?r=n():G()?(process.chdir(e),r=n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=n(),process.chdir(".."),process.chdir(t)),r},J=()=>K("root",()=>{let e,n=g.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var W=()=>a(void 0,null,function*(){return F("root",()=>a(void 0,null,function*(){let e={resources:[]};if(!g.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=Ke.join(process.cwd(),"kitconfig"),t=g.readdirSync("kitconfig/resources");yield Promise.all(t.map(s=>a(void 0,null,function*(){let i=yield import(`${n}/resources/${s}`),c=re.safeParse(i.default);c.success?e.resources.push(c.data):console.log(`Couldn't parse screen '${s}':`,c.error.format());})));let r=xe.safeParse(e);return r.success?r.data:(console.error("Config parsing error",r.error),null)}))});var U=(e,n)=>{let t="";return n.filter(r=>!!r).forEach(r=>{t+=`const existing${I(r)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${r},
  _id: { $ne: id },
});

if (existing${I(r)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),t},M=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(r=>!!r).forEach(r=>{t+=`
const existing${I(r)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${r},
  });

if (existing${I(r)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),t};var l={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function oe(e,n){return a(this,null,function*(){let t=n.crudFields.filter(u=>u.unique).map(u=>u.name),r=[],s=[],i=[],c=[];n.crudFields.forEach(({name:u,type:f,required:C,unique:w})=>{r.push(`${u}: entity.${u},`),f==="InputText"||f==="InputTextarea"||f==="Dropdown"||f==="RadioButton"||f==="String"?(s.push(`${u}${C?"":"?"}: string;`),i.push(`${u}: { type: String, required: ${C}, unique: ${w} },`),c.push(`${u}: z.string()${C?".nonempty()":".optional().nullable()"},`)):f==="InputNumber"||f==="Number"?(s.push(`${u}${C?"":"?"}: number;`),i.push(`${u}: { type: Number, required: ${C}, unique: ${w} },`),c.push(`${u}: z.number()${C?"":".optional().nullable()"},`)):(f==="InputSwitch"||f==="Boolean")&&(s.push(`${u}${C?"":"?"}: boolean;`),i.push(`${u}: { type: Boolean, required: ${C}, unique: ${w} },`),c.push(`${u}: z.boolean()${C?"":".optional().nullable()"},`));});let p=`./src/Microservices/${e}`,X=g.readFileSync(`${y}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),d=g.readFileSync(`${y}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),v=g.readFileSync(`${y}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),b=g.readFileSync(`${y}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),O=`${p}/${e}Controller.ts`,H=`${p}/${e}Router.ts`,Z=`${p}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(O,X),g.writeFileSync(H,d),g.writeFileSync(Z,v),g.writeFileSync(z,b);let ee=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${n.collectionName}",`:u).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var se=we({color:"blue",indent:2}),Fe=we({color:"blue",indent:2});function B(e){return a(this,null,function*(){var i,c;let n=J(),t=e.toLowerCase(),r=(c=(i=yield W())==null?void 0:i.resources)==null?void 0:c.find(p=>p.name.toLowerCase()===t.toLowerCase());if(!r){se.fail(`Screen ${k.cyan(t)} not found in config file`);return}let s=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield F("webapp",()=>a(this,null,function*(){let p=`./src/screens/${s}`;if(g.existsSync(p))return;se.start(`Creating screen: ${k.cyan(s)}`);let X=`${p}/${s}.tsx`,d=`${p}/Create${s}.tsx`,v=`${p}/Edit${s}.tsx`,b=`./src/types/${s.toLowerCase()}.d.ts`;g.createFileSync(X),g.createFileSync(d),g.createFileSync(v),g.createFileSync(b),yield ne(s,r),se.succeed(`Created screen: ${k.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield F("server",()=>a(this,null,function*(){let p=`./src/Microservices/${s}`;if(g.existsSync(p))return;Fe.start(`Creating CRUD for: ${k.cyan(s)}`);let X=`${p}/${s}Controller.ts`,d=`${p}/${s}Router.ts`,v=`${p}/${s}.dto.ts`;g.createFileSync(X),g.createFileSync(d),g.createFileSync(v),yield oe(s,r),Fe.succeed(`Created CRUD for: ${k.cyan(s)}`);})));})}var Oe=()=>new Promise((e,n)=>a(void 0,null,function*(){var r;let t=(r=yield W())==null?void 0:r.resources;t==null||t.map((s,i)=>a(void 0,null,function*(){yield B(s.name),t.length===i+1&&e();}));}));function ie(){return a(this,null,function*(){yield Oe();})}var N=we({color:"blue",indent:2});function ae(e){return a(this,null,function*(){let n=J(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield F("webapp",()=>a(this,null,function*(){let r=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,i="./src/layout/items.json";if(!g.existsSync(s)){console.log("  Nothing to remove in webapp.");return}N.start(`Removing screen: ${e}`);let c=g.readFileSync(i),p=JSON.parse(c.toString());p[0].items=p[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(p,null,2)),g.removeSync(r),g.removeSync(s);let X=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],v=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>X.filter(O=>b.includes(O)).length===0);g.writeFileSync("./src/main.tsx",v.join(`
`)),N.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield F("server",()=>a(this,null,function*(){let r=`./src/Microservices/${t}`,s=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!g.existsSync(r)){console.log("  Nothing to remove in server.");return}N.start(`Removing CRUD: ${t}`),g.removeSync(r),g.removeSync(s);let p=g.readFileSync(i).toString().split(`
`).filter(d=>!d.includes(`${t}Collection`)).join(`
`),X=g.readFileSync(c).toString().split(`
`).filter(d=>!d.includes(`${t}Router`)).join(`
`);g.writeFileSync(i,p),g.writeFileSync(c,X),N.succeed(`Removed CRUD: ${t}`);})));})}function ce(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let r=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(i=>s.includes(i)).length===0);g.writeFileSync("./src/main.tsx",r.join(`
`));}function le(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Y(e){return a(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var Ee=()=>`REST_API_PORT=3005
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
`;var Q=we({color:"blue",indent:2});function ue(e,n){return a(this,null,function*(){let t=e.toLowerCase();Q.start("Scaffolding project..."),yield ke().clone("https://github.com/oaktreeapps/admin_panel",t),process.chdir(t),g.ensureDirSync(`${y}`),g.ensureDirSync(`${y}/webapp`),g.ensureDirSync(`${y}/server`),g.removeSync("./.git"),K("webapp",()=>{g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${y}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${y}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${y}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${y}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ce();}),K("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${y}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${y}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${y}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${y}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",Ee()),le();}),Q.succeed(`Created "${t}" successfully!`),n.onlyServer&&g.removeSync("webapp"),n.onlyWebapp&&g.removeSync("server"),Q.start("Installing dependencies..."),n.onlyServer||(yield F("webapp",()=>a(this,null,function*(){yield Y("yarn install");}))),n.onlyWebapp||(yield F("server",()=>a(this,null,function*(){yield Y("yarn install");}))),Q.succeed("Installed dependencies successfully!");})}var ve=e=>{let n=e.toLowerCase();return `/**
 * @typedef {import('../types').Screen} Screen
 */
const screen = {
  name: "${I(n)}",
  url: "/${n}",
  collectionName: "${n}",
  crudFields: [
    // ...
  ],
};

module.exports = screen;`};var Te=we({color:"blue",indent:2});function me(e){return a(this,null,function*(){let n=e.toLowerCase(),t=ve(n);Te.start(`Creating config template for ${k.cyan(n)}`),K("root",()=>{let r=`kitconfig/resources/${n}.cjs`;g.ensureFileSync(r),g.writeFileSync(r,t);}),Te.succeed(`Created config template for ${k.cyan(n)}`);})}var y=Ve.homedir()+"/.adminkit",_=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ue);_.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(B);_.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(me);_.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(ae);_.command("sync").description('Add resources defined in "kitconfig" to the project').action(ie);_.parse();

export { y as adminKitPath };
