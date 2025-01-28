// src/index.js

/**
 * Checks if the object is a Firestore "Timestamp" (simulated).
 * Adjust if you need real detection in production.
 */
function isTimestamp(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.seconds === "number" &&
    typeof value.nanoseconds === "number"
  );
}

/**
 * Checks if the object is a Firestore "GeoPoint" (simulated).
 * Adjust if you need real detection in production.
 */
function isGeoPoint(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.latitude === "number" &&
    typeof value.longitude === "number"
  );
}

/**
 * Checks if the object is a Uint8Array (for representing binary data).
 */
function isBytes(value) {
  return value instanceof Uint8Array;
}

/**
 * Calculates the size in bytes of an object/value
 * according to Firestore-like rules (simplified).
 */
export default function sizeof(data) {
  // 1. null => 1 byte
  if (data === null) {
    return 1;
  }

  // 2. boolean => 1 byte
  if (typeof data === "boolean") {
    return 1;
  }

  // 3. number => 8 bytes
  if (typeof data === "number") {
    return 8;
  }

  // 4. string => (length + 1) bytes
  if (typeof data === "string") {
    // For the "simple" version of 1 byte per character + 1 extra:
    return data.length + 1;

    // If you want to measure in actual UTF-8 bytes, use:
    // const utf8Bytes = new TextEncoder().encode(data);
    // return utf8Bytes.length + 1;
  }

  // 5. Timestamp => 8 bytes
  if (isTimestamp(data)) {
    return 8;
  }

  // 6. GeoPoint => 16 bytes
  if (isGeoPoint(data)) {
    return 16;
  }

  // 7. Bytes (Uint8Array) => data.byteLength
  if (isBytes(data)) {
    return data.byteLength;
  }

  // 8. Array => sum of elements + 1 extra byte per element
  if (Array.isArray(data)) {
    let total = 0;
    for (const element of data) {
      total += sizeof(element);
      total += 1; // 1 additional byte per element
    }
    return total;
  }

  // 9. Object => sum of fields + 1 extra byte per field
  if (typeof data === "object") {
    let total = 0;
    for (const [key, value] of Object.entries(data)) {
      total += sizeof(value);
      total += 1; // 1 additional byte per field
    }
    return total;
  }

  // Default => 0 if it doesn't match any case
  return 0;
}
