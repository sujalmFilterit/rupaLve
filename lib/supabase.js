import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveConfessionResponse(data) {
  try {
    const { data: response, error } = await supabase
      .from('valentine_responses')
      .insert([{
        recipient_name: data.recipientName,
        response: data.response,
        timestamp: new Date().toISOString(),
      }])
      .select();

    if (error) throw error;
    return response;
  } catch (error) {
    console.error('Error saving response:', error);
    throw error;
  }
}

export async function getResponses() {
  try {
    const { data, error } = await supabase
      .from('valentine_responses')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching responses:', error);
    throw error;
  }
}
