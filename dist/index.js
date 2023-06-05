#! /usr/bin/env node
import { Command } from 'commander';
import Ge from 'os';
import g from 'fs-extra';
import q from 'chalk';
import Oe from 'path';
import { z as z$1 } from 'zod';
import ve from 'ora';
import Be from 'simple-git';
import { exec } from 'child_process';

var a=(e,n,t)=>new Promise((r,s)=>{var i=X=>{try{l(t.next(X));}catch(y){s(y);}},c=X=>{try{l(t.throw(X));}catch(y){s(y);}},l=X=>X.done?r(X.value):Promise.resolve(X.value).then(i,c);l((t=t.apply(e,n)).next());});var P=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},b=e=>e.charAt(0).toUpperCase()+e.slice(1);var w=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${P(e)} is required.</small>}`],fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?w(e.name)[0]:""}
  />
  ${e.required?w(e.name)[1]:""}
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?w(e.name)[0]:""}
/>
  ${e.required?w(e.name)[1]:""}
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?w(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?w(e.name)[1]:""}
</div>`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${P(e.name)}"
  style={{ width: "100%" }}
  ${e.required?w(e.name)[0]:""}
/>
  ${e.required?w(e.name)[1]:""}
</div>`,Ke=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?w(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,xe=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${P(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(t=>Ke(e,t)).join(`
`)}
  </div>
  ${e.required?w(e.name)[1]:""}
</div>
`,Ce=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${P(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var A=e=>`<Column
  field="${e}"
  header="${b(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var I={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function oe(e,n){return a(this,null,function*(){let t="",r="",s=[],i=[],c=[],l=[],X=["InputSwitch"];n.crudFields.forEach((o,R)=>{let h=o.widget||o.datatype,D="",L="";o.required&&!X.includes(o.widget||o.datatype||"")&&s.push(o.name),h==="InputText"||h==="String"?(o.tableDisplay&&c.push(A(o.name)),i.push(ge(o)),D="string",L='""'):h==="InputTextarea"?(o.tableDisplay&&c.push(A(o.name)),i.push($e(o)),D="string",L='""'):h==="InputNumber"||h==="Number"?(o.tableDisplay&&c.push(A(o.name)),i.push(fe(o)),D="number",L="0"):h==="Dropdown"?(o.tableDisplay&&c.push(A(o.name)),i.push(he(o)),l.push({fieldName:o.name,options:o.options||[]}),D="string",L='""'):h==="RadioButton"?(o.tableDisplay&&c.push(A(o.name)),i.push(xe(o,o.options||[])),D="string",L='""'):(h==="InputSwitch"||h==="Boolean")&&(o.tableDisplay&&c.push(A(o.name)),i.push(Ce(o)),D="boolean",L="false"),R===0&&(t+=`id?: string;
`,r+=`id: undefined,
`),t+=`${o.name}: ${D};
`,r+=`${o.name}: ${L},
`;});let y=`./src/screens/${e}`,E=`${y}/${e}.tsx`,v=`${y}/Create${e}.tsx`,O=`${y}/Edit${e}.tsx`,G="./src/layout/items.json",ee=g.readFileSync(`${d}/webapp/XXXXX.tsx`).toString(),te=g.readFileSync(`${d}/webapp/CreateXXXXX.tsx`).toString(),ne=g.readFileSync(`${d}/webapp/EditXXXXX.tsx`).toString(),re=g.readFileSync(`${d}/webapp/xxxxx.d.ts`).toString(),m=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(I.initialState,r),S=[];m.split(`
`).forEach(o=>{o.includes(I.tableColumns)&&S.push(...c),S.push(o);}),g.writeFileSync(E,S.join(`
`));let U=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(I.input,i.join(`
`)).replace(I.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),f=[];U.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(l.forEach(({fieldName:R,options:h})=>{f.push(`const ${R}Options = ${JSON.stringify(h,null,2)};
`);}),f.push(o)):(o.includes(I.initialState)&&f.push(r),f.push(o));}),g.writeFileSync(v,f.join(`
`));let M=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(I.input,i.join(`
`)).replace(I.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),j=[];M.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(l.forEach(({fieldName:R,options:h})=>{j.push(`const ${R}Options = ${JSON.stringify(h,null,2)};
`);}),j.push(o)):(o.includes(I.initialState)&&j.push(r),j.push(o));}),g.writeFileSync(O,j.join(`
`));let De=g.readFileSync(G),ye=JSON.parse(De.toString());ye[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(G,JSON.stringify(ye,null,2));let Le=re.replace(/XXXXX/g,e).replace(I.interface,t);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Le);let Ae=g.readFileSync("./src/main.tsx").toString().split(`
`),_e=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],je=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...je),Ae.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&_e.forEach(R=>{J.push(R);}),J.push(o);}),g.writeFileSync("./src/main.tsx",J.join(`
`));})}var se=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String").optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("Number")]).default("InputText").optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}),Se=z$1.object({resources:z$1.array(se)});var W=(e=process.cwd())=>g.readdirSync(e).includes("kitconfig"),F=(e,n)=>a(void 0,null,function*(){let t=process.cwd().split("/").at(-1),r;return t===e||W()&&e==="root"?r=yield n():W()?(process.chdir(e),r=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=yield n(),process.chdir(".."),process.chdir(t)),r}),K=(e,n)=>{let t=process.cwd().split("/").at(-1),r;return t===e||W()&&e==="root"?r=n():W()?(process.chdir(e),r=n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=n(),process.chdir(".."),process.chdir(t)),r},N=()=>K("root",()=>{let e,n=g.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var Y=()=>a(void 0,null,function*(){return F("root",()=>a(void 0,null,function*(){let e={resources:[]};if(!g.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=Oe.join(process.cwd(),"kitconfig"),t=g.readdirSync("kitconfig/resources");yield Promise.all(t.map(s=>a(void 0,null,function*(){let i=yield import(`${n}/resources/${s}`),c=se.safeParse(i.default);c.success?e.resources.push(c.data):console.log(`Couldn't parse screen '${s}':`,c.error.format());})));let r=Se.safeParse(e);return r.success?r.data:(console.error("Config parsing error",r.error),null)}))});var k=(e,n)=>{let t="";return n.filter(r=>!!r).forEach(r=>{t+=`const existing${b(r)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${r},
  _id: { $ne: id },
});

