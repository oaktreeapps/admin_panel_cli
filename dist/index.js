#! /usr/bin/env node
import { Command } from 'commander';
import ke from 'os';
import g from 'fs-extra';
import R from 'chalk';
import xe from 'ora';
import { z } from 'zod';
import Ce from 'simple-git';
import Fe from 'node-fetch';

var y=(e,t,s)=>new Promise((n,i)=>{var c=m=>{try{X(s.next(m));}catch(d){i(d);}},o=m=>{try{X(s.throw(m));}catch(d){i(d);}},X=m=>m.done?n(m.value):Promise.resolve(m.value).then(c,o);X((s=s.apply(e,t)).next());});function A(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./yarn.lock"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let n=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(c=>i.includes(c)).length===0);g.writeFileSync("./src/main.tsx",n.join(`
`));}var T=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},le=e=>e.charAt(0).toUpperCase()+e.slice(1);var w=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${T(e)} is required.</small>}`],ue=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?w(e.name)[0]:""}
  />
  ${e.required?w(e.name)[1]:""}
</div>`,me=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
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
</div>`,Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
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
</div>`,ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${T(e.name)}"
  style={{ width: "100%" }}
  ${e.required?w(e.name)[0]:""}
/>
  ${e.required?w(e.name)[1]:""}
</div>`,Ie=(e,t)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${t.value}"}
        ${e.required?w(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${t.name}
      </p>
    </div>
`,de=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${T(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(s=>Ie(e,s)).join(`
`)}
  </div>
  ${e.required?w(e.name)[1]:""}
</div>
`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${T(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var P=e=>`<Column
  field="${e}"
  header="${le(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var V=xe({color:"blue",indent:2});function ne(e,t){return y(this,null,function*(){let s="",n="",i=[],c=[],o=[],X=[],m=["InputSwitch"];t.crudFields.forEach((r,b)=>{let F="",I="";switch(r.required&&!m.includes(r.type)&&i.push(r.name),r.type){case"InputText":r.tableDisplay&&o.push(P(r.name)),c.push(me(r)),F="string",I='""';break;case"InputTextarea":r.tableDisplay&&o.push(P(r.name)),c.push(Xe(r)),F="string",I='""';break;case"InputNumber":r.tableDisplay&&o.push(P(r.name)),c.push(ue(r)),F="number",I="0";break;case"Dropdown":r.tableDisplay&&o.push(P(r.name)),c.push(ye(r)),X.push({fieldName:r.name,options:r.options||[]}),F="string",I='""';break;case"RadioButton":r.tableDisplay&&o.push(P(r.name)),c.push(de(r,r.options||[])),F="string",I='""';break;case"InputSwitch":r.tableDisplay&&o.push(P(r.name)),c.push(ge(r)),F="boolean",I="false";break}b===0&&(s+=`  id?: string;
`,n+=`  id: "",
`),s+=`  ${r.name}: ${F};
`,n+=`  ${r.name}: ${I},
`,b===t.crudFields.length-1&&(s+=`}
`,n+=`};
`);});let d=`./src/screens/${e}`,E=`${d}/${e}.tsx`,K=`${d}/Create${e}.tsx`,Z=`${d}/Edit${e}.tsx`,B="./src/layout/items.json",N=g.readFileSync(`${u}/webapp/XXXXX.tsx`).toString(),z=g.readFileSync(`${u}/webapp/CreateXXXXX.tsx`).toString(),ee=g.readFileSync(`${u}/webapp/EditXXXXX.tsx`).toString(),te=g.readFileSync(`${u}/webapp/xxxxx.d.ts`).toString(),J=N.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),v=[];J.split(`
`).forEach(r=>{r.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(v.push(...o),v.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(v.push(`const initialState: ${e}Type = {`),v.push(n)):v.push(r);}),g.writeFileSync(E,v.join(`
`));let p=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(r=>`entity.${r}`).join(" && ")}) {`),$=[];p.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(X.forEach(({fieldName:b,options:F})=>{$.push(`const ${b}Options = ${JSON.stringify(F,null,2)};
`);}),$.push(r)):r.includes(`const initialState: ${e}Type = {};`)?($.push(`const initialState: ${e}Type = {`),$.push(n)):$.push(r);}),g.writeFileSync(K,$.join(`
`));let C=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(r=>`entity.${r}`).join(" && ")}) {`),D=[];C.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(X.forEach(({fieldName:b,options:F})=>{D.push(`const ${b}Options = ${JSON.stringify(F,null,2)};
`);}),D.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(D.push(`const initialState: ${e}Type = {`),D.push(n)):D.push(r);}),g.writeFileSync(Z,D.join(`
`));let Ee=g.readFileSync(B),pe=JSON.parse(Ee.toString());pe[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(B,JSON.stringify(pe,null,2)),V.start(`Creating types/${e.toLowerCase()}.d.ts`);let ve=te.replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ve),V.succeed(`Created ${R.cyan(`types/${e}.d.ts`)}`),V.start(`Creating route for ${e}`);let Se=g.readFileSync("./src/main.tsx").toString().split(`
`),be=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Te=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],H=[];H.push(...Te),Se.forEach(r=>{r.includes("</Route>")&&be.forEach(b=>{H.push(b);}),H.push(r);}),g.writeFileSync("./src/main.tsx",H.join(`
`)),V.succeed(`Created route: ${R.cyan(`/${e.toLowerCase()}`)}`);})}var fe=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var W=(e=process.cwd())=>g.readdirSync(e).includes("kit.config.json"),L=(e,t)=>y(void 0,null,function*(){let s=process.cwd().split("/").at(-1),n;return s===e||W()&&e==="root"?n=yield t():W()?(process.chdir(e),n=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),n=yield t(),process.chdir(".."),process.chdir(s)),n}),M=(e,t)=>{let s=process.cwd().split("/").at(-1),n;return s===e||W()&&e==="root"?n=t():W()?(process.chdir(e),n=t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),n=t(),process.chdir(".."),process.chdir(s)),n};var k=()=>M("root",()=>{if(!g.existsSync("kit.config.json"))return null;let t=JSON.parse(g.readFileSync("kit.config.json").toString());return fe.parse(t)});var O=(e,t)=>t?`const existingUpdateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
    _id: { $ne: id },
  });

  if (existingUpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}`:"",_=(e,t)=>t?`const { ${t} } = input;

const existingCreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
  });

if (existingCreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}`:"";var a={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueField:"/*UNIQUE_FIELD*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function re(e,t){return y(this,null,function*(){var J,v;let s=((v=(J=t.crudFields.filter(p=>p.unique))==null?void 0:J[0])==null?void 0:v.name)||"",n=[],i=[],c=[],o=[];t.crudFields.forEach(({name:p,type:$,required:C})=>{n.push(`${p}: entity.${p},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"?(i.push(`${p}${C?"":"?"}: string;`),c.push(`${p}: { type: String, required: ${C} },`),o.push(`${p}: z.string()${C?".nonempty()":".optional()"},`)):$==="InputNumber"?(i.push(`${p}${C?"":"?"}: number;`),c.push(`${p}: { type: Number, required: ${C} },`),o.push(`${p}: z.number()${C?"":".optional()"},`)):$==="InputSwitch"&&(i.push(`${p}${C?"":"?"}: boolean;`),c.push(`${p}: { type: Boolean, required: ${C} },`),o.push(`${p}: z.boolean()${C?"":".optional()"},`));});let X=`./src/Microservices/${e}`,m=g.readFileSync(`${u}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,O(e,s)),d=g.readFileSync(`${u}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,O(e,s)),E=g.readFileSync(`${u}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,O(e,s)),K=g.readFileSync(`${u}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,O(e,s)),Z=`${X}/${e}Controller.ts`,B=`${X}/${e}Router.ts`,N=`${X}/${e}.dto.ts`,z=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(Z,m),g.writeFileSync(B,d),g.writeFileSync(N,E),g.writeFileSync(z,K);let ee=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${t.collectionName}",`:p).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ee);let te=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",te);})}var G=xe({color:"blue",indent:2}),se=xe({color:"blue",indent:2});function q(e){return y(this,null,function*(){var i,c;let t=e.toLowerCase(),s=(c=(i=k())==null?void 0:i.screens)==null?void 0:c.find(o=>o.name.toLowerCase()===t.toLowerCase());if(!s){G.fail(`Screen ${R.cyan(t)} not found in config file`);return}let n=t.charAt(0).toUpperCase()+t.slice(1);yield L("webapp",()=>y(this,null,function*(){G.start(`Creating screen: ${R.cyan(n)}`);let o=`./src/screens/${n}`;if(g.existsSync(o)){G.fail(`Screen ${R.cyan(n)} already exists`);return}let X=`${o}/${n}.tsx`,m=`${o}/Create${n}.tsx`,d=`${o}/Edit${n}.tsx`,E=`./src/types/${n.toLowerCase()}.d.ts`;g.createFileSync(X),g.createFileSync(m),g.createFileSync(d),g.createFileSync(E),yield ne(n,s),G.succeed(`Created screen: ${R.cyan(n)}`);})),yield L("server",()=>y(this,null,function*(){se.start(`Creating CRUD for: ${R.cyan(n)}`);let o=`./src/Microservices/${n}`;if(g.existsSync(o)){se.fail(`CRUD for ${R.cyan(n)} already exists`);return}let X=`${o}/${n}Controller.ts`,m=`${o}/${n}Router.ts`,d=`${o}/${n}.dto.ts`;g.createFileSync(X),g.createFileSync(m),g.createFileSync(d),yield re(n,s),se.succeed(`Created CRUD for: ${R.cyan(n)}`);}));})}function oe(){return y(this,null,function*(){var e;A(),(e=k())==null||e.screens.map(t=>{q(t.name);});})}var Q=xe({color:"blue",indent:2});function ie(e){return y(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);yield L("webapp",()=>y(this,null,function*(){Q.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,n=`./src/screens/${t}`,i="./src/layout/items.json",c=g.readFileSync(i),o=JSON.parse(c.toString());o[0].items=o[0].items.filter(E=>E.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(o,null,2)),g.removeSync(s),g.removeSync(n);let X=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],d=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(E=>X.filter(K=>E.includes(K)).length===0);g.writeFileSync("./src/main.tsx",d.join(`
`)),Q.succeed(`Removed screen: ${e}`);})),yield L("server",()=>y(this,null,function*(){Q.start(`Removing CRUD: ${t}`);let s=`./src/Microservices/${t}`,n=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";g.removeSync(s),g.removeSync(n);let o=g.readFileSync(i).toString().split(`
`).filter(m=>!m.includes(`${t}Collection`)).join(`
`),X=g.readFileSync(c).toString().split(`
`).filter(m=>!m.includes(`/${t.toLowerCase()}`)).join(`
`);g.writeFileSync(i,o),g.writeFileSync(c,X),Q.succeed(`Removed CRUD: ${t}`);}));})}function ce(){g.removeSync("./.git"),g.removeSync("./yarn.lock"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}var we=xe({color:"blue",indent:2});function ae(e){return y(this,null,function*(){let t=e.toLowerCase();we.start("Scaffolding project..."),g.ensureDirSync(t),process.chdir(t);let[,,s,n]=yield Promise.all([Ce().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),Ce().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),Fe("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/639870454bf9b2626ae81c663e91bc422f0f9932/kit.config.json").then(i=>i.text()),Fe("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);g.writeFileSync("./kit.config.json",s),g.ensureDirSync(`${u}`),g.ensureDirSync(`${u}/webapp`),g.ensureDirSync(`${u}/server`),M("webapp",()=>{var i;g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${u}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${u}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${u}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${u}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",`VITE_BASE_URL = "${(i=k())==null?void 0:i.backendUrl}"`),A();}),M("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${u}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${u}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${u}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${u}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",n),ce();}),we.succeed(`Created "${t}" successfully!`);})}var u=ke.homedir()+"/.adminkit",U=new Command;U.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");U.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ae);U.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(q);U.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(ie);U.command("sync").description('Add screens defined in "kit.config.json" to the project').action(oe);U.parse();

export { u as adminKitPath };
