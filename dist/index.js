#! /usr/bin/env node
import { Command } from 'commander';
import _e from 'os';
import g from 'fs-extra';
import O from 'chalk';
import De from 'path';
import { z } from 'zod';
import Fe from 'ora';
import Ae from 'simple-git';
import Ke from 'node-fetch';
import { exec } from 'child_process';

var p=(e,s,t)=>new Promise((n,o)=>{var i=y=>{try{c(t.next(y));}catch(d){o(d);}},a=y=>{try{c(t.throw(y));}catch(d){o(d);}},c=y=>y.done?n(y.value):Promise.resolve(y.value).then(i,a);c((t=t.apply(e,s)).next());});var P=e=>{let s=e.replace(/([A-Z])/g," $1");return s.charAt(0).toUpperCase()+s.slice(1)},L=e=>e.charAt(0).toUpperCase()+e.slice(1);var S=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${P(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
  />
  ${e.required?S(e.name)[1]:""}
</div>`,ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
/>
  ${e.required?S(e.name)[1]:""}
</div>`,de=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?S(e.name)[1]:""}
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${P(e.name)}"
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
/>
  ${e.required?S(e.name)[1]:""}
</div>`,Pe=(e,s)=>`<div className="flex align-items-center">
      <RadioButton
        value="${s.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${s.value}"}
        ${e.required?S(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${s.name}
      </p>
    </div>
`,fe=(e,s)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${P(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${s.map(t=>Pe(e,t)).join(`
`)}
  </div>
  ${e.required?S(e.name)[1]:""}
</div>
`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${P(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var j=e=>`<Column
  field="${e}"
  header="${L(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var I={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ne(e,s){return p(this,null,function*(){let t="",n="",o=[],i=[],a=[],c=[],y=["InputSwitch"];s.crudFields.forEach((r,D)=>{let C="",R="";r.required&&!y.includes(r.type)&&o.push(r.name),r.type==="InputText"||r.type==="String"?(r.tableDisplay&&a.push(j(r.name)),i.push(ye(r)),C="string",R='""'):r.type==="InputTextarea"?(r.tableDisplay&&a.push(j(r.name)),i.push(de(r)),C="string",R='""'):r.type==="InputNumber"||r.type==="Number"?(r.tableDisplay&&a.push(j(r.name)),i.push(Xe(r)),C="number",R="0"):r.type==="Dropdown"?(r.tableDisplay&&a.push(j(r.name)),i.push(ge(r)),c.push({fieldName:r.name,options:r.options||[]}),C="string",R='""'):r.type==="RadioButton"?(r.tableDisplay&&a.push(j(r.name)),i.push(fe(r,r.options||[])),C="string",R='""'):(r.type==="InputSwitch"||r.type==="Boolean")&&(r.tableDisplay&&a.push(j(r.name)),i.push(he(r)),C="boolean",R="false"),D===0&&(t+=`id?: string;
`,n+=`id: undefined,
`),t+=`${r.name}: ${C};
`,n+=`${r.name}: ${R},
`;});let d=`./src/screens/${e}`,E=`${d}/${e}.tsx`,b=`${d}/Create${e}.tsx`,k=`${d}/Edit${e}.tsx`,q="./src/layout/items.json",N=g.readFileSync(`${X}/webapp/XXXXX.tsx`).toString(),z=g.readFileSync(`${X}/webapp/CreateXXXXX.tsx`).toString(),ee=g.readFileSync(`${X}/webapp/EditXXXXX.tsx`).toString(),te=g.readFileSync(`${X}/webapp/xxxxx.d.ts`).toString(),u=N.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(I.initialState,n),f=[];u.split(`
`).forEach(r=>{r.includes(I.tableColumns)&&f.push(...a),f.push(r);}),g.writeFileSync(E,f.join(`
`));let w=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(I.input,i.join(`
`)).replace(I.validate,`if (${o.map(r=>`entity.${r}`).join(" && ")}) `),v=[];w.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(c.forEach(({fieldName:D,options:C})=>{v.push(`const ${D}Options = ${JSON.stringify(C,null,2)};
`);}),v.push(r)):(r.includes(I.initialState)&&v.push(n),v.push(r));}),g.writeFileSync(b,v.join(`
`));let ve=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(I.input,i.join(`
`)).replace(I.validate,`if (${o.map(r=>`entity.${r}`).join(" && ")}) `),A=[];ve.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(c.forEach(({fieldName:D,options:C})=>{A.push(`const ${D}Options = ${JSON.stringify(C,null,2)};
`);}),A.push(r)):(r.includes(I.initialState)&&A.push(n),A.push(r));}),g.writeFileSync(k,A.join(`
`));let Se=g.readFileSync(q),me=JSON.parse(Se.toString());me[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(q,JSON.stringify(me,null,2));let Ee=te.replace(/XXXXX/g,e).replace(I.interface,t);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Ee);let be=g.readFileSync("./src/main.tsx").toString().split(`
`),Ie=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Te=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],V=[];V.push(...Te),be.forEach(r=>{r.includes("{/* --ROUTES-- */}")&&Ie.forEach(D=>{V.push(D);}),V.push(r);}),g.writeFileSync("./src/main.tsx",V.join(`
`));})}var re=z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("RadioButton"),z.literal("Dropdown"),z.literal("String"),z.literal("InputSwitch"),z.literal("Boolean"),z.literal("InputNumber"),z.literal("Number")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}),$e=z.object({screens:z.array(re)});var J=(e=process.cwd())=>g.readdirSync(e).includes("kitconfig"),F=(e,s)=>p(void 0,null,function*(){let t=process.cwd().split("/").at(-1),n;return t===e||J()&&e==="root"?n=yield s():J()?(process.chdir(e),n=yield s(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield s(),process.chdir(t)):(process.chdir(".."),process.chdir(e),n=yield s(),process.chdir(".."),process.chdir(t)),n}),W=(e,s)=>{let t=process.cwd().split("/").at(-1),n;return t===e||J()&&e==="root"?n=s():J()?(process.chdir(e),n=s(),process.chdir("..")):e==="root"?(process.chdir(".."),n=s(),process.chdir(t)):(process.chdir(".."),process.chdir(e),n=s(),process.chdir(".."),process.chdir(t)),n},H=()=>W("root",()=>{let e,s=g.readdirSync(".");return s.includes("webapp")&&s.includes("server")?e="both":s.includes("webapp")?e="webapp":s.includes("server")?e="server":e="INVALID_STATE",e});var G=()=>p(void 0,null,function*(){return F("root",()=>p(void 0,null,function*(){let e={screens:[]};if(!g.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let s=De.join(process.cwd(),"kitconfig"),t=g.readdirSync("kitconfig/screens");yield Promise.all(t.map(o=>p(void 0,null,function*(){let i=yield import(`${s}/screens/${o}`),a=re.safeParse(i.default);a.success?e.screens.push(a.data):console.log(`Couldn't parse screen '${o}':`,a.error.format());})));let n=$e.safeParse(e);return n.success?n.data:(console.error("Config parsing error",n.error),null)}))});var U=(e,s)=>{let t="";return s.filter(n=>!!n).forEach(n=>{t+=`const existing${L(n)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${n},
  _id: { $ne: id },
});

if (existing${L(n)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),t},_=(e,s)=>{let t=`const { ${s.join(", ")} } = input;
`;return s.filter(n=>!!n).forEach(n=>{t+=`
const existing${L(n)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${n},
  });

if (existing${L(n)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),t};var l={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function se(e,s){return p(this,null,function*(){let t=s.crudFields.filter(u=>u.unique).map(u=>u.name),n=[],o=[],i=[],a=[];s.crudFields.forEach(({name:u,type:f,required:w,unique:v})=>{n.push(`${u}: entity.${u},`),f==="InputText"||f==="InputTextarea"||f==="Dropdown"||f==="RadioButton"||f==="String"?(o.push(`${u}${w?"":"?"}: string;`),i.push(`${u}: { type: String, required: ${w}, unique: ${v} },`),a.push(`${u}: z.string()${w?".nonempty()":".optional().nullable()"},`)):f==="InputNumber"||f==="Number"?(o.push(`${u}${w?"":"?"}: number;`),i.push(`${u}: { type: Number, required: ${w}, unique: ${v} },`),a.push(`${u}: z.number()${w?"":".optional().nullable()"},`)):(f==="InputSwitch"||f==="Boolean")&&(o.push(`${u}${w?"":"?"}: boolean;`),i.push(`${u}: { type: Boolean, required: ${w}, unique: ${v} },`),a.push(`${u}: z.boolean()${w?"":".optional().nullable()"},`));});let c=`./src/Microservices/${e}`,y=g.readFileSync(`${X}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,o.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,a.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,_(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),d=g.readFileSync(`${X}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,o.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,a.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,_(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),E=g.readFileSync(`${X}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,o.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,a.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,_(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),b=g.readFileSync(`${X}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(l.interface,o.join(`
`)).replace(l.schema,i.join(`
`)).replace(l.entity,n.join(`
`)).replace(l.zod,a.join(`
`)).replace(l.uniqueFields,t.join(", ")).replace(l.checkExistingCreateEntity,_(e,t)).replace(l.checkExistingUpdateEntity,U(e,t)),k=`${c}/${e}Controller.ts`,q=`${c}/${e}Router.ts`,N=`${c}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(k,y),g.writeFileSync(q,d),g.writeFileSync(N,E),g.writeFileSync(z,b);let ee=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(u=>u.includes("export const ")?u+`
${e}Collection: "${s.collectionName}",`:u).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(u=>u.includes("const ApiRouter =")?u+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:u.includes('import * as express from "express";')?u+`
import { ${e}Router } from "./${e}/${e}Router";`:u).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var oe=Fe({color:"blue",indent:2}),Ce=Fe({color:"blue",indent:2});function M(e){return p(this,null,function*(){var i,a;let s=H(),t=e.toLowerCase(),n=(a=(i=yield G())==null?void 0:i.screens)==null?void 0:a.find(c=>c.name.toLowerCase()===t.toLowerCase());if(!n){oe.fail(`Screen ${O.cyan(t)} not found in config file`);return}let o=t.charAt(0).toUpperCase()+t.slice(1);(s==="both"||s==="webapp")&&(yield F("webapp",()=>p(this,null,function*(){let c=`./src/screens/${o}`;if(g.existsSync(c))return;oe.start(`Creating screen: ${O.cyan(o)}`);let y=`${c}/${o}.tsx`,d=`${c}/Create${o}.tsx`,E=`${c}/Edit${o}.tsx`,b=`./src/types/${o.toLowerCase()}.d.ts`;g.createFileSync(y),g.createFileSync(d),g.createFileSync(E),g.createFileSync(b),yield ne(o,n),oe.succeed(`Created screen: ${O.cyan(o)}`);}))),(s==="both"||s==="server")&&(yield F("server",()=>p(this,null,function*(){let c=`./src/Microservices/${o}`;if(g.existsSync(c))return;Ce.start(`Creating CRUD for: ${O.cyan(o)}`);let y=`${c}/${o}Controller.ts`,d=`${c}/${o}Router.ts`,E=`${c}/${o}.dto.ts`;g.createFileSync(y),g.createFileSync(d),g.createFileSync(E),yield se(o,n),Ce.succeed(`Created CRUD for: ${O.cyan(o)}`);})));})}var Re=()=>new Promise((e,s)=>p(void 0,null,function*(){var n;let t=(n=yield G())==null?void 0:n.screens;t==null||t.map((o,i)=>p(void 0,null,function*(){yield M(o.name),t.length===i+1&&e();}));}));function ie(){return p(this,null,function*(){yield Re();})}var Q=Fe({color:"blue",indent:2});function ae(e){return p(this,null,function*(){let s=H(),t=e.charAt(0).toUpperCase()+e.slice(1);(s==="both"||s==="webapp")&&(yield F("webapp",()=>p(this,null,function*(){let n=`./src/types/${e}.d.ts`,o=`./src/screens/${t}`,i="./src/layout/items.json";if(!g.existsSync(o)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let a=g.readFileSync(i),c=JSON.parse(a.toString());c[0].items=c[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(c,null,2)),g.removeSync(n),g.removeSync(o);let y=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],E=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>y.filter(k=>b.includes(k)).length===0);g.writeFileSync("./src/main.tsx",E.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(s==="both"||s==="server")&&(yield F("server",()=>p(this,null,function*(){let n=`./src/Microservices/${t}`,o=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!g.existsSync(n)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),g.removeSync(n),g.removeSync(o);let c=g.readFileSync(i).toString().split(`
`).filter(d=>!d.includes(`${t}Collection`)).join(`
`),y=g.readFileSync(a).toString().split(`
`).filter(d=>!d.includes(`${t}Router`)).join(`
`);g.writeFileSync(i,c),g.writeFileSync(a,y),Q.succeed(`Removed CRUD: ${t}`);})));})}function ce(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let n=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(o=>e.filter(i=>o.includes(i)).length===0);g.writeFileSync("./src/main.tsx",n.join(`
`));}function le(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Y(e){return p(this,null,function*(){return new Promise((s,t)=>{exec(e,()=>{s(null);});})})}var Z=Fe({color:"blue",indent:2});function ue(e,s){return p(this,null,function*(){let t=e.toLowerCase();Z.start("Scaffolding project...");let[,n]=yield Promise.all([Ae().clone("https://github.com/kuvamdazeus/adminkit-template",t),Ke("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(o=>o.text())]);process.chdir(t),g.ensureDirSync(`${X}`),g.ensureDirSync(`${X}/webapp`),g.ensureDirSync(`${X}/server`),g.removeSync("./.git"),W("webapp",()=>{g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${X}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${X}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${X}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${X}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ce();}),W("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${X}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${X}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${X}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${X}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",n),le();}),Z.succeed(`Created "${t}" successfully!`),s.onlyServer&&g.removeSync("webapp"),s.onlyWebapp&&g.removeSync("server"),Z.start("Installing dependencies..."),s.onlyServer||(yield F("webapp",()=>p(this,null,function*(){yield Y("yarn install");}))),s.onlyWebapp||(yield F("server",()=>p(this,null,function*(){yield Y("yarn install");}))),Z.succeed("Installed dependencies successfully!");})}var X=_e.homedir()+"/.adminkit",K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ue);K.command("add").description("Add a new screen").argument("<screenName>","Name of the screen").action(M);K.command("remove").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(ae);K.command("sync").description('Add screens defined in "kitconfig" to the project').action(ie);K.parse();

export { X as adminKitPath };
