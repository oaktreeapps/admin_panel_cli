#! /usr/bin/env node
import { Command } from 'commander';
import Je from 'os';
import f from 'fs-extra';
import M from 'chalk';
import Ke from 'path';
import { z } from 'zod';
import Se from 'ora';
import Oe from 'simple-git';
import Me from 'node-fetch';
import { exec } from 'child_process';

var a=(e,n,t)=>new Promise((r,s)=>{var i=y=>{try{p(t.next(y));}catch(X){s(X);}},c=y=>{try{p(t.throw(y));}catch(X){s(X);}},p=y=>y.done?r(y.value):Promise.resolve(y.value).then(i,c);p((t=t.apply(e,n)).next());});var D=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},I=e=>e.charAt(0).toUpperCase()+e.slice(1);var v=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${D(e)} is required.</small>}`],ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${D(e.name)}</p>
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
</div>`,Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${D(e.name)}</p>
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
<p>${D(e.name)}</p>
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
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${D(e.name)}"
  style={{ width: "100%" }}
  ${e.required?v(e.name)[0]:""}
/>
  ${e.required?v(e.name)[1]:""}
</div>`,Ae=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?v(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,$e=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${D(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(t=>Ae(e,t)).join(`
`)}
  </div>
  ${e.required?v(e.name)[1]:""}
</div>
`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${D(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var j=e=>`<Column
  field="${e}"
  header="${I(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var T={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ne(e,n){return a(this,null,function*(){let t="",r="",s=[],i=[],c=[],p=[],y=["InputSwitch"];n.crudFields.forEach((o,L)=>{let w="",R="";o.required&&!y.includes(o.type)&&s.push(o.name),o.type==="InputText"||o.type==="String"?(o.tableDisplay&&c.push(j(o.name)),i.push(Xe(o)),w="string",R='""'):o.type==="InputTextarea"?(o.tableDisplay&&c.push(j(o.name)),i.push(fe(o)),w="string",R='""'):o.type==="InputNumber"||o.type==="Number"?(o.tableDisplay&&c.push(j(o.name)),i.push(ye(o)),w="number",R="0"):o.type==="Dropdown"?(o.tableDisplay&&c.push(j(o.name)),i.push(ge(o)),p.push({fieldName:o.name,options:o.options||[]}),w="string",R='""'):o.type==="RadioButton"?(o.tableDisplay&&c.push(j(o.name)),i.push($e(o,o.options||[])),w="string",R='""'):(o.type==="InputSwitch"||o.type==="Boolean")&&(o.tableDisplay&&c.push(j(o.name)),i.push(he(o)),w="boolean",R="false"),L===0&&(t+=`id?: string;
`,r+=`id: undefined,
`),t+=`${o.name}: ${w};
`,r+=`${o.name}: ${R},
`;});let X=`./src/screens/${e}`,E=`${X}/${e}.tsx`,b=`${X}/Create${e}.tsx`,U=`${X}/Edit${e}.tsx`,V="./src/layout/items.json",N=f.readFileSync(`${d}/webapp/XXXXX.tsx`).toString(),z=f.readFileSync(`${d}/webapp/CreateXXXXX.tsx`).toString(),ee=f.readFileSync(`${d}/webapp/EditXXXXX.tsx`).toString(),te=f.readFileSync(`${d}/webapp/xxxxx.d.ts`).toString(),u=N.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.initialState,r),g=[];u.split(`
`).forEach(o=>{o.includes(T.tableColumns)&&g.push(...c),g.push(o);}),f.writeFileSync(E,g.join(`
`));let C=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,i.join(`
`)).replace(T.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),S=[];C.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:L,options:w})=>{S.push(`const ${L}Options = ${JSON.stringify(w,null,2)};
`);}),S.push(o)):(o.includes(T.initialState)&&S.push(r),S.push(o));}),f.writeFileSync(b,S.join(`
`));let Te=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,i.join(`
`)).replace(T.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),K=[];Te.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:L,options:w})=>{K.push(`const ${L}Options = ${JSON.stringify(w,null,2)};
`);}),K.push(o)):(o.includes(T.initialState)&&K.push(r),K.push(o));}),f.writeFileSync(U,K.join(`
`));let Pe=f.readFileSync(V),de=JSON.parse(Pe.toString());de[0].items.push({label:e,to:`/${e.toLowerCase()}`}),f.writeFileSync(V,JSON.stringify(de,null,2));let De=te.replace(/XXXXX/g,e).replace(T.interface,t);f.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,De);let Le=f.readFileSync("./src/main.tsx").toString().split(`
`),Re=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],je=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...je),Le.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&Re.forEach(L=>{J.push(L);}),J.push(o);}),f.writeFileSync("./src/main.tsx",J.join(`
`));})}var re=z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("String"),z.literal("InputSwitch"),z.literal("Boolean"),z.literal("InputNumber"),z.literal("Number")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}),xe=z.object({resources:z.array(re)});var W=(e=process.cwd())=>f.readdirSync(e).includes("kitconfig"),F=(e,n)=>a(void 0,null,function*(){let t=process.cwd().split("/").at(-1),r;return t===e||W()&&e==="root"?r=yield n():W()?(process.chdir(e),r=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=yield n(),process.chdir(".."),process.chdir(t)),r}),k=(e,n)=>{let t=process.cwd().split("/").at(-1),r;return t===e||W()&&e==="root"?r=n():W()?(process.chdir(e),r=n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=n(),process.chdir(".."),process.chdir(t)),r},H=()=>k("root",()=>{let e,n=f.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var G=()=>a(void 0,null,function*(){return F("root",()=>a(void 0,null,function*(){let e={resources:[]};if(!f.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=Ke.join(process.cwd(),"kitconfig"),t=f.readdirSync("kitconfig/resources");yield Promise.all(t.map(s=>a(void 0,null,function*(){let i=yield import(`${n}/resources/${s}`),c=re.safeParse(i.default);c.success?e.resources.push(c.data):console.log(`Couldn't parse screen '${s}':`,c.error.format());})));let r=xe.safeParse(e);return r.success?r.data:(console.error("Config parsing error",r.error),null)}))});var _=(e,n)=>{let t="";return n.filter(r=>!!r).forEach(r=>{t+=`const existing${I(r)}UpdateEntity: I${e}Entity | null =
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
`;}),t},O=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
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
`;}),t};var l={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function oe(e,n){return a(this,null,function*(){let t=n.crudFields.filter(u=>u.unique).map(u=>u.name),r=[],s=[],i=[],c=[];n.crudFields.forEach(({name:u,type:g,required:C,unique:S})=>{r.push(`${u}: entity.${u},`),g==="InputText"||g==="InputTextarea"||g==="Dropdown"||g==="RadioButton"||g==="String"?(s.push(`${u}${C?"":"?"}: string;`),i.push(`${u}: { type: String, required: ${C}, unique: ${S} },`),c.push(`${u}: z.string()${C?".nonempty()":".optional().nullable()"},`)):g==="InputNumber"||g==="Number"?(s.push(`${u}${C?"":"?"}: number;`),i.push(`${u}: { type: Number, required: ${C}, unique: ${S} },`),c.push(`${u}: z.number()${C?"":".optional().nullable()"},`)):(g==="InputSwitch"||g==="Boolean")&&(s.push(`${u}${C?"":"?"}: boolean;`),i.push(`${u}: { type: Boolean, required: ${C}, unique: ${S} },`),c.push(`${u}: z.boolean()${C?"":".optional().nullable()"},`));});let p=`./src/Microservices/${e}`,y=f.readFileSync(`${d}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,O(e,t)).replace(l.checkExistingUpdateEntity,_(e,t)),X=f.readFileSync(`${d}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,O(e,t)).replace(l.checkExistingUpdateEntity,_(e,t)),E=f.readFileSync(`${d}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,O(e,t)).replace(l.checkExistingUpdateEntity,_(e,t)),b=f.readFileSync(`${d}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,s.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,r.join(`
`)).replace(l.zod,c.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,O(e,t)).replace(l.checkExistingUpdateEntity,_(e,t)),U=`${p}/${e}Controller.ts`,V=`${p}/${e}Router.ts`,N=`${p}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;f.writeFileSync(U,y),f.writeFileSync(V,X),f.writeFileSync(N,E),f.writeFileSync(z,b);let ee=f.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${n.collectionName}",`:u).join(`
`);f.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=f.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);f.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var se=Se({color:"blue",indent:2}),Fe=Se({color:"blue",indent:2});function B(e){return a(this,null,function*(){var i,c;let n=H(),t=e.toLowerCase(),r=(c=(i=yield G())==null?void 0:i.resources)==null?void 0:c.find(p=>p.name.toLowerCase()===t.toLowerCase());if(!r){se.fail(`Screen ${M.cyan(t)} not found in config file`);return}let s=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield F("webapp",()=>a(this,null,function*(){let p=`./src/screens/${s}`;if(f.existsSync(p))return;se.start(`Creating screen: ${M.cyan(s)}`);let y=`${p}/${s}.tsx`,X=`${p}/Create${s}.tsx`,E=`${p}/Edit${s}.tsx`,b=`./src/types/${s.toLowerCase()}.d.ts`;f.createFileSync(y),f.createFileSync(X),f.createFileSync(E),f.createFileSync(b),yield ne(s,r),se.succeed(`Created screen: ${M.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield F("server",()=>a(this,null,function*(){let p=`./src/Microservices/${s}`;if(f.existsSync(p))return;Fe.start(`Creating CRUD for: ${M.cyan(s)}`);let y=`${p}/${s}Controller.ts`,X=`${p}/${s}Router.ts`,E=`${p}/${s}.dto.ts`;f.createFileSync(y),f.createFileSync(X),f.createFileSync(E),yield oe(s,r),Fe.succeed(`Created CRUD for: ${M.cyan(s)}`);})));})}var ke=()=>new Promise((e,n)=>a(void 0,null,function*(){var r;let t=(r=yield G())==null?void 0:r.resources;t==null||t.map((s,i)=>a(void 0,null,function*(){yield B(s.name),t.length===i+1&&e();}));}));function ie(){return a(this,null,function*(){yield ke();})}var Q=Se({color:"blue",indent:2});function ae(e){return a(this,null,function*(){let n=H(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield F("webapp",()=>a(this,null,function*(){let r=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,i="./src/layout/items.json";if(!f.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let c=f.readFileSync(i),p=JSON.parse(c.toString());p[0].items=p[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),f.writeFileSync(i,JSON.stringify(p,null,2)),f.removeSync(r),f.removeSync(s);let y=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],E=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>y.filter(U=>b.includes(U)).length===0);f.writeFileSync("./src/main.tsx",E.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield F("server",()=>a(this,null,function*(){let r=`./src/Microservices/${t}`,s=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";if(!f.existsSync(r)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),f.removeSync(r),f.removeSync(s);let p=f.readFileSync(i).toString().split(`
`).filter(X=>!X.includes(`${t}Collection`)).join(`
`),y=f.readFileSync(c).toString().split(`
`).filter(X=>!X.includes(`${t}Router`)).join(`
`);f.writeFileSync(i,p),f.writeFileSync(c,y),Q.succeed(`Removed CRUD: ${t}`);})));})}function ce(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];f.removeSync("./.git"),f.removeSync("./src/screens/XXXXX"),f.removeSync("./src/types/xxxxx.d.ts");let r=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(i=>s.includes(i)).length===0);f.writeFileSync("./src/main.tsx",r.join(`
`));}function le(){f.removeSync("./.git"),f.removeSync("./src/Microservices/XXXXX"),f.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Y(e){return a(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var Z=Se({color:"blue",indent:2});function ue(e,n){return a(this,null,function*(){let t=e.toLowerCase();Z.start("Scaffolding project...");let[,r]=yield Promise.all([Oe().clone("https://github.com/kuvamdazeus/adminkit-template",t),Me("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(s=>s.text())]);process.chdir(t),f.ensureDirSync(`${d}`),f.ensureDirSync(`${d}/webapp`),f.ensureDirSync(`${d}/server`),f.removeSync("./.git"),k("webapp",()=>{f.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${d}/webapp/XXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${d}/webapp/CreateXXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${d}/webapp/EditXXXXX.tsx`),f.copyFileSync("./src/types/xxxxx.d.ts",`${d}/webapp/xxxxx.d.ts`),f.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ce();}),k("server",()=>{f.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${d}/server/XXXXXRouter.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${d}/server/XXXXXController.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${d}/server/XXXXX.dto.ts`),f.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${d}/server/XXXXXEntity.ts`),f.writeFileSync("./.env",r),le();}),Z.succeed(`Created "${t}" successfully!`),n.onlyServer&&f.removeSync("webapp"),n.onlyWebapp&&f.removeSync("server"),Z.start("Installing dependencies..."),n.onlyServer||(yield F("webapp",()=>a(this,null,function*(){yield Y("yarn install");}))),n.onlyWebapp||(yield F("server",()=>a(this,null,function*(){yield Y("yarn install");}))),Z.succeed("Installed dependencies successfully!");})}var ve=e=>{let n=e.toLowerCase();return `/**
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

module.exports = screen;`};var Ie=Se({color:"blue",indent:2});function me(e){return a(this,null,function*(){let n=e.toLowerCase(),t=ve(n);Ie.start(`Creating config template for ${M.cyan(n)}`),k("root",()=>{let r=`kitconfig/resources/${n}.cjs`;f.ensureFileSync(r),f.writeFileSync(r,t);}),Ie.succeed(`Created config template for ${M.cyan(n)}`);})}var d=Je.homedir()+"/.adminkit",A=new Command;A.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");A.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ue);A.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(B);A.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(me);A.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(ae);A.command("sync").description('Add resources defined in "kitconfig" to the project').action(ie);A.parse();

export { d as adminKitPath };
