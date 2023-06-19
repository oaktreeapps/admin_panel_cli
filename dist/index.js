#! /usr/bin/env node
import { Command } from 'commander';
import Ve from 'simple-git';
import f from 'fs-extra';
import Ke from 'ora';
import { exec } from 'child_process';
import V from 'chalk';
import Qe from 'inquirer';
import We from 'path';
import { z as z$1 } from 'zod';

var c=(e,n,r)=>new Promise((t,s)=>{var p=g=>{try{i(r.next(g));}catch(X){s(X);}},a=g=>{try{i(r.throw(g));}catch(X){s(X);}},i=g=>g.done?t(g.value):Promise.resolve(g.value).then(p,a);i((r=r.apply(e,n)).next());});function ie(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];f.removeSync("./.git"),f.removeSync("./src/screens/XXXXX"),f.removeSync("./src/types/xxxxx.d.ts");let t=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(p=>s.includes(p)).length===0);f.writeFileSync("./src/main.tsx",t.join(`
`));}var W=(e=process.cwd())=>f.readdirSync(e).includes("kitconfig"),b=(e,n)=>c(void 0,null,function*(){let r=process.cwd().split("/").at(-1),t;return r===e||W()&&e==="root"?t=yield n():W()?(process.chdir(e),t=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),t=yield n(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=yield n(),process.chdir(".."),process.chdir(r)),t}),L=(e,n)=>{let r=process.cwd().split("/").at(-1),t;return r===e||W()&&e==="root"?t=n():W()?(process.chdir(e),t=n(),process.chdir("..")):e==="root"?(process.chdir(".."),t=n(),process.chdir(r)):(process.chdir(".."),process.chdir(e),t=n(),process.chdir(".."),process.chdir(r)),t},Y=()=>L("root",()=>{let e,n=f.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e}),U=()=>L("root",()=>process.cwd()+"/.template");function ce(){f.removeSync("./.git"),f.removeSync("./src/Microservices/XXXXX"),f.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function _(e){return c(this,null,function*(){return new Promise(n=>{exec(e,()=>{n(null);});})})}var fe=()=>`REST_API_PORT=3005
MONGO_CONNECTION_URL=

#REDIS_PORT=6379
#REDIS_HOST=redis_dev


AUTH_PRIVATE_BASE64=
AUTH_PUBLIC_BASE64=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
SMTP_FROM_NAME=

S3_REGION=
S3_ACCESS_KEY=
S3_ACCESS_ID=
S3_BUCKET_NAME=

STATIC_S3_REGION=
STATIC_S3_BUCKET_NAME=
`;var Q=Ke({color:"blue",indent:2});function le(e,n){return c(this,null,function*(){let r=e.toLowerCase();Q.start("Scaffolding project..."),yield Ve().clone("https://github.com/oaktreeapps/admin-panel",r),process.chdir(r);let t=U();f.ensureDirSync(`${t}`),f.ensureDirSync(`${t}/webapp`),f.ensureDirSync(`${t}/server`),f.removeSync("./.git"),L("webapp",()=>{f.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${t}/webapp/XXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${t}/webapp/CreateXXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${t}/webapp/EditXXXXX.tsx`),f.copyFileSync("./src/types/xxxxx.d.ts",`${t}/webapp/xxxxx.d.ts`),f.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ie();}),L("server",()=>{f.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${t}/server/XXXXXRouter.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${t}/server/XXXXXController.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${t}/server/XXXXX.dto.ts`),f.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${t}/server/XXXXXEntity.ts`),f.writeFileSync("./.env",fe()),ce();}),Q.succeed(`Created "${r}" successfully!`),n.onlyServer&&f.removeSync("webapp"),n.onlyWebapp&&f.removeSync("server"),Q.start("Installing dependencies..."),n.onlyServer||(yield b("webapp",()=>c(this,null,function*(){yield _("yarn install");}))),n.onlyWebapp||(yield b("server",()=>c(this,null,function*(){yield _("yarn install");}))),Q.succeed("Installed dependencies successfully!");})}var F=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},T=e=>e.charAt(0).toUpperCase()+e.slice(1);var xe=e=>{let n=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${T(n)}",
  url: "/${n}",
  collectionName: "${n}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Fe=Ke({color:"blue",indent:2});function pe(e){return c(this,null,function*(){let n=e.toLowerCase(),r=xe(n);Fe.start(`Creating config template for ${V.cyan(n)}`),L("root",()=>{let t=`kitconfig/resources/${n}.cjs`;f.ensureFileSync(t),f.writeFileSync(t,r);}),Fe.succeed(`Created config template for ${V.cyan(n)}`);})}var ue=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String").optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload"),z$1.literal("Calendar"),z$1.literal("Password"),z$1.literal("ColorPicker"),z$1.literal("Editor")]).default("InputText").optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}),Se=z$1.object({resources:z$1.array(ue)});var k=()=>c(void 0,null,function*(){return b("root",()=>c(void 0,null,function*(){let e={resources:[]};if(!f.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=We.join(process.cwd(),"kitconfig"),r=f.readdirSync("kitconfig/resources");yield Promise.all(r.map(s=>c(void 0,null,function*(){let p=yield import(`${n}/resources/${s}`),a=ue.safeParse(p.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let t=Se.safeParse(e);return t.success?t.data:(console.error("Config parsing error",t.error),null)}))});var y=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${F(e)} is required.</small>}`],Ee=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?y(e.name)[0]:""}
  />
  ${e.required?y(e.name)[1]:""}
</div>`,be=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
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
</div>`,Ie=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
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
</div>`,Te=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${F(e.name)}"
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,Ye=(e,n)=>`<div className="flex align-items-center">
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
`,Pe=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${F(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(r=>Ye(e,r)).join(`
`)}
  </div>
  ${e.required?y(e.name)[1]:""}
</div>
`,Re=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${F(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`,De=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
<Calendar
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,Ae=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
<Password
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  style={{ width: "100%" }}
  feedback={false}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,Le=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
<ColorPicker
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,_e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${F(e.name)}</p>
<Editor
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onTextChange(e.target.value, "${e.name}")}
  required
  style={{ height: '320px' }}
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,je=(e,n)=>`<div className="field w-full"><ImageUpload
  entity={entity}
  fieldName="${e.name}"
  onUpload={(url) => onInputChange(url, "${e.name}")}
  submitted={submitted}
  folder="${n}"
/>
${e.required?y(e.name)[1]:""}
</div>`;var I=e=>`<Column
  field="${e}"
  header="${T(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,Ue=e=>`<Column header="${T(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var R={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function me(e,n){return c(this,null,function*(){let r=U(),t="",s="",p=[],a=[],i=[],g=[],X=["InputSwitch"];n.crudFields.forEach((o,A)=>{let d=o.widget||o.datatype,C="",w="";o.required&&!X.includes(o.widget||o.datatype||"")&&p.push(o.name),d==="InputText"||d==="String"?(o.tableDisplay&&i.push(I(o.name)),a.push(be(o)),C="string",w='""'):d==="InputTextarea"?(o.tableDisplay&&i.push(I(o.name)),a.push(Ie(o)),C="string",w='""'):d==="InputNumber"||d==="Number"?(o.tableDisplay&&i.push(I(o.name)),a.push(Ee(o)),C="number",w="0"):d==="Dropdown"?(o.tableDisplay&&i.push(I(o.name)),a.push(Te(o)),g.push({fieldName:o.name,options:o.options||[]}),C="string",w='""'):d==="RadioButton"?(o.tableDisplay&&i.push(I(o.name)),a.push(Pe(o,o.options||[])),C="string",w='""'):d==="ImageFileUpload"?(o.tableDisplay&&i.push(Ue(o.name)),a.push(je(o,n.name.toLowerCase())),C="string",w='""'):d==="InputSwitch"||d==="Boolean"?(o.tableDisplay&&i.push(I(o.name)),a.push(Re(o)),C="boolean",w="false"):d==="Calendar"?(o.tableDisplay&&i.push(I(o.name)),a.push(De(o)),C="string",w='""'):d==="Password"?(o.tableDisplay&&i.push(I(o.name)),a.push(Ae(o)),C="string",w='""'):d==="ColorPicker"?(o.tableDisplay&&i.push(I(o.name)),a.push(Le(o)),C="string",w='""'):d==="Editor"&&(o.tableDisplay&&i.push(I(o.name)),a.push(_e(o)),C="string",w='""'),A===0&&(t+=`id?: string;
`,s+=`id: undefined,
`),t+=`${o.name}: ${C};
`,s+=`${o.name}: ${w},
`;});let E=`./src/screens/${e}`,P=`${E}/${e}.tsx`,O=`${E}/Create${e}.tsx`,te=`${E}/Edit${e}.tsx`,G="./src/layout/items.json",ne=f.readFileSync(`${r}/webapp/XXXXX.tsx`).toString(),re=f.readFileSync(`${r}/webapp/CreateXXXXX.tsx`).toString(),oe=f.readFileSync(`${r}/webapp/EditXXXXX.tsx`).toString(),se=f.readFileSync(`${r}/webapp/xxxxx.d.ts`).toString(),m=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(R.initialState,s),$=[];m.split(`
`).forEach(o=>{o.includes(R.tableColumns)&&$.push(...i),$.push(o);}),f.writeFileSync(P,$.join(`
`));let M=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(R.input,a.join(`
`)).replace(R.validate,`if (${p.map(o=>`entity.${o}`).join(" && ")}) `),h=[];M.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(g.forEach(({fieldName:A,options:d})=>{h.push(`const ${A}Options = ${JSON.stringify(d,null,2)};
`);}),h.push(o)):(o.includes(R.initialState)&&h.push(s),h.push(o));}),f.writeFileSync(O,h.join(`
`));let q=oe.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(R.input,a.join(`
`)).replace(R.validate,`if (${p.map(o=>`entity.${o}`).join(" && ")}) `),j=[];q.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(g.forEach(({fieldName:A,options:d})=>{j.push(`const ${A}Options = ${JSON.stringify(d,null,2)};
`);}),j.push(o)):(o.includes(R.initialState)&&j.push(s),j.push(o));}),f.writeFileSync(te,j.join(`
`));let Oe=f.readFileSync(G),$e=JSON.parse(Oe.toString());$e[0].items.push({label:e,to:`/${e.toLowerCase()}`}),f.writeFileSync(G,JSON.stringify($e,null,2));let Me=se.replace(/XXXXX/g,e).replace(R.interface,t);f.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Me);let qe=f.readFileSync("./src/main.tsx").toString().split(`
`),Be=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Ne=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...Ne),qe.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&Be.forEach(A=>{J.push(A);}),J.push(o);}),f.writeFileSync("./src/main.tsx",J.join(`
`));})}var N=(e,n)=>{let r="";return n.filter(t=>!!t).forEach(t=>{r+=`const existing${T(t)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${t},
  _id: { $ne: id },
});

if (existing${T(t)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r},H=(e,n)=>{let r=`const { ${n.join(", ")} } = input;
`;return n.filter(t=>!!t).forEach(t=>{r+=`
const existing${T(t)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
  });

if (existing${T(t)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),r};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ge(e,n){return c(this,null,function*(){let r=U(),t=n.crudFields.filter(m=>m.unique).map(m=>m.name),s=[],p=[],a=[],i=[];n.crudFields.forEach(({name:m,widget:$,datatype:M,required:h,unique:q})=>{s.push(`${m}: entity.${m},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"||$==="ImageFileUpload"||$==="Calendar"||$==="Password"||$==="ColorPicker"||$==="Editor"||M==="String"?(p.push(`${m}${h?"":"?"}: string;`),a.push(`${m}: { type: String, required: ${h}, unique: ${q} },`),i.push(`${m}: z.string()${h?".nonempty()":".optional().nullable()"},`)):$==="InputNumber"||M==="Number"?(p.push(`${m}${h?"":"?"}: number;`),a.push(`${m}: { type: Number, required: ${h}, unique: ${q} },`),i.push(`${m}: z.number()${h?"":".optional().nullable()"},`)):($==="InputSwitch"||M==="Boolean")&&(p.push(`${m}${h?"":"?"}: boolean;`),a.push(`${m}: { type: Boolean, required: ${h}, unique: ${q} },`),i.push(`${m}: z.boolean()${h?"":".optional().nullable()"},`));});let g=`./src/Microservices/${e}`,X=f.readFileSync(`${r}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,N(e,t)),E=f.readFileSync(`${r}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,N(e,t)),P=f.readFileSync(`${r}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,N(e,t)),O=f.readFileSync(`${r}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,", "+t.join(", ")).replace(u.checkExistingCreateEntity,H(e,t)).replace(u.checkExistingUpdateEntity,N(e,t)),te=`${g}/${e}Controller.ts`,G=`${g}/${e}Router.ts`,ne=`${g}/${e}.dto.ts`,re=`./src/Database/Entities/${e}Entity.ts`;f.writeFileSync(te,X),f.writeFileSync(G,E),f.writeFileSync(ne,P),f.writeFileSync(re,O);let oe=f.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${n.collectionName}",`:m).join(`
`);f.writeFileSync("./src/Database/CollectionNames.ts",oe);let se=f.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);f.writeFileSync("./src/Microservices/ApiRouter.ts",se);})}var ye=Ke({color:"blue",indent:2}),ke=Ke({color:"blue",indent:2});function Z(e){return c(this,null,function*(){var p,a;let n=Y(),r=e.toLowerCase(),t=(a=(p=yield k())==null?void 0:p.resources)==null?void 0:a.find(i=>i.name.toLowerCase()===r.toLowerCase());if(!t){ye.fail(`Resource ${V.cyan(r)} not found in config file`);return}let s=r.charAt(0).toUpperCase()+r.slice(1);(n==="both"||n==="webapp")&&(yield b("webapp",()=>c(this,null,function*(){let i=`./src/screens/${s}`;if(f.existsSync(i))return;ye.start(`Creating screen: ${V.cyan(s)}`);let g=`${i}/${s}.tsx`,X=`${i}/Create${s}.tsx`,E=`${i}/Edit${s}.tsx`,P=`./src/types/${s.toLowerCase()}.d.ts`;f.createFileSync(g),f.createFileSync(X),f.createFileSync(E),f.createFileSync(P),yield me(s,t),yield _("yarn prettify"),ye.succeed(`Created screen: ${V.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield b("server",()=>c(this,null,function*(){let i=`./src/Microservices/${s}`;if(f.existsSync(i))return;ke.start(`Creating CRUD for: ${V.cyan(s)}`);let g=`${i}/${s}Controller.ts`,X=`${i}/${s}Router.ts`,E=`${i}/${s}.dto.ts`;f.createFileSync(g),f.createFileSync(X),f.createFileSync(E),yield ge(s,t),yield _("yarn prettify"),ke.succeed(`Created CRUD for: ${V.cyan(s)}`);})));})}function de(e){return c(this,null,function*(){var t;let n=yield k(),r=(n==null?void 0:n.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)r.forEach(p=>c(this,[p],function*({name:s}){yield Z(s);}));else {let s=yield Qe.prompt([{name:"resourceNames",message:"Please select resources that you want to add to the project:",type:"checkbox",choices:r}]);(t=s==null?void 0:s.resourceNames)==null||t.forEach(p=>c(this,null,function*(){yield Z(p);}));}})}var z=Ke({color:"blue",indent:2});function ee(e){return c(this,null,function*(){let n=Y(),r=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield b("webapp",()=>c(this,null,function*(){let t=`./src/types/${e}.d.ts`,s=`./src/screens/${r}`,p="./src/layout/items.json";if(!f.existsSync(s)){console.log("  Nothing to remove in webapp.");return}z.start(`Removing screen: ${e}`);let a=f.readFileSync(p),i=JSON.parse(a.toString());i[0].items=i[0].items.filter(P=>P.label.toLowerCase()!==r.toLowerCase()),f.writeFileSync(p,JSON.stringify(i,null,2)),f.removeSync(t),f.removeSync(s);let g=[`<Route path="${r.toLowerCase()}" element={<${r}Page />} />`,`<Route path="${r.toLowerCase()}/create" element={<Create${r}Page />} />`,`<Route path="${r.toLowerCase()}/edit/:id" element={<Edit${r}Page />} />`,`import ${r}Page from "./screens/${r}/${r}"`,`import Edit${r}Page from "./screens/${r}/Edit${r}"`,`import Create${r}Page from "./screens/${r}/Create${r}"`],E=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>g.filter(O=>P.includes(O)).length===0);f.writeFileSync("./src/main.tsx",E.join(`
`)),z.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield b("server",()=>c(this,null,function*(){let t=`./src/Microservices/${r}`,s=`./src/Database/Entities/${r}Entity.ts`,p="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!f.existsSync(t)){console.log("  Nothing to remove in server.");return}z.start(`Removing CRUD: ${r}`),f.removeSync(t),f.removeSync(s);let i=f.readFileSync(p).toString().split(`
`).filter(X=>!X.includes(`${r}Collection`)).join(`
`),g=f.readFileSync(a).toString().split(`
`).filter(X=>!X.includes(`${r}Router`)).join(`
`);f.writeFileSync(p,i),f.writeFileSync(a,g),z.succeed(`Removed CRUD: ${r}`);})));})}function Xe(e){return c(this,null,function*(){var t;let n=yield k(),r=(n==null?void 0:n.resources.map(s=>({name:s.name.toLowerCase()})))||[];if(e!=null&&e.all)r.forEach(p=>c(this,[p],function*({name:s}){yield ee(s);}));else {let s=yield Qe.prompt([{name:"resourceNames",message:"Please select resources that you want to remove from the project:",type:"checkbox",choices:r}]);(t=s==null?void 0:s.resourceNames)==null||t.forEach(p=>c(this,null,function*(){yield ee(p);}));}})}var K=new Command;K.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");K.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(le);K.command("addconfig").description("Add config file for a resource by passing in the resource name").argument("<resourceName>","Name of the resource you want to add config file for").action(pe);K.command("add").description("Adds new resources").option("--all","All resources present in the kitconfig will be added").action(de);K.command("remove").description("Removes existing resources").option("--all","All resources present in the kitconfig will be removed").action(Xe);K.parse();
