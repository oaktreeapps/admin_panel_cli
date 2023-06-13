import { KitConfigField, KitConfigOptions } from "../schemas";
import { getLabel } from "../helpers/strings";

const validationUi = (fieldName: string) => [
  `className={classNames({ "p-invalid": submitted && !entity.${fieldName} })}`,
  `{submitted && !entity.${fieldName} && <small className="p-invalid">${getLabel(
    fieldName,
  )} is required.</small>}`,
];

export const InputNumber = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<InputNumber
  id="${field.name}"
  value={entity.${field.name}}
  onValueChange={(e) => onInputNumberChange(e.value, "${field.name}")}
  style={{ width: "100%" }}
  useGrouping={false}
  maxFractionDigits={5}
  ${field.required ? validationUi(field.name)[0] : ""}
  />
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const InputText = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<InputText
  id="${field.name}"
  value={entity.${field.name}}
  onChange={(e) => onInputChange(e.target.value, "${field.name}")}
  required
  autoFocus
  style={{ width: "100%" }}
  ${field.required ? validationUi(field.name)[0] : ""}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const InputTextarea = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<InputTextarea
  id="${field.name}"
  value={entity.${field.name}}
  onChange={(e) => onInputChange(e.target.value, "${field.name}")}
  style={{ width: "100%" }}
  ${field.required ? validationUi(field.name)[0] : ""}
  required
  rows={3}
  cols={20}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const Dropdown = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<Dropdown
  value={entity.${field.name}}
  onChange={(e: DropdownChangeEvent) => onInputChange(e.value, "${field.name}")}
  options={${field.name}Options}
  optionLabel="name"
  placeholder="Select a ${getLabel(field.name)}"
  style={{ width: "100%" }}
  ${field.required ? validationUi(field.name)[0] : ""}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const RadioButton = (
  field: KitConfigField,
  option: { name: string; value: string },
) => `<div className="flex align-items-center">
      <RadioButton
        value="${option.value}"
        onChange={(e) => onInputChange(e.value, "${field.name}")}
        checked={entity.${field.name} === "${option.value}"}
        ${field.required ? validationUi(field.name)[0] : ""}
      />
      <p className="ml-2 text-sm">
        ${option.name}
      </p>
    </div>
`;

export const RadioButtonField = (
  field: KitConfigField,
  options: KitConfigOptions,
) => `<div className="field ${field.inline ? "flex-grow-1" : "w-full"}">
  <p>Choose ${getLabel(field.name)}</p>
  <div className="flex flex-wrap gap-3">
    ${options.map((opt) => RadioButton(field, opt)).join("\n")}
  </div>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>
`;

export const InputSwitch = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
} flex items-center">
  <p className="mr-2">${getLabel(field.name)}</p>
  <InputSwitch checked={entity.${field.name}} onChange={(e) => onInputChange(e.value, "${
  field.name
}")} />
</div>`;

export const Calendar = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<Calendar
  id="${field.name}"
  value={entity.${field.name}}
  onChange={(e) => onInputChange(e.target.value, "${field.name}")}
  required
  style={{ width: "100%" }}
  ${field.required ? validationUi(field.name)[0] : ""}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const Password = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<Password
  id="${field.name}"
  value={entity.${field.name}}
  onChange={(e) => onInputChange(e.target.value, "${field.name}")}
  required
  style={{ width: "100%" }}
  feedback={false}
  ${field.required ? validationUi(field.name)[0] : ""}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const ColorPicker = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<ColorPicker
  id="${field.name}"
  value={entity.${field.name}}
  onChange={(e) => onInputChange(e.target.value, "${field.name}")}
  required
  ${field.required ? validationUi(field.name)[0] : ""}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const Editor = (field: KitConfigField) => `<div className="field ${
  field.inline ? "flex-grow-1" : "w-full"
}">
<p>${getLabel(field.name)}</p>
<Editor
  id="${field.name}"
  value={entity.${field.name}}
  onChange={(e) => onTextChange(e.target.value, "${field.name}")}
  required
  style={{ height: '320px' }}
  style={{ width: "100%" }}
  ${field.required ? validationUi(field.name)[0] : ""}
/>
  ${field.required ? validationUi(field.name)[1] : ""}
</div>`;

export const FileUpload = (
  field: KitConfigField,
  screenName: string,
) => `<div className="field w-full"><ImageUpload
  entity={entity}
  fieldName="${field.name}"
  onUpload={(url) => onInputChange(url, "${field.name}")}
  submitted={submitted}
  folder="${screenName}"
/>
${field.required ? validationUi(field.name)[1] : ""}
</div>`;
