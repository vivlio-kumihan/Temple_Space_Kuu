// @/lib/temples.js

import { supabase } from "./supabase";

// 全寺院のデータを取得（スペース情報を含む）
export async function getTemples() {
  try {
    const { data, error } = await supabase
      .from("temples")
      .select(
        `
        *,
        spaces:temple_spaces(
          id,
          space_name,
          size,
          capacity,
          base_price,
          description
        )
      `
      )
      .order("created_at", { asending: true });

    // エラーの詳細を出力
    if (error) {
      // console.error("❌ Supabase エラーの詳細:");
      // console.error("エラーメッセージ:", error.message);
      // console.error("エラーコード:", error.code);
      // console.error("エラー詳細:", error.details);
      // console.error("エラーヒント:", error.hint);
      console.error(
        "完全なエラーオブジェクト:",
        JSON.stringify(error, null, 2)
      );
      throw error;
    }

    // console.log("✅ 取得した寺院数:", data?.length);
    // console.log("📊 生データ:", data);

    // トップページ用にデータを整形
    const result = data.map((temple) => {
      // console.log("🏯 寺院データ:", temple);
      return {
        id: temple.id,
        name: temple.name,
        description: temple.description,
        location: temple.location,
        image_url: temple.image_url,
        price:
          temple.spaces && temple.spaces.length > 0
            ? `${Math.min(...temple.spaces.map((s) => s.base_price))
                .toLocaleString()}円〜/時間`
            : "料金はお問い合わせください",
      };
    });

    // console.log("✅ 整形後のデータ:", result);
    return result;
  } catch (error) {
    console.error("寺院データの取得エラー:", error);
    // console.error("エラーの型:", typeof error);
    // console.error("エラーオブジェクト全体:", error);
    return [];
  }
}

// 特定の寺院の詳細データを取得（スペース・用途を含む）
export async function getTempleById(id) {
  try {
    const { data, error } = await supabase
      .from("temples")
      .select(
        `
        *,
        spaces:temple_spaces(
          id,
          space_name,
          size,
          capacity,
          base_price,
          description,
          usage_types(
            id,
            usage_name,
            price,
            description
          )
        )
      `
      )
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("Supabase エラーの詳細:", error);
      // console.error("エラーメッセージ:", error.message);
      // console.error("エラーコード:", error.code);
      // console.error("エラー詳細:", error.details);
      // console.error("エラーヒント:", error.hint);
      // console.error(
      //   "完全なエラーオブジェクト:",
      //   JSON.stringify(error, null, 2)
      // );
      throw error
    };
    // console.log(data);
    return data;
  } catch (error) {
    console.error("寺院詳細情報の取得エラー:", error);
    // console.error("エラーの型:", typeof error);
    // console.error("エラーオブジェクト全体:", error);
    return null;
  }
}
