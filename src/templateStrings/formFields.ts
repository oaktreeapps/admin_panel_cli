import { getLabel } from "../helpers/strings";

export const InputNumber = (fieldName: string) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputNumber
  id="${fieldName}"
  value={entity.${fieldName}}
  onValueChange={(e) => onInputNumberChange(e, "${fieldName}")}
  className={classNames({ "p-invalid": submitted && !entity.${fieldName} })}
  mode="currency"
  currency="USD"
  locale="en-US"
/>
{submitted && !entity.${fieldName} && <small className="p-invalid">Name is required.</small>}
</div>`;

export const InputText = (fieldName: string) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputText
  id="${fieldName}"
  value={entity.${fieldName}}
  onChange={(e) => onInputChange(e, "${fieldName}")}
  required
  autoFocus
  className={classNames({ "p-invalid": submitted && !entity.${fieldName} })}
/>
{submitted && !entity.${fieldName} && <small className="p-invalid">Name is required.</small>}
</div>`;

export const InputTextarea = (fieldName: string) => `<div className="field">
<label htmlFor="${fieldName}">${getLabel(fieldName)}</label>
<InputTextarea
  id="${fieldName}"
  value={entity.${fieldName}}
  onChange={(e) => onInputChange(e, "${fieldName}")}
  className={classNames({ "p-invalid": submitted && !entity.${fieldName} })}
  required
  rows={3}
  cols={20}
/>
{submitted && !entity.${fieldName} && <small className="p-invalid">Name is required.</small>}
</div>`;
