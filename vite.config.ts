import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import banner from "vite-plugin-banner";
import packageInfo from "./package.json";

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true,
      //outDir: "./dist/types",
      strictOutput: false,
      include: "./src",
    }),
    banner(
      `${packageInfo.name} ${packageInfo.version}\n© ${new Date().getFullYear()} ${packageInfo.author}\nLicense: ${packageInfo.license}`
    ),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "alxcube.xmlMapper",
      fileName: "xml-mapper",
    },
    rollupOptions: {
      external: ["xpath"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          xpath: "xpath",
        },
      },
    },
  },
});
