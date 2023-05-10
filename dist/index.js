var x=(e,t,s)=>new Promise((r,a)=>{var o=u=>{try{m(s.next(u))}catch(X){a(X)}},p=u=>{try{m(s.throw(u))}catch(X){a(X)}},m=u=>u.done?r(u.value):Promise.resolve(u.value).then(o,p);m((s=s.apply(e,t)).next())});import{Command as de}from"commander";import he from"ora";import fe from"simple-git";import{exec as $e}from"child_process";var V=(e,t)=>new Promise((s,r)=>{$e(e,t,(a,o,p)=>{a?(console.log(p,`
`,a),r(a)):s(o)})});import F from"fs-extra";function I(){return x(this,null,function*(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];F.removeSync("./.git"),F.removeSync("./src/service/XXXXXService.ts"),F.removeSync("./src/screens/XXXXX"),F.removeSync("./src/types/xxxxx.d.ts");let r=F.readFileSync("./src/main.tsx").toString().split(`
`).filter(a=>e.filter(o=>a.includes(o)).length===0);F.writeFileSync("./src/main.tsx",r.join(`
`))})}import j from"fs-extra";import k from"chalk";import l from"fs-extra";import U from"chalk";var d=e=>{let t=e.replace(/([A-Z])/g," $1");return t.charAt(0).toUpperCase()+t.slice(1)},W=e=>e.charAt(0).toUpperCase()+e.slice(1);var $=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${d(e)} is required.</small>}`],G=(e,t=!0)=>`<div className="field">
<label htmlFor="${e}">${d(e)}</label>
<InputNumber
  id="${e}"
  value={entity.${e}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e}")}
  ${t?$(e)[0]:""}
  />
  ${t?$(e)[1]:""}
</div>`,Z=(e,t=!0)=>`<div className="field">
<label htmlFor="${e}">${d(e)}</label>
<InputText
  id="${e}"
  value={entity.${e}}
  onChange={(e) => onInputChange(e.target.value, "${e}")}
  required
  autoFocus
  ${t?$(e)[0]:""}
/>
  ${t?$(e)[1]:""}
