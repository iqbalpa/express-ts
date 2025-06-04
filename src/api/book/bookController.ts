import type { Request, RequestHandler, Response } from "express";

import type { BookBody, BookStatus } from "@/api/book/bookModel";
import { bookService } from "@/api/book/bookService";
import { logger } from "@/server";

class BookController {
	public getBooks: RequestHandler = async (_req: Request, res: Response) => {
		const serviceResponse = await bookService.findAll();
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public getBook: RequestHandler = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const serviceResponse = await bookService.findById(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public addBook: RequestHandler = async (req: Request, res: Response) => {
		const pb: BookBody = {
			title: req.body.title as string,
			author: req.body.author as string,
			status: req.body.author as BookStatus,
			rating: Number.parseFloat(req.body.rating as string),
			notes: req.body.notes as string,
		};
		const serviceResponse = await bookService.addBook(pb);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public updateBook: RequestHandler = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const pb: BookBody = {
			title: req.body.title as string,
			author: req.body.author as string,
			status: req.body.author as BookStatus,
			rating: Number.parseFloat(req.body.rating as string),
			notes: req.body.notes as string,
		};
		const serviceResponse = await bookService.updateBook(pb, id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const bookController = new BookController();
