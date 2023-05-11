#! /usr/bin/env node
import { Command } from 'commander';
import ye from 'ora';
import de from 'simple-git';
import p from 'fs-extra';
import j from 'chalk';
import { z } from 'zod';

var $=(e,t,s)=>new Promise((r,c)=>{var i=m=>{try{l(s.next(m));}catch(X){c(X);}},u=m=>{try{l(s.throw(m));}catch(X){c(X);}},l=m=>m.done?r(m.value):Promise.resolve(m.value).then(i,u);l((s=s.apply(e,t)).next());});function T(){return $(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];p.removeSync("./.git"),p.removeSync("./yarn.lock"),p.removeSync("./src/service/XXXXXService.ts"),p.removeSync("./src/screens/XXXXX"),p.removeSync("./src/types/xxxxx.d.ts");let r=p.readFileSync("./src/main.tsx").toString().split(`
`).filter(c=>e.filter(i=>c.includes(i)).length===0);p.writeFileSync("./src/main.tsx",r.join(`
`));})}var d=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},V=e=>e.charAt(0).toUpperCase()+e.slice(1);var x=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${d(e)} is required.</small>}`],W=(e,t=!0)=>`<div className="field">
<label htmlFor="${e}">${d(e)}</label>
<InputNumber
  id="${e}"
  value={entity.${e}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e}")}
  ${t?x(e)[0]:""}
  />
  ${t?x(e)[1]:""}
</div>`,G=(e,t=!0)=>`<div className="field">
<label htmlFor="${e}">${d(e)}</label>
<InputText
  id="${e}"
  value={entity.${e}}
  onChange={(e) => onInputChange(e.target.value, "${e}")}
  required
  autoFocus
  ${t?x(e)[0]:""}
/>
  ${t?x(e)[1]:""}
