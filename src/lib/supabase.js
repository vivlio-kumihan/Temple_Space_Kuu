// @/lib/supabase.js

import { createClient } from "@supabase/supabase-js";

// 環境変数から接続情報を取得
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🔹 これを追加して確認
console.log("================================");
console.log("🔍 環境変数チェック:");
console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log("================================");

// Supabaseクライアントを作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);