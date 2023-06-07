#! /usr/bin/env node
import { Command } from 'commander';
import f from 'fs-extra';
import q from 'chalk';
import Be from 'path';
import { z as z$1 } from 'zod';
import Ie from 'ora';
import Ve from 'simple-git';
import { exec } from 'child_process';

var c=(e,r,n)=>new Promise((t,s)=>{var p=d=>{try{i(n.next(d));}catch(y){s(y);}},a=d=>{try{i(n.throw(d));}catch(y){s(y);}},i=d=>d.done?t(d.value):Promise.resolve(d.value).then(p,a);i((n=n.apply(e,r)).next());});var b=e=>{let r=e.replace(/([A-Z])/g," $1");return r.charAt(0).toUpperCase()+r.slice(1)},E=e=>e.charAt(0).toUpperCase()+e.slice(1);var S=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${b(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${b(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?S(e.name)[0]:""}
  />
  ${e.required?S(e.name)[1]:""}
</div>`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${b(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
/>
  ${e.required?S(e.name)[1]:""}
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${b(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?S(e.name)[1]:""}
</div>`,xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${b(e.name)}"
  style={{ width: "100%" }}
  ${e.required?S(e.name)[0]:""}
/>
  ${e.required?S(e.name)[1]:""}
</div>`,Me=(e,r)=>`<div className="flex align-items-center">
      <RadioButton
        value="${r.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${r.value}"}
        ${e.required?S(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${r.name}
      </p>
    </div>
`,Ce=(e,r)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${b(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${r.map(n=>Me(e,n)).join(`
`)}
  </div>
  ${e.required?S(e.name)[1]:""}
</div>
`,Fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${b(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`,ke="`${BASE_URL}/s3/upload`",Se=(e,r)=>`<div className="field w-full">
  <p>${b(e.name)}</p>
  <FileUpload
    className={classNames({ "p-invalid": submitted && !entity.${e.name}, "-mt-3 w-full": true })}
    accept="image/*"
    mode="advanced"
    customUpload
    uploadHandler={async (e) => {
      const fileString = await getBase64Url(e.files[0]);
      const folderName = "${r}";

      const res = await fetch(${ke}, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileString,
          folderName,
        }),
      });

      const response = await res.json();

      if (!res.statusText.startsWith("2")) {
        return toast?.current?.show({
          severity: "error",
          summary: "Error occured",
          detail: response.message,
        });
      }

      onInputChange(response.data.url, "${e.name}");
    }}
    chooseOptions={{
      icon: "pi pi-fw pi-images",
      iconOnly: true,
      className: "custom-choose-btn p-button-rounded p-button-outlined",
    }}
    uploadOptions={{
      icon: "pi pi-fw pi-cloud-upload",
      iconOnly: true,
      className: "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    }}
    cancelOptions={{
      icon: "pi pi-fw pi-times",
      iconOnly: true,
      className: "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    }}
  />
  ${e.required?S(e.name)[1]:""}
</div>`;var L=e=>`<Column
  field="${e}"
  header="${E(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,we=e=>`<Column header="${E(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var W=(e=process.cwd())=>f.readdirSync(e).includes("kitconfig"),w=(e,r)=>c(void 0,null,function*(){let n=process.cwd().split("/").at(-1),t;return n===e||W()&&e==="root"?t=yield r():W()?(process.chdir(e),t=yield r(),process.chdir("..")):e==="root"?(process.chdir(".."),t=yield r(),process.chdir(n)):(process.chdir(".."),process.chdir(e),t=yield r(),process.chdir(".."),process.chdir(n)),t}),A=(e,r)=>{let n=process.cwd().split("/").at(-1),t;return n===e||W()&&e==="root"?t=r():W()?(process.chdir(e),t=r(),process.chdir("..")):e==="root"?(process.chdir(".."),t=r(),process.chdir(n)):(process.chdir(".."),process.chdir(e),t=r(),process.chdir(".."),process.chdir(n)),t},G=()=>A("root",()=>{let e,r=f.readdirSync(".");return r.includes("webapp")&&r.includes("server")?e="both":r.includes("webapp")?e="webapp":r.includes("server")?e="server":e="INVALID_STATE",e}),U=()=>A("root",()=>process.cwd()+"/.template");var T={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function se(e,r){return c(this,null,function*(){let n=U(),t="",s="",p=[],a=[],i=[],d=[],y=["InputSwitch"];r.crudFields.forEach((o,D)=>{let X=o.widget||o.datatype,P="",R="";o.required&&!y.includes(o.widget||o.datatype||"")&&p.push(o.name),X==="InputText"||X==="String"?(o.tableDisplay&&i.push(L(o.name)),a.push(he(o)),P="string",R='""'):X==="InputTextarea"?(o.tableDisplay&&i.push(L(o.name)),a.push($e(o)),P="string",R='""'):X==="InputNumber"||X==="Number"?(o.tableDisplay&&i.push(L(o.name)),a.push(Xe(o)),P="number",R="0"):X==="Dropdown"?(o.tableDisplay&&i.push(L(o.name)),a.push(xe(o)),d.push({fieldName:o.name,options:o.options||[]}),P="string",R='""'):X==="RadioButton"?(o.tableDisplay&&i.push(L(o.name)),a.push(Ce(o,o.options||[])),P="string",R='""'):X==="ImageFileUpload"?(o.tableDisplay&&i.push(we(o.name)),a.push(Se(o,r.name.toLowerCase())),P="string",R='""'):(X==="InputSwitch"||X==="Boolean")&&(o.tableDisplay&&i.push(L(o.name)),a.push(Fe(o)),P="boolean",R="false"),D===0&&(t+=`id?: string;
`,s+=`id: undefined,
`),t+=`${o.name}: ${P};
`,s+=`${o.name}: ${R},
`;});let F=`./src/screens/${e}`,v=`${F}/${e}.tsx`,O=`${F}/Create${e}.tsx`,ee=`${F}/Edit${e}.tsx`,V="./src/layout/items.json",te=f.readFileSync(`${n}/webapp/XXXXX.tsx`).toString(),ne=f.readFileSync(`${n}/webapp/CreateXXXXX.tsx`).toString(),re=f.readFileSync(`${n}/webapp/EditXXXXX.tsx`).toString(),oe=f.readFileSync(`${n}/webapp/xxxxx.d.ts`).toString(),m=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.initialState,s),$=[];m.split(`
`).forEach(o=>{o.includes(T.tableColumns)&&$.push(...i),$.push(o);}),f.writeFileSync(v,$.join(`
`));let K=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,a.join(`
`)).replace(T.validate,`if (${p.map(o=>`entity.${o}`).join(" && ")}) `),g=[];K.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:D,options:X})=>{g.push(`const ${D}Options = ${JSON.stringify(X,null,2)};
`);}),g.push(o)):(o.includes(T.initialState)&&g.push(s),g.push(o));}),f.writeFileSync(O,g.join(`
`));let M=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,a.join(`
`)).replace(T.validate,`if (${p.map(o=>`entity.${o}`).join(" && ")}) `),j=[];M.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:D,options:X})=>{j.push(`const ${D}Options = ${JSON.stringify(X,null,2)};
`);}),j.push(o)):(o.includes(T.initialState)&&j.push(s),j.push(o));}),f.writeFileSync(ee,j.join(`
`));let _e=f.readFileSync(V),fe=JSON.parse(_e.toString());fe[0].items.push({label:e,to:`/${e.toLowerCase()}`}),f.writeFileSync(V,JSON.stringify(fe,null,2));let je=oe.replace(/XXXXX/g,e).replace(T.interface,t);f.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,je);let Ue=f.readFileSync("./src/main.tsx").toString().split(`
`),Oe=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Ke=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...Ke),Ue.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&Oe.forEach(D=>{J.push(D);}),J.push(o);}),f.writeFileSync("./src/main.tsx",J.join(`
`));})}var ie=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String").optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload")]).default("InputText").optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}),ve=z$1.object({resources:z$1.array(ie)});var Y=()=>c(void 0,null,function*(){return w("root",()=>c(void 0,null,function*(){let e={resources:[]};if(!f.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let r=Be.join(process.cwd(),"kitconfig"),n=f.readdirSync("kitconfig/resources");yield Promise.all(n.map(s=>c(void 0,null,function*(){let p=yield import(`${r}/resources/${s}`),a=ie.safeParse(p.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let t=ve.safeParse(e);return t.success?t.data:(console.error("Config parsing error",t.error),null)}))});var k=(e,r)=>{let n="";return r.filter(t=>!!t).forEach(t=>{n+=`const existing${E(t)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${t},
  _id: { $ne: id },
});

if (existing${E(t)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),n},B=(e,r)=>{let n=`const { ${r.join(", ")} } = input;
`;return r.filter(t=>!!t).forEach(t=>{n+=`
const existing${E(t)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${t},
  });

if (existing${E(t)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${t}' already exists",
  };
}
`;}),n};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ae(e,r){return c(this,null,function*(){let n=U(),t=r.crudFields.filter(m=>m.unique).map(m=>m.name),s=[],p=[],a=[],i=[];r.crudFields.forEach(({name:m,widget:$,datatype:K,required:g,unique:M})=>{s.push(`${m}: entity.${m},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"||$==="ImageFileUpload"||K==="String"?(p.push(`${m}${g?"":"?"}: string;`),a.push(`${m}: { type: String, required: ${g}, unique: ${M} },`),i.push(`${m}: z.string()${g?".nonempty()":".optional().nullable()"},`)):$==="InputNumber"||K==="Number"?(p.push(`${m}${g?"":"?"}: number;`),a.push(`${m}: { type: Number, required: ${g}, unique: ${M} },`),i.push(`${m}: z.number()${g?"":".optional().nullable()"},`)):($==="InputSwitch"||K==="Boolean")&&(p.push(`${m}${g?"":"?"}: boolean;`),a.push(`${m}: { type: Boolean, required: ${g}, unique: ${M} },`),i.push(`${m}: z.boolean()${g?"":".optional().nullable()"},`));});let d=`./src/Microservices/${e}`,y=f.readFileSync(`${n}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),F=f.readFileSync(`${n}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),v=f.readFileSync(`${n}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),O=f.readFileSync(`${n}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),ee=`${d}/${e}Controller.ts`,V=`${d}/${e}Router.ts`,te=`${d}/${e}.dto.ts`,ne=`./src/Database/Entities/${e}Entity.ts`;f.writeFileSync(ee,y),f.writeFileSync(V,F),f.writeFileSync(te,v),f.writeFileSync(ne,O);let re=f.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${r.collectionName}",`:m).join(`
`);f.writeFileSync("./src/Database/CollectionNames.ts",re);let oe=f.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);f.writeFileSync("./src/Microservices/ApiRouter.ts",oe);})}var ce=Ie({color:"blue",indent:2}),Te=Ie({color:"blue",indent:2});function N(e){return c(this,null,function*(){var p,a;let r=G(),n=e.toLowerCase(),t=(a=(p=yield Y())==null?void 0:p.resources)==null?void 0:a.find(i=>i.name.toLowerCase()===n.toLowerCase());if(!t){ce.fail(`Resource ${q.cyan(n)} not found in config file`);return}let s=n.charAt(0).toUpperCase()+n.slice(1);(r==="both"||r==="webapp")&&(yield w("webapp",()=>c(this,null,function*(){let i=`./src/screens/${s}`;if(f.existsSync(i))return;ce.start(`Creating screen: ${q.cyan(s)}`);let d=`${i}/${s}.tsx`,y=`${i}/Create${s}.tsx`,F=`${i}/Edit${s}.tsx`,v=`./src/types/${s.toLowerCase()}.d.ts`;f.createFileSync(d),f.createFileSync(y),f.createFileSync(F),f.createFileSync(v),yield se(s,t),ce.succeed(`Created screen: ${q.cyan(s)}`);}))),(r==="both"||r==="server")&&(yield w("server",()=>c(this,null,function*(){let i=`./src/Microservices/${s}`;if(f.existsSync(i))return;Te.start(`Creating CRUD for: ${q.cyan(s)}`);let d=`${i}/${s}Controller.ts`,y=`${i}/${s}Router.ts`,F=`${i}/${s}.dto.ts`;f.createFileSync(d),f.createFileSync(y),f.createFileSync(F),yield ae(s,t),Te.succeed(`Created CRUD for: ${q.cyan(s)}`);})));})}var qe=()=>new Promise((e,r)=>c(void 0,null,function*(){var t;let n=(t=yield Y())==null?void 0:t.resources;n==null||n.map((s,p)=>c(void 0,null,function*(){yield N(s.name),n.length===p+1&&e();}));}));function le(){return c(this,null,function*(){yield qe();})}var Q=Ie({color:"blue",indent:2});function pe(e){return c(this,null,function*(){let r=G(),n=e.charAt(0).toUpperCase()+e.slice(1);(r==="both"||r==="webapp")&&(yield w("webapp",()=>c(this,null,function*(){let t=`./src/types/${e}.d.ts`,s=`./src/screens/${n}`,p="./src/layout/items.json";if(!f.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let a=f.readFileSync(p),i=JSON.parse(a.toString());i[0].items=i[0].items.filter(v=>v.label.toLowerCase()!==n.toLowerCase()),f.writeFileSync(p,JSON.stringify(i,null,2)),f.removeSync(t),f.removeSync(s);let d=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],F=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(v=>d.filter(O=>v.includes(O)).length===0);f.writeFileSync("./src/main.tsx",F.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(r==="both"||r==="server")&&(yield w("server",()=>c(this,null,function*(){let t=`./src/Microservices/${n}`,s=`./src/Database/Entities/${n}Entity.ts`,p="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!f.existsSync(t)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${n}`),f.removeSync(t),f.removeSync(s);let i=f.readFileSync(p).toString().split(`
`).filter(y=>!y.includes(`${n}Collection`)).join(`
`),d=f.readFileSync(a).toString().split(`
`).filter(y=>!y.includes(`${n}Router`)).join(`
`);f.writeFileSync(p,i),f.writeFileSync(a,d),Q.succeed(`Removed CRUD: ${n}`);})));})}function ue(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];f.removeSync("./.git"),f.removeSync("./src/screens/XXXXX"),f.removeSync("./src/types/xxxxx.d.ts");let t=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(p=>s.includes(p)).length===0);f.writeFileSync("./src/main.tsx",t.join(`
`));}function de(){f.removeSync("./.git"),f.removeSync("./src/Microservices/XXXXX"),f.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Z(e){return c(this,null,function*(){return new Promise((r,n)=>{exec(e,()=>{r(null);});})})}var Pe=()=>`REST_API_PORT=3005
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
`;var z=Ie({color:"blue",indent:2});function ye(e,r){return c(this,null,function*(){let n=e.toLowerCase();z.start("Scaffolding project..."),yield Ve().clone("https://github.com/oaktreeapps/admin_panel",n),process.chdir(n);let t=U();f.ensureDirSync(`${t}`),f.ensureDirSync(`${t}/webapp`),f.ensureDirSync(`${t}/server`),f.removeSync("./.git"),A("webapp",()=>{f.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${t}/webapp/XXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${t}/webapp/CreateXXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${t}/webapp/EditXXXXX.tsx`),f.copyFileSync("./src/types/xxxxx.d.ts",`${t}/webapp/xxxxx.d.ts`),f.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ue();}),A("server",()=>{f.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${t}/server/XXXXXRouter.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${t}/server/XXXXXController.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${t}/server/XXXXX.dto.ts`),f.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${t}/server/XXXXXEntity.ts`),f.writeFileSync("./.env",Pe()),de();}),z.succeed(`Created "${n}" successfully!`),r.onlyServer&&f.removeSync("webapp"),r.onlyWebapp&&f.removeSync("server"),z.start("Installing dependencies..."),r.onlyServer||(yield w("webapp",()=>c(this,null,function*(){yield Z("yarn install");}))),r.onlyWebapp||(yield w("server",()=>c(this,null,function*(){yield Z("yarn install");}))),z.succeed("Installed dependencies successfully!");})}var Re=e=>{let r=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${E(r)}",
  url: "/${r}",
  collectionName: "${r}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Ae=Ie({color:"blue",indent:2});function ge(e){return c(this,null,function*(){let r=e.toLowerCase(),n=Re(r);Ae.start(`Creating config template for ${q.cyan(r)}`),A("root",()=>{let t=`kitconfig/resources/${r}.cjs`;f.ensureFileSync(t),f.writeFileSync(t,n);}),Ae.succeed(`Created config template for ${q.cyan(r)}`);})}var _=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ye);_.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(N);_.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(ge);_.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(pe);_.command("sync").description('Add resources defined in "kitconfig" to the project').action(le);_.parse();
