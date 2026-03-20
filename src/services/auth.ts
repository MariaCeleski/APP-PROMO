import { supabase } from './supabase';
import { Alert } from 'react-native';
// LOGIN
export async function signIn(identifier: string, password: string) {
  let email = identifier;

  // verifica se é CPF (somente números)
  const isCPF = /^\d{11}$/.test(identifier);

  if (isCPF) {
    // 🔍 busca email pelo CPF
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('cpf', identifier)
      .single();

    if (error || !data) {
      throw new Error('CPF não encontrado');
    }

    email = data.email;
  }

  // login com email (original ou encontrado)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

// REGISTER
export async function signUp(
  email: string,
  password: string,
  name: string,
  cpf: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  if (!user) {
  Alert.alert(
    'Verifique seu email',
    'Enviamos um link de confirmação para você.'
  );
  return;
}

  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: user.id,
      name,
      cpf,
      email,
    });

  if (profileError) throw profileError;

  return data;
}

// LOGOUT
export async function signOut() {
  await supabase.auth.signOut();
}