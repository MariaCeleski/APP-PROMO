import { supabase } from './supabase';

// =======================
// BUSCAR (com paginação)
// =======================
export async function getPromotions(page = 1, limit = 5) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return data;
}

// =======================
// CRIAR (CORRETO)
// =======================
export async function createPromotion(data: any, userId: string) {
  const { error } = await supabase
    .from('promotions')
    .insert([
      {
        ...data,
        user_id: userId,
      },
    ]);

  if (error) throw error;
}

// =======================
// DELETAR
// =======================
export async function deletePromotion(id: string) {
  const { error } = await supabase
    .from('promotions')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// =======================
// ATUALIZAR
// =======================
export async function updatePromotion(id: string, data: any) {
  const { error } = await supabase
    .from('promotions')
    .update(data)
    .eq('id', id);

  if (error) throw error;
}