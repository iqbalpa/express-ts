import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

const BookStatusEnum = z.enum(["to-read", "reading", "finished"]);

export type BookStatus = z.infer<typeof BookStatusEnum>;

export const BookSchema = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	status: BookStatusEnum,
	rating: z.number().optional(),
	notes: z.string().optional(),
	addedAt: z.date(),
});

export type Book = z.infer<typeof BookSchema>;