</div>`,H=(e,t=!0)=>`<div className="field">
<label htmlFor="${e}">${d(e)}</label>
<InputTextarea
  id="${e}"
  value={entity.${e}}
  onChange={(e) => onInputChange(e.target.value, "${e}")}
  ${t?$(e)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${t?$(e)[1]:""}
</div>`,Q=(e,t=!0)=>`<div className="field">
<Dropdown
  value={entity.${e}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e}")}
  options={${e}Options}
  optionLabel="name"
  placeholder="Select a ${d(e)}"
  ${t?$(e)[0]:""}
/>
  ${t?$(e)[1]:""}
</div>`,ye=(e,t,s)=>`<div className="flex align-items-center">
      <RadioButton
        value="${t.value}"
        onChange={(e) => onInputChange(e.value, "${e}")}
        checked={entity.${e} === "${t.value}"}
        ${s?$(e)[0]:""}
      />
      <label className="ml-2 text-sm">
        ${t.name}
      </label>
    </div>
`,Y=(e,t,s=!0)=>`<div className="field">
  <p className="mt-5">Choose ${d(e)}</p>
  <div className="flex flex-wrap gap-3">
    ${t.map(r=>ye(e,r,s)).join(`
`)}
  </div>
  ${s?$(e)[1]:""}
</div>
`,_=e=>`<div className="field flex items-center">
  <p className="mr-2">${d(e)}</p>
  <InputSwitch checked={entity.${e}} onChange={(e) => onInputChange(e.value, "${e}")} />
</div>`;var f=e=>`<Column
  field="${e}"
  header="${W(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;function T(e,t){let s="",r=[-1,-1];return e.forEach((a,o)=>{r[1]===-1&&(a.includes("const initialState: ")?(s=a.trim()+`
`+t,r[0]=o):a.includes("};")&&r[0]!==-1&&(r[1]=o))}),console.log(r,e.slice(0,25)),e=[...e.slice(0,r[0]),s,...e.slice(r[1]+1)],e.join(`
`)}function A(e,t){return x(this,null,function*(){let s="",r="",a=[],o=[],p=[],m=[],u=["InputSwitch"];t.crudFields.forEach((n,y)=>{let g="",h="";switch(n.required&&!u.includes(n.type)&&a.push(n.name),n.type){case"InputText":n.tableDisplay&&p.push(f(n.name)),o.push(Z(n.name,n.required)),g="string",h='""';break;case"InputTextarea":n.tableDisplay&&p.push(f(n.name)),o.push(H(n.name,n.required)),g="string",h='""';break;case"InputNumber":n.tableDisplay&&p.push(f(n.name)),o.push(G(n.name,n.required)),g="number",h="0";break;case"Dropdown":n.tableDisplay&&p.push(f(n.name)),o.push(Q(n.name,n.required)),m.push({fieldName:n.name,options:n.options||[]}),g="string",h='""';break;case"RadioButton":n.tableDisplay&&p.push(f(n.name)),o.push(Y(n.name,n.options||[],n.required)),g="string",h='""';break;case"InputSwitch":n.tableDisplay&&p.push(f(n.name)),o.push(_(n.name)),g="boolean",h="false";break}y===0&&(s+=`  id?: string;
`,r+=`  id: "",
`),s+=`  ${n.name}: ${g};
`,r+=`  ${n.name}: ${h},
`,y===t.crudFields.length-1&&(s+=`}
`,r+=`};
`)});let X="./.adminkit",w=`./src/screens/${e}`,b=`${w}/${e}.tsx`,R=`${w}/Create${e}.tsx`,ee=`${w}/Edit${e}.tsx`,K="./src/layout/items.json",te=l.readFileSync(`${X}/XXXXX.tsx`).toString(),ne=l.readFileSync(`${X}/CreateXXXXX.tsx`).toString(),se=l.readFileSync(`${X}/EditXXXXX.tsx`).toString(),re=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()),D=[];re.split(`
`).forEach(n=>{n.includes('<Column body={actionBodyTemplate} headerStyle={{ minWidth: "10rem" }}></Column>')&&D.push(...p),D.push(n)});let oe=T(D,r);l.writeFileSync(b,oe);let ie=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,o.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${a.map(n=>`entity.${n}`).join(" && ")}) {`),ae=T(ie.split(`
`),r),O=[];ae.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&m.forEach(({fieldName:y,options:g})=>{O.push(`const ${y}Options = ${JSON.stringify(g,null,2)};
`)}),O.push(n)}),l.writeFileSync(R,O.join(`
`));let ce=se.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(/INPUT\-FIELDS/g,o.join(`
`)).replace(/if \(entity.name.trim\(\)\) \{/,`if (${a.map(n=>`entity.${n}`).join(" && ")}) {`),pe=T(ce.split(`
`),r),B=[];pe.split(`
`).forEach(n=>{n.includes("const saveEntity = async () => {")&&m.forEach(({fieldName:y,options:g})=>{B.push(`const ${y}Options = ${JSON.stringify(g,null,2)};
`)}),B.push(n)}),l.writeFileSync(ee,B.join(`
`));let le=l.readFileSync(K),M=JSON.parse(le.toString());M[0].items.push({label:e,to:`/${e.toLowerCase()}`}),l.writeFileSync(K,JSON.stringify(M,null,2)),c.start(`Creating service/${e}Service.ts`);let me=l.readFileSync(`${X}/XXXXXService.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase());l.writeFileSync(`./src/service/${e}Service.ts`,me),c.succeed(`Created ${U.cyan(`service/${e}Service.ts`)}`),c.start(`Creating types/${e.toLowerCase()}.d.ts`),l.createFile(`./src/types/${e.toLowerCase()}.d.ts`);let ue=l.readFileSync(`${X}/xxxxx.d.ts`).toString().replace(/XXXXX/g,e).split(`
`)[0]+`
`+s;l.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ue),c.succeed(`Created ${U.cyan(`types/${e}.d.ts`)}`),c.start(`Creating route for ${e}`);let Xe=l.readFileSync("./src/main.tsx").toString().split(`
`),ge=[`      <Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`      <Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`      <Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],xe=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],L=[];L.push(...xe),Xe.forEach(n=>{n.includes("</Route>")&&ge.forEach(y=>{L.push(y)}),L.push(n)}),l.writeFileSync("./src/main.tsx",L.join(`
`)),c.succeed(`Created route: ${U.cyan(`/${e.toLowerCase()}`)}`)})}import N from"fs-extra";import{z as i}from"zod";var z=i.object({screens:i.array(i.object({name:i.string(),url:i.string(),crudFields:i.array(i.object({name:i.string(),required:i.boolean().optional().default(!0),tableDisplay:i.boolean().optional().default(!0),type:i.union([i.literal("InputText"),i.literal("InputTextarea"),i.literal("InputNumber"),i.literal("Dropdown"),i.literal("RadioButton"),i.literal("InputSwitch")]),options:i.array(i.object({name:i.string(),value:i.string()})).optional()}))}))});var P=(()=>{if(!N.existsSync("kit.config.json"))return null;let e=JSON.parse(N.readFileSync("kit.config.json").toString());return z.parse(e)})();function E(e){return x(this,null,function*(){var m,u;let t=(u=(m=P)==null?void 0:m.screens)==null?void 0:u.find(X=>X.name.toLowerCase()===e.toLowerCase());if(!t){c.fail(`Screen ${k.cyan(e)} not found in config file`);return}let s=e.charAt(0).toUpperCase()+e.slice(1);c.start(`Creating screen: ${k.cyan(s)}`);let r=`./src/screens/${s}`;if(j.existsSync(r)){c.fail(`Screen ${k.cyan(s)} already exists`);return}let a=`${r}/${s}.tsx`,o=`${r}/Create${s}.tsx`,p=`${r}/Edit${s}.tsx`;j.createFileSync(a),j.createFileSync(o),j.createFileSync(p),yield A(s,t),c.succeed(`Created screen: ${k.cyan(s)}`)})}function q(){return x(this,null,function*(){yield I(),P&&P.screens.map(e=>{E(e.name)})})}import C from"fs-extra";function J(e){let t=e.charAt(0).toUpperCase()+e.slice(1);c.start(`Removing screen: ${e}`);let s=`./src/types/${e}.d.ts`,r=`./src/service/${t}Service.ts`,a=`./src/screens/${t}`,o="./src/layout/items.json",p=C.readFileSync(o),m=JSON.parse(p.toString());m[0].items=m[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),C.writeFileSync(o,JSON.stringify(m,null,2)),C.removeSync(s),C.removeSync(r),C.removeSync(a);let u=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],w=C.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>u.filter(R=>b.includes(R)).length===0);C.writeFileSync("./src/main.tsx",w.join(`
`)),c.succeed(`Removed screen: ${e}`)}import v from"fs-extra";var c=he({color:"blue",indent:2}),Ce=e=>x(void 0,null,function*(){c.start("Cloning template"),yield fe().clone("https://github.com/kuvamdazeus/admin-starter-react","./"+e),c.succeed("Cloned template successfully"),process.chdir(e),v.ensureDirSync("./.adminkit"),v.copyFileSync("./src/screens/XXXXX/XXXXX.tsx","./.adminkit/XXXXX.tsx"),v.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx","./.adminkit/CreateXXXXX.tsx"),v.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx","./.adminkit/EditXXXXX.tsx"),v.copyFileSync("./src/service/XXXXXService.ts","./.adminkit/XXXXXService.ts"),v.copyFileSync("./src/types/xxxxx.d.ts","./.adminkit/xxxxx.d.ts"),c.start("Installing dependencies"),yield V("yarn"),c.succeed("Installed dependencies successfully"),I()}),S=new de;S.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");S.command("scaffold").description("Scaffold a new admin UI project by using template").argument("<projectName>","Name of the project").action(Ce);S.command("addscreen").description("Create a new screen").argument("<screenName>","Name of the screen").action(E);S.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(J);S.command("sync").description('Add screens defined in "kit.config.json" to the project').action(q);S.parse();export{c as spinner};
