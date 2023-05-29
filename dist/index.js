#! /usr/bin/env node
import { Command } from 'commander';
import Ae from 'os';
import g from 'fs-extra';
import j from 'chalk';
import Fe from 'ora';
import { z as z$1 } from 'zod';
import je from 'simple-git';
import ke from 'node-fetch';
import { exec } from 'child_process';

var u=(e,n,r)=>new Promise((t,a)=>{var i=X=>{try{d(r.next(X));}catch(y){a(y);}},o=X=>{try{d(r.throw(X));}catch(y){a(y);}},d=X=>X.done?t(X.value):Promise.resolve(X.value).then(i,o);d((r=r.apply(e,n)).next());});function O(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];g.removeSync("./.git"),g.removeSync("./src/screens/XXXXX"),g.removeSync("./src/types/xxxxx.d.ts");let t=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(a=>e.filter(i=>a.includes(i)).length===0);g.writeFileSync("./src/main.tsx",t.join(`
`));}var T=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},D=e=>e.charAt(0).toUpperCase()+e.slice(1);var E=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${T(e)} is required.</small>}`],de=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
  />
  ${e.required?E(e.name)[1]:""}
</div>`,ye=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,ge=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${T(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${T(e.name)}"
  style={{ width: "100%" }}
  ${e.required?E(e.name)[0]:""}
/>
  ${e.required?E(e.name)[1]:""}
</div>`,Te=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?E(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,fe=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${T(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(r=>Te(e,r)).join(`
`)}
  </div>
  ${e.required?E(e.name)[1]:""}
</div>
`,xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${T(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`;var L=e=>`<Column
  field="${e}"
  header="${D(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`;var G=Fe({color:"blue",indent:2}),v={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function oe(e,n){return u(this,null,function*(){let r="",t="",a=[],i=[],o=[],d=[],X=["InputSwitch"];n.crudFields.forEach((s,P)=>{let F="",R="";switch(s.required&&!X.includes(s.type)&&a.push(s.name),s.type){case"InputText":s.tableDisplay&&o.push(L(s.name)),i.push(ye(s)),F="string",R='""';break;case"InputTextarea":s.tableDisplay&&o.push(L(s.name)),i.push(ge(s)),F="string",R='""';break;case"InputNumber":s.tableDisplay&&o.push(L(s.name)),i.push(de(s)),F="number",R="0";break;case"Dropdown":s.tableDisplay&&o.push(L(s.name)),i.push($e(s)),d.push({fieldName:s.name,options:s.options||[]}),F="string",R='""';break;case"RadioButton":s.tableDisplay&&o.push(L(s.name)),i.push(fe(s,s.options||[])),F="string",R='""';break;case"InputSwitch":s.tableDisplay&&o.push(L(s.name)),i.push(xe(s)),F="boolean",R="false";break}P===0&&(r+=`id?: string;
`,t+=`id: undefined,
`),r+=`${s.name}: ${F};
`,t+=`${s.name}: ${R},
`;});let y=`./src/screens/${e}`,S=`${y}/${e}.tsx`,A=`${y}/Create${e}.tsx`,ee=`${y}/Edit${e}.tsx`,H="./src/layout/items.json",te=g.readFileSync(`${m}/webapp/XXXXX.tsx`).toString(),ne=g.readFileSync(`${m}/webapp/CreateXXXXX.tsx`).toString(),re=g.readFileSync(`${m}/webapp/EditXXXXX.tsx`).toString(),se=g.readFileSync(`${m}/webapp/xxxxx.d.ts`).toString(),p=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(v.initialState,t),h=[];p.split(`
`).forEach(s=>{s.includes(v.tableColumns)&&h.push(...o),h.push(s);}),g.writeFileSync(S,h.join(`
`));let C=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(v.input,i.join(`
`)).replace(v.validate,`if (${a.map(s=>`entity.${s}`).join(" && ")}) `),w=[];C.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:P,options:F})=>{w.push(`const ${P}Options = ${JSON.stringify(F,null,2)};
`);}),w.push(s)):(s.includes(v.initialState)&&w.push(t),w.push(s));}),g.writeFileSync(A,w.join(`
`));let we=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(v.input,i.join(`
`)).replace(v.validate,`if (${a.map(s=>`entity.${s}`).join(" && ")}) `),k=[];we.split(`
`).forEach(s=>{s.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:P,options:F})=>{k.push(`const ${P}Options = ${JSON.stringify(F,null,2)};
`);}),k.push(s)):(s.includes(v.initialState)&&k.push(t),k.push(s));}),g.writeFileSync(ee,k.join(`
`));let Ee=g.readFileSync(H),Xe=JSON.parse(Ee.toString());Xe[0].items.push({label:e,to:`/${e.toLowerCase()}`}),g.writeFileSync(H,JSON.stringify(Xe,null,2)),G.start(`Creating types/${e.toLowerCase()}.d.ts`);let Se=se.replace(/XXXXX/g,e).replace(v.interface,r);g.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Se),G.succeed(`Created ${j.cyan(`types/${e}.d.ts`)}`),G.start(`Creating route for ${e}`);let ve=g.readFileSync("./src/main.tsx").toString().split(`
`),be=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Ie=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],W=[];W.push(...Ie),ve.forEach(s=>{s.includes("{/* --ROUTES-- */}")&&be.forEach(P=>{W.push(P);}),W.push(s);}),g.writeFileSync("./src/main.tsx",W.join(`
`)),G.succeed(`Created route: ${j.cyan(`/${e.toLowerCase()}`)}`);})}var Ce=z$1.object({backendUrl:z$1.string().optional().default("http://localhost:3000"),screens:z$1.array(z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),type:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("InputNumber"),z$1.literal("Dropdown"),z$1.literal("RadioButton"),z$1.literal("InputSwitch")]),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}))});var Q=(e=process.cwd())=>g.readdirSync(e).includes("kitconfig"),b=(e,n)=>u(void 0,null,function*(){let r=process.cwd().split("/").at(-1),t;return r===e||Q()&&e==="root"?t=yield n():Q()?(process.chdir(e),t=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),t=yield n(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=yield n(),process.chdir(".."),process.chdir(r)),t}),M=(e,n)=>{let r=process.cwd().split("/").at(-1),t;return r===e||Q()&&e==="root"?t=n():Q()?(process.chdir(e),t=n(),process.chdir("..")):e==="root"?(process.chdir(".."),t=n(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=n(),process.chdir(".."),process.chdir(r)),t};var U=()=>M("root",()=>{let e={backendUrl:"",screens:[]};if(!g.existsSync("kitconfig")||!g.existsSync("kitconfig/index.json"))return null;let n=g.readJSONSync("kitconfig/index.json");e.backendUrl=n.backendUrl,g.readdirSync("kitconfig/screens").map(a=>{let i=g.readJSONSync(`kitconfig/screens/${a}`);e.screens.push(i);});let t=Ce.safeParse(e);return t.success?t.data:(console.error("Config parsing error",t.error),null)});var B=(e,n)=>{let r="";return n.filter(t=>!!t).forEach(t=>{r+=`const existing${D(t)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${t},
  _id: { $ne: id },
});

if (existing${D(t)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r},J=(e,n)=>{let r=`const { ${n.join(", ")} } = input;
`;return n.filter(t=>!!t).forEach(t=>{r+=`
const existing${D(t)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
  });

if (existing${D(t)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r};var c={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ie(e,n){return u(this,null,function*(){let r=n.crudFields.filter(p=>p.unique).map(p=>p.name),t=[],a=[],i=[],o=[];n.crudFields.forEach(({name:p,type:h,required:C,unique:w})=>{t.push(`${p}: entity.${p},`),h==="InputText"||h==="InputTextarea"||h==="Dropdown"||h==="RadioButton"?(a.push(`${p}${C?"":"?"}: string;`),i.push(`${p}: { type: String, required: ${C}, unique: ${w} },`),o.push(`${p}: z.string()${C?".nonempty()":".optional()"},`)):h==="InputNumber"?(a.push(`${p}${C?"":"?"}: number;`),i.push(`${p}: { type: Number, required: ${C}, unique: ${w} },`),o.push(`${p}: z.number()${C?"":".optional()"},`)):h==="InputSwitch"&&(a.push(`${p}${C?"":"?"}: boolean;`),i.push(`${p}: { type: Boolean, required: ${C}, unique: ${w} },`),o.push(`${p}: z.boolean()${C?"":".optional()"},`));});let d=`./src/Microservices/${e}`,X=g.readFileSync(`${m}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,a.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,t.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,J(e,r)).replace(c.checkExistingUpdateEntity,B(e,r)),y=g.readFileSync(`${m}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,a.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,t.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,J(e,r)).replace(c.checkExistingUpdateEntity,B(e,r)),S=g.readFileSync(`${m}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,a.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,t.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,J(e,r)).replace(c.checkExistingUpdateEntity,B(e,r)),A=g.readFileSync(`${m}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(c.interface,a.join(`
`)).replace(c.schema,i.join(`
`)).replace(c.entity,t.join(`
`)).replace(c.zod,o.join(`
`)).replace(c.uniqueFields,r.join(", ")).replace(c.checkExistingCreateEntity,J(e,r)).replace(c.checkExistingUpdateEntity,B(e,r)),ee=`${d}/${e}Controller.ts`,H=`${d}/${e}Router.ts`,te=`${d}/${e}.dto.ts`,ne=`./src/Database/Entities/${e}Entity.ts`;g.writeFileSync(ee,X),g.writeFileSync(H,y),g.writeFileSync(te,S),g.writeFileSync(ne,A);let re=g.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(p=>p.includes("export const ")?p+`
${e}Collection: "${n.collectionName}",`:p).join(`
`);g.writeFileSync("./src/Database/CollectionNames.ts",re);let se=g.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(p=>p.includes("const ApiRouter =")?p+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:p.includes('import * as express from "express";')?p+`
import { ${e}Router } from "./${e}/${e}Router";`:p).join(`
`);g.writeFileSync("./src/Microservices/ApiRouter.ts",se);})}var Y=Fe({color:"blue",indent:2}),ce=Fe({color:"blue",indent:2});function V(e){return u(this,null,function*(){var a,i;let n=e.toLowerCase(),r=(i=(a=U())==null?void 0:a.screens)==null?void 0:i.find(o=>o.name.toLowerCase()===n.toLowerCase());if(!r){Y.fail(`Screen ${j.cyan(n)} not found in config file`);return}let t=n.charAt(0).toUpperCase()+n.slice(1);yield b("webapp",()=>u(this,null,function*(){Y.start(`Creating screen: ${j.cyan(t)}`);let o=`./src/screens/${t}`;if(g.existsSync(o)){Y.fail(`Screen ${j.cyan(t)} already exists`);return}let d=`${o}/${t}.tsx`,X=`${o}/Create${t}.tsx`,y=`${o}/Edit${t}.tsx`,S=`./src/types/${t.toLowerCase()}.d.ts`;g.createFileSync(d),g.createFileSync(X),g.createFileSync(y),g.createFileSync(S),yield oe(t,r),Y.succeed(`Created screen: ${j.cyan(t)}`);})),yield b("server",()=>u(this,null,function*(){ce.start(`Creating CRUD for: ${j.cyan(t)}`);let o=`./src/Microservices/${t}`;if(g.existsSync(o)){ce.fail(`CRUD for ${j.cyan(t)} already exists`);return}let d=`${o}/${t}Controller.ts`,X=`${o}/${t}Router.ts`,y=`${o}/${t}.dto.ts`;g.createFileSync(d),g.createFileSync(X),g.createFileSync(y),yield ie(t,r),ce.succeed(`Created CRUD for: ${j.cyan(t)}`);}));})}function ae(){return u(this,null,function*(){var e;O(),(e=U())==null||e.screens.map(n=>{V(n.name);});})}var Z=Fe({color:"blue",indent:2});function pe(e){return u(this,null,function*(){let n=e.charAt(0).toUpperCase()+e.slice(1);yield b("webapp",()=>u(this,null,function*(){Z.start(`Removing screen: ${e}`);let r=`./src/types/${e}.d.ts`,t=`./src/screens/${n}`,a="./src/layout/items.json",i=g.readFileSync(a),o=JSON.parse(i.toString());o[0].items=o[0].items.filter(S=>S.label.toLowerCase()!==n.toLowerCase()),g.writeFileSync(a,JSON.stringify(o,null,2)),g.removeSync(r),g.removeSync(t);let d=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],y=g.readFileSync("./src/main.tsx").toString().split(`
`).filter(S=>d.filter(A=>S.includes(A)).length===0);g.writeFileSync("./src/main.tsx",y.join(`
`)),Z.succeed(`Removed screen: ${e}`);})),yield b("server",()=>u(this,null,function*(){Z.start(`Removing CRUD: ${n}`);let r=`./src/Microservices/${n}`,t=`./src/Database/Entities/${n}Entity.ts`,a="./src/Database/CollectionNames.ts",i="./src/Microservices/ApiRouter.ts";g.removeSync(r),g.removeSync(t);let o=g.readFileSync(a).toString().split(`
`).filter(X=>!X.includes(`${n}Collection`)).join(`
`),d=g.readFileSync(i).toString().split(`
`).filter(X=>!X.includes(`${n}Router`)).join(`
`);g.writeFileSync(a,o),g.writeFileSync(i,d),Z.succeed(`Removed CRUD: ${n}`);}));})}function ue(){g.removeSync("./.git"),g.removeSync("./src/Microservices/XXXXX"),g.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function N(e){return u(this,null,function*(){return new Promise((n,r)=>{exec(e,()=>{n(null);});})})}var z=Fe({color:"blue",indent:2});function me(e){return u(this,null,function*(){let n=e.toLowerCase();z.start("Scaffolding project...");let[,r]=yield Promise.all([je().clone("https://github.com/kuvamdazeus/adminkit-template",n),ke("https://gist.githubusercontent.com/kuvamdazeus/08e407c3188c08c0d29012f85dd3c9d9/raw/f4d6b2e429063bf454e5d2d805f3a7806b56d491/node-starter-kit-env.txt").then(t=>t.text())]);console.log(process.cwd()),process.chdir(n),console.log(process.cwd()),g.ensureDirSync(`${m}`),g.ensureDirSync(`${m}/webapp`),g.ensureDirSync(`${m}/server`),g.removeSync("./.git"),M("webapp",()=>{var t;g.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${m}/webapp/XXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${m}/webapp/CreateXXXXX.tsx`),g.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${m}/webapp/EditXXXXX.tsx`),g.copyFileSync("./src/types/xxxxx.d.ts",`${m}/webapp/xxxxx.d.ts`),g.writeFileSync("./.env",`VITE_BASE_URL = "${(t=U())==null?void 0:t.backendUrl}"`),O();}),M("server",()=>{g.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${m}/server/XXXXXRouter.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${m}/server/XXXXXController.ts`),g.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${m}/server/XXXXX.dto.ts`),g.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${m}/server/XXXXXEntity.ts`),g.writeFileSync("./.env",r),ue();}),z.succeed(`Created "${n}" successfully!`),z.start("Installing dependencies..."),yield b("webapp",()=>u(this,null,function*(){yield N("yarn install");})),yield b("server",()=>u(this,null,function*(){yield N("yarn install");})),z.succeed("Installed dependencies successfully!");})}var m=Ae.homedir()+"/.adminkit",K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(me);K.command("addscreen").description("Add a new screen").argument("<screenName>","Name of the screen").action(V);K.command("removescreen").description("Removes an existing screen").argument("<screenName>","Name of the screen").action(pe);K.command("sync").description('Add screens defined in "kit.config.json" to the project').action(ae);K.parse();

export { m as adminKitPath };
