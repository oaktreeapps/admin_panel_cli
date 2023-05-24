#! /usr/bin/env node
import { Command } from 'commander';
import Ke from 'os';
import $ from 'fs-extra';
import D from 'chalk';
import Ce from 'ora';
import { z } from 'zod';
import we from 'simple-git';
import Fe from 'node-fetch';
import { exec } from 'child_process';

var u=(e,t,r)=>new Promise((n,i)=>{var c=X=>{try{y(r.next(X));}catch(d){i(d);}},o=X=>{try{y(r.throw(X));}catch(d){i(d);}},y=X=>X.done?n(X.value):Promise.resolve(X.value).then(c,o);y((r=r.apply(e,t)).next());});function M(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];$.removeSync("./.git"),$.removeSync("./src/screens/XXXXX"),$.removeSync("./src/types/xxxxx.d.ts");let n=$.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(c=>i.includes(c)).length===0);$.writeFileSync("./src/main.tsx",n.join(`
`));}var T=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},j=e=>e.charAt(0).toUpperCase()+e.slice(1);var E=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${T(e)} is required.</small>}`],me=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
  />
  ${e.required?E(e.name)[1]:""}
</div>`,Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,de=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,Pe=(e,t)=>`<div className="flex align-items-center">
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
`,$e=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${T(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>Pe(e,r)).join(`
`)}
  </div>
  ${e.required?E(e.name)[1]:""}
</div>
`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${T(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var R=e=>`<Column
  field="${e}"
  header="${j(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var V=Ce({color:"blue",indent:2});function re(e,t){return u(this,null,function*(){let r="",n="",i=[],c=[],o=[],y=[],X=["InputSwitch"];t.crudFields.forEach((s,I)=>{let w="",P="";switch(s.required&&!X.includes(s.type)&&i.push(s.name),s.type){case"InputText":s.tableDisplay&&o.push(R(s.name)),c.push(Xe(s)),w="string",P='""';break;case"InputTextarea":s.tableDisplay&&o.push(R(s.name)),c.push(ye(s)),w="string",P='""';break;case"InputNumber":s.tableDisplay&&o.push(R(s.name)),c.push(me(s)),w="number",P="0";break;case"Dropdown":s.tableDisplay&&o.push(R(s.name)),c.push(de(s)),y.push({fieldName:s.name,options:s.options||[]}),w="string",P='""';break;case"RadioButton":s.tableDisplay&&o.push(R(s.name)),c.push($e(s,s.options||[])),w="string",P='""';break;case"InputSwitch":s.tableDisplay&&o.push(R(s.name)),c.push(ge(s)),w="boolean",P="false";break}I===0&&(r+=`  id?: string;
