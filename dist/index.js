#! /usr/bin/env node
import { Command } from 'commander';
import Je from 'os';
import f from 'fs-extra';
import _ from 'chalk';
import Ke from 'path';
import { z } from 'zod';
import ve from 'ora';
import Oe from 'simple-git';
import Me from 'node-fetch';
import { exec } from 'child_process';

var a=(e,r,t)=>new Promise((n,i)=>{var s=p=>{try{y(t.next(p));}catch(X){i(X);}},c=p=>{try{y(t.throw(p));}catch(X){i(X);}},y=p=>p.done?n(p.value):Promise.resolve(p.value).then(s,c);y((t=t.apply(e,r)).next());});var D=e=>{let r=e.replace(/([A-Z])/g," $1");return r.charAt(0).toUpperCase()+r.slice(1)},I=e=>e.charAt(0).toUpperCase()+e.slice(1);var E=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${D(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${D(e.name)}</p>
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
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${D(e.name)}</p>
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
<p>${D(e.name)}</p>
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
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${D(e.name)}"
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,Ae=(e,r)=>`<div className="flex align-items-center">
      <RadioButton
        value="${r.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${r.value}"}
        ${e.required?E(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${r.name}
      </p>
    </div>
`,he=(e,r)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${D(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${r.map(t=>Ae(e,t)).join(`
`)}
  </div>
  ${e.required?E(e.name)[1]:""}
</div>
`,xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${D(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var A=e=>`<Column
  field="${e}"
  header="${I(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var T={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ne(e,r){return a(this,null,function*(){let t="",n="",i=[],s=[],c=[],y=[],p=["InputSwitch"];r.crudFields.forEach((o,R)=>{let F="",j="";o.required&&!p.includes(o.type)&&i.push(o.name),o.type==="InputText"||o.type==="String"?(o.tableDisplay&&c.push(A(o.name)),s.push(fe(o)),F="string",j='""'):o.type==="InputTextarea"?(o.tableDisplay&&c.push(A(o.name)),s.push(ge(o)),F="string",j='""'):o.type==="InputNumber"||o.type==="Number"?(o.tableDisplay&&c.push(A(o.name)),s.push(Xe(o)),F="number",j="0"):o.type==="Dropdown"?(o.tableDisplay&&c.push(A(o.name)),s.push($e(o)),y.push({fieldName:o.name,options:o.options||[]}),F="string",j='""'):o.type==="RadioButton"?(o.tableDisplay&&c.push(A(o.name)),s.push(he(o,o.options||[])),F="string",j='""'):(o.type==="InputSwitch"||o.type==="Boolean")&&(o.tableDisplay&&c.push(A(o.name)),s.push(xe(o)),F="boolean",j="false"),R===0&&(t+=`id?: string;
`,n+=`id: undefined,
`),t+=`${o.name}: ${F};
`,n+=`${o.name}: ${j},
`;});let X=`./src/screens/${e}`,b=`${X}/${e}.tsx`,w=`${X}/Create${e}.tsx`,L=`${X}/Edit${e}.tsx`,V="./src/layout/items.json",N=f.readFileSync(`${d}/webapp/XXXXX.tsx`).toString(),z=f.readFileSync(`${d}/webapp/CreateXXXXX.tsx`).toString(),ee=f.readFileSync(`${d}/webapp/EditXXXXX.tsx`).toString(),te=f.readFileSync(`${d}/webapp/xxxxx.d.ts`).toString(),u=N.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.initialState,n),g=[];u.split(`
`).forEach(o=>{o.includes(T.tableColumns)&&g.push(...c),g.push(o);}),f.writeFileSync(b,g.join(`
`));let C=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,s.join(`
`)).replace(T.validate,`if (${i.map(o=>`entity.${o}`).join(" && ")}) `),v=[];C.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:R,options:F})=>{v.push(`const ${R}Options = ${JSON.stringify(F,null,2)};
`);}),v.push(o)):(o.includes(T.initialState)&&v.push(n),v.push(o));}),f.writeFileSync(w,v.join(`
`));let Te=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,s.join(`
`)).replace(T.validate,`if (${i.map(o=>`entity.${o}`).join(" && ")}) `),k=[];Te.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:R,options:F})=>{k.push(`const ${R}Options = ${JSON.stringify(F,null,2)};
`);}),k.push(o)):(o.includes(T.initialState)&&k.push(n),k.push(o));}),f.writeFileSync(L,k.join(`
`));let Pe=f.readFileSync(V),ye=JSON.parse(Pe.toString());ye[0].items.push({label:e,to:`/${e.toLowerCase()}`}),f.writeFileSync(V,JSON.stringify(ye,null,2));let De=te.replace(/XXXXX/g,e).replace(T.interface,t);f.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,De);let Le=f.readFileSync("./src/main.tsx").toString().split(`
`),Re=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],je=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...je),Le.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&Re.forEach(R=>{J.push(R);}),J.push(o);}),f.writeFileSync("./src/main.tsx",J.join(`
`));})}var re=z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("String"),z.literal("InputSwitch"),z.literal("Boolean"),z.literal("InputNumber"),z.literal("Number")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}),we=z.object({resources:z.array(re)});var W=(e=process.cwd())=>f.readdirSync(e).includes("kitconfig"),S=(e,r)=>a(void 0,null,function*(){let t=process.cwd().split("/").at(-1),n;return t===e||W()&&e==="root"?n=yield r():W()?(process.chdir(e),n=yield r(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield r(),process.chdir(t)):(process.chdir(".."),process.chdir(e),n=yield r(),process.chdir(".."),process.chdir(t)),n}),U=(e,r)=>{let t=process.cwd().split("/").at(-1),n;return t===e||W()&&e==="root"?n=r():W()?(process.chdir(e),n=r(),process.chdir("..")):e==="root"?(process.chdir(".."),n=r(),process.chdir(t)):(process.chdir(".."),process.chdir(e),n=r(),process.chdir(".."),process.chdir(t)),n},H=()=>U("root",()=>{let e,r=f.readdirSync(".");return r.includes("webapp")&&r.includes("server")?e="both":r.includes("webapp")?e="webapp":r.includes("server")?e="server":e="INVALID_STATE",e});var G=()=>a(void 0,null,function*(){return S("root",()=>a(void 0,null,function*(){let e={resources:[]};if(!f.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let r=Ke.join(process.cwd(),"kitconfig"),t=f.readdirSync("kitconfig/resources");yield Promise.all(t.map(i=>a(void 0,null,function*(){let s=yield import(`${r}/resources/${i}`),c=re.safeParse(s.default);c.success?e.resources.push(c.data):console.log(`Couldn't parse screen '${i}':`,c.error.format());})));let n=we.safeParse(e);return n.success?n.data:(console.error("Config parsing error",n.error),null)}))});var O=(e,r)=>{let t="";return r.filter(n=>!!n).forEach(n=>{t+=`const existing${I(n)}UpdateEntity: I${e}Entity | null =
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
`;}),t},M=(e,r)=>{let t=`const { ${r.join(", ")} } = input;
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
`;}),t};var l={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function oe(e,r){return a(this,null,function*(){let t=r.crudFields.filter(u=>u.unique).map(u=>u.name),n=[],i=[],s=[],c=[];r.crudFields.forEach(({name:u,type:g,required:C,unique:v})=>{n.push(`${u}: entity.${u},`),g==="InputText"||g==="InputTextarea"||g==="Dropdown"||g==="RadioButton"||g==="String"?(i.push(`${u}${C?"":"?"}: string;`),s.push(`${u}: { type: String, required: ${C}, unique: ${v} },`),c.push(`${u}: z.string()${C?".nonempty()":".optional().nullable()"},`)):g==="InputNumber"||g==="Number"?(i.push(`${u}${C?"":"?"}: number;`),s.push(`${u}: { type: Number, required: ${C}, unique: ${v} },`),c.push(`${u}: z.number()${C?"":".optional().nullable()"},`)):(g==="InputSwitch"||g==="Boolean")&&(i.push(`${u}${C?"":"?"}: boolean;`),s.push(`${u}: { type: Boolean, required: ${C}, unique: ${v} },`),c.push(`${u}: z.boolean()${C?"":".optional().nullable()"},`));});let y=`./src/Microservices/${e}`,p=f.readFileSync(`${d}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,O(e,t)),X=f.readFileSync(`${d}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,O(e,t)),b=f.readFileSync(`${d}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,O(e,t)),w=f.readFileSync(`${d}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,i.join(`
`)).replace(l.schema,s.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,M(e,t)).replace(l.checkExistingUpdateEntity,O(e,t)),L=`${y}/${e}Controller.ts`,V=`${y}/${e}Router.ts`,N=`${y}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;f.writeFileSync(L,p),f.writeFileSync(V,X),f.writeFileSync(N,b),f.writeFileSync(z,w);let ee=f.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${r.collectionName}",`:u).join(`
`);f.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=f.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);f.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var se=ve({color:"blue",indent:2}),Se=ve({color:"blue",indent:2});function B(e){return a(this,null,function*(){var c,y;if(!/^[a-z]+$/.test(e.trim())){console.log(`${_.red("Error:")} "${e}" is invalid, names consisting of only alphabets are valid.`);return}let t=H(),n=e.toLowerCase(),i=(y=(c=yield G())==null?void 0:c.resources)==null?void 0:y.find(p=>p.name.toLowerCase()===n.toLowerCase());if(!i){se.fail(`Screen ${_.cyan(n)} not found in config file`);return}let s=n.charAt(0).toUpperCase()+n.slice(1);(t==="both"||t==="webapp")&&(yield S("webapp",()=>a(this,null,function*(){let p=`./src/screens/${s}`;if(f.existsSync(p))return;se.start(`Creating screen: ${_.cyan(s)}`);let X=`${p}/${s}.tsx`,b=`${p}/Create${s}.tsx`,w=`${p}/Edit${s}.tsx`,L=`./src/types/${s.toLowerCase()}.d.ts`;f.createFileSync(X),f.createFileSync(b),f.createFileSync(w),f.createFileSync(L),yield ne(s,i),se.succeed(`Created screen: ${_.cyan(s)}`);}))),(t==="both"||t==="server")&&(yield S("server",()=>a(this,null,function*(){let p=`./src/Microservices/${s}`;if(f.existsSync(p))return;Se.start(`Creating CRUD for: ${_.cyan(s)}`);let X=`${p}/${s}Controller.ts`,b=`${p}/${s}Router.ts`,w=`${p}/${s}.dto.ts`;f.createFileSync(X),f.createFileSync(b),f.createFileSync(w),yield oe(s,i),Se.succeed(`Created CRUD for: ${_.cyan(s)}`);})));})}var ke=()=>new Promise((e,r)=>a(void 0,null,function*(){var n;let t=(n=yield G())==null?void 0:n.resources;t==null||t.map((i,s)=>a(void 0,null,function*(){yield B(i.name),t.length===s+1&&e();}));}));function ie(){return a(this,null,function*(){yield ke();})}var Q=ve({color:"blue",indent:2});function ae(e){return a(this,null,function*(){let r=H(),t=e.charAt(0).toUpperCase()+e.slice(1);(r==="both"||r==="webapp")&&(yield S("webapp",()=>a(this,null,function*(){let n=`./src/types/${e}.d.ts`,i=`./src/screens/${t}`,s="./src/layout/items.json";if(!f.existsSync(i)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let c=f.readFileSync(s),y=JSON.parse(c.toString());y[0].items=y[0].items.filter(w=>w.label.toLowerCase()!==t.toLowerCase()),f.writeFileSync(s,JSON.stringify(y,null,2)),f.removeSync(n),f.removeSync(i);let p=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],b=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(w=>p.filter(L=>w.includes(L)).length===0);f.writeFileSync("./src/main.tsx",b.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(r==="both"||r==="server")&&(yield S("server",()=>a(this,null,function*(){let n=`./src/Microservices/${t}`,i=`./src/Database/Entities/${t}Entity.ts`,s="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!f.existsSync(n)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),f.removeSync(n),f.removeSync(i);let y=f.readFileSync(s).toString().split(`
`).filter(X=>!X.includes(`${t}Collection`)).join(`
`),p=f.readFileSync(c).toString().split(`
`).filter(X=>!X.includes(`${t}Router`)).join(`
`);f.writeFileSync(s,y),f.writeFileSync(c,p),Q.succeed(`Removed CRUD: ${t}`);})));})}function ce(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];f.removeSync("./.git"),f.removeSync("./src/screens/XXXXX"),f.removeSync("./src/types/xxxxx.d.ts");let n=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(s=>i.includes(s)).length===0);f.writeFileSync("./src/main.tsx",n.join(`
`));}function pe(){f.removeSync("./.git"),f.removeSync("./src/Microservices/XXXXX"),f.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Y(e){return a(this,null,function*(){return new Promise((r,t)=>{exec(e,()=>{r(null);});})})}var Z=ve({color:"blue",indent:2});function ue(e,r){return a(this,null,function*(){let t=e.toLowerCase();Z.start("Scaffolding project...");let[,n]=yield Promise.all([Oe().clone("https://github.com/kuvamdazeus/adminkit-template",t),Me("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);process.chdir(t),f.ensureDirSync(`${d}`),f.ensureDirSync(`${d}/webapp`),f.ensureDirSync(`${d}/server`),f.removeSync("./.git"),U("webapp",()=>{f.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${d}/webapp/XXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${d}/webapp/CreateXXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${d}/webapp/EditXXXXX.tsx`),f.copyFileSync("./src/types/xxxxx.d.ts",`${d}/webapp/xxxxx.d.ts`),f.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ce();}),U("server",()=>{f.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${d}/server/XXXXXRouter.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${d}/server/XXXXXController.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${d}/server/XXXXX.dto.ts`),f.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${d}/server/XXXXXEntity.ts`),f.writeFileSync("./.env",n),pe();}),Z.succeed(`Created "${t}" successfully!`),r.onlyServer&&f.removeSync("webapp"),r.onlyWebapp&&f.removeSync("server"),Z.start("Installing dependencies..."),r.onlyServer||(yield S("webapp",()=>a(this,null,function*(){yield Y("yarn install");}))),r.onlyWebapp||(yield S("server",()=>a(this,null,function*(){yield Y("yarn install");}))),Z.succeed("Installed dependencies successfully!");})}var Ee=e=>{let r=e.toLowerCase();return `/**
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

module.exports = screen;`};var Ie=ve({color:"blue",indent:2});function de(e){return a(this,null,function*(){if(!/^[a-z]+$/.test(e.trim())){console.log(`${_.red("Error:")} "${e}" is invalid, names with only alphabets are valid.`);return}let t=e.toLowerCase(),n=Ee(t);Ie.start(`Creating config template for ${_.cyan(t)}`),U("root",()=>{let i=`kitconfig/resources/${t}.cjs`;f.ensureFileSync(i),f.writeFileSync(i,n);}),Ie.succeed(`Created config template for ${_.cyan(t)}`);})}var d=Je.homedir()+"/.adminkit",K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ue);K.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(B);K.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(de);K.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(ae);K.command("sync").description('Add resources defined in "kitconfig" to the project').action(ie);K.parse();

export { d as adminKitPath };
