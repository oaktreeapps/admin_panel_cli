#! /usr/bin/env node
import { Command } from 'commander';
import $e from 'os';
import xe from 'ora';
import l from 'fs-extra';
import D from 'chalk';
import { z } from 'zod';
import ue from 'simple-git';

var x=(e,n,s)=>new Promise((r,p)=>{var i=m=>{try{u(s.next(m));}catch(g){p(g);}},c=m=>{try{u(s.throw(m));}catch(g){p(g);}},u=m=>m.done?r(m.value):Promise.resolve(m.value).then(i,c);u((s=s.apply(e,n)).next());});function E(){return x(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];l.removeSync("./.git"),l.removeSync("./yarn.lock"),l.removeSync("./src/screens/XXXXX"),l.removeSync("./src/types/xxxxx.d.ts");let r=l.readFileSync("./src/main.tsx").toString().split(`
`).filter(p=>e.filter(i=>p.includes(i)).length===0);l.writeFileSync("./src/main.tsx",r.join(`
`));})}var f=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},M=e=>e.charAt(0).toUpperCase()+e.slice(1);var y=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${f(e)} is required.</small>}`],V=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
  />
  ${e.required?y(e.name)[1]:""}
</div>`,W=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
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
</div>`,_=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
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
</div>`,G=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${f(e.name)}"
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,le=(e,n)=>`<div className="flex align-items-center">
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
`,Z=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${f(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(s=>le(e,s)).join(`
`)}
  </div>
  ${e.required?y(e.name)[1]:""}
</div>
`,H=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${f(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var C=e=>`<Column
  field="${e}"
  header="${M(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function q(e,n){return x(this,null,function*(){let s="",r="",p=[],i=[],c=[],u=[],m=["InputSwitch"];n.crudFields.forEach((t,d)=>{let X="",h="";switch(t.required&&!m.includes(t.type)&&p.push(t.name),t.type){case"InputText":t.tableDisplay&&c.push(C(t.name)),i.push(W(t)),X="string",h='""';break;case"InputTextarea":t.tableDisplay&&c.push(C(t.name)),i.push(_(t)),X="string",h='""';break;case"InputNumber":t.tableDisplay&&c.push(C(t.name)),i.push(V(t)),X="number",h="0";break;case"Dropdown":t.tableDisplay&&c.push(C(t.name)),i.push(G(t)),u.push({fieldName:t.name,options:t.options||[]}),X="string",h='""';break;case"RadioButton":t.tableDisplay&&c.push(C(t.name)),i.push(Z(t,t.options||[])),X="string",h='""';break;case"InputSwitch":t.tableDisplay&&c.push(C(t.name)),i.push(H(t)),X="boolean",h="false";break}d===0&&(s+=`  id?: string;
`,r+=`  id: "",
`),s+=`  ${t.name}: ${X};
`,r+=`  ${t.name}: ${h},
`,d===n.crudFields.length-1&&(s+=`}
`,r+=`};
`);});let g=`./src/screens/${e}`,P=`${g}/${e}.tsx`,K=`${g}/Create${e}.tsx`,z=`${g}/Edit${e}.tsx`,A="./src/layout/items.json",ee=l.readFileSync(`${$}/XXXXX.tsx`).toString(),te=l.readFileSync(`${$}/CreateXXXXX.tsx`).toString(),ne=l.readFileSync(`${$}/EditXXXXX.tsx`).toString(),se=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),w=[];se.split(`
`).forEach(t=>{t.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(w.push(...c),w.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(w.push(`const initialState: ${e}Type = {`),w.push(r)):w.push(t);}),l.writeFileSync(P,w.join(`
`));let oe=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${p.map(t=>`entity.${t}`).join(" && ")}) {`),F=[];oe.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")?(u.forEach(({fieldName:d,options:X})=>{F.push(`const ${d}Options = ${JSON.stringify(X,null,2)};
`);}),F.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(F.push(`const initialState: ${e}Type = {`),F.push(r)):F.push(t);}),l.writeFileSync(K,F.join(`
`));let re=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${p.map(t=>`entity.${t}`).join(" && ")}) {`),v=[];re.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")?(u.forEach(({fieldName:d,options:X})=>{v.push(`const ${d}Options = ${JSON.stringify(X,null,2)};
`);}),v.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(v.push(`const initialState: ${e}Type = {`),v.push(r)):v.push(t);}),l.writeFileSync(z,v.join(`
`));let ie=l.readFileSync(A),J=JSON.parse(ie.toString());J[0].items.push({label:e,to:`/${e.toLowerCase()}`}),l.writeFileSync(A,JSON.stringify(J,null,2)),a.start(`Creating types/${e.toLowerCase()}.d.ts`),l.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let ae=l.readFileSync(`${$}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;l.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ae),a.succeed(`Created ${D.cyan(`types/${e}.d.ts`)}`),a.start(`Creating route for ${e}`);let ce=l.readFileSync("./src/main.tsx").toString().split(`
`),pe=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],me=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],j=[];j.push(...me),ce.forEach(t=>{t.includes("</Route>")&&pe.forEach(d=>{j.push(d);}),j.push(t);}),l.writeFileSync("./src/main.tsx",j.join(`
`)),a.succeed(`Created route: ${D.cyan(`/${e.toLowerCase()}`)}`);})}var Y=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var T=()=>{if(!l.existsSync("kit.config.json"))return null;let e=JSON.parse(l.readFileSync("kit.config.json").toString());return Y.parse(e)};function R(e){return x(this,null,function*(){var u,m;let n=(m=(u=T())==null?void 0:u.screens)==null?void 0:m.find(g=>g.name.toLowerCase()===e.toLowerCase());if(!n){a.fail(`Screen ${D.cyan(e)} not found in config file`);return}let s=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Creating screen: ${D.cyan(s)}`);let r=`./src/screens/${s}`;if(l.existsSync(r)){a.fail(`Screen ${D.cyan(s)} already exists`);return}let p=`${r}/${s}.tsx`,i=`${r}/Create${s}.tsx`,c=`${r}/Edit${s}.tsx`;l.createFileSync(p),l.createFileSync(i),l.createFileSync(c),yield q(s,n),a.succeed(`Created screen: ${D.cyan(s)}`);})}function O(){return x(this,null,function*(){var e;yield E(),(e=T())==null||e.screens.map(n=>{R(n.name);});})}function U(e){let n=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,r=`./src/screens/${n}`,p="./src/layout/items.json",i=l.readFileSync(p),c=JSON.parse(i.toString());c[0].items=c[0].items.filter(P=>P.label.toLowerCase()!==n.toLowerCase()),l.writeFileSync(p,JSON.stringify(c,null,2)),l.removeSync(s),l.removeSync(r);let u=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],g=l.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>u.filter(K=>P.includes(K)).length===0);l.writeFileSync("./src/main.tsx",g.join(`
`)),a.succeed(`Removed screen: ${e}`);}function B(e){return x(this,null,function*(){var n;a.start("Cloning template"),yield ue().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),a.succeed("Cloned template successfully"),process.chdir(e),l.ensureDirSync(`${$}`),l.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${$}/XXXXX.tsx`),l.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${$}/CreateXXXXX.tsx`),l.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${$}/EditXXXXX.tsx`),l.copyFileSync("./src/types/xxxxx.d.ts",`${$}/xxxxx.d.ts`),l.writeFileSync("./.env",`VITE_BASE_URL = "${(n=T())==null?void 0:n.backendUrl}"`),E(),console.log(`
Run the following commands to get started:
cd ${D.green(e)}
npm install
`);})}var $=$e.homedir()+"/.adminkit",a=xe({color:"blue",indent:2}),L=new Command;L.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");L.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(B);L.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(R);L.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(U);L.command("sync").description('Add screens defined in "kit.config.json" to the project').action(O);L.parse();

export { $ as adminKitPath, a as spinner };
