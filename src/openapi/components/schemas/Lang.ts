import * as z from "zod";

export const Lang = z.union([z.literal("ja"), z.literal("en")]).openapi("Lang");
