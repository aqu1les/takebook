class FilterStore {
	constructor() {
		this.category = 'b239-8956';
		this.searchTerm = '';
		this.observers = [];
	}

	subscribe(observer) {
		this.observers.push(observer);
		this.notify();
		return () => {
			this.observers.filter((o) => o !== observer);
		};
	}

	notify() {
		this.observers.forEach((observer) => {
			observer({
				category: this.category,
				searchTerm: this.searchTerm,
			});
		});
	}

	changeCategory(categoryID) {
		this.category = categoryID;
		this.notify();
	}

	filterByWord(term) {
		this.searchTerm = term;
		this.notify();
	}
}

export default new FilterStore();
