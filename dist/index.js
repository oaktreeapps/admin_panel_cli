#! /usr/bin/env node
import { Command } from 'commander';
import ze from 'os';
import x from 'fs-extra';
import B from 'chalk';
import He from 'path';
import { z as z$1 } from 'zod';
import De from 'ora';
import Ge from 'simple-git';
import { exec } from 'child_process';

var l=(e,n,t)=>new Promise((o,s)=>{var i=g=>{try{p(t.next(g));}catch(X){s(X);}},a=g=>{try{p(t.throw(g));}catch(X){s(X);}},p=g=>g.done?o(g.value):Promise.resolve(g.value).then(i,a);p((t=t.apply(e,n)).next());});var w=e=>{let n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)},T=e=>e.charAt(0).toUpperCase()+e.slice(1);var y=e=>[`className={classNames({ "p-invalid": submitted && !entity.${e} })}`,`{submitted && !entity.${e} && <small className="p-invalid">${w(e)} is required.</small>}`],Xe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
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
</div>`,$e=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
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
</div>`,he=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
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
</div>`,fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<Dropdown
  value={entity.${e.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${e.name}")}
  options={${e.name}Options}
  optionLabel="name"
  placeholder="Select a ${w(e.name)}"
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,Be=(e,n)=>`<div className="flex align-items-center">
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
`,xe=(e,n)=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
  <p>Choose ${w(e.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${n.map(t=>Be(e,t)).join(`
`)}
  </div>
  ${e.required?y(e.name)[1]:""}
</div>
`,Ce=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"} flex items-center">
  <p className="mr-2">${w(e.name)}</p>
  <InputSwitch checked={entity.${e.name}} onChange={(e) => onInputChange(e.value, "${e.name}")} />
</div>`,we=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
<Calendar
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,Se=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
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
</div>`,Fe=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
<ColorPicker
  id="${e.name}"
  value={entity.${e.name}}
  onChange={(e) => onInputChange(e.target.value, "${e.name}")}
  required
  style={{ width: "100%" }}
  ${e.required?y(e.name)[0]:""}
/>
  ${e.required?y(e.name)[1]:""}
