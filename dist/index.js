#! /usr/bin/env node
import { Command } from 'commander';
import Ce from 'os';
import Fe from 'ora';
import u from 'fs-extra';
import O from 'chalk';
import { z as z$1 } from 'zod';
import se from 'simple-git';
import oe from 'node-fetch';

var l=(e,t,r)=>new Promise((s,i)=>{var a=X=>{try{y(r.next(X));}catch(g){i(g);}},m=X=>{try{y(r.throw(X));}catch(g){i(g);}},y=X=>X.done?s(X.value):Promise.resolve(X.value).then(a,m);y((r=r.apply(e,t)).next());});function L(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];u.removeSync("./.git"),u.removeSync("./yarn.lock"),u.removeSync("./src/screens/XXXXX"),u.removeSync("./src/types/xxxxx.d.ts");let s=u.readFileSync("./src/main.tsx").toString().split(`
`).filter(i=>e.filter(a=>i.includes(a)).length===0);u.writeFileSync("./src/main.tsx",s.join(`
`));}var x=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},Z=e=>e.charAt(0).toUpperCase()+e.slice(1);var h=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${x(e)} is required.</small>}`],H=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${x(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?h(e.name)[0]:""}
  />
  ${e.required?h(e.name)[1]:""}
</div>`,Q=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${x(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?h(e.name)[0]:""}
/>
  ${e.required?h(e.name)[1]:""}
</div>`,Y=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${x(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?h(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?h(e.name)[1]:""}
</div>`,N=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${x(e.name)}"
  style={{ width: "100%" }}
  ${e.required?h(e.name)[0]:""}
/>
  ${e.required?h(e.name)[1]:""}
</div>`,$e=(e,t)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${t.value}"}
        ${e.required?h(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${t.name}
      </p>
    </div>
`,z=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${x(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>$e(e,r)).join(`
`)}
  </div>
  ${e.required?h(e.name)[1]:""}
</div>
`,ee=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${x(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var C=e=>`<Column
  field="${e}"
  header="${Z(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function B(e,t){return l(this,null,function*(){let r="",s="",i=[],a=[],m=[],y=[],X=["InputSwitch"];t.crudFields.forEach((n,$)=>{let f="",w="";switch(n.required&&!X.includes(n.type)&&i.push(n.name),n.type){case"InputText":n.tableDisplay&&m.push(C(n.name)),a.push(Q(n)),f="string",w='""';break;case"InputTextarea":n.tableDisplay&&m.push(C(n.name)),a.push(Y(n)),f="string",w='""';break;case"InputNumber":n.tableDisplay&&m.push(C(n.name)),a.push(H(n)),f="number",w="0";break;case"Dropdown":n.tableDisplay&&m.push(C(n.name)),a.push(N(n)),y.push({fieldName:n.name,options:n.options||[]}),f="string",w='""';break;case"RadioButton":n.tableDisplay&&m.push(C(n.name)),a.push(z(n,n.options||[])),f="string",w='""';break;case"InputSwitch":n.tableDisplay&&m.push(C(n.name)),a.push(ee(n)),f="boolean",w="false";break}$===0&&(r+=`  id?: string;
`,s+=`  id: "",
`),r+=`  ${n.name}: ${f};
`,s+=`  ${n.name}: ${w},
`,$===t.crudFields.length-1&&(r+=`}
`,s+=`};
`);});let g=`./src/screens/${e}`,E=`${g}/${e}.tsx`,U=`${g}/Create${e}.tsx`,ie=`${g}/Edit${e}.tsx`,_="./src/layout/items.json",ae=u.readFileSync(`${c}/webapp/XXXXX.tsx`).toString(),ce=u.readFileSync(`${c}/webapp/CreateXXXXX.tsx`).toString(),pe=u.readFileSync(`${c}/webapp/EditXXXXX.tsx`).toString(),me=u.readFileSync(`${c}/webapp/xxxxx.d.ts`).toString(),ue=ae.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),F=[];ue.split(`
`).forEach(n=>{n.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')?(F.push(...m),F.push(n)):n.includes(`const initialState: ${e}Type = {};`)?(F.push(`const initialState: ${e}Type = {`),F.push(s)):F.push(n);}),u.writeFileSync(E,F.join(`
`));let le=ce.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,a.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(n=>`entity.${n}`).join(" && ")}) {`),v=[];le.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:$,options:f})=>{v.push(`const ${$}Options = ${JSON.stringify(f,null,2)};
`);}),v.push(n)):n.includes(`const initialState: ${e}Type = {};`)?(v.push(`const initialState: ${e}Type = {`),v.push(s)):v.push(n);}),u.writeFileSync(U,v.join(`
`));let Xe=pe.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,a.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${i.map(n=>`entity.${n}`).join(" && ")}) {`),S=[];Xe.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")?(y.forEach(({fieldName:$,options:f})=>{S.push(`const ${$}Options = ${JSON.stringify(f,null,2)};
`);}),S.push(n)):n.includes(`const initialState: ${e}Type = {};`)?(S.push(`const initialState: ${e}Type = {`),S.push(s)):S.push(n);}),u.writeFileSync(ie,S.join(`
`));let de=u.readFileSync(_),G=JSON.parse(de.toString());G[0].items.push({label:e,to:`/${e.toLowerCase()}`}),u.writeFileSync(_,JSON.stringify(G,null,2)),p.start(`Creating types/${e.toLowerCase()}.d.ts`);let ye=me.replace(/XXXXX/g,e).split(`
`)[0]+`
`+r;u.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ye),p.succeed(`Created ${O.cyan(`types/${e}.d.ts`)}`),p.start(`Creating route for ${e}`);let ge=u.readFileSync("./src/main.tsx").toString().split(`
`),fe=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],he=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],K=[];K.push(...he),ge.forEach(n=>{n.includes("</Route>")&&fe.forEach($=>{K.push($);}),K.push(n);}),u.writeFileSync("./src/main.tsx",K.join(`
`)),p.succeed(`Created route: ${O.cyan(`/${e.toLowerCase()}`)}`);})}var ne=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("InputNumber"),z$1.literal("Dropdown"),z$1.literal("RadioButton"),z$1.literal("InputSwitch")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var q=(e=process.cwd())=>u.readdirSync(e).includes("kit.config.json"),j=(e,t)=>l(void 0,null,function*(){let r=process.cwd().split("/").at(-1),s;return r===e||q()&&e==="root"?s=yield t():q()?(process.chdir(e),s=yield t(),process.chdir("..")):e==="root"?(process.chdir(".."),s=yield t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),s=yield t(),process.chdir(".."),process.chdir(r)),s}),D=(e,t)=>{let r=process.cwd().split("/").at(-1),s;return r===e||q()&&e==="root"?s=t():q()?(process.chdir(e),s=t(),process.chdir("..")):e==="root"?(process.chdir(".."),s=t(),process.chdir(r)):(process.chdir(".."),process.chdir(e),s=t(),process.chdir(".."),process.chdir(r)),s};var T=()=>D("root",()=>{if(!u.existsSync("kit.config.json"))return null;let t=JSON.parse(u.readFileSync("kit.config.json").toString());return ne.parse(t)});function R(e){return l(this,null,function*(){var s,i;let t=(i=(s=T())==null?void 0:s.screens)==null?void 0:i.find(a=>a.name.toLowerCase()===e.toLowerCase());if(!t){p.fail(`Screen ${O.cyan(e)} not found in config file`);return}let r=e.charAt(0).toUpperCase()+e.slice(1);j("webapp",()=>l(this,null,function*(){p.start(`Creating screen: ${O.cyan(r)}`);let a=`./src/screens/${r}`;if(u.existsSync(a)){p.fail(`Screen ${O.cyan(r)} already exists`);return}let m=`${a}/${r}.tsx`,y=`${a}/Create${r}.tsx`,X=`${a}/Edit${r}.tsx`,g=`./src/types/${r.toLowerCase()}.d.ts`;u.createFileSync(m),u.createFileSync(y),u.createFileSync(X),u.createFileSync(g),yield B(r,t),p.succeed(`Created screen: ${O.cyan(r)}`);})),j("server",()=>l(this,null,function*(){}));})}function M(){return l(this,null,function*(){var e;yield L(),(e=T())==null||e.screens.map(t=>{R(t.name);});})}function J(e){j("webapp",()=>l(this,null,function*(){let t=e.charAt(0).toUpperCase()+e.slice(1);p.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,i="./src/layout/items.json",a=u.readFileSync(i),m=JSON.parse(a.toString());m[0].items=m[0].items.filter(E=>E.label.toLowerCase()!==t.toLowerCase()),u.writeFileSync(i,JSON.stringify(m,null,2)),u.removeSync(r),u.removeSync(s);let y=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],g=u.readFileSync("./src/main.tsx").toString().split(`
`).filter(E=>y.filter(U=>E.includes(U)).length===0);u.writeFileSync("./src/main.tsx",g.join(`
`)),p.succeed(`Removed screen: ${e}`);}));}function V(){u.removeSync("./.git"),u.removeSync("./yarn.lock"),u.removeSync("./src/Microservices/XXXXX"),u.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function W(e){return l(this,null,function*(){let t=e.toLowerCase();p.start("Scaffolding project..."),u.ensureDirSync(t),process.chdir(t);let[,,r,s]=yield Promise.all([se().clone("https://github.com/kuvamdazeus/admin-starter-react","webapp"),se().clone("https://github.com/kuvamdazeus/node-starter-kit","server"),oe("https://gist.githubusercontent.com/kuvamdazeus/89117514d4ef61f9a09e1cd9bf0cba4f/raw/f1b60f6fc25cb111424f824bc455358abbfacc38/kit.config.json").then(i=>i.text()),oe("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(i=>i.text())]);u.writeFileSync("./kit.config.json",r),u.ensureDirSync(`${c}`),u.ensureDirSync(`${c}/webapp`),u.ensureDirSync(`${c}/server`),D("webapp",()=>{var i;u.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${c}/webapp/XXXXX.tsx`),u.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${c}/webapp/CreateXXXXX.tsx`),u.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${c}/webapp/EditXXXXX.tsx`),u.copyFileSync("./src/types/xxxxx.d.ts",`${c}/webapp/xxxxx.d.ts`),u.writeFileSync("./.env",`VITE_BASE_URL = "${(i=T())==null?void 0:i.backendUrl}"`),L();}),D("server",()=>{u.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${c}/server/XXXXXRouter.ts`),u.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${c}/server/XXXXXController.ts`),u.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${c}/server/XXXXX.dto.ts`),u.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${c}/server/XXXXXEntity.ts`),u.writeFileSync("./.env",s),V();}),p.succeed(`Created "${t}" successfully!`);})}var c=Ce.homedir()+"/.adminkit",p=Fe({color:"blue",indent:2}),P=new Command;P.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");P.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(W);P.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(R);P.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(J);P.command("sync").description('Add screens defined in "kit.config.json" to the project').action(M);P.parse();

export { c as adminKitPath, p as spinner };
