#! /usr/bin/env node
import { Command } from 'commander';
import Ge from 'os';
import X from 'fs-extra';
import q from 'chalk';
import ke from 'path';
import { z as z$1 } from 'zod';
import Ie from 'ora';
import He from 'simple-git';
import { exec } from 'child_process';

var c=(e,n,t)=>new Promise((r,s)=>{var i=y=>{try{l(t.next(y));}catch(g){s(g);}},a=y=>{try{l(t.throw(y));}catch(g){s(g);}},l=y=>y.done?r(y.value):Promise.resolve(y.value).then(i,a);l((t=t.apply(e,n)).next());});var I=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},E=e=>e.charAt(0).toUpperCase()+e.slice(1);var F=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${I(e)} is required.</small>}`],fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${I(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?F(e.name)[0]:""}
  />
  ${e.required?F(e.name)[1]:""}
</div>`,Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${I(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?F(e.name)[0]:""}
/>
  ${e.required?F(e.name)[1]:""}
</div>`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${I(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?F(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?F(e.name)[1]:""}
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${I(e.name)}"
  style={{ width: "100%" }}
  ${e.required?F(e.name)[0]:""}
/>
  ${e.required?F(e.name)[1]:""}
</div>`,Ke=(e,n)=>`<div className="flex align-items-center">
      <RadioButton
        value="${n.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${n.value}"}
        ${e.required?F(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${n.name}
      </p>
    </div>
`,xe=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${I(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(t=>Ke(e,t)).join(`
`)}
  </div>
  ${e.required?F(e.name)[1]:""}
</div>
`,Ce=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${I(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`,Me="`${BASE_URL}/s3/upload`",Se=(e,n)=>`<div className="field w-full">
  <p>${I(e.name)}</p>
  <FileUpload
    className={classNames({ "p-invalid": submitted && !entity.${e.name}, "-mt-3 w-full": true })}
    accept="image/*"
    mode="advanced"
    customUpload
    uploadHandler={async (e) => {
      const fileString = await getBase64Url(e.files[0]);
      const folderName = "${n}";

      const res = await fetch(${Me}, {
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
  ${e.required?F(e.name)[1]:""}
</div>`;var A=e=>`<Column
  field="${e}"
  header="${E(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,Fe=e=>`<Column header="${E(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var T={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function oe(e,n){return c(this,null,function*(){let t="",r="",s=[],i=[],a=[],l=[],y=["InputSwitch"];n.crudFields.forEach((o,L)=>{let h=o.widget||o.datatype,R="",D="";o.required&&!y.includes(o.widget||o.datatype||"")&&s.push(o.name),h==="InputText"||h==="String"?(o.tableDisplay&&a.push(A(o.name)),i.push(Xe(o)),R="string",D='""'):h==="InputTextarea"?(o.tableDisplay&&a.push(A(o.name)),i.push(he(o)),R="string",D='""'):h==="InputNumber"||h==="Number"?(o.tableDisplay&&a.push(A(o.name)),i.push(fe(o)),R="number",D="0"):h==="Dropdown"?(o.tableDisplay&&a.push(A(o.name)),i.push($e(o)),l.push({fieldName:o.name,options:o.options||[]}),R="string",D='""'):h==="RadioButton"?(o.tableDisplay&&a.push(A(o.name)),i.push(xe(o,o.options||[])),R="string",D='""'):h==="ImageFileUpload"?(o.tableDisplay&&a.push(Fe(o.name)),i.push(Se(o,n.name.toLowerCase())),R="string",D='""'):(h==="InputSwitch"||h==="Boolean")&&(o.tableDisplay&&a.push(A(o.name)),i.push(Ce(o)),R="boolean",D="false"),L===0&&(t+=`id?: string;
`,r+=`id: undefined,
`),t+=`${o.name}: ${R};
`,r+=`${o.name}: ${D},
`;});let g=`./src/screens/${e}`,v=`${g}/${e}.tsx`,b=`${g}/Create${e}.tsx`,O=`${g}/Edit${e}.tsx`,V="./src/layout/items.json",ee=X.readFileSync(`${d}/webapp/XXXXX.tsx`).toString(),te=X.readFileSync(`${d}/webapp/CreateXXXXX.tsx`).toString(),ne=X.readFileSync(`${d}/webapp/EditXXXXX.tsx`).toString(),re=X.readFileSync(`${d}/webapp/xxxxx.d.ts`).toString(),m=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.initialState,r),x=[];m.split(`
`).forEach(o=>{o.includes(T.tableColumns)&&x.push(...a),x.push(o);}),X.writeFileSync(v,x.join(`
`));let K=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,i.join(`
`)).replace(T.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),f=[];K.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(l.forEach(({fieldName:L,options:h})=>{f.push(`const ${L}Options = ${JSON.stringify(h,null,2)};
`);}),f.push(o)):(o.includes(T.initialState)&&f.push(r),f.push(o));}),X.writeFileSync(b,f.join(`
`));let M=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(T.input,i.join(`
`)).replace(T.validate,`if (${s.map(o=>`entity.${o}`).join(" && ")}) `),j=[];M.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(l.forEach(({fieldName:L,options:h})=>{j.push(`const ${L}Options = ${JSON.stringify(h,null,2)};
`);}),j.push(o)):(o.includes(T.initialState)&&j.push(r),j.push(o));}),X.writeFileSync(O,j.join(`
`));let Ae=X.readFileSync(V),ge=JSON.parse(Ae.toString());ge[0].items.push({label:e,to:`/${e.toLowerCase()}`}),X.writeFileSync(V,JSON.stringify(ge,null,2));let _e=re.replace(/XXXXX/g,e).replace(T.interface,t);X.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,_e);let je=X.readFileSync("./src/main.tsx").toString().split(`
`),Ue=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Oe=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...Oe),je.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&Ue.forEach(L=>{J.push(L);}),J.push(o);}),X.writeFileSync("./src/main.tsx",J.join(`
`));})}var se=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String").optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload")]).default("InputText").optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}),we=z$1.object({resources:z$1.array(se)});var W=(e=process.cwd())=>X.readdirSync(e).includes("kitconfig"),w=(e,n)=>c(void 0,null,function*(){let t=process.cwd().split("/").at(-1),r;return t===e||W()&&e==="root"?r=yield n():W()?(process.chdir(e),r=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=yield n(),process.chdir(".."),process.chdir(t)),r}),U=(e,n)=>{let t=process.cwd().split("/").at(-1),r;return t===e||W()&&e==="root"?r=n():W()?(process.chdir(e),r=n(),process.chdir("..")):e==="root"?(process.chdir(".."),r=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),r=n(),process.chdir(".."),process.chdir(t)),r},G=()=>U("root",()=>{let e,n=X.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var Y=()=>c(void 0,null,function*(){return w("root",()=>c(void 0,null,function*(){let e={resources:[]};if(!X.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=ke.join(process.cwd(),"kitconfig"),t=X.readdirSync("kitconfig/resources");yield Promise.all(t.map(s=>c(void 0,null,function*(){let i=yield import(`${n}/resources/${s}`),a=se.safeParse(i.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let r=we.safeParse(e);return r.success?r.data:(console.error("Config parsing error",r.error),null)}))});var k=(e,n)=>{let t="";return n.filter(r=>!!r).forEach(r=>{t+=`const existing${E(r)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${r},
  _id: { $ne: id },
});

if (existing${E(r)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),t},B=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(r=>!!r).forEach(r=>{t+=`
const existing${E(r)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${r},
  });

if (existing${E(r)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${r}' already exists",
  };
}
`;}),t};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ie(e,n){return c(this,null,function*(){let t=n.crudFields.filter(m=>m.unique).map(m=>m.name),r=[],s=[],i=[],a=[];n.crudFields.forEach(({name:m,widget:x,datatype:K,required:f,unique:M})=>{r.push(`${m}: entity.${m},`),x==="InputText"||x==="InputTextarea"||x==="Dropdown"||x==="RadioButton"||x==="ImageFileUpload"||K==="String"?(s.push(`${m}${f?"":"?"}: string;`),i.push(`${m}: { type: String, required: ${f}, unique: ${M} },`),a.push(`${m}: z.string()${f?".nonempty()":".optional().nullable()"},`)):x==="InputNumber"||K==="Number"?(s.push(`${m}${f?"":"?"}: number;`),i.push(`${m}: { type: Number, required: ${f}, unique: ${M} },`),a.push(`${m}: z.number()${f?"":".optional().nullable()"},`)):(x==="InputSwitch"||K==="Boolean")&&(s.push(`${m}${f?"":"?"}: boolean;`),i.push(`${m}: { type: Boolean, required: ${f}, unique: ${M} },`),a.push(`${m}: z.boolean()${f?"":".optional().nullable()"},`));});let l=`./src/Microservices/${e}`,y=X.readFileSync(`${d}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),g=X.readFileSync(`${d}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),v=X.readFileSync(`${d}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),b=X.readFileSync(`${d}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,r.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,B(e,t)).replace(u.checkExistingUpdateEntity,k(e,t)),O=`${l}/${e}Controller.ts`,V=`${l}/${e}Router.ts`,ee=`${l}/${e}.dto.ts`,te=`./src/Database/Entities/${e}Entity.ts`;X.writeFileSync(O,y),X.writeFileSync(V,g),X.writeFileSync(ee,v),X.writeFileSync(te,b);let ne=X.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${n.collectionName}",`:m).join(`
`);X.writeFileSync("./src/Database/CollectionNames.ts",ne);let re=X.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);X.writeFileSync("./src/Microservices/ApiRouter.ts",re);})}var ae=Ie({color:"blue",indent:2}),be=Ie({color:"blue",indent:2});function N(e){return c(this,null,function*(){var i,a;let n=G(),t=e.toLowerCase(),r=(a=(i=yield Y())==null?void 0:i.resources)==null?void 0:a.find(l=>l.name.toLowerCase()===t.toLowerCase());if(!r){ae.fail(`Resource ${q.cyan(t)} not found in config file`);return}let s=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield w("webapp",()=>c(this,null,function*(){let l=`./src/screens/${s}`;if(X.existsSync(l))return;ae.start(`Creating screen: ${q.cyan(s)}`);let y=`${l}/${s}.tsx`,g=`${l}/Create${s}.tsx`,v=`${l}/Edit${s}.tsx`,b=`./src/types/${s.toLowerCase()}.d.ts`;X.createFileSync(y),X.createFileSync(g),X.createFileSync(v),X.createFileSync(b),yield oe(s,r),ae.succeed(`Created screen: ${q.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield w("server",()=>c(this,null,function*(){let l=`./src/Microservices/${s}`;if(X.existsSync(l))return;be.start(`Creating CRUD for: ${q.cyan(s)}`);let y=`${l}/${s}Controller.ts`,g=`${l}/${s}Router.ts`,v=`${l}/${s}.dto.ts`;X.createFileSync(y),X.createFileSync(g),X.createFileSync(v),yield ie(s,r),be.succeed(`Created CRUD for: ${q.cyan(s)}`);})));})}var Be=()=>new Promise((e,n)=>c(void 0,null,function*(){var r;let t=(r=yield Y())==null?void 0:r.resources;t==null||t.map((s,i)=>c(void 0,null,function*(){yield N(s.name),t.length===i+1&&e();}));}));function ce(){return c(this,null,function*(){yield Be();})}var Q=Ie({color:"blue",indent:2});function le(e){return c(this,null,function*(){let n=G(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield w("webapp",()=>c(this,null,function*(){let r=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,i="./src/layout/items.json";if(!X.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let a=X.readFileSync(i),l=JSON.parse(a.toString());l[0].items=l[0].items.filter(b=>b.label.toLowerCase()!==t.toLowerCase()),X.writeFileSync(i,JSON.stringify(l,null,2)),X.removeSync(r),X.removeSync(s);let y=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],v=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(b=>y.filter(O=>b.includes(O)).length===0);X.writeFileSync("./src/main.tsx",v.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield w("server",()=>c(this,null,function*(){let r=`./src/Microservices/${t}`,s=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!X.existsSync(r)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),X.removeSync(r),X.removeSync(s);let l=X.readFileSync(i).toString().split(`
`).filter(g=>!g.includes(`${t}Collection`)).join(`
`),y=X.readFileSync(a).toString().split(`
`).filter(g=>!g.includes(`${t}Router`)).join(`
`);X.writeFileSync(i,l),X.writeFileSync(a,y),Q.succeed(`Removed CRUD: ${t}`);})));})}function pe(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];X.removeSync("./.git"),X.removeSync("./src/screens/XXXXX"),X.removeSync("./src/types/xxxxx.d.ts");let r=X.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(i=>s.includes(i)).length===0);X.writeFileSync("./src/main.tsx",r.join(`
`));}function me(){X.removeSync("./.git"),X.removeSync("./src/Microservices/XXXXX"),X.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Z(e){return c(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var Te=()=>`REST_API_PORT=3005
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
`;var z=Ie({color:"blue",indent:2});function de(e,n){return c(this,null,function*(){let t=e.toLowerCase();z.start("Scaffolding project..."),yield He().clone("https://github.com/oaktreeapps/admin_panel",t),process.chdir(t),X.ensureDirSync(`${d}`),X.ensureDirSync(`${d}/webapp`),X.ensureDirSync(`${d}/server`),X.removeSync("./.git"),U("webapp",()=>{X.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${d}/webapp/XXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${d}/webapp/CreateXXXXX.tsx`),X.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${d}/webapp/EditXXXXX.tsx`),X.copyFileSync("./src/types/xxxxx.d.ts",`${d}/webapp/xxxxx.d.ts`),X.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),pe();}),U("server",()=>{X.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${d}/server/XXXXXRouter.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${d}/server/XXXXXController.ts`),X.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${d}/server/XXXXX.dto.ts`),X.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${d}/server/XXXXXEntity.ts`),X.writeFileSync("./.env",Te()),me();}),z.succeed(`Created "${t}" successfully!`),n.onlyServer&&X.removeSync("webapp"),n.onlyWebapp&&X.removeSync("server"),z.start("Installing dependencies..."),n.onlyServer||(yield w("webapp",()=>c(this,null,function*(){yield Z("yarn install");}))),n.onlyWebapp||(yield w("server",()=>c(this,null,function*(){yield Z("yarn install");}))),z.succeed("Installed dependencies successfully!");})}var Pe=e=>{let n=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${E(n)}",
  url: "/${n}",
  collectionName: "${n}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Le=Ie({color:"blue",indent:2});function ye(e){return c(this,null,function*(){let n=e.toLowerCase(),t=Pe(n);Le.start(`Creating config template for ${q.cyan(n)}`),U("root",()=>{let r=`kitconfig/resources/${n}.cjs`;X.ensureFileSync(r),X.writeFileSync(r,t);}),Le.succeed(`Created config template for ${q.cyan(n)}`);})}var d=Ge.homedir()+"/.adminkit",_=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(de);_.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(N);_.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(ye);_.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(le);_.command("sync").description('Add resources defined in "kitconfig" to the project').action(ce);_.parse();

export { d as adminKitPath };
