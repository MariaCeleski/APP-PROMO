import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://klqbvcwuuuqforpmbdtd.supabase.co';
const supabaseAnonKey = 'sb_publishable_kljNjUdGbSGXDzH7Sb7O5A_kB9_L5mR';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);