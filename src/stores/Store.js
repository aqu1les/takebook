export class Store {
    observers = [];

    notify() {
        this.observers.forEach(observer => observer(this.state));
    }

    subscribe(newObserver) {
        this.observers.push(newObserver);
        return () => {
            this.observers = this.observers.filter(
                observer => observer !== newObserver,
            );
        };
    }
}