#! /usr/bin/env node
import { Command } from 'commander';
import Re from 'os';
import d from 'fs-extra';
import b from 'chalk';
import pe from 'ora';
import { z as z$1 } from 'zod';
import me from 'simple-git';
import ue from 'node-fetch';

var m=(e,t,o)=>new Promise((r,a)=>{var p=l=>{try{u(o.next(l));}catch(X){a(X);}},s=l=>{try{u(o.throw(l));}catch(X){a(X);}},u=l=>l.done?r(l.value):Promise.resolve(l.value).then(p,s);u((o=o.apply(e,t)).next());});function k(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];d.removeSync("./.git"),d.removeSync("./yarn.lock"),d.removeSync("./src/screens/XXXXX"),d.removeSync("./src/types/xxxxx.d.ts");let r=d.readFileSync("./src/main.tsx").toString().split(`
`).filter(a=>e.filter(p=>a.includes(p)).length===0);d.writeFileSync("./src/main.tsx",r.join(`
`));}var F=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},z=e=>e.charAt(0).toUpperCase()+e.slice(1);var x=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${F(e)} is required.</small>}`],ee=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
  />
  ${e.required?x(e.name)[1]:""}
</div>`,te=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
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
</div>`,ne=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
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
</div>`,re=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${F(e.name)}"
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
`,oe=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${F(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(o=>be(e,o)).join(`
`)}
  </div>
  ${e.required?x(e.name)[1]:""}
</div>
`,se=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${F(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var S=e=>`<Column
  field="${e}"
  header="${z(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var U=pe({color:"blue",indent:2});function W(e,t){return m(this,null,function*(){let o="",r="",a=[],p=[],s=[],u=[],l=["InputSwitch"];t.crudFields.forEach((n,C)=>{let f="",v="";switch(n.required&&!l.includes(n.type)&&a.push(n.name),n.type){case"InputText":n.tableDisplay&&s.push(S(n.name)),p.push(te(n)),f="string",v='""';break;case"InputTextarea":n.tableDisplay&&s.push(S(n.name)),p.push(ne(n)),f="string",v='""';break;case"InputNumber":n.tableDisplay&&s.push(S(n.name)),p.push(ee(n)),f="number",v="0";break;case"Dropdown":n.tableDisplay&&s.push(S(n.name)),p.push(re(n)),u.push({fieldName:n.name,options:n.options||[]}),f="string",v='""';break;case"RadioButton":n.tableDisplay&&s.push(S(n.name)),p.push(oe(n,n.options||[])),f="string",v='""';break;case"InputSwitch":n.tableDisplay&&s.push(S(n.name)),p.push(se(n)),f="boolean",v="false";break}C===0&&(o+=`  id?: string;
`,r+=`  id: "",
`),o+=`  ${n.name}: ${f};
`,r+=`  ${n.name}: ${v},
`,C===t.crudFields.length-1&&(o+=`}
`,r+=`};
`);});let X=`./src/screens/${e}`,h=`${X}/${e}.tsx`,j=`${X}/Create${e}.tsx`,V=`${X}/Edit${e}.tsx`,y="./src/layout/items.json",de=d.readFileSync(`${c}/webapp/XXXXX.tsx`).toString(),ye=d.readFileSync(`${c}/webapp/CreateXXXXX.tsx`).toString(),ge=d.readFileSync(`${c}/webapp/EditXXXXX.tsx`).toString(),$e=d.readFileSync(`${c}/webapp/xxxxx.d.ts`).toString(),fe=de.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),T=[];fe.split(`
`).forEach(n=>{n.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(T.push(...s),T.push(n)):n.includes(`const initialState: ${e}Type = {};`)?(T.push(`const initialState: ${e}Type = {`),T.push(r)):T.push(n);}),d.writeFileSync(h,T.join(`
`));let xe=ye.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,p.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${a.map(n=>`entity.${n}`).join(" && ")}) {`),I=[];xe.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")?(u.forEach(({fieldName:C,options:f})=>{I.push(`const ${C}Options = ${JSON.stringify(f,null,2)};
`);}),I.push(n)):n.includes(`const initialState: ${e}Type = {};`)?(I.push(`const initialState: ${e}Type = {`),I.push(r)):I.push(n);}),d.writeFileSync(j,I.join(`
`));let he=ge.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,p.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${a.map(n=>`entity.${n}`).join(" && ")}) {`),P=[];he.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")?(u.forEach(({fieldName:C,options:f})=>{P.push(`const ${C}Options = ${JSON.stringify(f,null,2)};
`);}),P.push(n)):n.includes(`const initialState: ${e}Type = {};`)?(P.push(`const initialState: ${e}Type = {`),P.push(r)):P.push(n);}),d.writeFileSync(V,P.join(`
`));let we=d.readFileSync(y),N=JSON.parse(we.toString());N[0].items.push({label:e,to:`/${e.toLowerCase()}`}),d.writeFileSync(y,JSON.stringify(N,null,2)),U.start(`Creating types/${e.toLowerCase()}.d.ts`);let Ce=$e.replace(/XXXXX/g,e).split(`
`)[0]+`
`+o;d.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Ce),U.succeed(`Created ${b.cyan(`types/${e}.d.ts`)}`),U.start(`Creating route for ${e}`);let Fe=d.readFileSync("./src/main.tsx").toString().split(`
`),ve=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Se=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],O=[];O.push(...Se),Fe.forEach(n=>{n.includes("</Route>")&&ve.forEach(C=>{O.push(C);}),O.push(n);}),d.writeFileSync("./src/main.tsx",O.join(`
`)),U.succeed(`Created route: ${b.cyan(`/${e.toLowerCase()}`)}`);})}var ae=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("InputNumber"),z$1.literal("Dropdown"),z$1.literal("RadioButton"),z$1.literal("InputSwitch")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var M=(e=process.cwd())=>d.readdirSync(e).includes("kit.config.json"),K=(e,t)=>m(void 0,null,function*(){let o=process.cwd().split("/").at(-1),r;return o===e||M()&&e==="root"?r=yield t():M()?(console.log("root"),console.log("start cwd",process.cwd()),process.chdir(e),r=yield t(),process.chdir(".."),console.log("end cwd",process.cwd())):e==="root"?(process.chdir(".."),r=yield t(),process.chdir(o)):(process.chdir(".."),process.chdir(e),r=yield t(),process.chdir(".."),process.chdir(o)),r}),q=(e,t)=>{let o=process.cwd().split("/").at(-1),r;return o===e||M()&&e==="root"?r=t():M()?(process.chdir(e),r=t(),process.chdir("..")):e==="root"?(process.chdir(".."),r=t(),process.chdir(o)):(process.chdir(".."),process.chdir(e),r=t(),process.chdir(".."),process.chdir(o)),r};var E=()=>q("root",()=>{if(!d.existsSync("kit.config.json"))return null;let t=JSON.parse(d.readFileSync("kit.config.json").toString());return ae.parse(t)});function _(e,t){return m(this,null,function*(){let o=`./src/Microservices/${e}`,r=d.readFileSync(`${c}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),a=d.readFileSync(`${c}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),p=d.readFileSync(`${c}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),s=d.readFileSync(`${c}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),u=`${o}/${e}Controller.ts`,l=`${o}/${e}Router.ts`,X=`${o}/${e}.dto.ts`,h=`./src/Database/Entities/${e}Entity.ts`;d.writeFileSync(u,r),d.writeFileSync(l,a),d.writeFileSync(X,p),d.writeFileSync(h,s);let j=d.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(y=>y.includes("export const ")?y+`
${e}Collection: "${t.collectionName}",`:y).join(`
`);d.writeFileSync("./src/Database/CollectionNames.ts",j);let V=d.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(y=>y.includes("const ApiRouter =")?y+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:y.includes('import * as express from "express";')?y+`
import { ${e}Router } from "./${e}/${e}Router";`:y).join(`
`);d.writeFileSync("./src/Microservices/ApiRouter.ts",V);})}var B=pe({color:"blue",indent:2}),G=pe({color:"blue",indent:2});function A(e){return m(this,null,function*(){var a,p;let t=e.toLowerCase(),o=(p=(a=E())==null?void 0:a.screens)==null?void 0:p.find(s=>s.name.toLowerCase()===t.toLowerCase());if(!o){B.fail(`Screen ${b.cyan(t)} not found in config file`);return}let r=t.charAt(0).toUpperCase()+t.slice(1);console.log("initial",process.cwd()),yield K("webapp",()=>m(this,null,function*(){B.start(`Creating screen: ${b.cyan(r)}`);let s=`./src/screens/${r}`;if(d.existsSync(s)){B.fail(`Screen ${b.cyan(r)} already exists`);return}let u=`${s}/${r}.tsx`,l=`${s}/Create${r}.tsx`,X=`${s}/Edit${r}.tsx`,h=`./src/types/${r.toLowerCase()}.d.ts`;d.createFileSync(u),d.createFileSync(l),d.createFileSync(X),d.createFileSync(h),yield W(r,o),B.succeed(`Created screen: ${b.cyan(r)}`);})),console.log("s",process.cwd()),yield K("server",()=>m(this,null,function*(){G.start(`Creating CRUD for: ${b.cyan(r)}`);let s=`./src/Microservices/${r}`;if(d.existsSync(s)){G.fail(`CRUD for ${b.cyan(r)} already exists`);return}let u=`${s}/${r}Controller.ts`,l=`${s}/${r}Router.ts`,X=`${s}/${r}.dto.ts`;d.createFileSync(u),d.createFileSync(l),d.createFileSync(X),yield _(r,o),G.succeed(`Created CRUD for: ${b.cyan(r)}`),console.log("f",process.cwd());}));})}function Z(){return m(this,null,function*(){var e;k(),(e=E())==null||e.screens.map(t=>{A(t.name);});})}var le=pe({color:"blue",indent:2});function H(e){K("webapp",()=>m(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);le.start(`Removing screen: ${e}`);let o=`./src/types/${e}.d.ts`,r=`./src/screens/${t}`,a="./src/layout/items.json",p=d.readFileSync(a),s=JSON.parse(p.toString());s[0].items=s[0].items.filter(h=>h.label.toLowerCase()!==t.toLowerCase()),d.writeFileSync(a,JSON.stringify(s,null,2)),d.removeSync(o),d.removeSync(r);let u=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],X=d.readFileSync("./src/main.tsx").toString().split(`
`).filter(h=>u.filter(j=>h.includes(j)).length===0);d.writeFileSync("./src/main.tsx",X.join(`
`)),le.succeed(`Removed screen: ${e}`);}));}function Q(){d.removeSync("./.git"),d.removeSync("./yarn.lock"),d.removeSync("./src/Microservices/XXXXX"),d.removeSync("./src/Database/Entities/XXXXXEntity.ts");}var Xe=pe({color:"blue",indent:2});function Y(e){return m(this,null,function*(){let t=e.toLowerCase();Xe.start("Scaffolding project..."),d.ensureDirSync(t),process.chdir(t);let[,,o,r]=yield Promise.all([me().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),me().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),ue("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/4786bd0357978c40489f2c087b2ae601c3062220/kit.config.json").then(a=>a.text()),ue("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(a=>a.text())]);d.writeFileSync("./kit.config.json",o),d.ensureDirSync(`${c}`),d.ensureDirSync(`${c}/webapp`),d.ensureDirSync(`${c}/server`),q("webapp",()=>{var a;d.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${c}/webapp/XXXXX.tsx`),d.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${c}/webapp/CreateXXXXX.tsx`),d.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${c}/webapp/EditXXXXX.tsx`),d.copyFileSync("./src/types/xxxxx.d.ts",`${c}/webapp/xxxxx.d.ts`),d.writeFileSync("./.env",`VITE_BASE_URL = "${(a=E())==null?void 0:a.backendUrl}"`),k();}),q("server",()=>{d.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${c}/server/XXXXXRouter.ts`),d.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${c}/server/XXXXXController.ts`),d.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${c}/server/XXXXX.dto.ts`),d.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${c}/server/XXXXXEntity.ts`),d.writeFileSync("./.env",r),Q();}),Xe.succeed(`Created "${t}" successfully!`);})}var c=Re.homedir()+"/.adminkit",D=new Command;D.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");D.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(Y);D.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(A);D.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(H);D.command("sync").description('Add screens defined in "kit.config.json" to the project').action(Z);D.parse();

export { c as adminKitPath };
