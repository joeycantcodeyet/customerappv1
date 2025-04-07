
/**
 * Encodes a string or object to base64
 * @param data - String or object to encode
 * @returns Base64 encoded string
 */
export function encodeToBase64(data: string | object): string {
  const stringData = typeof data === 'string' ? data : JSON.stringify(data);
  // Use browser's built-in btoa function to encode to base64
  return window.btoa(stringData);
}

/**
 * Decodes a base64 string
 * @param base64 - Base64 encoded string
 * @returns Decoded string
 */
export function decodeFromBase64(base64: string): string {
  return window.atob(base64);
}
