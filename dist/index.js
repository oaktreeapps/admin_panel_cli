#! /usr/bin/env node
import { Command } from 'commander';
import ye from 'os';
import xe from 'ora';
import c from 'fs-extra';
import D from 'chalk';
import { z } from 'zod';
import Xe from 'simple-git';

var y=(e,n,s)=>new Promise((i,X)=>{var a=m=>{try{p(s.next(m));}catch($){X($);}},l=m=>{try{p(s.throw(m));}catch($){X($);}},p=m=>m.done?i(m.value):Promise.resolve(m.value).then(a,l);p((s=s.apply(e,n)).next());});function E(){return y(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];c.removeSync("./.git"),c.removeSync("./yarn.lock"),c.removeSync("./src/service/XXXXXService.ts"),c.removeSync("./src/screens/XXXXX"),c.removeSync("./src/types/xxxxx.d.ts");let i=c.readFileSync("./src/main.tsx").toString().split(`
`).filter(X=>e.filter(a=>X.includes(a)).length===0);c.writeFileSync("./src/main.tsx",i.join(`
`));})}var f=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},W=e=>e.charAt(0).toUpperCase()+e.slice(1);var x=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${f(e)} is required.</small>}`],_=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
  />
  ${e.required?x(e.name)[1]:""}
</div>`,G=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
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
</div>`,Z=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
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
</div>`,H=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${f(e.name)}"
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
/>
  ${e.required?x(e.name)[1]:""}
