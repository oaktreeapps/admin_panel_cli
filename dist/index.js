#! /usr/bin/env node
import { Command } from 'commander';
import ye from 'ora';
import de from 'simple-git';
import p from 'fs-extra';
import j from 'chalk';
import { z } from 'zod';
import he from 'os';

var x=(e,t,r)=>new Promise((s,c)=>{var i=l=>{try{m(r.next(l));}catch($){c($);}},u=l=>{try{m(r.throw(l));}catch($){c($);}},m=l=>l.done?s(l.value):Promise.resolve(l.value).then(i,u);m((r=r.apply(e,t)).next());});function I(){return x(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];p.removeSync("./.git"),p.removeSync("./yarn.lock"),p.removeSync("./src/service/XXXXXService.ts"),p.removeSync("./src/screens/XXXXX"),p.removeSync("./src/types/xxxxx.d.ts");let s=p.readFileSync("./src/main.tsx").toString().split(`
`).filter(c=>e.filter(i=>c.includes(i)).length===0);p.writeFileSync("./src/main.tsx",s.join(`
`));})}var f=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},W=e=>e.charAt(0).toUpperCase()+e.slice(1);var y=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${f(e)} is required.</small>}`],_=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${f(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
  />
  ${e.required?y(e.name)[1]:""}
</div>`,G=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,Z=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,H=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
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
</div>`,$e=(e,t)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${t.value}"}
        ${e.required?y(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${t.name}
      </p>
    </div>
`,Q=(e,t)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${f(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>$e(e,r)).join(`
`)}
  </div>
  ${e.required?y(e.name)[1]:""}
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
></Column>`;function P(e,t){let r="",s=[-1,-1];return e.forEach((c,i)=>{s[1]===-1&&(c.includes("const initialState: ")?(r=c.trim()+`
`+t,s[0]=i):c.includes("};")&&s[0]!==-1&&(s[1]=i));}),e=[...e.slice(0,s[0]),r,...e.slice(s[1]+1)],e.join(`
`)}function B(e,t){return x(this,null,function*(){let r="",s="",c=[],i=[],u=[],m=[],l=["InputSwitch"];t.crudFields.forEach((n,d)=>{let g="",h="";switch(n.required&&!l.includes(n.type)&&c.push(n.name),n.type){case"InputText":n.tableDisplay&&u.push(w(n.name)),i.push(G(n)),g="string",h='""';break;case"InputTextarea":n.tableDisplay&&u.push(w(n.name)),i.push(Z(n)),g="string",h='""';break;case"InputNumber":n.tableDisplay&&u.push(w(n.name)),i.push(_(n)),g="number",h="0";break;case"Dropdown":n.tableDisplay&&u.push(w(n.name)),i.push(H(n)),m.push({fieldName:n.name,options:n.options||[]}),g="string",h='""';break;case"RadioButton":n.tableDisplay&&u.push(w(n.name)),i.push(Q(n,n.options||[])),g="string",h='""';break;case"InputSwitch":n.tableDisplay&&u.push(w(n.name)),i.push(Y(n)),g="boolean",h="false";break}d===0&&(r+=`  id?: string;
`,s+=`  id: "",
`),r+=`  ${n.name}: ${g};
`,s+=`  ${n.name}: ${h},
`,d===t.crudFields.length-1&&(r+=`}
`,s+=`};
`);});let $=`./src/screens/${e}`,k=`${$}/${e}.tsx`,b=`${$}/Create${e}.tsx`,D=`${$}/Edit${e}.tsx`,M="./src/layout/items.json",ee=p.readFileSync(`${X}/XXXXX.tsx`).toString(),te=p.readFileSync(`${X}/CreateXXXXX.tsx`).toString(),ne=p.readFileSync(`${X}/EditXXXXX.tsx`).toString(),re=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),K=[];re.split(`
`).forEach(n=>{n.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')&&K.push(...u),K.push(n);});let se=P(K,s);p.writeFileSync(k,se);let oe=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(n=>`entity.${n}`).join(" && ")}) {`),ie=P(oe.split(`
`),s),q=[];ie.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&m.forEach(({fieldName:d,options:g})=>{q.push(`const ${d}Options = ${JSON.stringify(g,null,2)};
`);}),q.push(n);}),p.writeFileSync(b,q.join(`
`));let ae=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(n=>`entity.${n}`).join(" && ")}) {`),ce=P(ae.split(`
`),s),O=[];ce.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&m.forEach(({fieldName:d,options:g})=>{O.push(`const ${d}Options = ${JSON.stringify(g,null,2)};
`);}),O.push(n);}),p.writeFileSync(D,O.join(`
`));let pe=p.readFileSync(M),V=JSON.parse(pe.toString());V[0].items.push({label:e,to:`/${e.toLowerCase()}`}),p.writeFileSync(M,JSON.stringify(V,null,2)),a.start(`Creating service/${e}Service.ts`);let me=p.readFileSync(`${X}/XXXXXService.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());p.writeFileSync(`./src/service/${e}Service.ts`,me),a.succeed(`Created ${j.cyan(`service/${e}Service.ts`)}`),a.start(`Creating types/${e.toLowerCase()}.d.ts`),p.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let le=p.readFileSync(`${X}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+r;p.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,le),a.succeed(`Created ${j.cyan(`types/${e}.d.ts`)}`),a.start(`Creating route for ${e}`);let ue=p.readFileSync("./src/main.tsx").toString().split(`
`),Xe=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],ge=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],L=[];L.push(...ge),ue.forEach(n=>{n.includes("</Route>")&&Xe.forEach(d=>{L.push(d);}),L.push(n);}),p.writeFileSync("./src/main.tsx",L.join(`
`)),a.succeed(`Created route: ${j.cyan(`/${e.toLowerCase()}`)}`);})}var N=z.object({backendUrl:z.string().optional().default("http://localhost:3000"),screens:z.array(z.object({name:z.string(),url:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var S=()=>{if(!p.existsSync("kit.config.json"))return null;let e=JSON.parse(p.readFileSync("kit.config.json").toString());return N.parse(e)};function E(e){return x(this,null,function*(){var m,l;let t=(l=(m=S())==null?void 0:m.screens)==null?void 0:l.find($=>$.name.toLowerCase()===e.toLowerCase());if(!t){a.fail(`Screen ${j.cyan(e)} not found in config file`);return}let r=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Creating screen: ${j.cyan(r)}`);let s=`./src/screens/${r}`;if(p.existsSync(s)){a.fail(`Screen ${j.cyan(r)} already exists`);return}let c=`${s}/${r}.tsx`,i=`${s}/Create${r}.tsx`,u=`${s}/Edit${r}.tsx`;p.createFileSync(c),p.createFileSync(i),p.createFileSync(u),yield B(r,t),a.succeed(`Created screen: ${j.cyan(r)}`);})}function A(){return x(this,null,function*(){var e;yield I(),(e=S())==null||e.screens.map(t=>{E(t.name);});})}function J(e){let t=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,s=`./src/service/${t}Service.ts`,c=`./src/screens/${t}`,i="./src/layout/items.json",u=p.readFileSync(i),m=JSON.parse(u.toString());m[0].items=m[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),p.writeFileSync(i,JSON.stringify(m,null,2)),p.removeSync(r),p.removeSync(s),p.removeSync(c);let l=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],k=p.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>l.filter(D=>b.includes(D)).length===0);p.writeFileSync("./src/main.tsx",k.join(`
`)),a.succeed(`Removed screen: ${e}`);}var X=he.homedir()+"/.adminkit",a=ye({color:"blue",indent:2}),Ce=e=>x(void 0,null,function*(){var t;a.start("Cloning template"),yield de().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),a.succeed("Cloned template successfully"),process.chdir(e),p.ensureDirSync(`${X}`),p.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${X}/XXXXX.tsx`),p.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${X}/CreateXXXXX.tsx`),p.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${X}/EditXXXXX.tsx`),p.copyFileSync("./src/service/XXXXXService.ts",`${X}/XXXXXService.ts`),p.copyFileSync("./src/types/xxxxx.d.ts",`${X}/xxxxx.d.ts`),p.writeFileSync("./.env",`VITE_BASE_URL = "${(t=S())==null?void 0:t.backendUrl}"`),I(),console.log(`
Run the following commands to get started:
cd ${j.green(e)}
npm install
`);}),T=new Command;T.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");T.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(Ce);T.command("addscreen").description("Create a new screen").argument("<screenName>","Name of the screen").action(E);T.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(J);T.command("sync").description('Add screens defined in "kit.config.json" to the project').action(A);T.parse();

export { X as adminKitPath, a as spinner };
