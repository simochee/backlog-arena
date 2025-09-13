import * as z from "zod";

export const Lang = z.enum(["ja", "en"]).openapi("Lang");