</div>`,ue=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?x(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,Q=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${f(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(s=>ue(e,s)).join(`
`)}
  </div>
  ${e.required?x(e.name)[1]:""}
</div>
`,Y=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${f(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var w=e=>`<Column
  field="${e}"
  header="${W(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function U(e,n){return y(this,null,function*(){let s="",i="",X=[],a=[],l=[],p=[],m=["InputSwitch"];n.crudFields.forEach((t,d)=>{let g="",h="";switch(t.required&&!m.includes(t.type)&&X.push(t.name),t.type){case"InputText":t.tableDisplay&&l.push(w(t.name)),a.push(G(t)),g="string",h='""';break;case"InputTextarea":t.tableDisplay&&l.push(w(t.name)),a.push(Z(t)),g="string",h='""';break;case"InputNumber":t.tableDisplay&&l.push(w(t.name)),a.push(_(t)),g="number",h="0";break;case"Dropdown":t.tableDisplay&&l.push(w(t.name)),a.push(H(t)),p.push({fieldName:t.name,options:t.options||[]}),g="string",h='""';break;case"RadioButton":t.tableDisplay&&l.push(w(t.name)),a.push(Q(t,t.options||[])),g="string",h='""';break;case"InputSwitch":t.tableDisplay&&l.push(w(t.name)),a.push(Y(t)),g="boolean",h="false";break}d===0&&(s+=`  id?: string;
`,i+=`  id: "",
`),s+=`  ${t.name}: ${g};
`,i+=`  ${t.name}: ${h},
`,d===n.crudFields.length-1&&(s+=`}
`,i+=`};
`);});let $=`./src/screens/${e}`,K=`${$}/${e}.tsx`,P=`${$}/Create${e}.tsx`,q=`${$}/Edit${e}.tsx`,M="./src/layout/items.json",ee=c.readFileSync(`${u}/XXXXX.tsx`).toString(),te=c.readFileSync(`${u}/CreateXXXXX.tsx`).toString(),ne=c.readFileSync(`${u}/EditXXXXX.tsx`).toString(),se=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),S=[];se.split(`
`).forEach(t=>{t.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(S.push(...l),S.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(S.push(`const initialState: ${e}Type = {`),S.push(i)):S.push(t);}),c.writeFileSync(K,S.join(`
`));let re=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,a.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${X.map(t=>`entity.${t}`).join(" && ")}) {`),T=[];re.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:d,options:g})=>{T.push(`const ${d}Options = ${JSON.stringify(g,null,2)};
`);}),T.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(T.push(`const initialState: ${e}Type = {`),T.push(i)):T.push(t);}),c.writeFileSync(P,T.join(`
`));let oe=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,a.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${X.map(t=>`entity.${t}`).join(" && ")}) {`),b=[];oe.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:d,options:g})=>{b.push(`const ${d}Options = ${JSON.stringify(g,null,2)};
`);}),b.push(t)):t.includes(`const initialState: ${e}Type = {};`)?(b.push(`const initialState: ${e}Type = {`),b.push(i)):b.push(t);}),c.writeFileSync(q,b.join(`
`));let ie=c.readFileSync(M),V=JSON.parse(ie.toString());V[0].items.push({label:e,to:`/${e.toLowerCase()}`}),c.writeFileSync(M,JSON.stringify(V,null,2)),o.start(`Creating service/${e}Service.ts`);let ae=c.readFileSync(`${u}/XXXXXService.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());c.writeFileSync(`./src/service/${e}Service.ts`,ae),o.succeed(`Created ${D.cyan(`service/${e}Service.ts`)}`),o.start(`Creating types/${e.toLowerCase()}.d.ts`),c.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let ce=c.readFileSync(`${u}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;c.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ce),o.succeed(`Created ${D.cyan(`types/${e}.d.ts`)}`),o.start(`Creating route for ${e}`);let pe=c.readFileSync("./src/main.tsx").toString().split(`
`),me=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],le=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],j=[];j.push(...le),pe.forEach(t=>{t.includes("</Route>")&&me.forEach(d=>{j.push(d);}),j.push(t);}),c.writeFileSync("./src/main.tsx",j.join(`
`)),o.succeed(`Created route: ${D.cyan(`/${e.toLowerCase()}`)}`);})}var N=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var I=()=>{if(!c.existsSync("kit.config.json"))return null;let e=JSON.parse(c.readFileSync("kit.config.json").toString());return N.parse(e)};function R(e){return y(this,null,function*(){var p,m;let n=(m=(p=I())==null?void 0:p.screens)==null?void 0:m.find($=>$.name.toLowerCase()===e.toLowerCase());if(!n){o.fail(`Screen ${D.cyan(e)} not found in config file`);return}let s=e.charAt(0).toUpperCase()+e.slice(1);o.start(`Creating screen: ${D.cyan(s)}`);let i=`./src/screens/${s}`;if(c.existsSync(i)){o.fail(`Screen ${D.cyan(s)} already exists`);return}let X=`${i}/${s}.tsx`,a=`${i}/Create${s}.tsx`,l=`${i}/Edit${s}.tsx`;c.createFileSync(X),c.createFileSync(a),c.createFileSync(l),yield U(s,n),o.succeed(`Created screen: ${D.cyan(s)}`);})}function B(){return y(this,null,function*(){var e;yield E(),(e=I())==null||e.screens.map(n=>{R(n.name);});})}function A(e){let n=e.charAt(0).toUpperCase()+e.slice(1);o.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,i=`./src/service/${n}Service.ts`,X=`./src/screens/${n}`,a="./src/layout/items.json",l=c.readFileSync(a),p=JSON.parse(l.toString());p[0].items=p[0].items.filter(P=>P.label.toLowerCase()!==n.toLowerCase()),c.writeFileSync(a,JSON.stringify(p,null,2)),c.removeSync(s),c.removeSync(i),c.removeSync(X);let m=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],K=c.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>m.filter(q=>P.includes(q)).length===0);c.writeFileSync("./src/main.tsx",K.join(`
`)),o.succeed(`Removed screen: ${e}`);}function J(e){return y(this,null,function*(){var n;o.start("Cloning template"),yield Xe().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),o.succeed("Cloned template successfully"),process.chdir(e),c.ensureDirSync(`${u}`),c.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${u}/XXXXX.tsx`),c.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${u}/CreateXXXXX.tsx`),c.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${u}/EditXXXXX.tsx`),c.copyFileSync("./src/service/XXXXXService.ts",`${u}/XXXXXService.ts`),c.copyFileSync("./src/types/xxxxx.d.ts",`${u}/xxxxx.d.ts`),c.writeFileSync("./.env",`VITE_BASE_URL = "${(n=I())==null?void 0:n.backendUrl}"`),E(),console.log(`
Run the following commands to get started:
cd ${D.green(e)}
npm install
`);})}var u=ye.homedir()+"/.adminkit",o=xe({color:"blue",indent:2}),L=new Command;L.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");L.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(J);L.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(R);L.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(A);L.command("sync").description('Add screens defined in "kit.config.json" to the project').action(B);L.parse();

export { u as adminKitPath, o as spinner };