`,n+=`  id: "",
`),r+=`  ${s.name}: ${w};
`,n+=`  ${s.name}: ${P},
`,I===t.crudFields.length-1&&(r+=`}
`,n+=`};
`);});let d=`./src/screens/${e}`,v=`${d}/${e}.tsx`,K=`${d}/Create${e}.tsx`,N=`${d}/Edit${e}.tsx`,J="./src/layout/items.json",z=$.readFileSync(`${m}/webapp/XXXXX.tsx`).toString(),ee=$.readFileSync(`${m}/webapp/CreateXXXXX.tsx`).toString(),te=$.readFileSync(`${m}/webapp/EditXXXXX.tsx`).toString(),ne=$.readFileSync(`${m}/webapp/xxxxx.d.ts`).toString(),p=z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),g=[];p.split(`
`).forEach(s=>{s.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(g.push(...o),g.push(s)):s.includes(`const initialState: ${e}Type = {};`)?(g.push(`const initialState: ${e}Type = {`),g.push(n)):g.push(s);}),$.writeFileSync(v,g.join(`
`));let C=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(s=>`entity.${s}`).join(" && ")}) {`),F=[];C.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:I,options:w})=>{F.push(`const ${I}Options = ${JSON.stringify(w,null,2)};
`);}),F.push(s)):s.includes(`const initialState: ${e}Type = {};`)?(F.push(`const initialState: ${e}Type = {`),F.push(n)):F.push(s);}),$.writeFileSync(K,F.join(`
`));let Ee=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(s=>`entity.${s}`).join(" && ")}) {`),L=[];Ee.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:I,options:w})=>{L.push(`const ${I}Options = ${JSON.stringify(w,null,2)};
`);}),L.push(s)):s.includes(`const initialState: ${e}Type = {};`)?(L.push(`const initialState: ${e}Type = {`),L.push(n)):L.push(s);}),$.writeFileSync(N,L.join(`
`));let ve=$.readFileSync(J),ue=JSON.parse(ve.toString());ue[0].items.push({label:e,to:`/${e.toLowerCase()}`}),$.writeFileSync(J,JSON.stringify(ue,null,2)),V.start(`Creating types/${e.toLowerCase()}.d.ts`);let Se=ne.replace(/XXXXX/g,e).split(`
`)[0]+`
`+r;$.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Se),V.succeed(`Created ${D.cyan(`types/${e}.d.ts`)}`),V.start(`Creating route for ${e}`);let be=$.readFileSync("./src/main.tsx").toString().split(`
`),Ie=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Te=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],H=[];H.push(...Te),be.forEach(s=>{s.includes("{/* --ROUTES-- */}")&&Ie.forEach(I=>{H.push(I);}),H.push(s);}),$.writeFileSync("./src/main.tsx",H.join(`
`)),V.succeed(`Created route: ${D.cyan(`/${e.toLowerCase()}`)}`);})}var he=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var W=(e=process.cwd())=>$.readdirSync(e).includes("kit.config.json"),S=(e,t)=>u(void 0,null,function*(){let r=process.cwd().split("/").at(-1),n;return r===e||W()&&e==="root"?n=yield t():W()?(process.chdir(e),n=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),n=yield t(),process.chdir(".."),process.chdir(r)),n}),O=(e,t)=>{let r=process.cwd().split("/").at(-1),n;return r===e||W()&&e==="root"?n=t():W()?(process.chdir(e),n=t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),n=t(),process.chdir(".."),process.chdir(r)),n};var k=()=>O("root",()=>{if(!$.existsSync("kit.config.json"))return null;let t=JSON.parse($.readFileSync("kit.config.json").toString());return he.parse(t)});var _=(e,t)=>{let r="";return t.filter(n=>!!n).forEach(n=>{r+=`const existing${j(n)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${n},
  _id: { $ne: id },
});

if (existing${j(n)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),r},q=(e,t)=>{let r=`const { ${t.join(", ")} } = input;
`;return t.filter(n=>!!n).forEach(n=>{r+=`
const existing${j(n)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${n},
  });

if (existing${j(n)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),r};var a={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function se(e,t){return u(this,null,function*(){let r=t.crudFields.filter(p=>p.unique).map(p=>p.name),n=[],i=[],c=[],o=[];t.crudFields.forEach(({name:p,type:g,required:C,unique:F})=>{n.push(`${p}: entity.${p},`),g==="InputText"||g==="InputTextarea"||g==="Dropdown"||g==="RadioButton"?(i.push(`${p}${C?"":"?"}: string;`),c.push(`${p}: { type: String, required: ${C}, unique: ${F} },`),o.push(`${p}: z.string()${C?".nonempty()":".optional()"},`)):g==="InputNumber"?(i.push(`${p}${C?"":"?"}: number;`),c.push(`${p}: { type: Number, required: ${C}, unique: ${F} },`),o.push(`${p}: z.number()${C?"":".optional()"},`)):g==="InputSwitch"&&(i.push(`${p}${C?"":"?"}: boolean;`),c.push(`${p}: { type: Boolean, required: ${C}, unique: ${F} },`),o.push(`${p}: z.boolean()${C?"":".optional()"},`));});let y=`./src/Microservices/${e}`,X=$.readFileSync(`${m}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),d=$.readFileSync(`${m}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),v=$.readFileSync(`${m}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),K=$.readFileSync(`${m}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(a.interface,i.join(`
`)).replace(a.schema,c.join(`
`)).replace(a.entity,n.join(`
`)).replace(a.zod,o.join(`
`)).replace(a.uniqueFields,r.join(", ")).replace(a.checkExistingCreateEntity,q(e,r)).replace(a.checkExistingUpdateEntity,_(e,r)),N=`${y}/${e}Controller.ts`,J=`${y}/${e}Router.ts`,z=`${y}/${e}.dto.ts`,ee=`./src/Database/Entities/${e}Entity.ts`;$.writeFileSync(N,X),$.writeFileSync(J,d),$.writeFileSync(z,v),$.writeFileSync(ee,K);let te=$.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${t.collectionName}",`:p).join(`
`);$.writeFileSync("./src/Database/CollectionNames.ts",te);let ne=$.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);$.writeFileSync("./src/Microservices/ApiRouter.ts",ne);})}var G=Ce({color:"blue",indent:2}),oe=Ce({color:"blue",indent:2});function B(e){return u(this,null,function*(){var i,c;let t=e.toLowerCase(),r=(c=(i=k())==null?void 0:i.screens)==null?void 0:c.find(o=>o.name.toLowerCase()===t.toLowerCase());if(!r){G.fail(`Screen ${D.cyan(t)} not found in config file`);return}let n=t.charAt(0).toUpperCase()+t.slice(1);yield S("webapp",()=>u(this,null,function*(){G.start(`Creating screen: ${D.cyan(n)}`);let o=`./src/screens/${n}`;if($.existsSync(o)){G.fail(`Screen ${D.cyan(n)} already exists`);return}let y=`${o}/${n}.tsx`,X=`${o}/Create${n}.tsx`,d=`${o}/Edit${n}.tsx`,v=`./src/types/${n.toLowerCase()}.d.ts`;$.createFileSync(y),$.createFileSync(X),$.createFileSync(d),$.createFileSync(v),yield re(n,r),G.succeed(`Created screen: ${D.cyan(n)}`);})),yield S("server",()=>u(this,null,function*(){oe.start(`Creating CRUD for: ${D.cyan(n)}`);let o=`./src/Microservices/${n}`;if($.existsSync(o)){oe.fail(`CRUD for ${D.cyan(n)} already exists`);return}let y=`${o}/${n}Controller.ts`,X=`${o}/${n}Router.ts`,d=`${o}/${n}.dto.ts`;$.createFileSync(y),$.createFileSync(X),$.createFileSync(d),yield se(n,r),oe.succeed(`Created CRUD for: ${D.cyan(n)}`);}));})}function ie(){return u(this,null,function*(){var e;M(),(e=k())==null||e.screens.map(t=>{B(t.name);});})}var Q=Ce({color:"blue",indent:2});function ce(e){return u(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);yield S("webapp",()=>u(this,null,function*(){Q.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,n=`./src/screens/${t}`,i="./src/layout/items.json",c=$.readFileSync(i),o=JSON.parse(c.toString());o[0].items=o[0].items.filter(v=>v.label.toLowerCase()!==t.toLowerCase()),$.writeFileSync(i,JSON.stringify(o,null,2)),$.removeSync(r),$.removeSync(n);let y=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],d=$.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>y.filter(K=>v.includes(K)).length===0);$.writeFileSync("./src/main.tsx",d.join(`
`)),Q.succeed(`Removed screen: ${e}`);})),yield S("server",()=>u(this,null,function*(){Q.start(`Removing CRUD: ${t}`);let r=`./src/Microservices/${t}`,n=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",c="./src/Microservices/ApiRouter.ts";$.removeSync(r),$.removeSync(n);let o=$.readFileSync(i).toString().split(`
`).filter(X=>!X.includes(`${t}Collection`)).join(`
`),y=$.readFileSync(c).toString().split(`
`).filter(X=>!X.includes(`${t}Router`)).join(`
`);$.writeFileSync(i,o),$.writeFileSync(c,y),Q.succeed(`Removed CRUD: ${t}`);}));})}function pe(){$.removeSync("./.git"),$.removeSync("./src/Microservices/XXXXX"),$.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Y(e){return u(this,null,function*(){return new Promise((t,r)=>{exec(e,()=>{t(null);});})})}var Z=Ce({color:"blue",indent:2});function le(e){return u(this,null,function*(){let t=e.toLowerCase();Z.start("Scaffolding project..."),$.ensureDirSync(t),process.chdir(t);let[,,r,n]=yield Promise.all([we().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),we().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),Fe("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/9bcab9214ae606f0eace15ffb18557914058f208/kit.config.json").then(i=>i.text()),Fe("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);$.writeFileSync("./kit.config.json",r),$.ensureDirSync(`${m}`),$.ensureDirSync(`${m}/webapp`),$.ensureDirSync(`${m}/server`),O("webapp",()=>{var i;$.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${m}/webapp/XXXXX.tsx`),$.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${m}/webapp/CreateXXXXX.tsx`),$.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${m}/webapp/EditXXXXX.tsx`),$.copyFileSync("./src/types/xxxxx.d.ts",`${m}/webapp/xxxxx.d.ts`),$.writeFileSync("./.env",`VITE_BASE_URL = "${(i=k())==null?void 0:i.backendUrl}"`),M();}),O("server",()=>{$.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${m}/server/XXXXXRouter.ts`),$.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${m}/server/XXXXXController.ts`),$.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${m}/server/XXXXX.dto.ts`),$.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${m}/server/XXXXXEntity.ts`),$.writeFileSync("./.env",n),pe();}),Z.succeed(`Created "${t}" successfully!`),Z.start("Installing dependencies..."),yield S("webapp",()=>u(this,null,function*(){yield Y("yarn install");})),yield S("server",()=>u(this,null,function*(){yield Y("yarn install");})),Z.succeed("Installed dependencies successfully!");})}var m=Ke.homedir()+"/.adminkit",U=new Command;U.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");U.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(le);U.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(B);U.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(ce);U.command("sync").description('Add screens defined in "kit.config.json" to the project').action(ie);U.parse();

export { m as adminKitPath };