</div>`,Z=(e,t=!0)=>`<div className="field">
<label htmlFor="${e}">${d(e)}</label>
<InputTextarea
  id="${e}"
  value={entity.${e}}
  onChange={(e) => onInputChange(e.target.value, "${e}")}
  ${t?x(e)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${t?x(e)[1]:""}
</div>`,H=(e,t=!0)=>`<div className="field">
<Dropdown
  value={entity.${e}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e}")}
  options={${e}Options}
  optionLabel="name"
  placeholder="Select a ${d(e)}"
  ${t?x(e)[0]:""}
/>
  ${t?x(e)[1]:""}
</div>`,$e=(e,t,s)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e}")}
        checked={entity.${e} === "${t.value}"}
        ${s?x(e)[0]:""}
      />
      <label className="ml-2 text-sm">
        ${t.name}
      </label>
    </div>
`,Q=(e,t,s=!0)=>`<div className="field">
  <p className="mt-5">Choose ${d(e)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>$e(e,r,s)).join(`
`)}
  </div>
  ${s?x(e)[1]:""}
</div>
`,Y=e=>`<div className="field flex items-center">
  <p className="mr-2">${d(e)}</p>
  <InputSwitch checked={entity.${e}} onChange={(e) => onInputChange(e.value, "${e}")} />
</div>`;var C=e=>`<Column
  field="${e}"
  header="${V(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function I(e,t){let s="",r=[-1,-1];return e.forEach((c,i)=>{r[1]===-1&&(c.includes("const initialState: ")?(s=c.trim()+`
`+t,r[0]=i):c.includes("};")&&r[0]!==-1&&(r[1]=i));}),console.log(r,e.slice(0,25)),e=[...e.slice(0,r[0]),s,...e.slice(r[1]+1)],e.join(`
`)}function q(e,t){return $(this,null,function*(){let s="",r="",c=[],i=[],u=[],l=[],m=["InputSwitch"];t.crudFields.forEach((n,y)=>{let g="",h="";switch(n.required&&!m.includes(n.type)&&c.push(n.name),n.type){case"InputText":n.tableDisplay&&u.push(C(n.name)),i.push(G(n.name,n.required)),g="string",h='""';break;case"InputTextarea":n.tableDisplay&&u.push(C(n.name)),i.push(Z(n.name,n.required)),g="string",h='""';break;case"InputNumber":n.tableDisplay&&u.push(C(n.name)),i.push(W(n.name,n.required)),g="number",h="0";break;case"Dropdown":n.tableDisplay&&u.push(C(n.name)),i.push(H(n.name,n.required)),l.push({fieldName:n.name,options:n.options||[]}),g="string",h='""';break;case"RadioButton":n.tableDisplay&&u.push(C(n.name)),i.push(Q(n.name,n.options||[],n.required)),g="string",h='""';break;case"InputSwitch":n.tableDisplay&&u.push(C(n.name)),i.push(Y(n.name)),g="boolean",h="false";break}y===0&&(s+=`  id?: string;
`,r+=`  id: "",
`),s+=`  ${n.name}: ${g};
`,r+=`  ${n.name}: ${h},
`,y===t.crudFields.length-1&&(s+=`}
`,r+=`};
`);});let X="./.adminkit",w=`./src/screens/${e}`,b=`${w}/${e}.tsx`,R=`${w}/Create${e}.tsx`,N=`${w}/Edit${e}.tsx`,K="./src/layout/items.json",ee=p.readFileSync(`${X}/XXXXX.tsx`).toString(),te=p.readFileSync(`${X}/CreateXXXXX.tsx`).toString(),ne=p.readFileSync(`${X}/EditXXXXX.tsx`).toString(),se=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),D=[];se.split(`
`).forEach(n=>{n.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')&&D.push(...u),D.push(n);});let re=I(D,r);p.writeFileSync(b,re);let oe=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(n=>`entity.${n}`).join(" && ")}) {`),ie=I(oe.split(`
`),r),O=[];ie.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&l.forEach(({fieldName:y,options:g})=>{O.push(`const ${y}Options = ${JSON.stringify(g,null,2)};
`);}),O.push(n);}),p.writeFileSync(R,O.join(`
`));let ae=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,i.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${c.map(n=>`entity.${n}`).join(" && ")}) {`),ce=I(ae.split(`
`),r),B=[];ce.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&l.forEach(({fieldName:y,options:g})=>{B.push(`const ${y}Options = ${JSON.stringify(g,null,2)};
`);}),B.push(n);}),p.writeFileSync(N,B.join(`
`));let pe=p.readFileSync(K),M=JSON.parse(pe.toString());M[0].items.push({label:e,to:`/${e.toLowerCase()}`}),p.writeFileSync(K,JSON.stringify(M,null,2)),a.start(`Creating service/${e}Service.ts`);let le=p.readFileSync(`${X}/XXXXXService.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());p.writeFileSync(`./src/service/${e}Service.ts`,le),a.succeed(`Created ${j.cyan(`service/${e}Service.ts`)}`),a.start(`Creating types/${e.toLowerCase()}.d.ts`),p.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let me=p.readFileSync(`${X}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;p.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,me),a.succeed(`Created ${j.cyan(`types/${e}.d.ts`)}`),a.start(`Creating route for ${e}`);let ue=p.readFileSync("./src/main.tsx").toString().split(`
`),Xe=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],ge=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],L=[];L.push(...ge),ue.forEach(n=>{n.includes("</Route>")&&Xe.forEach(y=>{L.push(y);}),L.push(n);}),p.writeFileSync("./src/main.tsx",L.join(`
`)),a.succeed(`Created route: ${j.cyan(`/${e.toLowerCase()}`)}`);})}var _=z.object({screens:z.array(z.object({name:z.string(),url:z.string(),crudFields:z.array(z.object({name:z.string(),required:z.boolean().optional().default(!0),tableDisplay:z.boolean().optional().default(!0),type:z.union([z.literal("InputText"),z.literal("InputTextarea"),z.literal("InputNumber"),z.literal("Dropdown"),z.literal("RadioButton"),z.literal("InputSwitch")]),options:z.array(z.object({name:z.string(),value:z.string()})).optional()}))}))});var P=(()=>{if(!p.existsSync("kit.config.json"))return null;let e=JSON.parse(p.readFileSync("kit.config.json").toString());return _.parse(e)})();function E(e){return $(this,null,function*(){var l,m;let t=(m=(l=P)==null?void 0:l.screens)==null?void 0:m.find(X=>X.name.toLowerCase()===e.toLowerCase());if(!t){a.fail(`Screen ${j.cyan(e)} not found in config file`);return}let s=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Creating screen: ${j.cyan(s)}`);let r=`./src/screens/${s}`;if(p.existsSync(r)){a.fail(`Screen ${j.cyan(s)} already exists`);return}let c=`${r}/${s}.tsx`,i=`${r}/Create${s}.tsx`,u=`${r}/Edit${s}.tsx`;p.createFileSync(c),p.createFileSync(i),p.createFileSync(u),yield q(s,t),a.succeed(`Created screen: ${j.cyan(s)}`);})}function A(){return $(this,null,function*(){yield T(),P&&P.screens.map(e=>{E(e.name);});})}function J(e){let t=e.charAt(0).toUpperCase()+e.slice(1);a.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,r=`./src/service/${t}Service.ts`,c=`./src/screens/${t}`,i="./src/layout/items.json",u=p.readFileSync(i),l=JSON.parse(u.toString());l[0].items=l[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),p.writeFileSync(i,JSON.stringify(l,null,2)),p.removeSync(s),p.removeSync(r),p.removeSync(c);let m=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],w=p.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>m.filter(R=>b.includes(R)).length===0);p.writeFileSync("./src/main.tsx",w.join(`
`)),a.succeed(`Removed screen: ${e}`);}var a=ye({color:"blue",indent:2}),fe=e=>$(void 0,null,function*(){a.start("Cloning template"),yield de().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),a.succeed("Cloned template successfully"),process.chdir(e),p.ensureDirSync("./.adminkit"),p.copyFileSync("./src/screens/XXXXX/XXXXX.tsx","./.adminkit/XXXXX.tsx"),p.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx","./.adminkit/CreateXXXXX.tsx"),p.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx","./.adminkit/EditXXXXX.tsx"),p.copyFileSync("./src/service/XXXXXService.ts","./.adminkit/XXXXXService.ts"),p.copyFileSync("./src/types/xxxxx.d.ts","./.adminkit/xxxxx.d.ts"),console.log(`
Run the following commands to get started:
cd ${j.green(e)}
npm install
`),T();}),S=new Command;S.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");S.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(fe);S.command("addscreen").description("Create a new screen").argument("<screenName>","Name of the screen").action(E);S.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(J);S.command("sync").description('Add screens defined in "kit.config.json" to the project').action(A);S.parse();

export { a as spinner };
