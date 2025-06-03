import { StatusCodes } from "http-status-codes";

import type { Book, PostBook } from "@/api/book/bookModel";
import { BookRepository } from "@/api/book/bookRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class BookService {
	private bookRepository: BookRepository;

	constructor(repository: BookRepository = new BookRepository()) {
		this.bookRepository = repository;
	}

	// Retrieve all books from database
	async findAll(): Promise<ServiceResponse<Book[] | null>> {
		try {
			const books = await this.bookRepository.findAllAsync();
			if (!books || books.length === 0) {
				return ServiceResponse.failure("No books found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success("Books found", books);
		} catch (e) {
			const errorMessage = `Error finding all books: $${(e as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occured while retrieving books",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Retrieve a single book by the ID
	async findById(id: string): Promise<ServiceResponse<Book | null>> {
		try {
			const book = await this.bookRepository.findByIdAsync(id);
			if (!book) {
				return ServiceResponse.failure("Book not found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success("Book found", book);
		} catch (e) {
			const errorMessage = `Book with id ${id}: ${(e as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occured while finding book", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}

	// Post a new book
	async addBook(b: PostBook): Promise<ServiceResponse<Book | null>> {
		try {
			const book = await this.bookRepository.addBookAsync(b);
			if (!book) {
				return ServiceResponse.failure("Failed to add new book", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success("Added new book successfully", book);
		} catch (e) {
			const errorMessage = `Failed to add new book: ${(e as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occured while adding a new book",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

export const bookService = new BookService();
