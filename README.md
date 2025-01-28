# firestore-sizer 📏

A lightweight utility to calculate the size of Firestore documents in bytes, following Firestore's storage rules.

## Why?

Firestore has [specific size limits](https://firebase.google.com/docs/firestore/quotas#documents) for documents (1 MiB). This package helps you calculate document sizes before attempting to save them, preventing quota errors in production.

## Installation

```bash
npm install firestore-sizer
```

## Usage

```javascript
import sizeof from "firestore-sizer";

// Simple values
sizeof("hello"); // => 6 (length + 1)
sizeof(42); // => 8
sizeof(true); // => 1
sizeof(null); // => 1

// Objects and Arrays
const user = {
  name: "John",
  age: 30,
  active: true,
  tags: ["admin", "user"],
};

sizeof(user); // Calculates total size in bytes
```

## Size Calculation Rules

The package follows these rules for calculating sizes:

| Type                 | Size Calculation                     |
| -------------------- | ------------------------------------ |
| `null`               | 1 byte                               |
| `boolean`            | 1 byte                               |
| `number`             | 8 bytes                              |
| `string`             | length + 1 bytes                     |
| `Timestamp`          | 8 bytes                              |
| `GeoPoint`           | 16 bytes                             |
| `Bytes` (Uint8Array) | actual byte length                   |
| `Array`              | sum of elements + 1 byte per element |
| `Object`             | sum of fields + 1 byte per field     |

## Special Types Support

The package includes support for Firestore special types:

```javascript
// Timestamp (from Firestore)
const timestamp = { seconds: 1234567890, nanoseconds: 123456789 };
sizeof(timestamp); // => 8

// GeoPoint
const location = { latitude: 40.7128, longitude: -74.006 };
sizeof(location); // => 16

// Binary Data
const binaryData = new Uint8Array([1, 2, 3, 4]);
sizeof(binaryData); // => 4
```

## Notes

- String sizes are calculated using simple length + 1 by default. For exact UTF-8 byte calculation, you can modify the source.
- The package provides simplified type detection for Firestore types (Timestamp, GeoPoint). Adjust the detection logic if needed for your specific use case.

## License

MIT © Jorge Zambrano (jzambrano12)
