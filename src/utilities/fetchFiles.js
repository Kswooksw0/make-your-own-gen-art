import {supabase} from '../client.js'

export const fetchFiles = async (folder) => {
  try {
    const { data, error } = await supabase.storage
      .from("generative-art-gifs")
      .list(`${folder}/`);

    if (error) {
      throw error;
    }
    return data || [];

  } catch (error) {
    console.error("Error fetching GIF files:", error.message);
    return [];
  }
};
