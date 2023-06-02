#! /usr/bin/env node
import { Command } from 'commander';
import He from 'os';
import g from 'fs-extra';
import U from 'chalk';
import Ke from 'path';
import { z } from 'zod';
import Ee from 'ora';
import ke from 'simple-git';
import { exec } from 'child_process';

var a=(e,r,t)=>new Promise((n,i)=>{var s=p=>{try{y(t.next(p));}catch(X){i(X);}},c=p=>{try{y(t.throw(p));}catch(X){i(X);}},y=p=>p.done?n(p.value):Promise.resolve(p.value).then(s,c);y((t=t.apply(e,r)).next());});var R=e=>{let r=e.replace(/([A-Z])/g," $1");return r.charAt(0).toUpperCase()+r.slice(1)},I=e=>e.charAt(0).toUpperCase()+e.slice(1);var v=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${R(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${R(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?v(e.name)[0]:""}
  />
  ${e.required?v(e.name)[1]:""}
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${R(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?v(e.name)[0]:""}
/>
  ${e.required?v(e.name)[1]:""}
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${R(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?v(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?v(e.name)[1]:""}
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${R(e.name)}"
  style={{ width: "100%" }}
  ${e.required?v(e.name)[0]:""}
/>
  ${e.required?v(e.name)[1]:""}
</div>`,je=(e,r)=>`<div className="flex align-items-center">
      <RadioButton
        value="${r.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${r.value}"}
        ${e.required?v(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${r.name}
      </p>
    </div>
`,he=(e,r)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${R(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${r.map(t=>je(e,t)).join(`
`)}
  </div>
  ${e.required?v(e.name)[1]:""}
</div>
`,xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${R(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var A=e=>`<Column
  field="${e}"
  header="${I(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var T={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ne(e,r){return a(this,null,function*(){let t="",n="",i=[],s=[],c=[],y=[],p=["InputSwitch"];r.crudFields.forEach((o,L)=>{let F="",_="";o.required&&!p.includes(o.type)&&i.push(o.name),o.type==="InputText"||o.type==="String"?(o.tableDisplay&&c.push(A(o.name)),s.push(ge(o)),F="string",_='""'):o.type==="InputTextarea"?(o.tableDisplay&&c.push(A(o.name)),s.push(fe(o)),F="string",_='""'):o.type==="InputNumber"||o.type==="Number"?(o.tableDisplay&&c.push(A(o.name)),s.push(Xe(o)),F="number",_="0"):o.type==="Dropdown"?(o.tableDisplay&&c.push(A(o.name)),s.push($e(o)),y.push({fieldName:o.name,options:o.options||[]}),F="string",_='""'):o.type==="RadioButton"?(o.tableDisplay&&c.push(A(o.name)),s.push(he(o,o.options||[])),F="string",_='""'):(o.type==="InputSwitch"||o.type==="Boolean")&&(o.tableDisplay&&c.push(A(o.name)),s.push(xe(o)),F="boolean",_="false"),L===0&&(t+=`id?: string;
`,n+=`id: undefined,
`),t+=`${o.name}: ${F};
`,n+=`${o.name}: ${_},
`;});let X=`./src/screens/${e}`,b=`${X}/${e}.tsx`,S=`${X}/Create${e}.tsx`,D=`${X}/Edit${e}.tsx`,V="./src/layout/items.json",Z=g.readFileSync(`${d}/webapp/XXXXX.tsx`).toString(),z=g.readFileSync(`${d}/webapp/CreateXXXXX.tsx`).toString(),ee=g.readFileSync(`${d}/webapp/EditXXXXX.tsx`).toString(),te=g.readFileSync(`${d}/webapp/xxxxx.d.ts`).toString(),u=Z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.initialState,n),f=[];u.split(`
`).forEach(o=>{o.includes(T.tableColumns)&&f.push(...c),f.push(o);}),g.writeFileSync(b,f.join(`
`));let C=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,s.join(`
`)).replace(T.validate,`if (${i.map(o=>`entity.${o}`).join(" && ")}) `),E=[];C.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:L,options:F})=>{E.push(`const ${L}Options = ${JSON.stringify(F,null,2)};
`);}),E.push(o)):(o.includes(T.initialState)&&E.push(n),E.push(o));}),g.writeFileSync(S,E.join(`
`));let Pe=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,s.join(`
`)).replace(T.validate,`if (${i.map(o=>`entity.${o}`).join(" && ")}) `),K=[];Pe.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:L,options:F})=>{K.push(`const ${L}Options = ${JSON.stringify(F,null,2)};
`);}),K.push(o)):(o.includes(T.initialState)&&K.push(n),K.push(o));}),g.writeFileSync(D,K.join(`
`));let Re=g.readFileSync(V),ye=JSON.parse(Re.toString());ye[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(V,JSON.stringify(ye,null,2));let De=te.replace(/XXXXX/g,e).replace(T.interface,t);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,De);let Le=g.readFileSync("./src/main.tsx").toString().split(`
`),_e=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Ae=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],H=[];H.push(...Ae),Le.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&_e.forEach(L=>{H.push(L);}),H.push(o);}),g.writeFileSync("./src/main.tsx",H.join(`
`));})}var re=z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("String"),z.literal("InputSwitch"),z.literal("Boolean"),z.literal("InputNumber"),z.literal("Number")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}),Se=z.object({resources:z.array(re)});var G=(e=process.cwd())=>g.readdirSync(e).includes("kitconfig"),w=(e,r)=>a(void 0,null,function*(){let t=process.cwd().split("/").at(-1),n;return t===e||G()&&e==="root"?n=yield r():G()?(process.chdir(e),n=yield r(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield r(),process.chdir(t)):(process.chdir(".."),process.chdir(e),n=yield r(),process.chdir(".."),process.chdir(t)),n}),O=(e,r)=>{let t=process.cwd().split("/").at(-1),n;return t===e||G()&&e==="root"?n=r():G()?(process.chdir(e),n=r(),process.chdir("..")):e==="root"?(process.chdir(".."),n=r(),process.chdir(t)):(process.chdir(".."),process.chdir(e),n=r(),process.chdir(".."),process.chdir(t)),n},J=()=>O("root",()=>{let e,r=g.readdirSync(".");return r.includes("webapp")&&r.includes("server")?e="both":r.includes("webapp")?e="webapp":r.includes("server")?e="server":e="INVALID_STATE",e});var W=()=>a(void 0,null,function*(){return w("root",()=>a(void 0,null,function*(){let e={resources:[]};if(!g.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let r=Ke.join(process.cwd(),"kitconfig"),t=g.readdirSync("kitconfig/resources");yield Promise.all(t.map(i=>a(void 0,null,function*(){let s=yield import(`${r}/resources/${i}`),c=re.safeParse(s.default);c.success?e.resources.push(c.data):console.log(`Couldn't parse screen '${i}':`,c.error.format());})));let n=Se.safeParse(e);return n.success?n.data:(console.error("Config parsing error",n.error),null)}))});var M=(e,r)=>{let t="";return r.filter(n=>!!n).forEach(n=>{t+=`const existing${I(n)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${n},
  _id: { $ne: id },
});

if (existing${I(n)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),t},k=(e,r)=>{let t=`const { ${r.join(", ")} } = input;
`;return r.filter(n=>!!n).forEach(n=>{t+=`
const existing${I(n)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${n},
  });

if (existing${I(n)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),t};var l={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function oe(e,r){return a(this,null,function*(){let t=r.crudFields.filter(u=>u.unique).map(u=>u.name),n=[],i=[],s=[],c=[];r.crudFields.forEach(({name:u,type:f,required:C,unique:E})=>{n.push(`${u}: entity.${u},`),f==="InputText"||f==="InputTextarea"||f==="Dropdown"||f==="RadioButton"||f==="String"?(i.push(`${u}${C?"":"?"}: string;`),s.push(`${u}: { type: String, required: ${C}, unique: ${E} },`),c.push(`${u}: z.string()${C?".nonempty()":".optional().nullable()"},`)):f==="InputNumber"||f==="Number"?(i.push(`${u}${C?"":"?"}: number;`),s.push(`${u}: { type: Number, required: ${C}, unique: ${E} },`),c.push(`${u}: z.number()${C?"":".optional().nullable()"},`)):(f==="InputSwitch"||f==="Boolean")&&(i.push(`${u}${C?"":"?"}: boolean;`),s.push(`${u}: { type: Boolean, required: ${C}, unique: ${E} },`),c.push(`${u}: z.boolean()${C?"":".optional().nullable()"},`));});let y=`./src/Microservices/${e}`,p=g.readFileSync(`${d}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,k(e,t)).replace(l.checkExistingUpdateEntity,M(e,t)),X=g.readFileSync(`${d}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,k(e,t)).replace(l.checkExistingUpdateEntity,M(e,t)),b=g.readFileSync(`${d}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,k(e,t)).replace(l.checkExistingUpdateEntity,M(e,t)),S=g.readFileSync(`${d}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,k(e,t)).replace(l.checkExistingUpdateEntity,M(e,t)),D=`${y}/${e}Controller.ts`,V=`${y}/${e}Router.ts`,Z=`${y}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(D,p),g.writeFileSync(V,X),g.writeFileSync(Z,b),g.writeFileSync(z,S);let ee=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${r.collectionName}",`:u).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var se=Ee({color:"blue",indent:2}),we=Ee({color:"blue",indent:2});function B(e){return a(this,null,function*(){var c,y;if(!/^[a-z]+$/.test(e.trim())){console.log(`${U.red("Error:")} "${e}" is invalid, names consisting of only alphabets are valid.`);return}let t=J(),n=e.toLowerCase(),i=(y=(c=yield W())==null?void 0:c.resources)==null?void 0:y.find(p=>p.name.toLowerCase()===n.toLowerCase());if(!i){se.fail(`Screen ${U.cyan(n)} not found in config file`);return}let s=n.charAt(0).toUpperCase()+n.slice(1);(t==="both"||t==="webapp")&&(yield w("webapp",()=>a(this,null,function*(){let p=`./src/screens/${s}`;if(g.existsSync(p))return;se.start(`Creating screen: ${U.cyan(s)}`);let X=`${p}/${s}.tsx`,b=`${p}/Create${s}.tsx`,S=`${p}/Edit${s}.tsx`,D=`./src/types/${s.toLowerCase()}.d.ts`;g.createFileSync(X),g.createFileSync(b),g.createFileSync(S),g.createFileSync(D),yield ne(s,i),se.succeed(`Created screen: ${U.cyan(s)}`);}))),(t==="both"||t==="server")&&(yield w("server",()=>a(this,null,function*(){let p=`./src/Microservices/${s}`;if(g.existsSync(p))return;we.start(`Creating CRUD for: ${U.cyan(s)}`);let X=`${p}/${s}Controller.ts`,b=`${p}/${s}Router.ts`,S=`${p}/${s}.dto.ts`;g.createFileSync(X),g.createFileSync(b),g.createFileSync(S),yield oe(s,i),we.succeed(`Created CRUD for: ${U.cyan(s)}`);})));})}var Oe=()=>new Promise((e,r)=>a(void 0,null,function*(){var n;let t=(n=yield W())==null?void 0:n.resources;t==null||t.map((i,s)=>a(void 0,null,function*(){yield B(i.name),t.length===s+1&&e();}));}));function ie(){return a(this,null,function*(){yield Oe();})}var N=Ee({color:"blue",indent:2});function ae(e){return a(this,null,function*(){let r=J(),t=e.charAt(0).toUpperCase()+e.slice(1);(r==="both"||r==="webapp")&&(yield w("webapp",()=>a(this,null,function*(){let n=`./src/types/${e}.d.ts`,i=`./src/screens/${t}`,s="./src/layout/items.json";if(!g.existsSync(i)){console.log("  Nothing to remove in webapp.");return}N.start(`Removing screen: ${e}`);let c=g.readFileSync(s),y=JSON.parse(c.toString());y[0].items=y[0].items.filter(S=>S.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(s,JSON.stringify(y,null,2)),g.removeSync(n),g.removeSync(i);let p=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],b=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(S=>p.filter(D=>S.includes(D)).length===0);g.writeFileSync("./src/main.tsx",b.join(`
`)),N.succeed(`Removed screen: ${e}`);}))),(r==="both"||r==="server")&&(yield w("server",()=>a(this,null,function*(){let n=`./src/Microservices/${t}`,i=`./src/Database/Entities/${t}Entity.ts`,s="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!g.existsSync(n)){console.log("  Nothing to remove in server.");return}N.start(`Removing CRUD: ${t}`),g.removeSync(n),g.removeSync(i);let y=g.readFileSync(s).toString().split(`
`).filter(X=>!X.includes(`${t}Collection`)).join(`
`),p=g.readFileSync(c).toString().split(`
`).filter(X=>!X.includes(`${t}Router`)).join(`
`);g.writeFileSync(s,y),g.writeFileSync(c,p),N.succeed(`Removed CRUD: ${t}`);})));})}function ce(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let n=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(s=>i.includes(s)).length===0);g.writeFileSync("./src/main.tsx",n.join(`
`));}function pe(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Y(e){return a(this,null,function*(){return new Promise((r,t)=>{exec(e,()=>{r(null);});})})}var ve=()=>`REST_API_PORT=3005
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
`;var Q=Ee({color:"blue",indent:2});function ue(e,r){return a(this,null,function*(){let t=e.toLowerCase();Q.start("Scaffolding project..."),yield ke().clone("https://github.com/kuvamdazeus/adminkit-template",t),process.chdir(t),g.ensureDirSync(`${d}`),g.ensureDirSync(`${d}/webapp`),g.ensureDirSync(`${d}/server`),g.removeSync("./.git"),O("webapp",()=>{g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${d}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${d}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${d}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${d}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ce();}),O("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${d}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${d}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${d}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${d}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",ve()),pe();}),Q.succeed(`Created "${t}" successfully!`),r.onlyServer&&g.removeSync("webapp"),r.onlyWebapp&&g.removeSync("server"),Q.start("Installing dependencies..."),r.onlyServer||(yield w("webapp",()=>a(this,null,function*(){yield Y("yarn install");}))),r.onlyWebapp||(yield w("server",()=>a(this,null,function*(){yield Y("yarn install");}))),Q.succeed("Installed dependencies successfully!");})}var be=e=>{let r=e.toLowerCase();return `/**
 * @typedef {import('../types').Screen} Screen
 */
const screen = {
  name: "${I(r)}",
  url: "/${r}",
  collectionName: "${r}",
  crudFields: [
    // ...
  ],
};

module.exports = screen;`};var Te=Ee({color:"blue",indent:2});function de(e){return a(this,null,function*(){if(!/^[a-z]+$/.test(e.trim())){console.log(`${U.red("Error:")} "${e}" is invalid, names with only alphabets are valid.`);return}let t=e.toLowerCase(),n=be(t);Te.start(`Creating config template for ${U.cyan(t)}`),O("root",()=>{let i=`kitconfig/resources/${t}.cjs`;g.ensureFileSync(i),g.writeFileSync(i,n);}),Te.succeed(`Created config template for ${U.cyan(t)}`);})}var d=He.homedir()+"/.adminkit",j=new Command;j.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");j.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ue);j.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(B);j.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(de);j.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(ae);j.command("sync").description('Add resources defined in "kitconfig" to the project').action(ie);j.parse();

export { d as adminKitPath };
