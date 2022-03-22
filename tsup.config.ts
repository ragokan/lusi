import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  silent: true,
  watch: ["**/*.ts", "**/*.json"],
  onSuccess: "node dist/index.js",
  loader: {
    ".json": "file",
  },
});
