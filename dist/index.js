#! /usr/bin/env node
import { Command } from 'commander';
import Ke from 'os';
import g from 'fs-extra';
import L from 'chalk';
import Fe from 'ora';
import { z } from 'zod';
import we from 'simple-git';
import Ee from 'node-fetch';
import { exec } from 'child_process';

var u=(e,t,r)=>new Promise((n,i)=>{var a=X=>{try{d(r.next(X));}catch(y){i(y);}},o=X=>{try{d(r.throw(X));}catch(y){i(y);}},d=X=>X.done?n(X.value):Promise.resolve(X.value).then(a,o);d((r=r.apply(e,t)).next());});function M(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let n=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(a=>i.includes(a)).length===0);g.writeFileSync("./src/main.tsx",n.join(`
`));}var I=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},R=e=>e.charAt(0).toUpperCase()+e.slice(1);var E=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${I(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${I(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
  />
  ${e.required?E(e.name)[1]:""}
</div>`,de=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${I(e.name)}</p>
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
<p>${I(e.name)}</p>
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
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${I(e.name)}"
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,Re=(e,t)=>`<div className="flex align-items-center">
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
  <p>Choose ${I(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>Re(e,r)).join(`
`)}
  </div>
  ${e.required?E(e.name)[1]:""}
</div>
`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${I(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var j=e=>`<Column
  field="${e}"
  header="${R(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var W=Fe({color:"blue",indent:2}),D={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}"};function se(e,t){return u(this,null,function*(){let r="",n="",i=[],a=[],o=[],d=[],X=["InputSwitch"];t.crudFields.forEach((s,T)=>{let F="",P="";switch(s.required&&!X.includes(s.type)&&i.push(s.name),s.type){case"InputText":s.tableDisplay&&o.push(j(s.name)),a.push(de(s)),F="string",P='""';break;case"InputTextarea":s.tableDisplay&&o.push(j(s.name)),a.push(ye(s)),F="string",P='""';break;case"InputNumber":s.tableDisplay&&o.push(j(s.name)),a.push(Xe(s)),F="number",P="0";break;case"Dropdown":s.tableDisplay&&o.push(j(s.name)),a.push(ge(s)),d.push({fieldName:s.name,options:s.options||[]}),F="string",P='""';break;case"RadioButton":s.tableDisplay&&o.push(j(s.name)),a.push($e(s,s.options||[])),F="string",P='""';break;case"InputSwitch":s.tableDisplay&&o.push(j(s.name)),a.push(fe(s)),F="boolean",P="false";break}T===0&&(r+=`id?: string;
`,n+=`id: undefined,
`),r+=`${s.name}: ${F};
`,n+=`${s.name}: ${P},
`;});let y=`./src/screens/${e}`,S=`${y}/${e}.tsx`,K=`${y}/Create${e}.tsx`,z=`${y}/Edit${e}.tsx`,H="./src/layout/items.json",ee=g.readFileSync(`${m}/webapp/XXXXX.tsx`).toString(),te=g.readFileSync(`${m}/webapp/CreateXXXXX.tsx`).toString(),ne=g.readFileSync(`${m}/webapp/EditXXXXX.tsx`).toString(),re=g.readFileSync(`${m}/webapp/xxxxx.d.ts`).toString(),p=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.initialState,n),x=[];p.split(`
`).forEach(s=>{s.includes(D.tableColumns)&&x.push(...o),x.push(s);}),g.writeFileSync(S,x.join(`
`));let C=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.input,a.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(s=>`entity.${s}`).join(" && ")}) {`),w=[];C.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:T,options:F})=>{w.push(`const ${T}Options = ${JSON.stringify(F,null,2)};
`);}),w.push(s)):(s.includes(D.initialState)&&w.push(n),w.push(s));}),g.writeFileSync(K,w.join(`
`));let Se=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.input,a.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(s=>`entity.${s}`).join(" && ")}) {`),k=[];Se.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:T,options:F})=>{k.push(`const ${T}Options = ${JSON.stringify(F,null,2)};
`);}),k.push(s)):(s.includes(D.initialState)&&k.push(n),k.push(s));}),g.writeFileSync(z,k.join(`
`));let ve=g.readFileSync(H),me=JSON.parse(ve.toString());me[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(H,JSON.stringify(me,null,2)),W.start(`Creating types/${e.toLowerCase()}.d.ts`);let be=re.replace(/XXXXX/g,e).replace(D.interface,r);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,be),W.succeed(`Created ${L.cyan(`types/${e}.d.ts`)}`),W.start(`Creating route for ${e}`);let Ie=g.readFileSync("./src/main.tsx").toString().split(`
`),Te=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Pe=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],V=[];V.push(...Pe),Ie.forEach(s=>{s.includes("{/* --ROUTES-- */}")&&Te.forEach(T=>{V.push(T);}),V.push(s);}),g.writeFileSync("./src/main.tsx",V.join(`
`)),W.succeed(`Created route: ${L.cyan(`/${e.toLowerCase()}`)}`);})}var xe=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),collectionName:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),unique:z.boolean().optional().default(!1),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var G=(e=process.cwd())=>g.readdirSync(e).includes("kit.config.json"),v=(e,t)=>u(void 0,null,function*(){let r=process.cwd().split("/").at(-1),n;return r===e||G()&&e==="root"?n=yield t():G()?(process.chdir(e),n=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=yield t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),n=yield t(),process.chdir(".."),process.chdir(r)),n}),O=(e,t)=>{let r=process.cwd().split("/").at(-1),n;return r===e||G()&&e==="root"?n=t():G()?(process.chdir(e),n=t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),n=t(),process.chdir(".."),process.chdir(r)),n};var U=()=>O("root",()=>{if(!g.existsSync("kit.config.json"))return null;let t=JSON.parse(g.readFileSync("kit.config.json").toString());return xe.parse(t)});var q=(e,t)=>{let r="";return t.filter(n=>!!n).forEach(n=>{r+=`const existing${R(n)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${n},
  _id: { $ne: id },
});

if (existing${R(n)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),r},B=(e,t)=>{let r=`const { ${t.join(", ")} } = input;
`;return t.filter(n=>!!n).forEach(n=>{r+=`
const existing${R(n)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${n},
  });

if (existing${R(n)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${n}' already exists",
  };
}
`;}),r};var c={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function oe(e,t){return u(this,null,function*(){let r=t.crudFields.filter(p=>p.unique).map(p=>p.name),n=[],i=[],a=[],o=[];t.crudFields.forEach(({name:p,type:x,required:C,unique:w})=>{n.push(`${p}: entity.${p},`),x==="InputText"||x==="InputTextarea"||x==="Dropdown"||x==="RadioButton"?(i.push(`${p}${C?"":"?"}: string;`),a.push(`${p}: { type: String, required: ${C}, unique: ${w} },`),o.push(`${p}: z.string()${C?".nonempty()":".optional()"},`)):x==="InputNumber"?(i.push(`${p}${C?"":"?"}: number;`),a.push(`${p}: { type: Number, required: ${C}, unique: ${w} },`),o.push(`${p}: z.number()${C?"":".optional()"},`)):x==="InputSwitch"&&(i.push(`${p}${C?"":"?"}: boolean;`),a.push(`${p}: { type: Boolean, required: ${C}, unique: ${w} },`),o.push(`${p}: z.boolean()${C?"":".optional()"},`));});let d=`./src/Microservices/${e}`,X=g.readFileSync(`${m}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,i.join(`
`)).replace(c.schema,a.join(`
`)).replace(c.entity,n.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,B(e,r)).replace(c.checkExistingUpdateEntity,q(e,r)),y=g.readFileSync(`${m}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,i.join(`
`)).replace(c.schema,a.join(`
`)).replace(c.entity,n.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,B(e,r)).replace(c.checkExistingUpdateEntity,q(e,r)),S=g.readFileSync(`${m}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,i.join(`
`)).replace(c.schema,a.join(`
`)).replace(c.entity,n.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,B(e,r)).replace(c.checkExistingUpdateEntity,q(e,r)),K=g.readFileSync(`${m}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,i.join(`
`)).replace(c.schema,a.join(`
`)).replace(c.entity,n.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,B(e,r)).replace(c.checkExistingUpdateEntity,q(e,r)),z=`${d}/${e}Controller.ts`,H=`${d}/${e}Router.ts`,ee=`${d}/${e}.dto.ts`,te=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(z,X),g.writeFileSync(H,y),g.writeFileSync(ee,S),g.writeFileSync(te,K);let ne=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${t.collectionName}",`:p).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",ne);let re=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",re);})}var Q=Fe({color:"blue",indent:2}),ie=Fe({color:"blue",indent:2});function J(e){return u(this,null,function*(){var i,a;let t=e.toLowerCase(),r=(a=(i=U())==null?void 0:i.screens)==null?void 0:a.find(o=>o.name.toLowerCase()===t.toLowerCase());if(!r){Q.fail(`Screen ${L.cyan(t)} not found in config file`);return}let n=t.charAt(0).toUpperCase()+t.slice(1);yield v("webapp",()=>u(this,null,function*(){Q.start(`Creating screen: ${L.cyan(n)}`);let o=`./src/screens/${n}`;if(g.existsSync(o)){Q.fail(`Screen ${L.cyan(n)} already exists`);return}let d=`${o}/${n}.tsx`,X=`${o}/Create${n}.tsx`,y=`${o}/Edit${n}.tsx`,S=`./src/types/${n.toLowerCase()}.d.ts`;g.createFileSync(d),g.createFileSync(X),g.createFileSync(y),g.createFileSync(S),yield se(n,r),Q.succeed(`Created screen: ${L.cyan(n)}`);})),yield v("server",()=>u(this,null,function*(){ie.start(`Creating CRUD for: ${L.cyan(n)}`);let o=`./src/Microservices/${n}`;if(g.existsSync(o)){ie.fail(`CRUD for ${L.cyan(n)} already exists`);return}let d=`${o}/${n}Controller.ts`,X=`${o}/${n}Router.ts`,y=`${o}/${n}.dto.ts`;g.createFileSync(d),g.createFileSync(X),g.createFileSync(y),yield oe(n,r),ie.succeed(`Created CRUD for: ${L.cyan(n)}`);}));})}function ae(){return u(this,null,function*(){var e;M(),(e=U())==null||e.screens.map(t=>{J(t.name);});})}var Y=Fe({color:"blue",indent:2});function ce(e){return u(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);yield v("webapp",()=>u(this,null,function*(){Y.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,n=`./src/screens/${t}`,i="./src/layout/items.json",a=g.readFileSync(i),o=JSON.parse(a.toString());o[0].items=o[0].items.filter(S=>S.label.toLowerCase()!==t.toLowerCase()),g.writeFileSync(i,JSON.stringify(o,null,2)),g.removeSync(r),g.removeSync(n);let d=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],y=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(S=>d.filter(K=>S.includes(K)).length===0);g.writeFileSync("./src/main.tsx",y.join(`
`)),Y.succeed(`Removed screen: ${e}`);})),yield v("server",()=>u(this,null,function*(){Y.start(`Removing CRUD: ${t}`);let r=`./src/Microservices/${t}`,n=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";g.removeSync(r),g.removeSync(n);let o=g.readFileSync(i).toString().split(`
`).filter(X=>!X.includes(`${t}Collection`)).join(`
`),d=g.readFileSync(a).toString().split(`
`).filter(X=>!X.includes(`${t}Router`)).join(`
`);g.writeFileSync(i,o),g.writeFileSync(a,d),Y.succeed(`Removed CRUD: ${t}`);}));})}function le(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Z(e){return u(this,null,function*(){return new Promise((t,r)=>{exec(e,()=>{t(null);});})})}var N=Fe({color:"blue",indent:2});function ue(e){return u(this,null,function*(){let t=e.toLowerCase();N.start("Scaffolding project..."),g.ensureDirSync(t),process.chdir(t);let[,,r,n]=yield Promise.all([we().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),we().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),Ee("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/9bcab9214ae606f0eace15ffb18557914058f208/kit.config.json").then(i=>i.text()),Ee("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);g.writeFileSync("./kit.config.json",r),g.ensureDirSync(`${m}`),g.ensureDirSync(`${m}/webapp`),g.ensureDirSync(`${m}/server`),O("webapp",()=>{var i;g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${m}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${m}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${m}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${m}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",`VITE_BASE_URL = "${(i=U())==null?void 0:i.backendUrl}"`),M();}),O("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${m}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${m}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${m}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${m}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",n),le();}),N.succeed(`Created "${t}" successfully!`),N.start("Installing dependencies..."),yield v("webapp",()=>u(this,null,function*(){yield Z("yarn install");})),yield v("server",()=>u(this,null,function*(){yield Z("yarn install");})),N.succeed("Installed dependencies successfully!");})}var m=Ke.homedir()+"/.adminkit",A=new Command;A.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");A.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ue);A.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(J);A.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(ce);A.command("sync").description('Add screens defined in "kit.config.json" to the project').action(ae);A.parse();

export { m as adminKitPath };
