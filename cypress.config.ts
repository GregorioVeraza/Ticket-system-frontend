import { defineConfig } from "cypress";
import { loadEnv } from "vite";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // Load test environment variables
      const env = loadEnv("test", process.cwd());
      
      // Merge env vars into cypress config
      config.env = { 
        ...config.env,
        ...env 
      };
      
      console.log("✅ Cypress configurado con variables de testing");
      console.log("API URL:", env.VITE_API_URL);
      
      return config;
    },
  },
});

