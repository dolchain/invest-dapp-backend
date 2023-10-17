import { createClient } from '@supabase/supabase-js';
import environment from './environment';

// Create a single supabase client for interacting with your database + object storage
export default createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
    },
  },
);