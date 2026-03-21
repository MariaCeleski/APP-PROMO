import { supabase } from "./supabase";
import { Alert } from "react-native";

// 🔐 LOGIN (EMAIL OU CPF)
export async function signIn(identifier: string, password: string) {
  let emailToLogin = identifier;

  // remove tudo que não for número
  const cleanIdentifier = identifier.replace(/\D/g, "");

  // verifica se é CPF
  const isCPF = /^\d{11}$/.test(cleanIdentifier);

  if (isCPF) {
    const { data: userData, error } = await supabase
      .from("users")
      .select("email")
      .eq("cpf", cleanIdentifier)
      .maybeSingle();

    if (error) throw error;

    if (!userData?.email) {
      throw new Error("CPF não encontrado");
    }

    emailToLogin = userData.email;
  }

  // 🔑 login com email
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailToLogin,
    password,
  });

  if (error) throw error;

  return data;
}

// 📝 REGISTER
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

  // caso confirmação de email esteja ativa
  if (!user) {
    Alert.alert(
      "Verifique seu email",
      "Enviamos um link de confirmação para você."
    );
    return;
  }

  // salva dados adicionais
  const { error: profileError } = await supabase.from("users").insert({
    id: user.id,
    name,
    cpf,
    email,
  });

  if (profileError) throw profileError;

  return data;
}

// 🚪 LOGOUT
export async function signOut() {
  await supabase.auth.signOut();
}