import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      "/api": {
        target: "http://3.111.36.107:3001", // dynamically from env
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
// export default defineConfig(({ mode }) => {
//   // Load env variables based on the current mode (development, production)
//   const env = loadEnv(mode, process.cwd(), "");
//   // Third param "" means do not require prefix, you can also use "VITE_" if you want

//   // console.log("Env API:", env.VITE_API_URL); // just to check

//   return {
//     server: {
//       proxy: {
//         "/api": {
//           target: "http://localhost:3001", // dynamically from env
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ""),
//         },
//       },
//     },
//     plugins: [react()],
//     resolve: {
//       alias: {
//         "@": path.resolve(__dirname, "./src"),
//       },
//     },
//   };
// });
