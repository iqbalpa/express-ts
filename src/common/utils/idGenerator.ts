export const generateId = (length = 6): string => {
	const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
	let id = "";
	for (let i = 0; i < length; i++) {
		id += chars[Math.floor(Math.random() * chars.length)];
	}
	return id;
};
