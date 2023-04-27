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
            z.literal("text-normal"),
            z.literal("text-password"),
            z.literal("text-big"),
            z.literal("number"),
            z.literal("date"),
            z.literal("dropdown"),
          ]),
        })
      ),
    })
  ),
});

export type KitConfig = z.infer<typeof kitSchema>;
