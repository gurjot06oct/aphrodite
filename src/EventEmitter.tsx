type EventName = string | symbol;
type EventListener<T> = (data: T) => void;

class EventEmitter {
  private listeners: Map<EventName, EventListener<any>[]> = new Map();

  subscribe<T>(eventName: EventName, listener: EventListener<T>): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const eventListeners = this.listeners.get(eventName) as EventListener<T>[];
    eventListeners.push(listener);

    // Return a function to unsubscribe this listener
    return () => {
      const index = eventListeners.indexOf(listener);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    };
  }

  emit<T>(eventName: EventName, data: T): void {
    const eventListeners = this.listeners.get(eventName);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }
}

// Example usage:
const eventEmitter = new EventEmitter();

// Subscribe to events
const unsubscribe1 = eventEmitter.subscribe<string>("message", (msg) => {
  console.log("Received message:", msg);
});

const unsubscribe2 = eventEmitter.subscribe<number>("count", (count) => {
  console.log("Count updated:", count);
});

// Emit events
eventEmitter.emit("message", "Hello, world!");
eventEmitter.emit("count", 5);

// Unsubscribe (clean up)
unsubscribe1();
unsubscribe2();

// This won't be logged because the listeners are unsubscribed
eventEmitter.emit("message", "This will not be logged");
eventEmitter.emit("count", 10);
