// @/lib/supabase.js

import { createClient } from "@supabase/supabase-js";

// 環境変数から接続情報を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabaseクライアントを作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
