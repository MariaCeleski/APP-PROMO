import { supabase } from './supabase';

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('name, email, cpf')
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data;
}