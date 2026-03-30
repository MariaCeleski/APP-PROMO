import { supabase } from './supabase';

// =======================
// BUSCAR (com paginação)
// =======================
export async function getPromotions(page = 1, limit = 5) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("promotions")
    .select("id, title, price, store, category, user_id, created_at, image_url")
    .order("created_at", { ascending: false }) 
    .range(from, to);

  if (error) throw error;

  return data;
}

// =======================
// CRIAR (VERSÃO CORRETA)
// =======================
export async function createPromotion(data: any) {
  const { error } = await supabase
    .from('promotions')
    .insert(data);

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