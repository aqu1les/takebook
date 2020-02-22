export class Store {
    observers = [];
    state = {};

    notify() {
        this.observers.forEach(observer => observer(this.state));
    }

    subscribe(newObserver) {
        this.observers = [...this.observers, newObserver];
        return () => {
            this.observers = this.observers.filter(
                observer => observer !== newObserver,
            );
        };
    }
}