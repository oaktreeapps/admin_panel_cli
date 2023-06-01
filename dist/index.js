#! /usr/bin/env node
import { Command } from 'commander';
import _e from 'os';
import g from 'fs-extra';
import A from 'chalk';
import Se from 'ora';
import { z as z$1 } from 'zod';
import Ae from 'simple-git';
import ke from 'node-fetch';
import { exec } from 'child_process';

var m=(e,n,t)=>new Promise((s,o)=>{var i=d=>{try{a(t.next(d));}catch(y){o(y);}},u=d=>{try{a(t.throw(d));}catch(y){o(y);}},a=d=>d.done?s(d.value):Promise.resolve(d.value).then(i,u);a((t=t.apply(e,n)).next());});function B(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let s=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(o=>e.filter(i=>o.includes(i)).length===0);g.writeFileSync("./src/main.tsx",s.join(`
`));}var P=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},R=e=>e.charAt(0).toUpperCase()+e.slice(1);var S=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${P(e)} is required.</small>}`],ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${P(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
  />
  ${e.required?S(e.name)[1]:""}
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,De=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?S(e.name)[0]:""}
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
  ${e.required?S(e.name)[1]:""}
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
></Column>`;var Q=Se({color:"blue",indent:2}),b={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function ie(e,n){return m(this,null,function*(){let t="",s="",o=[],i=[],u=[],a=[],d=["InputSwitch"];n.crudFields.forEach((r,D)=>{let F="",L="";r.required&&!d.includes(r.type)&&o.push(r.name),r.type==="InputText"||r.type==="String"?(r.tableDisplay&&u.push(j(r.name)),i.push(ge(r)),F="string",L='""'):r.type==="InputTextarea"?(r.tableDisplay&&u.push(j(r.name)),i.push(fe(r)),F="string",L='""'):r.type==="InputNumber"||r.type==="Number"?(r.tableDisplay&&u.push(j(r.name)),i.push(ye(r)),F="number",L="0"):r.type==="Dropdown"?(r.tableDisplay&&u.push(j(r.name)),i.push($e(r)),a.push({fieldName:r.name,options:r.options||[]}),F="string",L='""'):r.type==="RadioButton"?(r.tableDisplay&&u.push(j(r.name)),i.push(he(r,r.options||[])),F="string",L='""'):(r.type==="InputSwitch"||r.type==="Boolean")&&(r.tableDisplay&&u.push(j(r.name)),i.push(xe(r)),F="boolean",L="false"),D===0&&(t+=`id?: string;
`,s+=`id: undefined,
`),t+=`${r.name}: ${F};
`,s+=`${r.name}: ${L},
`;});let y=`./src/screens/${e}`,v=`${y}/${e}.tsx`,E=`${y}/Create${e}.tsx`,O=`${y}/Edit${e}.tsx`,H="./src/layout/items.json",ne=g.readFileSync(`${X}/webapp/XXXXX.tsx`).toString(),re=g.readFileSync(`${X}/webapp/CreateXXXXX.tsx`).toString(),se=g.readFileSync(`${X}/webapp/EditXXXXX.tsx`).toString(),oe=g.readFileSync(`${X}/webapp/xxxxx.d.ts`).toString(),l=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(b.initialState,s),f=[];l.split(`
`).forEach(r=>{r.includes(b.tableColumns)&&f.push(...u),f.push(r);}),g.writeFileSync(v,f.join(`
`));let C=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(b.input,i.join(`
`)).replace(b.validate,`if (${o.map(r=>`entity.${r}`).join(" && ")}) `),w=[];C.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(a.forEach(({fieldName:D,options:F})=>{w.push(`const ${D}Options = ${JSON.stringify(F,null,2)};
`);}),w.push(r)):(r.includes(b.initialState)&&w.push(s),w.push(r));}),g.writeFileSync(E,w.join(`
`));let ve=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(b.input,i.join(`
`)).replace(b.validate,`if (${o.map(r=>`entity.${r}`).join(" && ")}) `),k=[];ve.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(a.forEach(({fieldName:D,options:F})=>{k.push(`const ${D}Options = ${JSON.stringify(F,null,2)};
`);}),k.push(r)):(r.includes(b.initialState)&&k.push(s),k.push(r));}),g.writeFileSync(O,k.join(`
`));let Ee=g.readFileSync(H),de=JSON.parse(Ee.toString());de[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(H,JSON.stringify(de,null,2)),Q.start(`Creating types/${e.toLowerCase()}.d.ts`);let be=oe.replace(/XXXXX/g,e).replace(b.interface,t);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,be),Q.succeed(`Created ${A.cyan(`types/${e}.d.ts`)}`),Q.start(`Creating route for ${e}`);let Ie=g.readFileSync("./src/main.tsx").toString().split(`
`),Te=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Pe=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],G=[];G.push(...Pe),Ie.forEach(r=>{r.includes("{/* --ROUTES-- */}")&&Te.forEach(D=>{G.push(D);}),G.push(r);}),g.writeFileSync("./src/main.tsx",G.join(`
`)),Q.succeed(`Created route: ${A.cyan(`/${e.toLowerCase()}`)}`);})}var Fe=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("String"),z$1.literal("InputSwitch"),z$1.literal("Boolean"),z$1.literal("InputNumber"),z$1.literal("Number")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var Y=(e=process.cwd())=>g.readdirSync(e).includes("kitconfig"),I=(e,n)=>m(void 0,null,function*(){let t=process.cwd().split("/").at(-1),s;return t===e||Y()&&e==="root"?s=yield n():Y()?(process.chdir(e),s=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),s=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),s=yield n(),process.chdir(".."),process.chdir(t)),s}),U=(e,n)=>{let t=process.cwd().split("/").at(-1),s;return t===e||Y()&&e==="root"?s=n():Y()?(process.chdir(e),s=n(),process.chdir("..")):e==="root"?(process.chdir(".."),s=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),s=n(),process.chdir(".."),process.chdir(t)),s},Z=()=>U("root",()=>{let e,n=g.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var K=()=>U("root",()=>{let e={backendUrl:"",screens:[]};if(!g.existsSync("kitconfig")||!g.existsSync("kitconfig/index.json"))return null;let n=g.readJSONSync("kitconfig/index.json");e.backendUrl=n.backendUrl,g.readdirSync("kitconfig/screens").map(o=>{let i=g.readJSONSync(`kitconfig/screens/${o}`);e.screens.push(i);});let s=Fe.safeParse(e);return s.success?s.data:(console.error("Config parsing error",s.error),null)});var J=(e,n)=>{let t="";return n.filter(s=>!!s).forEach(s=>{t+=`const existing${R(s)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${s},
  _id: { $ne: id },
});

if (existing${R(s)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${s}' already exists",
  };
}
`;}),t},V=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(s=>!!s).forEach(s=>{t+=`
const existing${R(s)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${s},
  });

if (existing${R(s)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${s}' already exists",
  };
}
`;}),t};var p={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ae(e,n){return m(this,null,function*(){let t=n.crudFields.filter(l=>l.unique).map(l=>l.name),s=[],o=[],i=[],u=[];n.crudFields.forEach(({name:l,type:f,required:C,unique:w})=>{s.push(`${l}: entity.${l},`),f==="InputText"||f==="InputTextarea"||f==="Dropdown"||f==="RadioButton"||f==="String"?(o.push(`${l}${C?"":"?"}: string;`),i.push(`${l}: { type: String, required: ${C}, unique: ${w} },`),u.push(`${l}: z.string()${C?".nonempty()":".optional()"},`)):f==="InputNumber"||f==="Number"?(o.push(`${l}${C?"":"?"}: number;`),i.push(`${l}: { type: Number, required: ${C}, unique: ${w} },`),u.push(`${l}: z.number()${C?"":".optional()"},`)):(f==="InputSwitch"||f==="Boolean")&&(o.push(`${l}${C?"":"?"}: boolean;`),i.push(`${l}: { type: Boolean, required: ${C}, unique: ${w} },`),u.push(`${l}: z.boolean()${C?"":".optional()"},`));});let a=`./src/Microservices/${e}`,d=g.readFileSync(`${X}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(p.interface,o.join(`
`)).replace(p.schema,i.join(`
`)).replace(p.entity,s.join(`
`)).replace(p.zod,u.join(`
`)).replace(p.uniqueFields,t.join(", ")).replace(p.checkExistingCreateEntity,V(e,t)).replace(p.checkExistingUpdateEntity,J(e,t)),y=g.readFileSync(`${X}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(p.interface,o.join(`
`)).replace(p.schema,i.join(`
`)).replace(p.entity,s.join(`
`)).replace(p.zod,u.join(`
`)).replace(p.uniqueFields,t.join(", ")).replace(p.checkExistingCreateEntity,V(e,t)).replace(p.checkExistingUpdateEntity,J(e,t)),v=g.readFileSync(`${X}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(p.interface,o.join(`
`)).replace(p.schema,i.join(`
`)).replace(p.entity,s.join(`
`)).replace(p.zod,u.join(`
`)).replace(p.uniqueFields,t.join(", ")).replace(p.checkExistingCreateEntity,V(e,t)).replace(p.checkExistingUpdateEntity,J(e,t)),E=g.readFileSync(`${X}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(p.interface,o.join(`
`)).replace(p.schema,i.join(`
`)).replace(p.entity,s.join(`
`)).replace(p.zod,u.join(`
`)).replace(p.uniqueFields,t.join(", ")).replace(p.checkExistingCreateEntity,V(e,t)).replace(p.checkExistingUpdateEntity,J(e,t)),O=`${a}/${e}Controller.ts`,H=`${a}/${e}Router.ts`,ne=`${a}/${e}.dto.ts`,re=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(O,d),g.writeFileSync(H,y),g.writeFileSync(ne,v),g.writeFileSync(re,E);let se=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(l=>l.includes("export const ")?l+`
${e}Collection: "${n.collectionName}",`:l).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",se);let oe=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(l=>l.includes("const ApiRouter =")?l+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:l.includes('import * as express from "express";')?l+`
import { ${e}Router } from "./${e}/${e}Router";`:l).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",oe);})}var N=Se({color:"blue",indent:2}),ce=Se({color:"blue",indent:2});function W(e){return m(this,null,function*(){var i,u;let n=Z(),t=e.toLowerCase(),s=(u=(i=K())==null?void 0:i.screens)==null?void 0:u.find(a=>a.name.toLowerCase()===t.toLowerCase());if(!s){N.fail(`Screen ${A.cyan(t)} not found in config file`);return}let o=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield I("webapp",()=>m(this,null,function*(){N.start(`Creating screen: ${A.cyan(o)}`);let a=`./src/screens/${o}`;if(g.existsSync(a)){N.fail(`Screen ${A.cyan(o)} already exists`);return}let d=`${a}/${o}.tsx`,y=`${a}/Create${o}.tsx`,v=`${a}/Edit${o}.tsx`,E=`./src/types/${o.toLowerCase()}.d.ts`;g.createFileSync(d),g.createFileSync(y),g.createFileSync(v),g.createFileSync(E),yield ie(o,s),N.succeed(`Created screen: ${A.cyan(o)}`);}))),(n==="both"||n==="server")&&(yield I("server",()=>m(this,null,function*(){ce.start(`Creating CRUD for: ${A.cyan(o)}`);let a=`./src/Microservices/${o}`;if(g.existsSync(a)){ce.fail(`CRUD for ${A.cyan(o)} already exists`);return}let d=`${a}/${o}Controller.ts`,y=`${a}/${o}Router.ts`,v=`${a}/${o}.dto.ts`;g.createFileSync(d),g.createFileSync(y),g.createFileSync(v),yield ae(o,s),ce.succeed(`Created CRUD for: ${A.cyan(o)}`);})));})}function pe(){return m(this,null,function*(){var e;B(),(e=K())==null||e.screens.map(n=>{W(n.name);});})}var z=Se({color:"blue",indent:2});function le(e){return m(this,null,function*(){let n=Z(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield I("webapp",()=>m(this,null,function*(){z.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,o=`./src/screens/${t}`,i="./src/layout/items.json",u=g.readFileSync(i),a=JSON.parse(u.toString());a[0].items=a[0].items.filter(E=>E.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(a,null,2)),g.removeSync(s),g.removeSync(o);let d=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],v=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(E=>d.filter(O=>E.includes(O)).length===0);g.writeFileSync("./src/main.tsx",v.join(`
`)),z.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield I("server",()=>m(this,null,function*(){z.start(`Removing CRUD: ${t}`);let s=`./src/Microservices/${t}`,o=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",u="./src/Microservices/ApiRouter.ts";g.removeSync(s),g.removeSync(o);let a=g.readFileSync(i).toString().split(`
`).filter(y=>!y.includes(`${t}Collection`)).join(`
`),d=g.readFileSync(u).toString().split(`
`).filter(y=>!y.includes(`${t}Router`)).join(`
`);g.writeFileSync(i,a),g.writeFileSync(u,d),z.succeed(`Removed CRUD: ${t}`);})));})}function me(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function ee(e){return m(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var te=Se({color:"blue",indent:2});function Xe(e,n){return m(this,null,function*(){let t=e.toLowerCase();te.start("Scaffolding project...");let[,s]=yield Promise.all([Ae().clone("https://github.com/kuvamdazeus/adminkit-template",t),ke("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(o=>o.text())]);process.chdir(t),g.ensureDirSync(`${X}`),g.ensureDirSync(`${X}/webapp`),g.ensureDirSync(`${X}/server`),g.removeSync("./.git"),U("webapp",()=>{var o;g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${X}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${X}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${X}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${X}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",`VITE_BASE_URL = "${(o=K())==null?void 0:o.backendUrl}"`),B();}),U("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${X}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${X}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${X}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${X}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",s),me();}),te.succeed(`Created "${t}" successfully!`),n.onlyServer&&g.removeSync("webapp"),n.onlyWebapp&&g.removeSync("server"),te.start("Installing dependencies..."),n.onlyServer||(yield I("webapp",()=>m(this,null,function*(){yield ee("yarn install");}))),n.onlyWebapp||(yield I("server",()=>m(this,null,function*(){yield ee("yarn install");}))),te.succeed("Installed dependencies successfully!");})}var X=_e.homedir()+"/.adminkit",_=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(Xe);_.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(W);_.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(le);_.command("sync").description('Add screens defined in "kitconfig" to the project').action(pe);_.parse();

export { X as adminKitPath };
