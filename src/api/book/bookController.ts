import type { Request, RequestHandler, Response } from "express";

import { bookService } from "@/api/book/bookService";

class BookController {
	public getBooks: RequestHandler = async (_req: Request, res: Response) => {
		const serviceResponse = await bookService.findAll();
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const bookController = new BookController();
