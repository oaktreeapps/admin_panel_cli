import { z } from "zod";

export const kitScreenSchema = z.object({
  name: z.string(),
  url: z.string(),
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
        .default("String")
        .optional(),
      widget: z
        .union([
          z.literal("InputText"),
          z.literal("InputTextarea"),
          z.literal("RadioButton"),
          z.literal("Dropdown"),
          z.literal("InputSwitch"),
          z.literal("InputNumber"),
          z.literal("Number"),
        ])
        .default("InputText")
        .optional(),
      options: z
        .array(
          z.object({
            name: z.string(),
            value: z.string(),
          })
        )
        .optional(),
    })
  ),
});

export const kitSchema = z.object({
  resources: z.array(kitScreenSchema),
});

export type KitConfig = z.infer<typeof kitSchema>;

export type KitConfigOptions = { name: string; value: string }[];

export type KitConfigField = KitConfig["resources"][number]["crudFields"][number];

export type KitConfigScreen = KitConfig["resources"][number];
