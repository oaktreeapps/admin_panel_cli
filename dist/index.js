#! /usr/bin/env node
import { Command } from 'commander';
import ke from 'os';
import g from 'fs-extra';
import R from 'chalk';
import he from 'ora';
import { z } from 'zod';
import xe from 'simple-git';
import Ce from 'node-fetch';

var y=(e,t,r)=>new Promise((n,i)=>{var c=m=>{try{X(r.next(m));}catch($){i($);}},o=m=>{try{X(r.throw(m));}catch($){i($);}},X=m=>m.done?n(m.value):Promise.resolve(m.value).then(c,o);X((r=r.apply(e,t)).next());});function M(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./yarn.lock"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let n=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(c=>i.includes(c)).length===0);g.writeFileSync("./src/main.tsx",n.join(`
`));}var T=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},P=e=>e.charAt(0).toUpperCase()+e.slice(1);var E=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${T(e)} is required.</small>}`],le=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
  />
  ${e.required?E(e.name)[1]:""}
</div>`,ue=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
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
</div>`,me=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
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
</div>`,Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${T(e.name)}"
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,Ie=(e,t)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${t.value}"}
        ${e.required?E(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${t.name}
      </p>
    </div>
`,ye=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${T(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>Ie(e,r)).join(`
`)}
  </div>
  ${e.required?E(e.name)[1]:""}
</div>
`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${T(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var j=e=>`<Column
  field="${e}"
  header="${P(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var V=he({color:"blue",indent:2});function ne(e,t){return y(this,null,function*(){let r="",n="",i=[],c=[],o=[],X=[],m=["InputSwitch"];t.crudFields.forEach((s,b)=>{let F="",I="";switch(s.required&&!m.includes(s.type)&&i.push(s.name),s.type){case"InputText":s.tableDisplay&&o.push(j(s.name)),c.push(ue(s)),F="string",I='""';break;case"InputTextarea":s.tableDisplay&&o.push(j(s.name)),c.push(me(s)),F="string",I='""';break;case"InputNumber":s.tableDisplay&&o.push(j(s.name)),c.push(le(s)),F="number",I="0";break;case"Dropdown":s.tableDisplay&&o.push(j(s.name)),c.push(Xe(s)),X.push({fieldName:s.name,options:s.options||[]}),F="string",I='""';break;case"RadioButton":s.tableDisplay&&o.push(j(s.name)),c.push(ye(s,s.options||[])),F="string",I='""';break;case"InputSwitch":s.tableDisplay&&o.push(j(s.name)),c.push($e(s)),F="boolean",I="false";break}b===0&&(r+=`  id?: string;
