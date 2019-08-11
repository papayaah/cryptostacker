export class EventEmitter {
  static _events = {}

  static dispatch(event, data) {
    if (!EventEmitter._events[event]) return
    EventEmitter._events[event].forEach(callback => callback(data))
  }

  static subscribe(event, callback) {
    if (!EventEmitter._events[event]) EventEmitter._events[event] = []

    EventEmitter._events[event].push(callback)
  }
}