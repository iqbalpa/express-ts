import type { Book } from "@/api/book/bookModel";

export const books: Book[] = [
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
}
