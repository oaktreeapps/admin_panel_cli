#! /usr/bin/env node
import { Command } from 'commander';
import Le from 'os';
import y from 'fs-extra';
import T from 'chalk';
import de from 'ora';
import { z as z$1 } from 'zod';
import ye from 'simple-git';
import ge from 'node-fetch';

var X=(e,t,o)=>new Promise((n,s)=>{var c=u=>{try{d(o.next(u));}catch($){s($);}},i=u=>{try{d(o.throw(u));}catch($){s($);}},d=u=>u.done?n(u.value):Promise.resolve(u.value).then(c,i);d((o=o.apply(e,t)).next());});function K(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];y.removeSync("./.git"),y.removeSync("./yarn.lock"),y.removeSync("./src/screens/XXXXX"),y.removeSync("./src/types/xxxxx.d.ts");let n=y.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(c=>s.includes(c)).length===0);y.writeFileSync("./src/main.tsx",n.join(`
`));}var S=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},oe=e=>e.charAt(0).toUpperCase()+e.slice(1);var x=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${S(e)} is required.</small>}`],se=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${S(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
  />
  ${e.required?x(e.name)[1]:""}
</div>`,ie=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${S(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
/>
  ${e.required?x(e.name)[1]:""}
</div>`,ce=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${S(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?x(e.name)[1]:""}
</div>`,ae=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${S(e.name)}"
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
/>
  ${e.required?x(e.name)[1]:""}
</div>`,be=(e,t)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${t.value}"}
        ${e.required?x(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${t.name}
      </p>
    </div>
`,pe=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${S(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(o=>be(e,o)).join(`
`)}
  </div>
  ${e.required?x(e.name)[1]:""}
</div>
`,le=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${S(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var P=e=>`<Column
  field="${e}"
  header="${oe(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var B=de({color:"blue",indent:2});function Y(e,t){return X(this,null,function*(){let o="",n="",s=[],c=[],i=[],d=[],u=["InputSwitch"];t.crudFields.forEach((r,v)=>{let f="",b="";switch(r.required&&!u.includes(r.type)&&s.push(r.name),r.type){case"InputText":r.tableDisplay&&i.push(P(r.name)),c.push(ie(r)),f="string",b='""';break;case"InputTextarea":r.tableDisplay&&i.push(P(r.name)),c.push(ce(r)),f="string",b='""';break;case"InputNumber":r.tableDisplay&&i.push(P(r.name)),c.push(se(r)),f="number",b="0";break;case"Dropdown":r.tableDisplay&&i.push(P(r.name)),c.push(ae(r)),d.push({fieldName:r.name,options:r.options||[]}),f="string",b='""';break;case"RadioButton":r.tableDisplay&&i.push(P(r.name)),c.push(pe(r,r.options||[])),f="string",b='""';break;case"InputSwitch":r.tableDisplay&&i.push(P(r.name)),c.push(le(r)),f="boolean",b="false";break}v===0&&(o+=`  id?: string;
`,n+=`  id: "",
`),o+=`  ${r.name}: ${f};
`,n+=`  ${r.name}: ${b},
`,v===t.crudFields.length-1&&(o+=`}
`,n+=`};
`);});let $=`./src/screens/${e}`,F=`${$}/${e}.tsx`,k=`${$}/Create${e}.tsx`,W=`${$}/Edit${e}.tsx`,U="./src/layout/items.json",Z=y.readFileSync(`${l}/webapp/XXXXX.tsx`).toString(),G=y.readFileSync(`${l}/webapp/CreateXXXXX.tsx`).toString(),H=y.readFileSync(`${l}/webapp/EditXXXXX.tsx`).toString(),p=y.readFileSync(`${l}/webapp/xxxxx.d.ts`).toString(),C=Z.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),m=[];C.split(`
`).forEach(r=>{r.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(m.push(...i),m.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(m.push(`const initialState: ${e}Type = {`),m.push(n)):m.push(r);}),y.writeFileSync(F,m.join(`
`));let fe=G.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${s.map(r=>`entity.${r}`).join(" && ")}) {`),I=[];fe.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:v,options:f})=>{I.push(`const ${v}Options = ${JSON.stringify(f,null,2)};
`);}),I.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(I.push(`const initialState: ${e}Type = {`),I.push(n)):I.push(r);}),y.writeFileSync(k,I.join(`
`));let xe=H.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,c.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${s.map(r=>`entity.${r}`).join(" && ")}) {`),E=[];xe.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:v,options:f})=>{E.push(`const ${v}Options = ${JSON.stringify(f,null,2)};
`);}),E.push(r)):r.includes(`const initialState: ${e}Type = {};`)?(E.push(`const initialState: ${e}Type = {`),E.push(n)):E.push(r);}),y.writeFileSync(W,E.join(`
`));let Fe=y.readFileSync(U),re=JSON.parse(Fe.toString());re[0].items.push({label:e,to:`/${e.toLowerCase()}`}),y.writeFileSync(U,JSON.stringify(re,null,2)),B.start(`Creating types/${e.toLowerCase()}.d.ts`);let we=p.replace(/XXXXX/g,e).split(`
`)[0]+`
`+o;y.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,we),B.succeed(`Created ${T.cyan(`types/${e}.d.ts`)}`),B.start(`Creating route for ${e}`);let Ce=y.readFileSync("./src/main.tsx").toString().split(`
`),ve=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Se=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],q=[];q.push(...Se),Ce.forEach(r=>{r.includes("</Route>")&&ve.forEach(v=>{q.push(v);}),q.push(r);}),y.writeFileSync("./src/main.tsx",q.join(`
`)),B.succeed(`Created route: ${T.cyan(`/${e.toLowerCase()}`)}`);})}var me=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("InputNumber"),z$1.literal("Dropdown"),z$1.literal("RadioButton"),z$1.literal("InputSwitch")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var J=(e=process.cwd())=>y.readdirSync(e).includes("kit.config.json"),A=(e,t)=>X(void 0,null,function*(){let o=process.cwd().split("/").at(-1),n;return o===e||J()&&e==="root"?n=yield t():J()?(console.log("root"),console.log("start cwd",process.cwd()),process.chdir(e),n=yield t(),process.chdir(".."),console.log("end cwd",process.cwd())):e==="root"?(process.chdir(".."),n=yield t(),process.chdir(o)):(process.chdir(".."),process.chdir(e),n=yield t(),process.chdir(".."),process.chdir(o)),n}),O=(e,t)=>{let o=process.cwd().split("/").at(-1),n;return o===e||J()&&e==="root"?n=t():J()?(process.chdir(e),n=t(),process.chdir("..")):e==="root"?(process.chdir(".."),n=t(),process.chdir(o)):(process.chdir(".."),process.chdir(e),n=t(),process.chdir(".."),process.chdir(o)),n};var L=()=>O("root",()=>{if(!y.existsSync("kit.config.json"))return null;let t=JSON.parse(y.readFileSync("kit.config.json").toString());return me.parse(t)});function Q(e,t){return X(this,null,function*(){let o=[],n=[],s=[],c=[];t.crudFields.forEach(({name:p,type:C,required:m})=>{o.push(`${p}: entity.${p},`),C==="InputText"||C==="InputTextarea"||C==="Dropdown"||C==="RadioButton"?(n.push(`${p}${m?"":"?"}: string;`),s.push(`${p}: { type: String, required: ${m} },`),c.push(`${p}: z.string()${m?".nonempty()":".optional()"},`)):C==="InputNumber"?(n.push(`${p}${m?"":"?"}: number;`),s.push(`${p}: { type: Number, required: ${m} },`),c.push(`${p}: z.number()${m?"":".optional()"},`)):C==="InputSwitch"&&(n.push(`${p}${m?"":"?"}: boolean;`),s.push(`${p}: { type: Boolean, required: ${m} },`),c.push(`${p}: z.boolean()${m?"":".optional()"},`));});let i=`./src/Microservices/${e}`,d=y.readFileSync(`${l}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace("/*INTERFACE_FIELDS*/",n.join(`
`)).replace("/*SCHEMA_FIELDS*/",s.join(`
`)).replace("/*ENTITY_FIELDS*/",o.join(`
`)).replace("/*ZOD_FIELDS*/",c.join(`
`)),u=y.readFileSync(`${l}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace("/*INTERFACE_FIELDS*/",n.join(`
`)).replace("/*SCHEMA_FIELDS*/",s.join(`
`)).replace("/*ENTITY_FIELDS*/",o.join(`
`)).replace("/*ZOD_FIELDS*/",c.join(`
`)),$=y.readFileSync(`${l}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace("/*INTERFACE_FIELDS*/",n.join(`
`)).replace("/*SCHEMA_FIELDS*/",s.join(`
`)).replace("/*ENTITY_FIELDS*/",o.join(`
`)).replace("/*ZOD_FIELDS*/",c.join(`
`)),F=y.readFileSync(`${l}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace("/*INTERFACE_FIELDS*/",n.join(`
`)).replace("/*SCHEMA_FIELDS*/",s.join(`
`)).replace("/*ENTITY_FIELDS*/",o.join(`
`)).replace("/*ZOD_FIELDS*/",c.join(`
`)),k=`${i}/${e}Controller.ts`,W=`${i}/${e}Router.ts`,U=`${i}/${e}.dto.ts`,Z=`./src/Database/Entities/${e}Entity.ts`;y.writeFileSync(k,d),y.writeFileSync(W,u),y.writeFileSync(U,$),y.writeFileSync(Z,F);let G=y.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${t.collectionName}",`:p).join(`
`);y.writeFileSync("./src/Database/CollectionNames.ts",G);let H=y.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);y.writeFileSync("./src/Microservices/ApiRouter.ts",H);})}var _=de({color:"blue",indent:2}),N=de({color:"blue",indent:2});function M(e){return X(this,null,function*(){var s,c;let t=e.toLowerCase(),o=(c=(s=L())==null?void 0:s.screens)==null?void 0:c.find(i=>i.name.toLowerCase()===t.toLowerCase());if(!o){_.fail(`Screen ${T.cyan(t)} not found in config file`);return}let n=t.charAt(0).toUpperCase()+t.slice(1);console.log("initial",process.cwd()),yield A("webapp",()=>X(this,null,function*(){_.start(`Creating screen: ${T.cyan(n)}`);let i=`./src/screens/${n}`;if(y.existsSync(i)){_.fail(`Screen ${T.cyan(n)} already exists`);return}let d=`${i}/${n}.tsx`,u=`${i}/Create${n}.tsx`,$=`${i}/Edit${n}.tsx`,F=`./src/types/${n.toLowerCase()}.d.ts`;y.createFileSync(d),y.createFileSync(u),y.createFileSync($),y.createFileSync(F),yield Y(n,o),_.succeed(`Created screen: ${T.cyan(n)}`);})),console.log("s",process.cwd()),yield A("server",()=>X(this,null,function*(){N.start(`Creating CRUD for: ${T.cyan(n)}`);let i=`./src/Microservices/${n}`;if(y.existsSync(i)){N.fail(`CRUD for ${T.cyan(n)} already exists`);return}let d=`${i}/${n}Controller.ts`,u=`${i}/${n}Router.ts`,$=`${i}/${n}.dto.ts`;y.createFileSync(d),y.createFileSync(u),y.createFileSync($),yield Q(n,o),N.succeed(`Created CRUD for: ${T.cyan(n)}`),console.log("f",process.cwd());}));})}function z(){return X(this,null,function*(){var e;K(),(e=L())==null||e.screens.map(t=>{M(t.name);});})}var $e=de({color:"blue",indent:2});function ee(e){A("webapp",()=>X(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);$e.start(`Removing screen: ${e}`);let o=`./src/types/${e}.d.ts`,n=`./src/screens/${t}`,s="./src/layout/items.json",c=y.readFileSync(s),i=JSON.parse(c.toString());i[0].items=i[0].items.filter(F=>F.label.toLowerCase()!==t.toLowerCase()),y.writeFileSync(s,JSON.stringify(i,null,2)),y.removeSync(o),y.removeSync(n);let d=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],$=y.readFileSync("./src/main.tsx").toString().split(`
`).filter(F=>d.filter(k=>F.includes(k)).length===0);y.writeFileSync("./src/main.tsx",$.join(`
`)),$e.succeed(`Removed screen: ${e}`);}));}function te(){y.removeSync("./.git"),y.removeSync("./yarn.lock"),y.removeSync("./src/Microservices/XXXXX"),y.removeSync("./src/Database/Entities/XXXXXEntity.ts");}var he=de({color:"blue",indent:2});function ne(e){return X(this,null,function*(){let t=e.toLowerCase();he.start("Scaffolding project..."),y.ensureDirSync(t),process.chdir(t);let[,,o,n]=yield Promise.all([ye().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),ye().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),ge("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/4786bd0357978c40489f2c087b2ae601c3062220/kit.config.json").then(s=>s.text()),ge("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(s=>s.text())]);y.writeFileSync("./kit.config.json",o),y.ensureDirSync(`${l}`),y.ensureDirSync(`${l}/webapp`),y.ensureDirSync(`${l}/server`),O("webapp",()=>{var s;y.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${l}/webapp/XXXXX.tsx`),y.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${l}/webapp/CreateXXXXX.tsx`),y.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${l}/webapp/EditXXXXX.tsx`),y.copyFileSync("./src/types/xxxxx.d.ts",`${l}/webapp/xxxxx.d.ts`),y.writeFileSync("./.env",`VITE_BASE_URL = "${(s=L())==null?void 0:s.backendUrl}"`),K();}),O("server",()=>{y.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${l}/server/XXXXXRouter.ts`),y.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${l}/server/XXXXXController.ts`),y.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${l}/server/XXXXX.dto.ts`),y.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${l}/server/XXXXXEntity.ts`),y.writeFileSync("./.env",n),te();}),he.succeed(`Created "${t}" successfully!`);})}var l=Le.homedir()+"/.adminkit",R=new Command;R.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");R.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ne);R.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(M);R.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(ee);R.command("sync").description('Add screens defined in "kit.config.json" to the project').action(z);R.parse();

export { l as adminKitPath };
