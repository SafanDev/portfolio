/**
 * Add HTTPS when a public hostname is supplied without a protocol.
 * Existing URL schemes are preserved so validation can reject unsupported ones.
 */
export function addProtocol(value) {
  const trimmedValue = value.trim();
  const hasScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmedValue);

  return hasScheme ? trimmedValue : `https://${trimmedValue}`;
}

/**
 * Convert a configured site value into a clean HTTP(S) origin.
 */
export function normalizeSiteUrl(value) {
  const url = new URL(addProtocol(value));

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("The portfolio URL must use http or https.");
  }

  url.hash = "";
  url.search = "";
  url.pathname = "";

  return url.toString().replace(/\/$/, "");
}
