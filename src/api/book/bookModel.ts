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

// Input validation for 'GET books/:id' endpoint
export const GetBookSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

// Book body schema for POST and PUT
const BookBodySchema = z.object({
	title: z.string(),
	author: z.string(),
	status: BookStatusEnum,
	rating: z.number().optional(),
	notes: z.string().optional(),
});

export type BookBody = z.infer<typeof BookBodySchema>;

// Input validation for 'POST books' endpoint
export const PostBookSchema = z.object({
	body: BookBodySchema,
});

// Input validation for 'PUT book' endpoint
export const PutBookSchema = z.object({
	body: BookBodySchema,
});
