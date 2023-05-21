#! /usr/bin/env node
import { Command } from 'commander';
import ke from 'os';
import d from 'fs-extra';
import P from 'chalk';
import he from 'ora';
import { z } from 'zod';
import Ce from 'simple-git';
import we from 'node-fetch';

var y=(e,t,s)=>new Promise((n,i)=>{var c=X=>{try{m(s.next(X));}catch(g){i(g);}},o=X=>{try{m(s.throw(X));}catch(g){i(g);}},m=X=>X.done?n(X.value):Promise.resolve(X.value).then(c,o);m((s=s.apply(e,t)).next());});function U(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];d.removeSync("./.git"),d.removeSync("./yarn.lock"),d.removeSync("./src/screens/XXXXX"),d.removeSync("./src/types/xxxxx.d.ts");let n=d.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(c=>i.includes(c)).length===0);d.writeFileSync("./src/main.tsx",n.join(`
`));}var S=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},pe=e=>e.charAt(0).toUpperCase()+e.slice(1);var w=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${S(e)} is required.</small>}`],le=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${S(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?w(e.name)[0]:""}
  />
  ${e.required?w(e.name)[1]:""}
</div>`,ue=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${S(e.name)}</p>
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
</div>`,me=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${S(e.name)}</p>
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
</div>`,Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${S(e.name)}"
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
`,ye=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${S(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(s=>Ie(e,s)).join(`
`)}
  </div>
  ${e.required?w(e.name)[1]:""}
</div>
`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${S(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var I=e=>`<Column
  field="${e}"
  header="${pe(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var V=he({color:"blue",indent:2});function te(e,t){return y(this,null,function*(){let s="",n="",i=[],c=[],o=[],m=[],X=["InputSwitch"];t.crudFields.forEach((r,b)=>{let C="",T="";switch(r.required&&!X.includes(r.type)&&i.push(r.name),r.type){case"InputText":r.tableDisplay&&o.push(I(r.name)),c.push(ue(r)),C="string",T='""';break;case"InputTextarea":r.tableDisplay&&o.push(I(r.name)),c.push(me(r)),C="string",T='""';break;case"InputNumber":r.tableDisplay&&o.push(I(r.name)),c.push(le(r)),C="number",T="0";break;case"Dropdown":r.tableDisplay&&o.push(I(r.name)),c.push(Xe(r)),m.push({fieldName:r.name,options:r.options||[]}),C="string",T='""';break;case"RadioButton":r.tableDisplay&&o.push(I(r.name)),c.push(ye(r,r.options||[])),C="string",T='""';break;case"InputSwitch":r.tableDisplay&&o.push(I(r.name)),c.push(ge(r)),C="boolean",T="false";break}b===0&&(s+=`  id?: string;
`,n+=`  id: "",
`),s+=`  ${r.name}: ${C};
`,n+=`  ${r.name}: ${T},
`,b===t.crudFields.length-1&&(s+=`}
`,n+=`};
`);});let g=`./src/screens/${e}`,F=`${g}/${e}.tsx`,K=`${g}/Create${e}.tsx`,Y=`${g}/Edit${e}.tsx`,B="./src/layout/items.json",Z=d.readFileSync(`${u}/webapp/XXXXX.tsx`).toString(),N=d.readFileSync(`${u}/webapp/CreateXXXXX.tsx`).toString(),z=d.readFileSync(`${u}/webapp/EditXXXXX.tsx`).toString(),ee=d.readFileSync(`${u}/webapp/xxxxx.d.ts`).toString(),J=Z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),E=[];J.split(`
`).forEach(r=>{r.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(E.push(...o),E.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(E.push(`const initialState: ${e}Type = {`),E.push(n)):E.push(r);}),d.writeFileSync(F,E.join(`
`));let p=N.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(r=>`entity.${r}`).join(" && ")}) {`),$=[];p.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(m.forEach(({fieldName:b,options:C})=>{$.push(`const ${b}Options = ${JSON.stringify(C,null,2)};
`);}),$.push(r)):r.includes(`const initialState: ${e}Type = {};`)?($.push(`const initialState: ${e}Type = {`),$.push(n)):$.push(r);}),d.writeFileSync(K,$.join(`
`));let x=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(r=>`entity.${r}`).join(" && ")}) {`),j=[];x.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(m.forEach(({fieldName:b,options:C})=>{j.push(`const ${b}Options = ${JSON.stringify(C,null,2)};
`);}),j.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(j.push(`const initialState: ${e}Type = {`),j.push(n)):j.push(r);}),d.writeFileSync(Y,j.join(`
`));let Ee=d.readFileSync(B),ce=JSON.parse(Ee.toString());ce[0].items.push({label:e,to:`/${e.toLowerCase()}`}),d.writeFileSync(B,JSON.stringify(ce,null,2)),V.start(`Creating types/${e.toLowerCase()}.d.ts`);let ve=ee.replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;d.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ve),V.succeed(`Created ${P.cyan(`types/${e}.d.ts`)}`),V.start(`Creating route for ${e}`);let be=d.readFileSync("./src/main.tsx").toString().split(`
`),Se=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Te=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],H=[];H.push(...Te),be.forEach(r=>{r.includes("</Route>")&&Se.forEach(b=>{H.push(b);}),H.push(r);}),d.writeFileSync("./src/main.tsx",H.join(`
`)),V.succeed(`Created route: ${P.cyan(`/${e.toLowerCase()}`)}`);})}var $e=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var W=(e=process.cwd())=>d.readdirSync(e).includes("kit.config.json"),A=(e,t)=>y(void 0,null,function*(){let s=process.cwd().split("/").at(-1),n;return s===e||W()&&e==="root"?n=yield t():W()?(process.chdir(e),n=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),n=yield t(),process.chdir(".."),process.chdir(s)),n}),O=(e,t)=>{let s=process.cwd().split("/").at(-1),n;return s===e||W()&&e==="root"?n=t():W()?(process.chdir(e),n=t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=t(),process.chdir(s)):(process.chdir(".."),process.chdir(e),n=t(),process.chdir(".."),process.chdir(s)),n};var L=()=>O("root",()=>{if(!d.existsSync("kit.config.json"))return null;let t=JSON.parse(d.readFileSync("kit.config.json").toString());return $e.parse(t)});var M=(e,t)=>t?`const existingUpdateEntity: I${e}Entity | null =
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
}`:"";var a={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueField:"/*UNIQUE_FIELD*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ne(e,t){return y(this,null,function*(){var J,E;let s=((E=(J=t.crudFields.filter(p=>p.unique))==null?void 0:J[0])==null?void 0:E.name)||"",n=[],i=[],c=[],o=[];t.crudFields.forEach(({name:p,type:$,required:x})=>{n.push(`${p}: entity.${p},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"?(i.push(`${p}${x?"":"?"}: string;`),c.push(`${p}: { type: String, required: ${x} },`),o.push(`${p}: z.string()${x?".nonempty()":".optional()"},`)):$==="InputNumber"?(i.push(`${p}${x?"":"?"}: number;`),c.push(`${p}: { type: Number, required: ${x} },`),o.push(`${p}: z.number()${x?"":".optional()"},`)):$==="InputSwitch"&&(i.push(`${p}${x?"":"?"}: boolean;`),c.push(`${p}: { type: Boolean, required: ${x} },`),o.push(`${p}: z.boolean()${x?"":".optional()"},`));});let m=`./src/Microservices/${e}`,X=d.readFileSync(`${u}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,M(e,s)),g=d.readFileSync(`${u}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,M(e,s)),F=d.readFileSync(`${u}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,M(e,s)),K=d.readFileSync(`${u}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueField,s).replace(a.checkExistingCreateEntity,_(e,s)).replace(a.checkExistingUpdateEntity,M(e,s)),Y=`${m}/${e}Controller.ts`,B=`${m}/${e}Router.ts`,Z=`${m}/${e}.dto.ts`,N=`./src/Database/Entities/${e}Entity.ts`;d.writeFileSync(Y,X),d.writeFileSync(B,g),d.writeFileSync(Z,F),d.writeFileSync(N,K);let z=d.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${t.collectionName}",`:p).join(`
`);d.writeFileSync("./src/Database/CollectionNames.ts",z);let ee=d.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);d.writeFileSync("./src/Microservices/ApiRouter.ts",ee);})}var G=he({color:"blue",indent:2}),re=he({color:"blue",indent:2});function q(e){return y(this,null,function*(){var i,c;let t=e.toLowerCase(),s=(c=(i=L())==null?void 0:i.screens)==null?void 0:c.find(o=>o.name.toLowerCase()===t.toLowerCase());if(!s){G.fail(`Screen ${P.cyan(t)} not found in config file`);return}let n=t.charAt(0).toUpperCase()+t.slice(1);yield A("webapp",()=>y(this,null,function*(){G.start(`Creating screen: ${P.cyan(n)}`);let o=`./src/screens/${n}`;if(d.existsSync(o)){G.fail(`Screen ${P.cyan(n)} already exists`);return}let m=`${o}/${n}.tsx`,X=`${o}/Create${n}.tsx`,g=`${o}/Edit${n}.tsx`,F=`./src/types/${n.toLowerCase()}.d.ts`;d.createFileSync(m),d.createFileSync(X),d.createFileSync(g),d.createFileSync(F),yield te(n,s),G.succeed(`Created screen: ${P.cyan(n)}`);})),yield A("server",()=>y(this,null,function*(){re.start(`Creating CRUD for: ${P.cyan(n)}`);let o=`./src/Microservices/${n}`;if(d.existsSync(o)){re.fail(`CRUD for ${P.cyan(n)} already exists`);return}let m=`${o}/${n}Controller.ts`,X=`${o}/${n}Router.ts`,g=`${o}/${n}.dto.ts`;d.createFileSync(m),d.createFileSync(X),d.createFileSync(g),yield ne(n,s),re.succeed(`Created CRUD for: ${P.cyan(n)}`);}));})}function se(){return y(this,null,function*(){var e;U(),(e=L())==null||e.screens.map(t=>{q(t.name);});})}var xe=he({color:"blue",indent:2});function oe(e){A("webapp",()=>y(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);xe.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,n=`./src/screens/${t}`,i="./src/layout/items.json",c=d.readFileSync(i),o=JSON.parse(c.toString());o[0].items=o[0].items.filter(F=>F.label.toLowerCase()!==t.toLowerCase()),d.writeFileSync(i,JSON.stringify(o,null,2)),d.removeSync(s),d.removeSync(n);let m=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],g=d.readFileSync("./src/main.tsx").toString().split(`
`).filter(F=>m.filter(K=>F.includes(K)).length===0);d.writeFileSync("./src/main.tsx",g.join(`
`)),xe.succeed(`Removed screen: ${e}`);}));}function ie(){d.removeSync("./.git"),d.removeSync("./yarn.lock"),d.removeSync("./src/Microservices/XXXXX"),d.removeSync("./src/Database/Entities/XXXXXEntity.ts");}var Fe=he({color:"blue",indent:2});function ae(e){return y(this,null,function*(){let t=e.toLowerCase();Fe.start("Scaffolding project..."),d.ensureDirSync(t),process.chdir(t);let[,,s,n]=yield Promise.all([Ce().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),Ce().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),we("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/639870454bf9b2626ae81c663e91bc422f0f9932/kit.config.json").then(i=>i.text()),we("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);d.writeFileSync("./kit.config.json",s),d.ensureDirSync(`${u}`),d.ensureDirSync(`${u}/webapp`),d.ensureDirSync(`${u}/server`),O("webapp",()=>{var i;d.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${u}/webapp/XXXXX.tsx`),d.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${u}/webapp/CreateXXXXX.tsx`),d.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${u}/webapp/EditXXXXX.tsx`),d.copyFileSync("./src/types/xxxxx.d.ts",`${u}/webapp/xxxxx.d.ts`),d.writeFileSync("./.env",`VITE_BASE_URL = "${(i=L())==null?void 0:i.backendUrl}"`),U();}),O("server",()=>{d.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${u}/server/XXXXXRouter.ts`),d.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${u}/server/XXXXXController.ts`),d.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${u}/server/XXXXX.dto.ts`),d.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${u}/server/XXXXXEntity.ts`),d.writeFileSync("./.env",n),ie();}),Fe.succeed(`Created "${t}" successfully!`);})}var u=ke.homedir()+"/.adminkit",k=new Command;k.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");k.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ae);k.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(q);k.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(oe);k.command("sync").description('Add screens defined in "kit.config.json" to the project').action(se);k.parse();

export { u as adminKitPath };
