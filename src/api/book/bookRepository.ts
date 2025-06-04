import type { Book, BookBody } from "@/api/book/bookModel";
import { generateId } from "@/common/utils/idGenerator";

export let books: Book[] = [
	{
		id: "1a2b3c",
		title: "The Go Programming Language",
		author: "Alan A. A. Donovan",
		status: "finished",
		rating: 4.5,
		notes: "Very helpful for learning Go idioms.",
		addedAt: new Date("2025-01-10"),
	},
	{
		id: "4d5e6f",
		title: "Clean Code",
		author: "Robert C. Martin",
		status: "to-read",
		rating: 5,
		notes: "Must-read for software engineers.",
		addedAt: new Date("2024-12-01"),
	},
	{
		id: "7g8h9i",
		title: "Introduction to Algorithms",
		author: "Thomas H. Cormen",
		status: "reading",
		addedAt: new Date("2025-03-15"),
	},
];

export class BookRepository {
	async findAllAsync(): Promise<Book[]> {
		return books;
	}

	async findByIdAsync(id: string): Promise<Book | null> {
		return books.find((book) => book.id === id) || null;
	}

	async addBookAsync(book: BookBody): Promise<Book | null> {
		try {
			const nb: Book = {
				...book,
				id: generateId(),
				addedAt: new Date(),
			};
			books.push(nb);
			return nb;
		} catch (e) {
			return null;
		}
	}

	async updateBookAsync(book: BookBody, id: string): Promise<Book | null> {
		try {
			const b = books.find((book) => book.id === id);
			if (!b) {
				return null;
			}
			b.author = book.author;
			b.status = book.status;
			b.title = book.title;
			b.notes = book.notes;
			b.rating = book.rating;
			return b;
		} catch (e) {
			return null;
		}
	}

	async deleteBookAsync(id: string): Promise<Book | null> {
		try {
			const b = books.find((book) => book.id === id);
			if (!b) {
				return null;
			}
			books = books.filter((book) => book.id !== id);
			return b;
		} catch (e) {
			return null;
		}
	}
}
