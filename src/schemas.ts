import { z } from "zod";

export const kitSchema = z.object({
  backendUrl: z.string().optional().default("http://localhost:3000"),
  screens: z.array(
    z.object({
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
          type: z.union([
            z.literal("InputText"),
            z.literal("InputTextarea"),
            z.literal("InputNumber"),
            z.literal("Dropdown"),
            z.literal("RadioButton"),
            z.literal("InputSwitch"),
          ]),
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
    })
  ),
});

export type KitConfig = z.infer<typeof kitSchema>;

export type KitConfigOptions = { name: string; value: string }[];

export type KitConfigField = KitConfig["screens"][number]["crudFields"][number];