if (existing${b(r)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),t},B=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(r=>!!r).forEach(r=>{t+=`
const existing${b(r)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${r},
  });

if (existing${b(r)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),t};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ie(e,n){return a(this,null,function*(){let t=n.crudFields.filter(m=>m.unique).map(m=>m.name),r=[],s=[],i=[],c=[];n.crudFields.forEach(({name:m,widget:S,datatype:U,required:f,unique:M})=>{r.push(`${m}: entity.${m},`),S==="InputText"||S==="InputTextarea"||S==="Dropdown"||S==="RadioButton"||U==="String"?(s.push(`${m}${f?"":"?"}: string;`),i.push(`${m}: { type: String, required: ${f}, unique: ${M} },`),c.push(`${m}: z.string()${f?".nonempty()":".optional().nullable()"},`)):S==="InputNumber"||U==="Number"?(s.push(`${m}${f?"":"?"}: number;`),i.push(`${m}: { type: Number, required: ${f}, unique: ${M} },`),c.push(`${m}: z.number()${f?"":".optional().nullable()"},`)):(S==="InputSwitch"||U==="Boolean")&&(s.push(`${m}${f?"":"?"}: boolean;`),i.push(`${m}: { type: Boolean, required: ${f}, unique: ${M} },`),c.push(`${m}: z.boolean()${f?"":".optional().nullable()"},`));});let l=`./src/Microservices/${e}`,X=g.readFileSync(`${d}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,c.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),y=g.readFileSync(`${d}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,c.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),E=g.readFileSync(`${d}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,c.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),v=g.readFileSync(`${d}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,c.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),O=`${l}/${e}Controller.ts`,G=`${l}/${e}Router.ts`,ee=`${l}/${e}.dto.ts`,te=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(O,X),g.writeFileSync(G,y),g.writeFileSync(ee,E),g.writeFileSync(te,v);let ne=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${n.collectionName}",`:m).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ne);let re=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",re);})}var ae=ve({color:"blue",indent:2}),Ee=ve({color:"blue",indent:2});function H(e){return a(this,null,function*(){var i,c;let n=N(),t=e.toLowerCase(),r=(c=(i=yield Y())==null?void 0:i.resources)==null?void 0:c.find(l=>l.name.toLowerCase()===t.toLowerCase());if(!r){ae.fail(`Resource ${q.cyan(t)} not found in config file`);return}let s=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield F("webapp",()=>a(this,null,function*(){let l=`./src/screens/${s}`;if(g.existsSync(l))return;ae.start(`Creating screen: ${q.cyan(s)}`);let X=`${l}/${s}.tsx`,y=`${l}/Create${s}.tsx`,E=`${l}/Edit${s}.tsx`,v=`./src/types/${s.toLowerCase()}.d.ts`;g.createFileSync(X),g.createFileSync(y),g.createFileSync(E),g.createFileSync(v),yield oe(s,r),ae.succeed(`Created screen: ${q.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield F("server",()=>a(this,null,function*(){let l=`./src/Microservices/${s}`;if(g.existsSync(l))return;Ee.start(`Creating CRUD for: ${q.cyan(s)}`);let X=`${l}/${s}Controller.ts`,y=`${l}/${s}Router.ts`,E=`${l}/${s}.dto.ts`;g.createFileSync(X),g.createFileSync(y),g.createFileSync(E),yield ie(s,r),Ee.succeed(`Created CRUD for: ${q.cyan(s)}`);})));})}var Ue=()=>new Promise((e,n)=>a(void 0,null,function*(){var r;let t=(r=yield Y())==null?void 0:r.resources;t==null||t.map((s,i)=>a(void 0,null,function*(){yield H(s.name),t.length===i+1&&e();}));}));function ce(){return a(this,null,function*(){yield Ue();})}var Q=ve({color:"blue",indent:2});function le(e){return a(this,null,function*(){let n=N(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield F("webapp",()=>a(this,null,function*(){let r=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,i="./src/layout/items.json";if(!g.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let c=g.readFileSync(i),l=JSON.parse(c.toString());l[0].items=l[0].items.filter(v=>v.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(l,null,2)),g.removeSync(r),g.removeSync(s);let X=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],E=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>X.filter(O=>v.includes(O)).length===0);g.writeFileSync("./src/main.tsx",E.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield F("server",()=>a(this,null,function*(){let r=`./src/Microservices/${t}`,s=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!g.existsSync(r)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),g.removeSync(r),g.removeSync(s);let l=g.readFileSync(i).toString().split(`
`).filter(y=>!y.includes(`${t}Collection`)).join(`
`),X=g.readFileSync(c).toString().split(`
`).filter(y=>!y.includes(`${t}Router`)).join(`
`);g.writeFileSync(i,l),g.writeFileSync(c,X),Q.succeed(`Removed CRUD: ${t}`);})));})}function pe(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let r=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(i=>s.includes(i)).length===0);g.writeFileSync("./src/main.tsx",r.join(`
`));}function me(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Z(e){return a(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var be=()=>`REST_API_PORT=3005
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
`;var z=ve({color:"blue",indent:2});function de(e,n){return a(this,null,function*(){let t=e.toLowerCase();z.start("Scaffolding project..."),yield Be().clone("https://github.com/kuvam-oaktreeapps/admin_panel",t),process.chdir(t),g.ensureDirSync(`${d}`),g.ensureDirSync(`${d}/webapp`),g.ensureDirSync(`${d}/server`),g.removeSync("./.git"),K("webapp",()=>{g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${d}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${d}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${d}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${d}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),pe();}),K("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${d}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${d}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${d}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${d}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",be()),me();}),z.succeed(`Created "${t}" successfully!`),n.onlyServer&&g.removeSync("webapp"),n.onlyWebapp&&g.removeSync("server"),z.start("Installing dependencies..."),n.onlyServer||(yield F("webapp",()=>a(this,null,function*(){yield Z("yarn install");}))),n.onlyWebapp||(yield F("server",()=>a(this,null,function*(){yield Z("yarn install");}))),z.succeed("Installed dependencies successfully!");})}var Ie=e=>{let n=e.toLowerCase();return `/**
 * @typedef {import('../types').Screen} Screen
 */
const screen = {
  name: "${b(n)}",
  url: "/${n}",
  collectionName: "${n}",
  crudFields: [
    // ...
  ],
};

module.exports = screen;`};var Re=ve({color:"blue",indent:2});function Xe(e){return a(this,null,function*(){let n=e.toLowerCase(),t=Ie(n);Re.start(`Creating config template for ${q.cyan(n)}`),K("root",()=>{let r=`kitconfig/resources/${n}.cjs`;g.ensureFileSync(r),g.writeFileSync(r,t);}),Re.succeed(`Created config template for ${q.cyan(n)}`);})}var d=Ge.homedir()+"/.adminkit",_=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(de);_.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(H);_.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(Xe);_.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(le);_.command("sync").description('Add resources defined in "kitconfig" to the project').action(ce);_.parse();

export { d as adminKitPath };
