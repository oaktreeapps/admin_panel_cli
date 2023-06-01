#! /usr/bin/env node
import { Command } from 'commander';
import _e from 'os';
import f from 'fs-extra';
import k from 'chalk';
import ve from 'ora';
import { z as z$1 } from 'zod';
import ke from 'simple-git';
import Ae from 'node-fetch';
import { exec } from 'child_process';

var m=(e,n,t)=>new Promise((r,o)=>{var i=d=>{try{a(t.next(d));}catch(y){o(y);}},l=d=>{try{a(t.throw(d));}catch(y){o(y);}},a=d=>d.done?r(d.value):Promise.resolve(d.value).then(i,l);a((t=t.apply(e,n)).next());});function q(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];f.removeSync("./.git"),f.removeSync("./src/screens/XXXXX"),f.removeSync("./src/types/xxxxx.d.ts");let r=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(o=>e.filter(i=>o.includes(i)).length===0);f.writeFileSync("./src/main.tsx",r.join(`
`));}var P=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},R=e=>e.charAt(0).toUpperCase()+e.slice(1);var v=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${P(e)} is required.</small>}`],ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?v(e.name)[0]:""}
  />
  ${e.required?v(e.name)[1]:""}
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
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
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
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
  placeholder="Select a ${P(e.name)}"
  style={{ width: "100%" }}
  ${e.required?v(e.name)[0]:""}
/>
  ${e.required?v(e.name)[1]:""}
</div>`,De=(e,n)=>`<div className="flex align-items-center">
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
`,he=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${P(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(t=>De(e,t)).join(`
`)}
  </div>
  ${e.required?v(e.name)[1]:""}
</div>
`,xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${P(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var j=e=>`<Column
  field="${e}"
  header="${R(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var Q=ve({color:"blue",indent:2}),b={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ie(e,n){return m(this,null,function*(){let t="",r="",o=[],i=[],l=[],a=[],d=["InputSwitch"];n.crudFields.forEach((s,D)=>{let F="",L="";switch(s.required&&!d.includes(s.type)&&o.push(s.name),s.type){case"InputText":s.tableDisplay&&l.push(j(s.name)),i.push(fe(s)),F="string",L='""';break;case"InputTextarea":s.tableDisplay&&l.push(j(s.name)),i.push(ge(s)),F="string",L='""';break;case"InputNumber":s.tableDisplay&&l.push(j(s.name)),i.push(ye(s)),F="number",L="0";break;case"Dropdown":s.tableDisplay&&l.push(j(s.name)),i.push($e(s)),a.push({fieldName:s.name,options:s.options||[]}),F="string",L='""';break;case"RadioButton":s.tableDisplay&&l.push(j(s.name)),i.push(he(s,s.options||[])),F="string",L='""';break;case"InputSwitch":s.tableDisplay&&l.push(j(s.name)),i.push(xe(s)),F="boolean",L="false";break}D===0&&(t+=`id?: string;
`,r+=`id: undefined,
`),t+=`${s.name}: ${F};
`,r+=`${s.name}: ${L},
`;});let y=`./src/screens/${e}`,S=`${y}/${e}.tsx`,E=`${y}/Create${e}.tsx`,O=`${y}/Edit${e}.tsx`,H="./src/layout/items.json",ne=f.readFileSync(`${X}/webapp/XXXXX.tsx`).toString(),re=f.readFileSync(`${X}/webapp/CreateXXXXX.tsx`).toString(),se=f.readFileSync(`${X}/webapp/EditXXXXX.tsx`).toString(),oe=f.readFileSync(`${X}/webapp/xxxxx.d.ts`).toString(),p=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(b.initialState,r),x=[];p.split(`
`).forEach(s=>{s.includes(b.tableColumns)&&x.push(...l),x.push(s);}),f.writeFileSync(S,x.join(`
`));let C=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(b.input,i.join(`
`)).replace(b.validate,`if (${o.map(s=>`entity.${s}`).join(" && ")}) `),w=[];C.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(a.forEach(({fieldName:D,options:F})=>{w.push(`const ${D}Options = ${JSON.stringify(F,null,2)};
`);}),w.push(s)):(s.includes(b.initialState)&&w.push(r),w.push(s));}),f.writeFileSync(E,w.join(`
`));let Se=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(b.input,i.join(`
`)).replace(b.validate,`if (${o.map(s=>`entity.${s}`).join(" && ")}) `),A=[];Se.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(a.forEach(({fieldName:D,options:F})=>{A.push(`const ${D}Options = ${JSON.stringify(F,null,2)};
`);}),A.push(s)):(s.includes(b.initialState)&&A.push(r),A.push(s));}),f.writeFileSync(O,A.join(`
`));let Ee=f.readFileSync(H),de=JSON.parse(Ee.toString());de[0].items.push({label:e,to:`/${e.toLowerCase()}`}),f.writeFileSync(H,JSON.stringify(de,null,2)),Q.start(`Creating types/${e.toLowerCase()}.d.ts`);let be=oe.replace(/XXXXX/g,e).replace(b.interface,t);f.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,be),Q.succeed(`Created ${k.cyan(`types/${e}.d.ts`)}`),Q.start(`Creating route for ${e}`);let Ie=f.readFileSync("./src/main.tsx").toString().split(`
`),Te=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Pe=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],G=[];G.push(...Pe),Ie.forEach(s=>{s.includes("{/* --ROUTES-- */}")&&Te.forEach(D=>{G.push(D);}),G.push(s);}),f.writeFileSync("./src/main.tsx",G.join(`
`)),Q.succeed(`Created route: ${k.cyan(`/${e.toLowerCase()}`)}`);})}var Fe=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("InputNumber"),z$1.literal("Dropdown"),z$1.literal("RadioButton"),z$1.literal("InputSwitch")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var Y=(e=process.cwd())=>f.readdirSync(e).includes("kitconfig"),I=(e,n)=>m(void 0,null,function*(){let t=process.cwd().split("/").at(-1),r;return t===e||Y()&&e==="root"?r=yield n():Y()?(process.chdir(e),r=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=yield n(),process.chdir(".."),process.chdir(t)),r}),U=(e,n)=>{let t=process.cwd().split("/").at(-1),r;return t===e||Y()&&e==="root"?r=n():Y()?(process.chdir(e),r=n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=n(),process.chdir(".."),process.chdir(t)),r},Z=()=>U("root",()=>{let e,n=f.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var K=()=>U("root",()=>{let e={backendUrl:"",screens:[]};if(!f.existsSync("kitconfig")||!f.existsSync("kitconfig/index.json"))return null;let n=f.readJSONSync("kitconfig/index.json");e.backendUrl=n.backendUrl,f.readdirSync("kitconfig/screens").map(o=>{let i=f.readJSONSync(`kitconfig/screens/${o}`);e.screens.push(i);});let r=Fe.safeParse(e);return r.success?r.data:(console.error("Config parsing error",r.error),null)});var J=(e,n)=>{let t="";return n.filter(r=>!!r).forEach(r=>{t+=`const existing${R(r)}UpdateEntity: I${e}Entity | null =
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
`;}),t},V=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(r=>!!r).forEach(r=>{t+=`
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
`;}),t};var c={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ae(e,n){return m(this,null,function*(){let t=n.crudFields.filter(p=>p.unique).map(p=>p.name),r=[],o=[],i=[],l=[];n.crudFields.forEach(({name:p,type:x,required:C,unique:w})=>{r.push(`${p}: entity.${p},`),x==="InputText"||x==="InputTextarea"||x==="Dropdown"||x==="RadioButton"?(o.push(`${p}${C?"":"?"}: string;`),i.push(`${p}: { type: String, required: ${C}, unique: ${w} },`),l.push(`${p}: z.string()${C?".nonempty()":".optional()"},`)):x==="InputNumber"?(o.push(`${p}${C?"":"?"}: number;`),i.push(`${p}: { type: Number, required: ${C}, unique: ${w} },`),l.push(`${p}: z.number()${C?"":".optional()"},`)):x==="InputSwitch"&&(o.push(`${p}${C?"":"?"}: boolean;`),i.push(`${p}: { type: Boolean, required: ${C}, unique: ${w} },`),l.push(`${p}: z.boolean()${C?"":".optional()"},`));});let a=`./src/Microservices/${e}`,d=f.readFileSync(`${X}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,o.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,r.join(`
`)).replace(c.zod,l.join(`
`)).replace(c.uniqueFields,t.join(", ")).replace(c.checkExistingCreateEntity,V(e,t)).replace(c.checkExistingUpdateEntity,J(e,t)),y=f.readFileSync(`${X}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,o.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,r.join(`
`)).replace(c.zod,l.join(`
`)).replace(c.uniqueFields,t.join(", ")).replace(c.checkExistingCreateEntity,V(e,t)).replace(c.checkExistingUpdateEntity,J(e,t)),S=f.readFileSync(`${X}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,o.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,r.join(`
`)).replace(c.zod,l.join(`
`)).replace(c.uniqueFields,t.join(", ")).replace(c.checkExistingCreateEntity,V(e,t)).replace(c.checkExistingUpdateEntity,J(e,t)),E=f.readFileSync(`${X}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,o.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,r.join(`
`)).replace(c.zod,l.join(`
`)).replace(c.uniqueFields,t.join(", ")).replace(c.checkExistingCreateEntity,V(e,t)).replace(c.checkExistingUpdateEntity,J(e,t)),O=`${a}/${e}Controller.ts`,H=`${a}/${e}Router.ts`,ne=`${a}/${e}.dto.ts`,re=`./src/Database/Entities/${e}Entity.ts`;f.writeFileSync(O,d),f.writeFileSync(H,y),f.writeFileSync(ne,S),f.writeFileSync(re,E);let se=f.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${n.collectionName}",`:p).join(`
`);f.writeFileSync("./src/Database/CollectionNames.ts",se);let oe=f.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);f.writeFileSync("./src/Microservices/ApiRouter.ts",oe);})}var N=ve({color:"blue",indent:2}),ce=ve({color:"blue",indent:2});function W(e){return m(this,null,function*(){var i,l;let n=Z(),t=e.toLowerCase(),r=(l=(i=K())==null?void 0:i.screens)==null?void 0:l.find(a=>a.name.toLowerCase()===t.toLowerCase());if(!r){N.fail(`Screen ${k.cyan(t)} not found in config file`);return}let o=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield I("webapp",()=>m(this,null,function*(){N.start(`Creating screen: ${k.cyan(o)}`);let a=`./src/screens/${o}`;if(f.existsSync(a)){N.fail(`Screen ${k.cyan(o)} already exists`);return}let d=`${a}/${o}.tsx`,y=`${a}/Create${o}.tsx`,S=`${a}/Edit${o}.tsx`,E=`./src/types/${o.toLowerCase()}.d.ts`;f.createFileSync(d),f.createFileSync(y),f.createFileSync(S),f.createFileSync(E),yield ie(o,r),N.succeed(`Created screen: ${k.cyan(o)}`);}))),(n==="both"||n==="server")&&(yield I("server",()=>m(this,null,function*(){ce.start(`Creating CRUD for: ${k.cyan(o)}`);let a=`./src/Microservices/${o}`;if(f.existsSync(a)){ce.fail(`CRUD for ${k.cyan(o)} already exists`);return}let d=`${a}/${o}Controller.ts`,y=`${a}/${o}Router.ts`,S=`${a}/${o}.dto.ts`;f.createFileSync(d),f.createFileSync(y),f.createFileSync(S),yield ae(o,r),ce.succeed(`Created CRUD for: ${k.cyan(o)}`);})));})}function pe(){return m(this,null,function*(){var e;q(),(e=K())==null||e.screens.map(n=>{W(n.name);});})}var z=ve({color:"blue",indent:2});function le(e){return m(this,null,function*(){let n=Z(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield I("webapp",()=>m(this,null,function*(){z.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,o=`./src/screens/${t}`,i="./src/layout/items.json",l=f.readFileSync(i),a=JSON.parse(l.toString());a[0].items=a[0].items.filter(E=>E.label.toLowerCase()!==t.toLowerCase()),f.writeFileSync(i,JSON.stringify(a,null,2)),f.removeSync(r),f.removeSync(o);let d=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],S=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(E=>d.filter(O=>E.includes(O)).length===0);f.writeFileSync("./src/main.tsx",S.join(`
`)),z.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield I("server",()=>m(this,null,function*(){z.start(`Removing CRUD: ${t}`);let r=`./src/Microservices/${t}`,o=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",l="./src/Microservices/ApiRouter.ts";f.removeSync(r),f.removeSync(o);let a=f.readFileSync(i).toString().split(`
`).filter(y=>!y.includes(`${t}Collection`)).join(`
`),d=f.readFileSync(l).toString().split(`
`).filter(y=>!y.includes(`${t}Router`)).join(`
`);f.writeFileSync(i,a),f.writeFileSync(l,d),z.succeed(`Removed CRUD: ${t}`);})));})}function me(){f.removeSync("./.git"),f.removeSync("./src/Microservices/XXXXX"),f.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function ee(e){return m(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var te=ve({color:"blue",indent:2});function Xe(e,n){return m(this,null,function*(){let t=e.toLowerCase();te.start("Scaffolding project...");let[,r]=yield Promise.all([ke().clone("https://github.com/kuvamdazeus/adminkit-template",t),Ae("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(o=>o.text())]);process.chdir(t),f.ensureDirSync(`${X}`),f.ensureDirSync(`${X}/webapp`),f.ensureDirSync(`${X}/server`),f.removeSync("./.git"),U("webapp",()=>{var o;f.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${X}/webapp/XXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${X}/webapp/CreateXXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${X}/webapp/EditXXXXX.tsx`),f.copyFileSync("./src/types/xxxxx.d.ts",`${X}/webapp/xxxxx.d.ts`),f.writeFileSync("./.env",`VITE_BASE_URL = "${(o=K())==null?void 0:o.backendUrl}"`),q();}),U("server",()=>{f.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${X}/server/XXXXXRouter.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${X}/server/XXXXXController.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${X}/server/XXXXX.dto.ts`),f.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${X}/server/XXXXXEntity.ts`),f.writeFileSync("./.env",r),me();}),te.succeed(`Created "${t}" successfully!`),n.onlyServer&&f.removeSync("webapp"),n.onlyWebapp&&f.removeSync("server"),te.start("Installing dependencies..."),n.onlyServer||(yield I("webapp",()=>m(this,null,function*(){yield ee("yarn install");}))),n.onlyWebapp||(yield I("server",()=>m(this,null,function*(){yield ee("yarn install");}))),te.succeed("Installed dependencies successfully!");})}var X=_e.homedir()+"/.adminkit",_=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(Xe);_.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(W);_.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(le);_.command("sync").description('Add screens defined in "kitconfig" to the project').action(pe);_.parse();

export { X as adminKitPath };
