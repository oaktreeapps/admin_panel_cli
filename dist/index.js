#! /usr/bin/env node
import { Command } from 'commander';
import de from 'ora';
import ye from 'simple-git';
import m from 'fs-extra';
import R from 'chalk';
import { z } from 'zod';

var $=(e,t,r)=>new Promise((s,c)=>{var i=l=>{try{p(r.next(l));}catch(X){c(X);}},u=l=>{try{p(r.throw(l));}catch(X){c(X);}},p=l=>l.done?s(l.value):Promise.resolve(l.value).then(i,u);p((r=r.apply(e,t)).next());});function I(){return $(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];m.removeSync("./.git"),m.removeSync("./yarn.lock"),m.removeSync("./src/service/XXXXXService.ts"),m.removeSync("./src/screens/XXXXX"),m.removeSync("./src/types/xxxxx.d.ts");let s=m.readFileSync("./src/main.tsx").toString().split(`
`).filter(c=>e.filter(i=>c.includes(i)).length===0);m.writeFileSync("./src/main.tsx",s.join(`
`));})}var y=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},V=e=>e.charAt(0).toUpperCase()+e.slice(1);var x=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${y(e)} is required.</small>}`],W=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${y(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
  />
  ${e.required?x(e.name)[1]:""}
</div>`,_=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${y(e.name)}</p>
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
</div>`,G=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${y(e.name)}</p>
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
</div>`,Z=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${y(e.name)}"
  style={{ width: "100%" }}
  ${e.required?x(e.name)[0]:""}
/>
  ${e.required?x(e.name)[1]:""}