</div>`,ve=e=>`<div className="field ${e.inline?"flex-grow-1":"w-full"}">
<p>${w(e.name)}</p>
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
</div>`,Ne="`${BASE_URL}/s3/upload`",Ee=(e,n)=>`<div className="field w-full">
  <p>${w(e.name)}</p>
  <FileUpload
    className={classNames({ "p-invalid": submitted && !entity.${e.name}, "-mt-3 w-full": true })}
    accept="image/*"
    mode="advanced"
    customUpload
    uploadHandler={async (e) => {
      const fileString = await getBase64Url(e.files[0]);
      const folderName = "${n}";

      const res = await fetch(${Ne}, {
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
  ${e.required?y(e.name)[1]:""}
</div>`;var b=e=>`<Column
  field="${e}"
  header="${T(e)}"
  sortable
  body={(rowData) => textBodyTemplate(rowData, "${e}")}
  headerStyle={{ minWidth: "15rem" }}
></Column>`,be=e=>`<Column header="${T(e)}" body={(rowData) => imageBodyTemplate(rowData, "${e}")}></Column>`;var D={tableColumns:"{/*TABLE_COLUMNS*/}",initialState:"/*INITIAL_STATE_FIELDS*/",interface:"/*INTERFACE_FIELDS*/",input:"{/*INPUT_FIELDS*/}",validate:"/*VALIDATE_FIELDS*/"};function oe(e,n){return l(this,null,function*(){let t="",o="",s=[],i=[],a=[],p=[],g=["InputSwitch"];n.crudFields.forEach((r,A)=>{let $=r.widget||r.datatype,S="",F="";r.required&&!g.includes(r.widget||r.datatype||"")&&s.push(r.name),$==="InputText"||$==="String"?(r.tableDisplay&&a.push(b(r.name)),i.push($e(r)),S="string",F='""'):$==="InputTextarea"?(r.tableDisplay&&a.push(b(r.name)),i.push(he(r)),S="string",F='""'):$==="InputNumber"||$==="Number"?(r.tableDisplay&&a.push(b(r.name)),i.push(Xe(r)),S="number",F="0"):$==="Dropdown"?(r.tableDisplay&&a.push(b(r.name)),i.push(fe(r)),p.push({fieldName:r.name,options:r.options||[]}),S="string",F='""'):$==="RadioButton"?(r.tableDisplay&&a.push(b(r.name)),i.push(xe(r,r.options||[])),S="string",F='""'):$==="ImageFileUpload"?(r.tableDisplay&&a.push(be(r.name)),i.push(Ee(r,n.name.toLowerCase())),S="string",F='""'):$==="InputSwitch"||$==="Boolean"?(r.tableDisplay&&a.push(b(r.name)),i.push(Ce(r)),S="boolean",F="false"):$==="Calendar"?(r.tableDisplay&&a.push(b(r.name)),i.push(we(r)),S="string",F='""'):$==="Password"?(r.tableDisplay&&a.push(b(r.name)),i.push(Se(r)),S="string",F='""'):$==="ColorPicker"?(r.tableDisplay&&a.push(b(r.name)),i.push(Fe(r)),S="string",F='""'):$==="Editor"&&(r.tableDisplay&&a.push(b(r.name)),i.push(ve(r)),S="string",F='""'),A===0&&(t+=`id?: string;
`,o+=`id: undefined,
`),t+=`${r.name}: ${S};
`,o+=`${r.name}: ${F},
`;});let X=`./src/screens/${e}`,P=`${X}/${e}.tsx`,R=`${X}/Create${e}.tsx`,O=`${X}/Edit${e}.tsx`,V="./src/layout/items.json",ee=x.readFileSync(`${d}/webapp/XXXXX.tsx`).toString(),te=x.readFileSync(`${d}/webapp/CreateXXXXX.tsx`).toString(),ne=x.readFileSync(`${d}/webapp/EditXXXXX.tsx`).toString(),re=x.readFileSync(`${d}/webapp/xxxxx.d.ts`).toString(),m=ee.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.initialState,o),h=[];m.split(`
`).forEach(r=>{r.includes(D.tableColumns)&&h.push(...a),h.push(r);}),x.writeFileSync(P,h.join(`
`));let K=te.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.input,i.join(`
`)).replace(D.validate,`if (${s.map(r=>`entity.${r}`).join(" && ")}) `),f=[];K.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:A,options:$})=>{f.push(`const ${A}Options = ${JSON.stringify($,null,2)};
`);}),f.push(r)):(r.includes(D.initialState)&&f.push(o),f.push(r));}),x.writeFileSync(R,f.join(`
`));let k=ne.replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(D.input,i.join(`
`)).replace(D.validate,`if (${s.map(r=>`entity.${r}`).join(" && ")}) `),j=[];k.split(`
`).forEach(r=>{r.includes("const saveEntity = async () => {")?(p.forEach(({fieldName:A,options:$})=>{j.push(`const ${A}Options = ${JSON.stringify($,null,2)};
`);}),j.push(r)):(r.includes(D.initialState)&&j.push(o),j.push(r));}),x.writeFileSync(O,j.join(`
`));let Oe=x.readFileSync(V),ye=JSON.parse(Oe.toString());ye[0].items.push({label:e,to:`/${e.toLowerCase()}`}),x.writeFileSync(V,JSON.stringify(ye,null,2));let Ke=re.replace(/XXXXX/g,e).replace(D.interface,t);x.writeFileSync(`./src/types/${e.toLowerCase()}.d.ts`,Ke);let ke=x.readFileSync("./src/main.tsx").toString().split(`
`),Me=[`<Route path="${e.toLowerCase()}" element={<${e}Page />} />`,`<Route path="${e.toLowerCase()}/create" element={<Create${e}Page />} />`,`<Route path="${e.toLowerCase()}/edit/:id" element={<Edit${e}Page />} />`],qe=[`import ${e}Page from "./screens/${e}/${e}"`,`import Edit${e}Page from "./screens/${e}/Edit${e}"`,`import Create${e}Page from "./screens/${e}/Create${e}"`],J=[];J.push(...qe),ke.forEach(r=>{r.includes("{/* --ROUTES-- */}")&&Me.forEach(A=>{J.push(A);}),J.push(r);}),x.writeFileSync("./src/main.tsx",J.join(`
`));})}var se=z$1.object({name:z$1.string(),url:z$1.string(),collectionName:z$1.string(),crudFields:z$1.array(z$1.object({name:z$1.string(),required:z$1.boolean().optional().default(!0),unique:z$1.boolean().optional().default(!1),tableDisplay:z$1.boolean().optional().default(!0),inline:z$1.boolean().optional().default(!1),datatype:z$1.union([z$1.literal("String"),z$1.literal("Number"),z$1.literal("Boolean")]).default("String").optional(),widget:z$1.union([z$1.literal("InputText"),z$1.literal("InputTextarea"),z$1.literal("RadioButton"),z$1.literal("Dropdown"),z$1.literal("InputSwitch"),z$1.literal("InputNumber"),z$1.literal("ImageFileUpload"),z$1.literal("Calendar"),z$1.literal("Password"),z$1.literal("ColorPicker"),z$1.literal("Editor")]).default("InputText").optional(),options:z$1.array(z$1.object({name:z$1.string(),value:z$1.string()})).optional()}))}),Ie=z$1.object({resources:z$1.array(se)});var W=(e=process.cwd())=>x.readdirSync(e).includes("kitconfig"),I=(e,n)=>l(void 0,null,function*(){let t=process.cwd().split("/").at(-1),o;return t===e||W()&&e==="root"?o=yield n():W()?(process.chdir(e),o=yield n(),process.chdir("..")):e==="root"?(process.chdir(".."),o=yield n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),o=yield n(),process.chdir(".."),process.chdir(t)),o}),U=(e,n)=>{let t=process.cwd().split("/").at(-1),o;return t===e||W()&&e==="root"?o=n():W()?(process.chdir(e),o=n(),process.chdir("..")):e==="root"?(process.chdir(".."),o=n(),process.chdir(t)):(process.chdir(".."),process.chdir(e),o=n(),process.chdir(".."),process.chdir(t)),o},G=()=>U("root",()=>{let e,n=x.readdirSync(".");return n.includes("webapp")&&n.includes("server")?e="both":n.includes("webapp")?e="webapp":n.includes("server")?e="server":e="INVALID_STATE",e});var Y=()=>l(void 0,null,function*(){return I("root",()=>l(void 0,null,function*(){let e={resources:[]};if(!x.existsSync("kitconfig"))return console.log("Can't detect the current directory as a valid admin project!"),null;let n=He.join(process.cwd(),"kitconfig"),t=x.readdirSync("kitconfig/resources");yield Promise.all(t.map(s=>l(void 0,null,function*(){let i=yield import(`${n}/resources/${s}`),a=se.safeParse(i.default);a.success?e.resources.push(a.data):console.log(`Couldn't parse screen '${s}':`,a.error.format());})));let o=Ie.safeParse(e);return o.success?o.data:(console.error("Config parsing error",o.error),null)}))});var M=(e,n)=>{let t="";return n.filter(o=>!!o).forEach(o=>{t+=`const existing${T(o)}UpdateEntity: I${e}Entity | null =
await ${e}Model().findOne({
  ${o},
  _id: { $ne: id },
});

if (existing${T(o)}UpdateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${o}' already exists",
  };
}
`;}),t},q=(e,n)=>{let t=`const { ${n.join(", ")} } = input;
`;return n.filter(o=>!!o).forEach(o=>{t+=`
const existing${T(o)}CreateEntity: I${e}Entity | null =
  await ${e}Model().findOne({
    ${o},
  });

if (existing${T(o)}CreateEntity) {
  return {
    status: HttpStatusCodes.BAD_REQUEST,
    message: "Entity with this '${o}' already exists",
  };
}
`;}),t};var u={interface:"/*INTERFACE_FIELDS*/",schema:"/*SCHEMA_FIELDS*/",entity:"/*ENTITY_FIELDS*/",zod:"/*ZOD_FIELDS*/",uniqueFields:"/*UNIQUE_FIELDS*/",checkExistingUpdateEntity:"/*CHECK_EXISTING_UPDATE_ENTITY*/",checkExistingCreateEntity:"/*CHECK_EXISTING_CREATE_ENTITY*/"};function ie(e,n){return l(this,null,function*(){let t=n.crudFields.filter(m=>m.unique).map(m=>m.name),o=[],s=[],i=[],a=[];n.crudFields.forEach(({name:m,widget:h,datatype:K,required:f,unique:k})=>{o.push(`${m}: entity.${m},`),h==="InputText"||h==="InputTextarea"||h==="Dropdown"||h==="RadioButton"||h==="ImageFileUpload"||h==="Calendar"||h==="Password"||h==="ColorPicker"||h==="Editor"||K==="String"?(s.push(`${m}${f?"":"?"}: string;`),i.push(`${m}: { type: String, required: ${f}, unique: ${k} },`),a.push(`${m}: z.string()${f?".nonempty()":".optional().nullable()"},`)):h==="InputNumber"||K==="Number"?(s.push(`${m}${f?"":"?"}: number;`),i.push(`${m}: { type: Number, required: ${f}, unique: ${k} },`),a.push(`${m}: z.number()${f?"":".optional().nullable()"},`)):(h==="InputSwitch"||K==="Boolean")&&(s.push(`${m}${f?"":"?"}: boolean;`),i.push(`${m}: { type: Boolean, required: ${f}, unique: ${k} },`),a.push(`${m}: z.boolean()${f?"":".optional().nullable()"},`));});let p=`./src/Microservices/${e}`,g=x.readFileSync(`${d}/server/XXXXXController.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,o.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),X=x.readFileSync(`${d}/server/XXXXXRouter.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,o.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),P=x.readFileSync(`${d}/server/XXXXX.dto.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,o.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),R=x.readFileSync(`${d}/server/XXXXXEntity.ts`).toString().replace(/XXXXX/g,e).replace(/xxxxx/g,e.toLowerCase()).replace(u.interface,s.join(`
`)).replace(u.schema,i.join(`
`)).replace(u.entity,o.join(`
`)).replace(u.zod,a.join(`
`)).replace(u.uniqueFields,t.join(", ")).replace(u.checkExistingCreateEntity,q(e,t)).replace(u.checkExistingUpdateEntity,M(e,t)),O=`${p}/${e}Controller.ts`,V=`${p}/${e}Router.ts`,ee=`${p}/${e}.dto.ts`,te=`./src/Database/Entities/${e}Entity.ts`;x.writeFileSync(O,g),x.writeFileSync(V,X),x.writeFileSync(ee,P),x.writeFileSync(te,R);let ne=x.readFileSync("./src/Database/CollectionNames.ts").toString().split(`
`).map(m=>m.includes("export const ")?m+`
${e}Collection: "${n.collectionName}",`:m).join(`
`);x.writeFileSync("./src/Database/CollectionNames.ts",ne);let re=x.readFileSync("./src/Microservices/ApiRouter.ts").toString().split(`
`).map(m=>m.includes("const ApiRouter =")?m+`
ApiRouter.use("/${e.toLowerCase()}", ${e}Router);`:m.includes('import * as express from "express";')?m+`
import { ${e}Router } from "./${e}/${e}Router";`:m).join(`
`);x.writeFileSync("./src/Microservices/ApiRouter.ts",re);})}var ae=De({color:"blue",indent:2}),Re=De({color:"blue",indent:2});function N(e){return l(this,null,function*(){var i,a;let n=G(),t=e.toLowerCase(),o=(a=(i=yield Y())==null?void 0:i.resources)==null?void 0:a.find(p=>p.name.toLowerCase()===t.toLowerCase());if(!o){ae.fail(`Resource ${B.cyan(t)} not found in config file`);return}let s=t.charAt(0).toUpperCase()+t.slice(1);(n==="both"||n==="webapp")&&(yield I("webapp",()=>l(this,null,function*(){let p=`./src/screens/${s}`;if(x.existsSync(p))return;ae.start(`Creating screen: ${B.cyan(s)}`);let g=`${p}/${s}.tsx`,X=`${p}/Create${s}.tsx`,P=`${p}/Edit${s}.tsx`,R=`./src/types/${s.toLowerCase()}.d.ts`;x.createFileSync(g),x.createFileSync(X),x.createFileSync(P),x.createFileSync(R),yield oe(s,o),ae.succeed(`Created screen: ${B.cyan(s)}`);}))),(n==="both"||n==="server")&&(yield I("server",()=>l(this,null,function*(){let p=`./src/Microservices/${s}`;if(x.existsSync(p))return;Re.start(`Creating CRUD for: ${B.cyan(s)}`);let g=`${p}/${s}Controller.ts`,X=`${p}/${s}Router.ts`,P=`${p}/${s}.dto.ts`;x.createFileSync(g),x.createFileSync(X),x.createFileSync(P),yield ie(s,o),Re.succeed(`Created CRUD for: ${B.cyan(s)}`);})));})}var Ve=()=>new Promise((e,n)=>l(void 0,null,function*(){var o;let t=(o=yield Y())==null?void 0:o.resources;t==null||t.map((s,i)=>l(void 0,null,function*(){yield N(s.name),t.length===i+1&&e();}));}));function ce(){return l(this,null,function*(){yield Ve();})}var Q=De({color:"blue",indent:2});function le(e){return l(this,null,function*(){let n=G(),t=e.charAt(0).toUpperCase()+e.slice(1);(n==="both"||n==="webapp")&&(yield I("webapp",()=>l(this,null,function*(){let o=`./src/types/${e}.d.ts`,s=`./src/screens/${t}`,i="./src/layout/items.json";if(!x.existsSync(s)){console.log("  Nothing to remove in webapp.");return}Q.start(`Removing screen: ${e}`);let a=x.readFileSync(i),p=JSON.parse(a.toString());p[0].items=p[0].items.filter(R=>R.label.toLowerCase()!==t.toLowerCase()),x.writeFileSync(i,JSON.stringify(p,null,2)),x.removeSync(o),x.removeSync(s);let g=[`<Route path="${t.toLowerCase()}" element={<${t}Page />} />`,`<Route path="${t.toLowerCase()}/create" element={<Create${t}Page />} />`,`<Route path="${t.toLowerCase()}/edit/:id" element={<Edit${t}Page />} />`,`import ${t}Page from "./screens/${t}/${t}"`,`import Edit${t}Page from "./screens/${t}/Edit${t}"`,`import Create${t}Page from "./screens/${t}/Create${t}"`],P=x.readFileSync("./src/main.tsx").toString().split(`
`).filter(R=>g.filter(O=>R.includes(O)).length===0);x.writeFileSync("./src/main.tsx",P.join(`
`)),Q.succeed(`Removed screen: ${e}`);}))),(n==="both"||n==="server")&&(yield I("server",()=>l(this,null,function*(){let o=`./src/Microservices/${t}`,s=`./src/Database/Entities/${t}Entity.ts`,i="./src/Database/CollectionNames.ts",a="./src/Microservices/ApiRouter.ts";if(!x.existsSync(o)){console.log("  Nothing to remove in server.");return}Q.start(`Removing CRUD: ${t}`),x.removeSync(o),x.removeSync(s);let p=x.readFileSync(i).toString().split(`
`).filter(X=>!X.includes(`${t}Collection`)).join(`
`),g=x.readFileSync(a).toString().split(`
`).filter(X=>!X.includes(`${t}Router`)).join(`
`);x.writeFileSync(i,p),x.writeFileSync(a,g),Q.succeed(`Removed CRUD: ${t}`);})));})}function pe(){let e=['import XXXXXPage from "./screens/XXXXX/XXXXX"','import EditXXXXXPage from "./screens/XXXXX/EditXXXXX"','import CreateXXXXXPage from "./screens/XXXXX/CreateXXXXX"','<Route path="xxxxx" element={<XXXXXPage />} />','<Route path="xxxxx/create" element={<CreateXXXXXPage />} />','<Route path="xxxxx/edit/:id" element={<EditXXXXXPage />} />'];x.removeSync("./.git"),x.removeSync("./src/screens/XXXXX"),x.removeSync("./src/types/xxxxx.d.ts");let o=x.readFileSync("./src/main.tsx").toString().split(`
`).filter(s=>e.filter(i=>s.includes(i)).length===0);x.writeFileSync("./src/main.tsx",o.join(`
`));}function me(){x.removeSync("./.git"),x.removeSync("./src/Microservices/XXXXX"),x.removeSync("./src/Database/Entities/XXXXXEntity.ts");}function Z(e){return l(this,null,function*(){return new Promise((n,t)=>{exec(e,()=>{n(null);});})})}var Le=()=>`REST_API_PORT=3005
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
`;var z=De({color:"blue",indent:2});function de(e,n){return l(this,null,function*(){let t=e.toLowerCase();z.start("Scaffolding project..."),yield Ge().clone("https://github.com/kuvamdazeus/admin_panel",t),process.chdir(t),x.ensureDirSync(`${d}`),x.ensureDirSync(`${d}/webapp`),x.ensureDirSync(`${d}/server`),x.removeSync("./.git"),U("webapp",()=>{x.copyFileSync("./src/screens/XXXXX/XXXXX.tsx",`${d}/webapp/XXXXX.tsx`),x.copyFileSync("./src/screens/XXXXX/CreateXXXXX.tsx",`${d}/webapp/CreateXXXXX.tsx`),x.copyFileSync("./src/screens/XXXXX/EditXXXXX.tsx",`${d}/webapp/EditXXXXX.tsx`),x.copyFileSync("./src/types/xxxxx.d.ts",`${d}/webapp/xxxxx.d.ts`),x.writeFileSync("./.env",'VITE_BASE_URL = "http://localhost:3005/api"'),pe();}),U("server",()=>{x.copyFileSync("./src/Microservices/XXXXX/XXXXXRouter.ts",`${d}/server/XXXXXRouter.ts`),x.copyFileSync("./src/Microservices/XXXXX/XXXXXController.ts",`${d}/server/XXXXXController.ts`),x.copyFileSync("./src/Microservices/XXXXX/XXXXX.dto.ts",`${d}/server/XXXXX.dto.ts`),x.copyFileSync("./src/Database/Entities/XXXXXEntity.ts",`${d}/server/XXXXXEntity.ts`),x.writeFileSync("./.env",Le()),me();}),z.succeed(`Created "${t}" successfully!`),n.onlyServer&&x.removeSync("webapp"),n.onlyWebapp&&x.removeSync("server"),z.start("Installing dependencies..."),n.onlyServer||(yield I("webapp",()=>l(this,null,function*(){yield Z("yarn install");}))),n.onlyWebapp||(yield I("server",()=>l(this,null,function*(){yield Z("yarn install");}))),z.succeed("Installed dependencies successfully!");})}var Ae=e=>{let n=e.toLowerCase();return `/**
 * @typedef {import('../types').Screen} Screen
 */
const screen = {
  name: "${T(n)}",
  url: "/${n}",
  collectionName: "${n}",
  crudFields: [
    // ...
  ],
};

module.exports = screen;`};var Ue=De({color:"blue",indent:2});function ge(e){return l(this,null,function*(){let n=e.toLowerCase(),t=Ae(n);Ue.start(`Creating config template for ${B.cyan(n)}`),U("root",()=>{let o=`kitconfig/resources/${n}.cjs`;x.ensureFileSync(o),x.writeFileSync(o,t);}),Ue.succeed(`Created config template for ${B.cyan(n)}`);})}var d=ze.homedir()+"/.adminkit",_=new Command;_.name("admin-starter").description("CLI to setup & manager admin UIs").version("0.1.0");_.command("scaffold").option("--only-webapp","Only scaffold the webapp").option("--only-server","Only scaffold the server").description("Scaffold a new admin project by using templates").argument("<projectName>","Name of the project").action(de);_.command("add").description("Add a new resource").argument("resourceName","Name of the resource").action(N);_.command("addconfig").description("").argument("resourceName","Name of the resource you want to add config file for.").action(ge);_.command("remove").description("Removes an existing resource").argument("resourceName","Name of the resource").action(le);_.command("sync").description('Add resources defined in "kitconfig" to the project').action(ce);_.parse();

export { d as adminKitPath };
