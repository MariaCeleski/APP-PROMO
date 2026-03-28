import { supabase } from './supabase';

// ❤️ adicionar favorito
export async function addFavorite(userId: string, promotionId: string) {
  const { error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      promotion_id: promotionId,
    });

  if (error) throw error;
}

// 💔 remover favorito
export async function removeFavorite(userId: string, promotionId: string) {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('promotion_id', promotionId);

  if (error) throw error;
}

// 📥 buscar favoritos do usuário
export async function getFavorites(userId: string) {
  const { data, error } = await supabase
    .from('favorites')
    .select('promotion_id')
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}