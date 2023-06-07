#! /usr/bin/env node
import { Command } from 'commander';
import f from 'fs-extra';
import B from 'chalk';
import Ve from 'path';
import { z as z$1 } from 'zod';
import Le from 'ora';
import Ye from 'simple-git';
import { exec } from 'child_process';

var l=(e,r,n)=>new Promise((t,s)=>{var p=d=>{try{i(n.next(d));}catch(X){s(X);}},a=d=>{try{i(n.throw(d));}catch(X){s(X);}},i=d=>d.done?t(d.value):Promise.resolve(d.value).then(p,a);i((n=n.apply(e,r)).next());});var C=e=>{let r=e.replace(/([A-Z])/g," $1");return r.charAt(0).toUpperCase()+r.slice(1)},T=e=>e.charAt(0).toUpperCase()+e.slice(1);var g=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${C(e)} is required.</small>}`],$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<InputNumber
  id="${e.name}"
  value={entity.${e.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${e.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${e.required?g(e.name)[0]:""}
  />
  ${e.required?g(e.name)[1]:""}
</div>`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<InputText
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${e.required?g(e.name)[0]:""}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<InputTextarea
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  style={{ width: "100%" }}
  ${e.required?g(e.name)[0]:""}
  required
  rows={3}
  cols={20}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${C(e.name)}"
  style={{ width: "100%" }}
  ${e.required?g(e.name)[0]:""}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,Ne=(e,r)=>`<div className="flex align-items-center">
      <RadioButton
        value="${r.value}"
        onChange={(e) => onInputChange(e.value, "${e.name}")}
        checked={entity.${e.name} === "${r.value}"}
        ${e.required?g(e.name)[0]:""}
      />
      <p className="ml-2 text-sm">
        ${r.name}
      </p>
    </div>
`,Ce=(e,r)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${C(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${r.map(n=>Ne(e,n)).join(`
`)}
  </div>
  ${e.required?g(e.name)[1]:""}
</div>
`,we=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${C(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`,Fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<Calendar
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  style={{ width: "100%" }}
  ${e.required?g(e.name)[0]:""}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,Se=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<Password
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  style={{ width: "100%" }}
  feedback={false}
  ${e.required?g(e.name)[0]:""}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,ve=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<ColorPicker
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  ${e.required?g(e.name)[0]:""}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,Ee=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${C(e.name)}</p>
<Editor
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onTextChange(e.target.value, "${e.name}")}
  required
  style={{ height: '320px' }}
  style={{ width: "100%" }}
  ${e.required?g(e.name)[0]:""}
/>
  ${e.required?g(e.name)[1]:""}
</div>`,He="`${BASE_URL}/s3/upload`",be=(e,r)=>`<div className="field w-full">
  <p>${C(e.name)}</p>
  <FileUpload
    className={classNames({ "p-invalid": submitted && !entity.${e.name}, "-mt-3 w-full": true })}
    accept="image/*"
    mode="advanced"
    customUpload
    uploadHandler={async (e) => {
      const fileString = await getBase64Url(e.files[0]);
      const folderName = "${r}";

      const res = await fetch(${He}, {
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
  ${e.required?g(e.name)[1]:""}
</div>`;var b=e=>`<Column
  field="${e}"
  header="${T(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,Ie=e=>`<Column header="${T(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var W=(e=process.cwd())=>f.readdirSync(e).includes("kitconfig"),I=(e,r)=>l(void 0,null,function*(){let n=process.cwd().split("/").at(-1),t;return n===e||W()&&e==="root"?t=yield r():W()?(process.chdir(e),t=yield r(),process.chdir("..")):e==="root"?(process.chdir(".."),t=yield r(),process.chdir(n)):(process.chdir(".."),process.chdir(e),t=yield r(),process.chdir(".."),process.chdir(n)),t}),A=(e,r)=>{let n=process.cwd().split("/").at(-1),t;return n===e||W()&&e==="root"?t=r():W()?(process.chdir(e),t=r(),process.chdir("..")):e==="root"?(process.chdir(".."),t=r(),process.chdir(n)):(process.chdir(".."),process.chdir(e),t=r(),process.chdir(".."),process.chdir(n)),t},G=()=>A("root",()=>{let e,r=f.readdirSync(".");return r.includes("webapp")&&r.includes("server")?e="both":r.includes("webapp")?e="webapp":r.includes("server")?e="server":e="INVALID_STATE",e}),U=()=>A("root",()=>process.cwd()+"/.template");var R={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function se(e,r){return l(this,null,function*(){let n=U(),t="",s="",p=[],a=[],i=[],d=[],X=["InputSwitch"];r.crudFields.forEach((o,L)=>{let y=o.widget||o.datatype,w="",F="";o.required&&!X.includes(o.widget||o.datatype||"")&&p.push(o.name),y==="InputText"||y==="String"?(o.tableDisplay&&i.push(b(o.name)),a.push(he(o)),w="string",F='""'):y==="InputTextarea"?(o.tableDisplay&&i.push(b(o.name)),a.push(fe(o)),w="string",F='""'):y==="InputNumber"||y==="Number"?(o.tableDisplay&&i.push(b(o.name)),a.push($e(o)),w="number",F="0"):y==="Dropdown"?(o.tableDisplay&&i.push(b(o.name)),a.push(xe(o)),d.push({fieldName:o.name,options:o.options||[]}),w="string",F='""'):y==="RadioButton"?(o.tableDisplay&&i.push(b(o.name)),a.push(Ce(o,o.options||[])),w="string",F='""'):y==="ImageFileUpload"?(o.tableDisplay&&i.push(Ie(o.name)),a.push(be(o,r.name.toLowerCase())),w="string",F='""'):y==="InputSwitch"||y==="Boolean"?(o.tableDisplay&&i.push(b(o.name)),a.push(we(o)),w="boolean",F="false"):y==="Calendar"?(o.tableDisplay&&i.push(b(o.name)),a.push(Fe(o)),w="string",F='""'):y==="Password"?(o.tableDisplay&&i.push(b(o.name)),a.push(Se(o)),w="string",F='""'):y==="ColorPicker"?(o.tableDisplay&&i.push(b(o.name)),a.push(ve(o)),w="string",F='""'):y==="Editor"&&(o.tableDisplay&&i.push(b(o.name)),a.push(Ee(o)),w="string",F='""'),L===0&&(t+=`id?: string;
`,s+=`id: undefined,
`),t+=`${o.name}: ${w};
`,s+=`${o.name}: ${F},
`;});let E=`./src/screens/${e}`,P=`${E}/${e}.tsx`,O=`${E}/Create${e}.tsx`,ee=`${E}/Edit${e}.tsx`,V="./src/layout/items.json",te=f.readFileSync(`${n}/webapp/XXXXX.tsx`).toString(),ne=f.readFileSync(`${n}/webapp/CreateXXXXX.tsx`).toString(),re=f.readFileSync(`${n}/webapp/EditXXXXX.tsx`).toString(),oe=f.readFileSync(`${n}/webapp/xxxxx.d.ts`).toString(),m=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(R.initialState,s),$=[];m.split(`
`).forEach(o=>{o.includes(R.tableColumns)&&$.push(...i),$.push(o);}),f.writeFileSync(P,$.join(`
`));let K=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(R.input,a.join(`
`)).replace(R.validate,`if (${p.map(o=>`entity.${o}`).join(" && ")}) `),h=[];K.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:L,options:y})=>{h.push(`const ${L}Options = ${JSON.stringify(y,null,2)};
`);}),h.push(o)):(o.includes(R.initialState)&&h.push(s),h.push(o));}),f.writeFileSync(O,h.join(`
`));let k=re.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(R.input,a.join(`
`)).replace(R.validate,`if (${p.map(o=>`entity.${o}`).join(" && ")}) `),j=[];k.split(`
`).forEach(o=>{o.includes("const saveEntity = async () => {")?(d.forEach(({fieldName:L,options:y})=>{j.push(`const ${L}Options = ${JSON.stringify(y,null,2)};
`);}),j.push(o)):(o.includes(R.initialState)&&j.push(s),j.push(o));}),f.writeFileSync(ee,j.join(`
`));let Ke=f.readFileSync(V),Xe=JSON.parse(Ke.toString());Xe[0].items.push({label:e,to:`/${e.toLowerCase()}`}),f.writeFileSync(V,JSON.stringify(Xe,null,2));let ke=oe.replace(/XXXXX/g,e).replace(R.interface,t);f.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,ke);let Me=f.readFileSync("./src/main.tsx").toString().split(`
`),qe=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],Be=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...Be),Me.forEach(o=>{o.includes("{/* --ROUTES-- */}")&&qe.forEach(L=>{J.push(L);}),J.push(o);}),f.writeFileSync("./src/main.tsx",J.join(`
`));})}var ie=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String").optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload"),z$1.literal("Calendar"),z$1.literal("Password"),z$1.literal("ColorPicker"),z$1.literal("Editor")]).default("InputText").optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}),Pe=z$1.object({resources:z$1.array(ie)});var Y=()=>l(void 0,null,function*(){return I("root",()=>l(void 0,null,function*(){let e={resources:[]};if(!f.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let r=Ve.join(process.cwd(),"kitconfig"),n=f.readdirSync("kitconfig/resources");yield Promise.all(n.map(s=>l(void 0,null,function*(){let p=yield import(`${r}/resources/${s}`),a=ie.safeParse(p.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let t=Pe.safeParse(e);return t.success?t.data:(console.error("Config parsing error",t.error),null)}))});var M=(e,r)=>{let n="";return r.filter(t=>!!t).forEach(t=>{n+=`const existing${T(t)}UpdateEntity: I${e}Entity | null =
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
`;}),n},q=(e,r)=>{let n=`const { ${r.join(", ")} } = input;
`;return r.filter(t=>!!t).forEach(t=>{n+=`
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
`;}),n};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ae(e,r){return l(this,null,function*(){let n=U(),t=r.crudFields.filter(m=>m.unique).map(m=>m.name),s=[],p=[],a=[],i=[];r.crudFields.forEach(({name:m,widget:$,datatype:K,required:h,unique:k})=>{s.push(`${m}: entity.${m},`),$==="InputText"||$==="InputTextarea"||$==="Dropdown"||$==="RadioButton"||$==="ImageFileUpload"||$==="Calendar"||$==="Password"||$==="ColorPicker"||$==="Editor"||K==="String"?(p.push(`${m}${h?"":"?"}: string;`),a.push(`${m}: { type: String, required: ${h}, unique: ${k} },`),i.push(`${m}: z.string()${h?".nonempty()":".optional().nullable()"},`)):$==="InputNumber"||K==="Number"?(p.push(`${m}${h?"":"?"}: number;`),a.push(`${m}: { type: Number, required: ${h}, unique: ${k} },`),i.push(`${m}: z.number()${h?"":".optional().nullable()"},`)):($==="InputSwitch"||K==="Boolean")&&(p.push(`${m}${h?"":"?"}: boolean;`),a.push(`${m}: { type: Boolean, required: ${h}, unique: ${k} },`),i.push(`${m}: z.boolean()${h?"":".optional().nullable()"},`));});let d=`./src/Microservices/${e}`,X=f.readFileSync(`${n}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),E=f.readFileSync(`${n}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),P=f.readFileSync(`${n}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),O=f.readFileSync(`${n}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,p.join(`
`)).replace(u.schema,a.join(`
`)).replace(u.entity,s.join(`
`)).replace(u.zod,i.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),ee=`${d}/${e}Controller.ts`,V=`${d}/${e}Router.ts`,te=`${d}/${e}.dto.ts`,ne=`./src/Database/Entities/${e}Entity.ts`;f.writeFileSync(ee,X),f.writeFileSync(V,E),f.writeFileSync(te,P),f.writeFileSync(ne,O);let re=f.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${r.collectionName}",`:m).join(`
`);f.writeFileSync("./src/Database/CollectionNames.ts",re);let oe=f.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);f.writeFileSync("./src/Microservices/ApiRouter.ts",oe);})}var ce=Le({color:"blue",indent:2}),De=Le({color:"blue",indent:2});function N(e){return l(this,null,function*(){var p,a;let r=G(),n=e.toLowerCase(),t=(a=(p=yield Y())==null?void 0:p.resources)==null?void 0:a.find(i=>i.name.toLowerCase()===n.toLowerCase());if(!t){ce.fail(`Resource ${B.cyan(n)} not found in config file`);return}let s=n.charAt(0).toUpperCase()+n.slice(1);(r==="both"||r==="webapp")&&(yield I("webapp",()=>l(this,null,function*(){let i=`./src/screens/${s}`;if(f.existsSync(i))return;ce.start(`Creating screen: ${B.cyan(s)}`);let d=`${i}/${s}.tsx`,X=`${i}/Create${s}.tsx`,E=`${i}/Edit${s}.tsx`,P=`./src/types/${s.toLowerCase()}.d.ts`;f.createFileSync(d),f.createFileSync(X),f.createFileSync(E),f.createFileSync(P),yield se(s,t),ce.succeed(`Created screen: ${B.cyan(s)}`);}))),(r==="both"||r==="server")&&(yield I("server",()=>l(this,null,function*(){let i=`./src/Microservices/${s}`;if(f.existsSync(i))return;De.start(`Creating CRUD for: ${B.cyan(s)}`);let d=`${i}/${s}Controller.ts`,X=`${i}/${s}Router.ts`,E=`${i}/${s}.dto.ts`;f.createFileSync(d),f.createFileSync(X),f.createFileSync(E),yield ae(s,t),De.succeed(`Created CRUD for: ${B.cyan(s)}`);})));})}var Je=()=>new Promise((e,r)=>l(void 0,null,function*(){var t;let n=(t=yield Y())==null?void 0:t.resources;n==null||n.map((s,p)=>l(void 0,null,function*(){yield N(s.name),n.length===p+1&&e();}));}));function le(){return l(this,null,function*(){yield Je();})}var Q=Le({color:"blue",indent:2});function pe(e){return l(this,null,function*(){let r=G(),n=e.charAt(0).toUpperCase()+e.slice(1);(r==="both"||r==="webapp")&&(yield I("webapp",()=>l(this,null,function*(){let t=`./src/types/${e}.d.ts`,s=`./src/screens/${n}`,p="./src/layout/items.json";if(!f.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let a=f.readFileSync(p),i=JSON.parse(a.toString());i[0].items=i[0].items.filter(P=>P.label.toLowerCase()!==n.toLowerCase()),f.writeFileSync(p,JSON.stringify(i,null,2)),f.removeSync(t),f.removeSync(s);let d=[`<Route path="${n.toLowerCase()}" element={<${n}Page />} />`,`<Route path="${n.toLowerCase()}/create" element={<Create${n}Page />} />`,`<Route path="${n.toLowerCase()}/edit/:id" element={<Edit${n}Page />} />`,`import ${n}Page from "./screens/${n}/${n}"`,`import Edit${n}Page from "./screens/${n}/Edit${n}"`,`import Create${n}Page from "./screens/${n}/Create${n}"`],E=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(P=>d.filter(O=>P.includes(O)).length===0);f.writeFileSync("./src/main.tsx",E.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(r==="both"||r==="server")&&(yield I("server",()=>l(this,null,function*(){let t=`./src/Microservices/${n}`,s=`./src/Database/Entities/${n}Entity.ts`,p="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!f.existsSync(t)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${n}`),f.removeSync(t),f.removeSync(s);let i=f.readFileSync(p).toString().split(`
`).filter(X=>!X.includes(`${n}Collection`)).join(`
`),d=f.readFileSync(a).toString().split(`
`).filter(X=>!X.includes(`${n}Router`)).join(`
`);f.writeFileSync(p,i),f.writeFileSync(a,d),Q.succeed(`Removed CRUD: ${n}`);})));})}function ue(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];f.removeSync("./.git"),f.removeSync("./src/screens/XXXXX"),f.removeSync("./src/types/xxxxx.d.ts");let t=f.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(p=>s.includes(p)).length===0);f.writeFileSync("./src/main.tsx",t.join(`
`));}function de(){f.removeSync("./.git"),f.removeSync("./src/Microservices/XXXXX"),f.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Z(e){return l(this,null,function*(){return new Promise((r,n)=>{exec(e,()=>{r(null);});})})}var Ae=()=>`REST_API_PORT=3005
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
`;var z=Le({color:"blue",indent:2});function ge(e,r){return l(this,null,function*(){let n=e.toLowerCase();z.start("Scaffolding project..."),yield Ye().clone("https://github.com/kuvamdazeus/admin_panel",n),process.chdir(n);let t=U();f.ensureDirSync(`${t}`),f.ensureDirSync(`${t}/webapp`),f.ensureDirSync(`${t}/server`),f.removeSync("./.git"),A("webapp",()=>{f.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${t}/webapp/XXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${t}/webapp/CreateXXXXX.tsx`),f.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${t}/webapp/EditXXXXX.tsx`),f.copyFileSync("./src/types/xxxxx.d.ts",`${t}/webapp/xxxxx.d.ts`),f.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),ue();}),A("server",()=>{f.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${t}/server/XXXXXRouter.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${t}/server/XXXXXController.ts`),f.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${t}/server/XXXXX.dto.ts`),f.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${t}/server/XXXXXEntity.ts`),f.writeFileSync("./.env",Ae()),de();}),z.succeed(`Created "${n}" successfully!`),r.onlyServer&&f.removeSync("webapp"),r.onlyWebapp&&f.removeSync("server"),z.start("Installing dependencies..."),r.onlyServer||(yield I("webapp",()=>l(this,null,function*(){yield Z("yarn install");}))),r.onlyWebapp||(yield I("server",()=>l(this,null,function*(){yield Z("yarn install");}))),z.succeed("Installed dependencies successfully!");})}var _e=e=>{let r=e.toLowerCase();return `/**
* @type {import('../types').Resource}
*/
const resource = {
  name: "${T(r)}",
  url: "/${r}",
  collectionName: "${r}",
  crudFields: [
    // ...
  ],
};

module.exports = resource;
`};var Oe=Le({color:"blue",indent:2});function ye(e){return l(this,null,function*(){let r=e.toLowerCase(),n=_e(r);Oe.start(`Creating config template for ${B.cyan(r)}`),A("root",()=>{let t=`kitconfig/resources/${r}.cjs`;f.ensureFileSync(t),f.writeFileSync(t,n);}),Oe.succeed(`Created config template for ${B.cyan(r)}`);})}var _=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(ge);_.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(N);_.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(ye);_.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(pe);_.command("sync").description('Add resources defined in "kitconfig" to the project').action(le);_.parse();
