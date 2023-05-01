import { capitalize, getLabel } from "../helpers/strings";

const validationUi = (fieldName: string) => [
  `className={classNames({ "p-invalid": submitted && !entity.${fieldName} })}`,
  `{submitted && !entity.${fieldName} && <small className="p-invalid">${capitalize(
    fieldName
  )} is required.</small>}`,
];

export const InputNumber = (fieldName: string, required = true) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputNumber
  id="${fieldName}"
  value={entity.${fieldName}}
  onValueChange={(e) => onInputNumberChange(e, "${fieldName}")}
  ${required ? validationUi(fieldName)[0] : ""}
  />
  ${required ? validationUi(fieldName)[1] : ""}
</div>`;

export const InputText = (fieldName: string, required = true) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputText
  id="${fieldName}"
  value={entity.${fieldName}}
  onChange={(e) => onInputChange(e, "${fieldName}")}
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
  onChange={(e) => onInputChange(e, "${fieldName}")}
  ${required ? validationUi(fieldName)[0] : ""}
  required
  rows={3}
  cols={20}
/>
  ${required ? validationUi(fieldName)[1] : ""}
</div>`;
