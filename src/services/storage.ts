import { supabase } from './supabase';

export async function uploadImage(uri: string, userId: string) {
  const response = await fetch(uri);
  const blob = await response.blob();

  const fileName = `${userId}/${Date.now()}.jpg`;

  const { error } = await supabase.storage
    .from('promotions')
    .upload(fileName, blob, {
      contentType: 'image/jpeg',
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from('promotions')
    .getPublicUrl(fileName);

  return data.publicUrl;
}