`,n+=`  id: "",
`),r+=`  ${s.name}: ${F};
`,n+=`  ${s.name}: ${I},
`,b===t.crudFields.length-1&&(r+=`}
`,n+=`};
`);});let $=`./src/screens/${e}`,v=`${$}/${e}.tsx`,A=`${$}/Create${e}.tsx`,Z=`${$}/Edit${e}.tsx`,J="./src/layout/items.json",N=g.readFileSync(`${u}/webapp/XXXXX.tsx`).toString(),z=g.readFileSync(`${u}/webapp/CreateXXXXX.tsx`).toString(),ee=g.readFileSync(`${u}/webapp/EditXXXXX.tsx`).toString(),te=g.readFileSync(`${u}/webapp/xxxxx.d.ts`).toString(),p=N.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),d=[];p.split(`
`).forEach(s=>{s.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(d.push(...o),d.push(s)):s.includes(`const initialState: ${e}Type = {};`)?(d.push(`const initialState: ${e}Type = {`),d.push(n)):d.push(s);}),g.writeFileSync(v,d.join(`
`));let C=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(s=>`entity.${s}`).join(" && ")}) {`),w=[];C.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(X.forEach(({fieldName:b,options:F})=>{w.push(`const ${b}Options = ${JSON.stringify(F,null,2)};
`);}),w.push(s)):s.includes(`const initialState: ${e}Type = {};`)?(w.push(`const initialState: ${e}Type = {`),w.push(n)):w.push(s);}),g.writeFileSync(A,w.join(`
`));let we=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(s=>`entity.${s}`).join(" && ")}) {`),D=[];we.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(X.forEach(({fieldName:b,options:F})=>{D.push(`const ${b}Options = ${JSON.stringify(F,null,2)};
`);}),D.push(s)):s.includes(`const initialState: ${e}Type = {};`)?(D.push(`const initialState: ${e}Type = {`),D.push(n)):D.push(s);}),g.writeFileSync(Z,D.join(`
`));let Ee=g.readFileSync(J),pe=JSON.parse(Ee.toString());pe[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(J,JSON.stringify(pe,null,2)),V.start(`Creating types/${e.toLowerCase()}.d.ts`);let ve=te.replace(/XXXXX/g,e).split(`
`)[0]+`
`+r;g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ve),V.succeed(`Created ${R.cyan(`types/${e}.d.ts`)}`),V.start(`Creating route for ${e}`);let Se=g.readFileSync("./src/main.tsx").toString().split(`
`),be=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Te=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],H=[];H.push(...Te),Se.forEach(s=>{s.includes("</Route>")&&be.forEach(b=>{H.push(b);}),H.push(s);}),g.writeFileSync("./src/main.tsx",H.join(`
`)),V.succeed(`Created route: ${R.cyan(`/${e.toLowerCase()}`)}`);})}var de=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var W=(e=process.cwd())=>g.readdirSync(e).includes("kit.config.json"),k=(e,t)=>y(void 0,null,function*(){let r=process.cwd().split("/").at(-1),n;return r===e||W()&&e==="root"?n=yield t():W()?(process.chdir(e),n=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),n=yield t(),process.chdir(".."),process.chdir(r)),n}),O=(e,t)=>{let r=process.cwd().split("/").at(-1),n;return r===e||W()&&e==="root"?n=t():W()?(process.chdir(e),n=t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),n=t(),process.chdir(".."),process.chdir(r)),n};var U=()=>O("root",()=>{if(!g.existsSync("kit.config.json"))return null;let t=JSON.parse(g.readFileSync("kit.config.json").toString());return de.parse(t)});var _=(e,t)=>{let r="";return t.filter(n=>!!n).forEach(n=>{r+=`const existing${P(n)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${n},
  _id: { $ne: id },
});

if (existing${P(n)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),r},q=(e,t)=>{let r=`const { ${t.join(", ")} } = input;
`;return t.filter(n=>!!n).forEach(n=>{r+=`
const existing${P(n)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${n},
  });

if (existing${P(n)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),r};var a={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function re(e,t){return y(this,null,function*(){let r=t.crudFields.filter(p=>p.unique).map(p=>p.name),n=[],i=[],c=[],o=[];t.crudFields.forEach(({name:p,type:d,required:C,unique:w})=>{n.push(`${p}: entity.${p},`),d==="InputText"||d==="InputTextarea"||d==="Dropdown"||d==="RadioButton"?(i.push(`${p}${C?"":"?"}: string;`),c.push(`${p}: { type: String, required: ${C}, unique: ${w} },`),o.push(`${p}: z.string()${C?".nonempty()":".optional()"},`)):d==="InputNumber"?(i.push(`${p}${C?"":"?"}: number;`),c.push(`${p}: { type: Number, required: ${C}, unique: ${w} },`),o.push(`${p}: z.number()${C?"":".optional()"},`)):d==="InputSwitch"&&(i.push(`${p}${C?"":"?"}: boolean;`),c.push(`${p}: { type: Boolean, required: ${C}, unique: ${w} },`),o.push(`${p}: z.boolean()${C?"":".optional()"},`));});let X=`./src/Microservices/${e}`,m=g.readFileSync(`${u}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),$=g.readFileSync(`${u}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),v=g.readFileSync(`${u}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),A=g.readFileSync(`${u}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),Z=`${X}/${e}Controller.ts`,J=`${X}/${e}Router.ts`,N=`${X}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(Z,m),g.writeFileSync(J,$),g.writeFileSync(N,v),g.writeFileSync(z,A);let ee=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${t.collectionName}",`:p).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var G=he({color:"blue",indent:2}),se=he({color:"blue",indent:2});function B(e){return y(this,null,function*(){var i,c;let t=e.toLowerCase(),r=(c=(i=U())==null?void 0:i.screens)==null?void 0:c.find(o=>o.name.toLowerCase()===t.toLowerCase());if(!r){G.fail(`Screen ${R.cyan(t)} not found in config file`);return}let n=t.charAt(0).toUpperCase()+t.slice(1);yield k("webapp",()=>y(this,null,function*(){G.start(`Creating screen: ${R.cyan(n)}`);let o=`./src/screens/${n}`;if(g.existsSync(o)){G.fail(`Screen ${R.cyan(n)} already exists`);return}let X=`${o}/${n}.tsx`,m=`${o}/Create${n}.tsx`,$=`${o}/Edit${n}.tsx`,v=`./src/types/${n.toLowerCase()}.d.ts`;g.createFileSync(X),g.createFileSync(m),g.createFileSync($),g.createFileSync(v),yield ne(n,r),G.succeed(`Created screen: ${R.cyan(n)}`);})),yield k("server",()=>y(this,null,function*(){se.start(`Creating CRUD for: ${R.cyan(n)}`);let o=`./src/Microservices/${n}`;if(g.existsSync(o)){se.fail(`CRUD for ${R.cyan(n)} already exists`);return}let X=`${o}/${n}Controller.ts`,m=`${o}/${n}Router.ts`,$=`${o}/${n}.dto.ts`;g.createFileSync(X),g.createFileSync(m),g.createFileSync($),yield re(n,r),se.succeed(`Created CRUD for: ${R.cyan(n)}`);}));})}function oe(){return y(this,null,function*(){var e;M(),(e=U())==null||e.screens.map(t=>{B(t.name);});})}var Q=he({color:"blue",indent:2});function ie(e){return y(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);yield k("webapp",()=>y(this,null,function*(){Q.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,n=`./src/screens/${t}`,i="./src/layout/items.json",c=g.readFileSync(i),o=JSON.parse(c.toString());o[0].items=o[0].items.filter(v=>v.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(o,null,2)),g.removeSync(r),g.removeSync(n);let X=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],$=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>X.filter(A=>v.includes(A)).length===0);g.writeFileSync("./src/main.tsx",$.join(`
`)),Q.succeed(`Removed screen: ${e}`);})),yield k("server",()=>y(this,null,function*(){Q.start(`Removing CRUD: ${t}`);let r=`./src/Microservices/${t}`,n=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";g.removeSync(r),g.removeSync(n);let o=g.readFileSync(i).toString().split(`
`).filter(m=>!m.includes(`${t}Collection`)).join(`
`),X=g.readFileSync(c).toString().split(`
`).filter(m=>!m.includes(`${t}Router`)).join(`
`);g.writeFileSync(i,o),g.writeFileSync(c,X),Q.succeed(`Removed CRUD: ${t}`);}));})}function ce(){g.removeSync("./.git"),g.removeSync("./yarn.lock"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}var Fe=he({color:"blue",indent:2});function ae(e){return y(this,null,function*(){let t=e.toLowerCase();Fe.start("Scaffolding project..."),g.ensureDirSync(t),process.chdir(t);let[,,r,n]=yield Promise.all([xe().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),xe().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),Ce("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/639870454bf9b2626ae81c663e91bc422f0f9932/kit.config.json").then(i=>i.text()),Ce("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);g.writeFileSync("./kit.config.json",r),g.ensureDirSync(`${u}`),g.ensureDirSync(`${u}/webapp`),g.ensureDirSync(`${u}/server`),O("webapp",()=>{var i;g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${u}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${u}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${u}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${u}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",`VITE_BASE_URL = "${(i=U())==null?void 0:i.backendUrl}"`),M();}),O("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${u}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${u}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${u}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${u}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",n),ce();}),Fe.succeed(`Created "${t}" successfully!`);})}var u=ke.homedir()+"/.adminkit",K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ae);K.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(B);K.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(ie);K.command("sync").description('Add screens defined in "kit.config.json" to the project').action(oe);K.parse();

export { u as adminKitPath };
