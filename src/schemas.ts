import { z } from "zod";

export const kitSchema = z.object({
  screens: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      crudFields: z.array(
        z.object({
          name: z.string(),
          type: z.union([
            z.literal("InputText"),
            z.literal("InputTextarea"),
            z.literal("InputNumber"),
            // z.literal("date"),
            // z.literal("dropdown"),
          ]),
        })
      ),
    })
  ),
});

export type KitConfig = z.infer<typeof kitSchema>;
