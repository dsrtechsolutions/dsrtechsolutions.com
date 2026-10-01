// Public, browser-safe configuration. Secrets live only on the server (see .env.example).
export const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFLSU8w8byAL8_Qa';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://qwqropurvbccczetjdev.supabase.co';

export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_oJMdNHTUOQkZoBN227g_YA_OWAzoVV0';
