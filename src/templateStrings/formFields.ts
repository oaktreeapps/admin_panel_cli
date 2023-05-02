import { getLabel } from "../helpers/strings";

const validationUi = (fieldName: string) => [
  `className={classNames({ "p-invalid": submitted && !entity.${fieldName} })}`,
  `{submitted && !entity.${fieldName} && <small className="p-invalid">${getLabel(
    fieldName
  )} is required.</small>}`,
];

export const InputNumber = (fieldName: string, required = true) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputNumber
  id="${fieldName}"
  value={entity.${fieldName}}
  onValueChange={(e) => onInputNumberChange(e.value, "${fieldName}")}
  ${required ? validationUi(fieldName)[0] : ""}
  />
  ${required ? validationUi(fieldName)[1] : ""}
</div>`;

export const InputText = (fieldName: string, required = true) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputText
  id="${fieldName}"
  value={entity.${fieldName}}
  onChange={(e) => onInputChange(e.target.value, "${fieldName}")}
  required
  autoFocus
  ${required ? validationUi(fieldName)[0] : ""}
/>
  ${required ? validationUi(fieldName)[1] : ""}
</div>`;

export const InputTextarea = (fieldName: string, required = true) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputTextarea
  id="${fieldName}"
  value={entity.${fieldName}}
  onChange={(e) => onInputChange(e.target.value, "${fieldName}")}
  ${required ? validationUi(fieldName)[0] : ""}
  required
  rows={3}
  cols={20}
/>
  ${required ? validationUi(fieldName)[1] : ""}
</div>`;

export const Dropdown = (fieldName: string, required = true) => `<div className="field">
<Dropdown
  value={entity.${fieldName}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${fieldName}")}
  options={${fieldName}Options}
  optionLabel="name"
  placeholder="Select a ${getLabel(fieldName)}"
  ${required ? validationUi(fieldName)[0] : ""}
/>
  ${required ? validationUi(fieldName)[1] : ""}
</div>`;
