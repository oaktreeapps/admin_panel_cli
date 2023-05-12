#! /usr/bin/env node
import { Command } from 'commander';
import ye from 'ora';
import de from 'simple-git';
import m from 'fs-extra';
import j from 'chalk';
import { z } from 'zod';

var x=(e,n,r)=>new Promise((s,c)=>{var i=l=>{try{p(r.next(l));}catch(X){c(X);}},u=l=>{try{p(r.throw(l));}catch(X){c(X);}},p=l=>l.done?s(l.value):Promise.resolve(l.value).then(i,u);p((r=r.apply(e,n)).next());});function b(){return x(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];m.removeSync("./.git"),m.removeSync("./yarn.lock"),m.removeSync("./src/service/XXXXXService.ts"),m.removeSync("./src/screens/XXXXX"),m.removeSync("./src/types/xxxxx.d.ts");let s=m.readFileSync("./src/main.tsx").toString().split(`
`).filter(c=>e.filter(i=>c.includes(i)).length===0);m.writeFileSync("./src/main.tsx",s.join(`
`));})}var d=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},V=e=>e.charAt(0).toUpperCase()+e.slice(1);var $=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${d(e)} is required.</small>}`],W=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${d(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?$(e.name)[0]:""}
  />
  ${e.required?$(e.name)[1]:""}
</div>`,G=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${d(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?$(e.name)[0]:""}
/>
  ${e.required?$(e.name)[1]:""}
</div>`,Z=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${d(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?$(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?$(e.name)[1]:""}
</div>`,H=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${d(e.name)}"
  style={{ width: "100%" }}
  ${e.required?$(e.name)[0]:""}
/>
  ${e.required?$(e.name)[1]:""}
</div>`,xe=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?$(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,Q=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${d(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(r=>xe(e,r)).join(`
`)}
  </div>
  ${e.required?$(e.name)[1]:""}
</div>
`,Y=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${d(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var C=e=>`<Column
  field="${e}"
  header="${V(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function I(e,n){let r="",s=[-1,-1];return e.forEach((c,i)=>{s[1]===-1&&(c.includes("const initialState: ")?(r=c.trim()+`
`+n,s[0]=i):c.includes("};")&&s[0]!==-1&&(s[1]=i));}),e=[...e.slice(0,s[0]),r,...e.slice(s[1]+1)],e.join(`
`)}function B(e,n){return x(this,null,function*(){let r="",s="",c=[],i=[],u=[],p=[],l=["InputSwitch"];n.crudFields.forEach((t,y)=>{let g="",f="";switch(t.required&&!l.includes(t.type)&&c.push(t.name),t.type){case"InputText":t.tableDisplay&&u.push(C(t.name)),i.push(G(t)),g="string",f='""';break;case"InputTextarea":t.tableDisplay&&u.push(C(t.name)),i.push(Z(t)),g="string",f='""';break;case"InputNumber":t.tableDisplay&&u.push(C(t.name)),i.push(W(t)),g="number",f="0";break;case"Dropdown":t.tableDisplay&&u.push(C(t.name)),i.push(H(t)),p.push({fieldName:t.name,options:t.options||[]}),g="string",f='""';break;case"RadioButton":t.tableDisplay&&u.push(C(t.name)),i.push(Q(t,t.options||[])),g="string",f='""';break;case"InputSwitch":t.tableDisplay&&u.push(C(t.name)),i.push(Y(t)),g="boolean",f="false";break}y===0&&(r+=`  id?: string;
`,s+=`  id: "",
`),r+=`  ${t.name}: ${g};
`,s+=`  ${t.name}: ${f},
`,y===n.crudFields.length-1&&(r+=`}
`,s+=`};
`);});let X="./.adminkit",S=`./src/screens/${e}`,T=`${S}/${e}.tsx`,R=`${S}/Create${e}.tsx`,z=`${S}/Edit${e}.tsx`,J="./src/layout/items.json",ee=m.readFileSync(`${X}/XXXXX.tsx`).toString(),te=m.readFileSync(`${X}/CreateXXXXX.tsx`).toString(),ne=m.readFileSync(`${X}/EditXXXXX.tsx`).toString(),re=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),D=[];re.split(`
`).forEach(t=>{t.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')&&D.push(...u),D.push(t);});let se=I(D,s);m.writeFileSync(T,se);let oe=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(t=>`entity.${t}`).join(" && ")}) {`),ie=I(oe.split(`
`),s),q=[];ie.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")&&p.forEach(({fieldName:y,options:g})=>{q.push(`const ${y}Options = ${JSON.stringify(g,null,2)};
`);}),q.push(t);}),m.writeFileSync(R,q.join(`
`));let ae=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(t=>`entity.${t}`).join(" && ")}) {`),ce=I(ae.split(`
`),s),K=[];ce.split(`
`).forEach(t=>{t.includes("const saveEntity = async () => {")&&p.forEach(({fieldName:y,options:g})=>{K.push(`const ${y}Options = ${JSON.stringify(g,null,2)};
`);}),K.push(t);}),m.writeFileSync(z,K.join(`
`));let me=m.readFileSync(J),M=JSON.parse(me.toString());M[0].items.push({label:e,to:`/${e.toLowerCase()}`}),m.writeFileSync(J,JSON.stringify(M,null,2)),a.start(`Creating service/${e}Service.ts`);let pe=m.readFileSync(`${X}/XXXXXService.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());m.writeFileSync(`./src/service/${e}Service.ts`,pe),a.succeed(`Created ${j.cyan(`service/${e}Service.ts`)}`),a.start(`Creating types/${e.toLowerCase()}.d.ts`),m.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let le=m.readFileSync(`${X}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+r;m.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,le),a.succeed(`Created ${j.cyan(`types/${e}.d.ts`)}`),a.start(`Creating route for ${e}`);let ue=m.readFileSync("./src/main.tsx").toString().split(`
`),Xe=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],ge=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],E=[];E.push(...ge),ue.forEach(t=>{t.includes("</Route>")&&Xe.forEach(y=>{E.push(y);}),E.push(t);}),m.writeFileSync("./src/main.tsx",E.join(`
`)),a.succeed(`Created route: ${j.cyan(`/${e.toLowerCase()}`)}`);})}var _=z.object({screens:z.array(z.object({name:z.string(),url:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),tableDisplay:z.boolean().optional().default(!0),inline:z.boolean().optional().default(!1),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var P=(()=>{if(!m.existsSync("kit.config.json"))return null;let e=JSON.parse(m.readFileSync("kit.config.json").toString());return _.parse(e)})();function L(e){return x(this,null,function*(){var p,l;let n=(l=(p=P)==null?void 0:p.screens)==null?void 0:l.find(X=>X.name.toLowerCase()===e.toLowerCase());if(!n){a.fail(`Screen ${j.cyan(e)} not found in config file`);return}let r=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Creating screen: ${j.cyan(r)}`);let s=`./src/screens/${r}`;if(m.existsSync(s)){a.fail(`Screen ${j.cyan(r)} already exists`);return}let c=`${s}/${r}.tsx`,i=`${s}/Create${r}.tsx`,u=`${s}/Edit${r}.tsx`;m.createFileSync(c),m.createFileSync(i),m.createFileSync(u),yield B(r,n),a.succeed(`Created screen: ${j.cyan(r)}`);})}function U(){return x(this,null,function*(){yield b(),P&&P.screens.map(e=>{L(e.name);});})}function A(e){let n=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,s=`./src/service/${n}Service.ts`,c=`./src/screens/${n}`,i="./src/layout/items.json",u=m.readFileSync(i),p=JSON.parse(u.toString());p[0].items=p[0].items.filter(T=>T.label.toLowerCase()!==n.toLowerCase()),m.writeFileSync(i,JSON.stringify(p,null,2)),m.removeSync(r),m.removeSync(s),m.removeSync(c);let l=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],S=m.readFileSync("./src/main.tsx").toString().split(`
`).filter(T=>l.filter(R=>T.includes(R)).length===0);m.writeFileSync("./src/main.tsx",S.join(`
`)),a.succeed(`Removed screen: ${e}`);}var a=ye({color:"blue",indent:2}),he=e=>x(void 0,null,function*(){a.start("Cloning template"),yield de().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),a.succeed("Cloned template successfully"),process.chdir(e),m.ensureDirSync("./.adminkit"),m.copyFileSync("./src/screens/XXXXX/XXXXX.tsx","./.adminkit/XXXXX.tsx"),m.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx","./.adminkit/CreateXXXXX.tsx"),m.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx","./.adminkit/EditXXXXX.tsx"),m.copyFileSync("./src/service/XXXXXService.ts","./.adminkit/XXXXXService.ts"),m.copyFileSync("./src/types/xxxxx.d.ts","./.adminkit/xxxxx.d.ts"),console.log(`
Run the following commands to get started:
cd ${j.green(e)}
npm install
`),b();}),v=new Command;v.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");v.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(he);v.command("addscreen").description("Create a new screen").argument("<screenName>","Name of the screen").action(L);v.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(A);v.command("sync").description('Add screens defined in "kit.config.json" to the project').action(U);v.parse();

export { a as spinner };