</div>`,$e=(e,t)=>`<div className="flex align-items-center">
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
`,H=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${y(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>$e(e,r)).join(`
`)}
  </div>
  ${e.required?x(e.name)[1]:""}
</div>
`,Q=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${y(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var C=e=>`<Column
  field="${e}"
  header="${V(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function P(e,t){let r="",s=[-1,-1];return e.forEach((c,i)=>{s[1]===-1&&(c.includes("const initialState: ")?(r=c.trim()+`
`+t,s[0]=i):c.includes("};")&&s[0]!==-1&&(s[1]=i));}),e=[...e.slice(0,s[0]),r,...e.slice(s[1]+1)],e.join(`
`)}function U(e,t){return $(this,null,function*(){let r="",s="",c=[],i=[],u=[],p=[],l=["InputSwitch"];t.crudFields.forEach((n,d)=>{let g="",f="";switch(n.required&&!l.includes(n.type)&&c.push(n.name),n.type){case"InputText":n.tableDisplay&&u.push(C(n.name)),i.push(_(n)),g="string",f='""';break;case"InputTextarea":n.tableDisplay&&u.push(C(n.name)),i.push(G(n)),g="string",f='""';break;case"InputNumber":n.tableDisplay&&u.push(C(n.name)),i.push(W(n)),g="number",f="0";break;case"Dropdown":n.tableDisplay&&u.push(C(n.name)),i.push(Z(n)),p.push({fieldName:n.name,options:n.options||[]}),g="string",f='""';break;case"RadioButton":n.tableDisplay&&u.push(C(n.name)),i.push(H(n,n.options||[])),g="string",f='""';break;case"InputSwitch":n.tableDisplay&&u.push(C(n.name)),i.push(Q(n)),g="boolean",f="false";break}d===0&&(r+=`  id?: string;
`,s+=`  id: "",
`),r+=`  ${n.name}: ${g};
`,s+=`  ${n.name}: ${f},
`,d===t.crudFields.length-1&&(r+=`}
`,s+=`};
`);});let X="./.adminkit",T=`./src/screens/${e}`,b=`${T}/${e}.tsx`,j=`${T}/Create${e}.tsx`,z=`${T}/Edit${e}.tsx`,J="./src/layout/items.json",ee=m.readFileSync(`${X}/XXXXX.tsx`).toString(),te=m.readFileSync(`${X}/CreateXXXXX.tsx`).toString(),ne=m.readFileSync(`${X}/EditXXXXX.tsx`).toString(),re=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),D=[];re.split(`
`).forEach(n=>{n.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')&&D.push(...u),D.push(n);});let se=P(D,s);m.writeFileSync(b,se);let oe=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(n=>`entity.${n}`).join(" && ")}) {`),ie=P(oe.split(`
`),s),q=[];ie.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&p.forEach(({fieldName:d,options:g})=>{q.push(`const ${d}Options = ${JSON.stringify(g,null,2)};
`);}),q.push(n);}),m.writeFileSync(j,q.join(`
`));let ae=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(n=>`entity.${n}`).join(" && ")}) {`),ce=P(ae.split(`
`),s),K=[];ce.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&p.forEach(({fieldName:d,options:g})=>{K.push(`const ${d}Options = ${JSON.stringify(g,null,2)};
`);}),K.push(n);}),m.writeFileSync(z,K.join(`
`));let me=m.readFileSync(J),M=JSON.parse(me.toString());M[0].items.push({label:e,to:`/${e.toLowerCase()}`}),m.writeFileSync(J,JSON.stringify(M,null,2)),a.start(`Creating service/${e}Service.ts`);let pe=m.readFileSync(`${X}/XXXXXService.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());m.writeFileSync(`./src/service/${e}Service.ts`,pe),a.succeed(`Created ${R.cyan(`service/${e}Service.ts`)}`),a.start(`Creating types/${e.toLowerCase()}.d.ts`),m.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let le=m.readFileSync(`${X}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+r;m.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,le),a.succeed(`Created ${R.cyan(`types/${e}.d.ts`)}`),a.start(`Creating route for ${e}`);let ue=m.readFileSync("./src/main.tsx").toString().split(`
`),Xe=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],ge=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],L=[];L.push(...ge),ue.forEach(n=>{n.includes("</Route>")&&Xe.forEach(d=>{L.push(d);}),L.push(n);}),m.writeFileSync("./src/main.tsx",L.join(`
`)),a.succeed(`Created route: ${R.cyan(`/${e.toLowerCase()}`)}`);})}var Y=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var v=()=>{if(!m.existsSync("kit.config.json"))return null;let e=JSON.parse(m.readFileSync("kit.config.json").toString());return Y.parse(e)};function E(e){return $(this,null,function*(){var p,l;let t=(l=(p=v())==null?void 0:p.screens)==null?void 0:l.find(X=>X.name.toLowerCase()===e.toLowerCase());if(!t){a.fail(`Screen ${R.cyan(e)} not found in config file`);return}let r=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Creating screen: ${R.cyan(r)}`);let s=`./src/screens/${r}`;if(m.existsSync(s)){a.fail(`Screen ${R.cyan(r)} already exists`);return}let c=`${s}/${r}.tsx`,i=`${s}/Create${r}.tsx`,u=`${s}/Edit${r}.tsx`;m.createFileSync(c),m.createFileSync(i),m.createFileSync(u),yield U(r,t),a.succeed(`Created screen: ${R.cyan(r)}`);})}function B(){return $(this,null,function*(){var e;yield I(),(e=v())==null||e.screens.map(t=>{E(t.name);});})}function A(e){let t=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,s=`./src/service/${t}Service.ts`,c=`./src/screens/${t}`,i="./src/layout/items.json",u=m.readFileSync(i),p=JSON.parse(u.toString());p[0].items=p[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),m.writeFileSync(i,JSON.stringify(p,null,2)),m.removeSync(r),m.removeSync(s),m.removeSync(c);let l=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],T=m.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>l.filter(j=>b.includes(j)).length===0);m.writeFileSync("./src/main.tsx",T.join(`
`)),a.succeed(`Removed screen: ${e}`);}var a=de({color:"blue",indent:2}),he=e=>$(void 0,null,function*(){var t;a.start("Cloning template"),yield ye().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),a.succeed("Cloned template successfully"),process.chdir(e),m.ensureDirSync("./.adminkit"),m.copyFileSync("./src/screens/XXXXX/XXXXX.tsx","./.adminkit/XXXXX.tsx"),m.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx","./.adminkit/CreateXXXXX.tsx"),m.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx","./.adminkit/EditXXXXX.tsx"),m.copyFileSync("./src/service/XXXXXService.ts","./.adminkit/XXXXXService.ts"),m.copyFileSync("./src/types/xxxxx.d.ts","./.adminkit/xxxxx.d.ts"),m.writeFileSync("./.env",`VITE_BASE_URL = "${(t=v())==null?void 0:t.backendUrl}"`),I(),console.log(`
Run the following commands to get started:
cd ${R.green(e)}
npm install
`);}),S=new Command;S.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");S.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(he);S.command("addscreen").description("Create a new screen").argument("<screenName>","Name of the screen").action(E);S.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(A);S.command("sync").description('Add screens defined in "kit.config.json" to the project').action(B);S.parse();

export { a as spinner };
