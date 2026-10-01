import { defineConfig, loadEnv } from 'vite';

// In production Vercel serves api/*.js as serverless functions.
// This plugin runs the same handlers under `npm run dev` so forms work locally.
function devApi(env) {
  return {
    name: 'dsr-dev-api',
    configureServer(server) {
      for (const [k, v] of Object.entries(env)) {
        if (process.env[k] === undefined) process.env[k] = v;
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
