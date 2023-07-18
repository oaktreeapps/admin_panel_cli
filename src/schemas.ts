import { z } from "zod";

export const kitScreenSchema = z.object({
  name: z.string(),
  url: z.string(),
  only: z.union([z.literal("webapp"), z.literal("server")]).optional(),
  collectionName: z.string(),
  crudFields: z.array(
    z.object({
      name: z.string(),
      required: z.boolean().optional().default(true),
      unique: z.boolean().optional().default(false),
      tableDisplay: z.boolean().optional().default(true),
      inline: z.boolean().optional().default(false),
      datatype: z
        .union([z.literal("String"), z.literal("Number"), z.literal("Boolean")])
        .optional(),
      widget: z
        .union([
          z.literal("InputText"),
          z.literal("InputTextarea"),
          z.literal("RadioButton"),
          z.literal("Dropdown"),
          z.literal("InputSwitch"),
          z.literal("InputNumber"),
          z.literal("ImageFileUpload"),
          z.literal("Calendar"),
          z.literal("Password"),
          z.literal("ColorPicker"),
          z.literal("Editor"),
          z.literal("MultiSelect"),
        ])
        .optional(),
      options: z
        .array(
          z.object({
            name: z.string(),
            value: z.string(),
          }),
        )
        .optional()
        .default([]),
    }),
  ),
});

export const kitSchema = z.object({
  resources: z.array(kitScreenSchema),
});

export type KitConfig = z.infer<typeof kitSchema>;

export type KitConfigOptions = KitConfig["resources"][number]["crudFields"][number]["options"];

export type KitConfigField = KitConfig["resources"][number]["crudFields"][number];

export type KitConfigScreen = KitConfig["resources"][number];
