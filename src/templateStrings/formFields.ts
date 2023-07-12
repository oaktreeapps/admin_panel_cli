import { KitConfigField } from "../schemas";
import { getLabel } from "../helpers/strings";

export const InputNumber = (field: KitConfigField) => `<FormInputNumber
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const InputText = (field: KitConfigField) => `<FormInputText
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const InputTextarea = (field: KitConfigField) => `<FormInputTextarea
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const Dropdown = (field: KitConfigField) => `<FormInputDropdown
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
options={${field.name}Options}
/>
`;

export const RadioButton = (field: KitConfigField) => `<FormInputRadio
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
options={${field.name}Options}
/>
`;

export const InputSwitch = (field: KitConfigField) => `<FormInputSwitch
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const Calendar = (field: KitConfigField) => `<FormInputCalendar
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const Password = (field: KitConfigField) => `<FormInputPassword
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const ColorPicker = (field: KitConfigField) => `<FormInputColorPicker
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const Editor = (field: KitConfigField) => `<FormInputEditor
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;

export const FileUpload = (field: KitConfigField, screenName: string) => `<FormInputUpload
folderName="${screenName}"
fieldName="${field.name}"
control={control}
inline={${field.inline}}
rules={{ required: "* ${getLabel(field.name)} is required!" }}
/>
`;
