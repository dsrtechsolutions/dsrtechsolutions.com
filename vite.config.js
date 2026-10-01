import { defineConfig, loadEnv } from 'vite';

// Variables set in the real shell before Vite first started. Kept on globalThis because
// Vite re-evaluates this config (in the same process) whenever a .env file changes.
globalThis.__dsrShellEnvKeys ??= new Set(Object.keys(process.env));

// In production Vercel serves api/*.js as serverless functions.
// This plugin runs the same handlers under `npm run dev` so forms work locally.
function devApi(env) {
  return {
    name: 'dsr-dev-api',
    configureServer(server) {
      // .env files win over values from a previous load; real shell variables win over files.
      for (const [k, v] of Object.entries(env)) {
        if (!globalThis.__dsrShellEnvKeys.has(k)) process.env[k] = v;
      }
      server.middlewares.use('/api/submit', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/submit.js');
        await handler(req, res);
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [devApi(loadEnv(mode, process.cwd(), ''))],
}));
