// Polyfill for Buffer in browser environment
import { Buffer } from "buffer";

// Make Buffer available globally
if (typeof window !== "undefined") {
  (
    window as typeof window & { Buffer: typeof Buffer; global: typeof window }
  ).Buffer = Buffer;
  (
    window as typeof window & { Buffer: typeof Buffer; global: typeof window }
  ).global = window;
}

export {};
