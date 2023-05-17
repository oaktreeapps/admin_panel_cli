#! /usr/bin/env node
import { Command } from 'commander';
import he from 'os';
import xe from 'ora';
import d from 'fs-extra';
import K from 'chalk';
import { z as z$1 } from 'zod';
import ee from 'simple-git';
import ye from 'node-fetch';

var p=(e,n,s)=>new Promise((o,m)=>{var i=l=>{try{f(s.next(l));}catch(g){m(g);}},c=l=>{try{f(s.throw(l));}catch(g){m(g);}},f=l=>l.done?o(l.value):Promise.resolve(l.value).then(i,c);f((s=s.apply(e,n)).next());});function E(){return p(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];d.removeSync("./.git"),d.removeSync("./yarn.lock"),d.removeSync("./src/screens/XXXXX"),d.removeSync("./src/types/xxxxx.d.ts");let o=d.readFileSync("./src/main.tsx").toString().split(`
`).filter(m=>e.filter(i=>m.includes(i)).length===0);d.writeFileSync("./src/main.tsx",o.join(`
`));})}var x=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},W=e=>e.charAt(0).toUpperCase()+e.slice(1);var y=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${x(e)} is required.</small>}`],_=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${x(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
  />
  ${e.required?y(e.name)[1]:""}
</div>`,G=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${x(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,Z=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${x(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,H=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${x(e.name)}"
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,de=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?y(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,Q=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${x(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(s=>de(e,s)).join(`
`)}
  </div>
  ${e.required?y(e.name)[1]:""}
</div>
`,Y=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${x(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var F=e=>`<Column
  field="${e}"
  header="${W(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function O(e,n){return p(this,null,function*(){let s="",o="",m=[],i=[],c=[],f=[],l=["InputSwitch"];n.crudFields.forEach((t,h)=>{let X="",C="";switch(t.required&&!l.includes(t.type)&&m.push(t.name),t.type){case"InputText":t.tableDisplay&&c.push(F(t.name)),i.push(G(t)),X="string",C='""';break;case"InputTextarea":t.tableDisplay&&c.push(F(t.name)),i.push(Z(t)),X="string",C='""';break;case"InputNumber":t.tableDisplay&&c.push(F(t.name)),i.push(_(t)),X="number",C="0";break;case"Dropdown":t.tableDisplay&&c.push(F(t.name)),i.push(H(t)),f.push({fieldName:t.name,options:t.options||[]}),X="string",C='""';break;case"RadioButton":t.tableDisplay&&c.push(F(t.name)),i.push(Q(t,t.options||[])),X="string",C='""';break;case"InputSwitch":t.tableDisplay&&c.push(F(t.name)),i.push(Y(t)),X="boolean",C="false";break}h===0&&(s+=`  id?: string;
`,o+=`  id: "",
`),s+=`  ${t.name}: ${X};
`,o+=`  ${t.name}: ${C},
`,h===n.crudFields.length-1&&(s+=`}
`,o+=`};
`);});let g=`./src/screens/${e}`,w=`${g}/${e}.tsx`,q=`${g}/Create${e}.tsx`,te=`${g}/Edit${e}.tsx`,M="./src/layout/items.json",ne=d.readFileSync(`${u}/webapp/XXXXX.tsx`).toString(),se=d.readFileSync(`${u}/webapp/CreateXXXXX.tsx`).toString(),re=d.readFileSync(`${u}/webapp/EditXXXXX.tsx`).toString(),oe=d.readFileSync(`${u}/webapp/xxxxx.d.ts`).toString(),ie=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),b=[];ie.split(`
`).forEach(t=>{t.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(b.push(...c),b.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(b.push(`const initialState: ${e}Type = {`),b.push(o)):b.push(t);}),d.writeFileSync(w,b.join(`
`));let ae=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${m.map(t=>`entity.${t}`).join(" && ")}) {`),S=[];ae.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")?(f.forEach(({fieldName:h,options:X})=>{S.push(`const ${h}Options = ${JSON.stringify(X,null,2)};
`);}),S.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(S.push(`const initialState: ${e}Type = {`),S.push(o)):S.push(t);}),d.writeFileSync(q,S.join(`
`));let ce=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${m.map(t=>`entity.${t}`).join(" && ")}) {`),v=[];ce.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")?(f.forEach(({fieldName:h,options:X})=>{v.push(`const ${h}Options = ${JSON.stringify(X,null,2)};
`);}),v.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(v.push(`const initialState: ${e}Type = {`),v.push(o)):v.push(t);}),d.writeFileSync(te,v.join(`
`));let pe=d.readFileSync(M),V=JSON.parse(pe.toString());V[0].items.push({label:e,to:`/${e.toLowerCase()}`}),d.writeFileSync(M,JSON.stringify(V,null,2)),a.start(`Creating types/${e.toLowerCase()}.d.ts`);let me=oe.replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;d.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,me),a.succeed(`Created ${K.cyan(`types/${e}.d.ts`)}`),a.start(`Creating route for ${e}`);let le=d.readFileSync("./src/main.tsx").toString().split(`
`),ue=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],ge=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],D=[];D.push(...ge),le.forEach(t=>{t.includes("</Route>")&&ue.forEach(h=>{D.push(h);}),D.push(t);}),d.writeFileSync("./src/main.tsx",D.join(`
`)),a.succeed(`Created route: ${K.cyan(`/${e.toLowerCase()}`)}`);})}var z=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("InputNumber"),z$1.literal("Dropdown"),z$1.literal("RadioButton"),z$1.literal("InputSwitch")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var I=()=>{let e=null;if(d.existsSync("kit.config.json")?e="kit.config.json":d.existsSync("../kit.config.json")&&(e="../kit.config.json"),!e)return null;let n=JSON.parse(d.readFileSync(e).toString());return z.parse(n)};var Xe=(e=process.cwd())=>d.readdirSync(e).includes("kit.config.json"),R=(e,n)=>p(void 0,null,function*(){let s=process.cwd().split("/").at(-1);s===e?yield n():Xe()?(process.chdir(e),yield n(),process.chdir("..")):(process.chdir(".."),process.chdir(e),yield n(),process.chdir(".."),process.chdir(s));});function k(e){return p(this,null,function*(){yield R("webapp",()=>p(this,null,function*(){var l,g;let n=(g=(l=I())==null?void 0:l.screens)==null?void 0:g.find(w=>w.name.toLowerCase()===e.toLowerCase());if(!n){a.fail(`Screen ${K.cyan(e)} not found in config file`);return}let s=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Creating screen: ${K.cyan(s)}`);let o=`./src/screens/${s}`;if(d.existsSync(o)){a.fail(`Screen ${K.cyan(s)} already exists`);return}let m=`${o}/${s}.tsx`,i=`${o}/Create${s}.tsx`,c=`${o}/Edit${s}.tsx`,f=`./src/types/${s.toLowerCase()}.d.ts`;d.createFileSync(m),d.createFileSync(i),d.createFileSync(c),d.createFileSync(f),yield O(s,n),a.succeed(`Created screen: ${K.cyan(s)}`);}));})}function B(){return p(this,null,function*(){var e;yield E(),(e=I())==null||e.screens.map(n=>{k(n.name);});})}function A(e){R("webapp",()=>p(this,null,function*(){let n=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,o=`./src/screens/${n}`,m="./src/layout/items.json",i=d.readFileSync(m),c=JSON.parse(i.toString());c[0].items=c[0].items.filter(w=>w.label.toLowerCase()!==n.toLowerCase()),d.writeFileSync(m,JSON.stringify(c,null,2)),d.removeSync(s),d.removeSync(o);let f=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],g=d.readFileSync("./src/main.tsx").toString().split(`
`).filter(w=>f.filter(q=>w.includes(q)).length===0);d.writeFileSync("./src/main.tsx",g.join(`
`)),a.succeed(`Removed screen: ${e}`);}));}function J(e){return p(this,null,function*(){var s;a.start("Cloning template"),d.ensureDirSync(e),process.chdir(e);let[,,n]=yield Promise.all([ee().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),ee().clone("https://github.com/Milan619/node-starter-kit","server"),ye("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/f1b60f6fc25cb111424f824bc455358abbfacc38/kit.config.json").then(o=>o.text())]);d.writeFileSync("./kit.config.json",n),d.ensureDirSync(`${u}`),d.ensureDirSync(`${u}/webapp`),d.ensureDirSync(`${u}/server`),process.chdir("webapp"),d.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${u}/webapp/XXXXX.tsx`),d.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${u}/webapp/CreateXXXXX.tsx`),d.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${u}/webapp/EditXXXXX.tsx`),d.copyFileSync("./src/types/xxxxx.d.ts",`${u}/webapp/xxxxx.d.ts`),d.writeFileSync("./.env",`VITE_BASE_URL = "${(s=I())==null?void 0:s.backendUrl}"`),E(),process.chdir(".."),a.succeed("Cloned template successfully");})}var u=he.homedir()+"/.adminkit",a=xe({color:"blue",indent:2}),L=new Command;L.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");L.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(J);L.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(k);L.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(A);L.command("sync").description('Add screens defined in "kit.config.json" to the project').action(B);L.parse();

export { u as adminKitPath, a as spinner };
