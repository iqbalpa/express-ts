import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { bookController } from "@/api/book/bookController";
import { BookSchema, GetBookSchema, PostBookSchema, PutBookSchema } from "@/api/book/bookModel";
import { validateRequest } from "@/common/utils/httpHandlers";

export const bookRegistry = new OpenAPIRegistry();
export const bookRouter: Router = express.Router();

bookRegistry.register("Book", BookSchema);

bookRegistry.registerPath({
	method: "get",
	path: "/books",
	tags: ["Book"],
	responses: createApiResponse(z.array(BookSchema), "Success"),
});

bookRouter.get("/", bookController.getBooks);

bookRegistry.registerPath({
	method: "get",
	path: "/books/{id}",
	tags: ["Book"],
	request: { params: GetBookSchema.shape.params },
	responses: createApiResponse(BookSchema, "Success"),
});

bookRouter.get("/:id", validateRequest(GetBookSchema), bookController.getBook);

bookRegistry.registerPath({
	method: "post",
	path: "/books",
	tags: ["Book"],
	request: {
		body: {
			description: "Book to add",
			content: {
				"application/json": {
					schema: PostBookSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(BookSchema, "Success"),
});

bookRouter.post("/", validateRequest(PostBookSchema), bookController.addBook);

bookRegistry.registerPath({
	method: "put",
	path: "/books/{id}",
	tags: ["Book"],
	request: {
		params: PutBookSchema.shape.params,
		body: {
			description: "Book to update",
			content: {
				"application/json": {
					schema: PutBookSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(BookSchema, "Success"),
});

bookRouter.put("/", validateRequest(PutBookSchema), bookController.updateBook);
