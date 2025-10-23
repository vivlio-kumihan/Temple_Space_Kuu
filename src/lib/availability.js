// @/lib/availability.js

import { supabase } from "./supabase";

/**
 * 指定した寺院の予約可能状況を取得
 */
export async function getAvailability(templeId) {
  try {
    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .eq("temple_id", templeId) // temple_idでフィルター
      .order("date", { ascending: true }); // 日付順に並び替え

    if (error) throw error;

    return data || [];
  } catch (error) {
    return [];
  }
}

/**
 * 予約を作成(時間枠をbookedに変更)
 */
export async function createBooking(templeId, date, time) {
  try {
    const timeColumnMap = {
      "09:00": "time_09",
      "11:00": "time_11",
      "13:00": "time_13",
      "15:00": "time_15",
    };

    const timeColumn = timeColumnMap[time];

    if (!timeColumn) {
      throw new Error(`無効な時間です: ${time}`);
    }

    // 該当するレコードを検索
    const { data: existingData, error: fetchError } = await supabase
      .from("availability")
      .select("*")
      .eq("temple_id", templeId)
      .eq("date", date);

    if (fetchError) throw fetchError;

    // データが見つからない場合
    if (!existingData || existingData.length === 0) {
      return {
        success: false,
        error: "該当する日付が見つかりません。"
      }
    }

    const record = existingData[0];

    // 既に予約済みかチェック
    if (record[timeColumn] === "booked") {
      return {
        success: false,
        error: "この時間は既に予約されています。",
      };
    }

    // 予約を確定(該当する時間枠を'booked'に変更)
    const { error: updateError } = await supabase
      .from("availability")
      .update({ [timeColumn]: "booked" })
      .eq("id", record.id);

    if (updateError) throw updateError;

    return {
      success: true,
      message: "予約が完了しました",
    };
  } catch (error) {
    console.error("予約エラー:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
