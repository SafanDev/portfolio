import assert from "node:assert/strict";
import test from "node:test";

import {
  addProtocol,
  normalizeSiteUrl,
} from "../src/lib/site-url-core.mjs";

test("addProtocol adds HTTPS to a bare hostname", () => {
  assert.equal(addProtocol("portfolio.example.com"), "https://portfolio.example.com");
});

test("normalizeSiteUrl removes paths, queries, hashes and the trailing slash", () => {
  assert.equal(
    normalizeSiteUrl("https://portfolio.example.com/work?source=test#project"),
    "https://portfolio.example.com",
  );
});

test("normalizeSiteUrl preserves a local HTTP origin", () => {
  assert.equal(normalizeSiteUrl("http://localhost:3000/"), "http://localhost:3000");
});

test("normalizeSiteUrl rejects unsupported protocols", () => {
  assert.throws(
    () => normalizeSiteUrl("ftp://portfolio.example.com"),
    /must use http or https/i,
  );
});
