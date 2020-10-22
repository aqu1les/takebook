export function createAdvertToUpdate(
	originalBook,
	{ title = '', description = '', author = '', price, categories = [] },
) {
	const data = {};

	if (title && originalBook.title !== title) {
		data.title = title;
	}

	if (description && originalBook.description !== description) {
		data.description = description;
	}

	if (author && originalBook.author !== author) {
		data.author = author;
	}

	if (price) {
		price = price.replace(/[,]/gm, '.');
		if (originalBook.price != price) {
			data.price = parseInt(price, 10);
		}
	}

	if (
		!arraysEqual(getCatIDs(originalBook.categories), getCatIDs(categories))
	) {
		data.categories = getCatIDs(categories);
	}

	return data;
}

const getCatIDs = (cats) => cats.map((c) => c.id);
const arraysEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);
