// @/lib/email.js

/**
 * 予約通知メールを送信（運営者 + お客様）
 */
export async function sendReservationEmails(reservationData) {
  try {
    const response = await fetch("/api/send-reservation-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templeName: reservationData.templeName,
        date: reservationData.date,
        times: reservationData.times,
        customerName: reservationData.name,
        customerEmail: reservationData.email,
        customerPhone: reservationData.phone,
        customerAddress: reservationData.address,
        message: reservationData.message,
        deadline: reservationData.deadline,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    // console.log("✅ メール送信成功");

    return {
      success: true,
      message: "メールを送信しました",
    };
  } catch (error) {
    console.error("メール送信エラー:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * お問い合わせメールを送信（運営者 + お客様）
 */
export async function sendInquiryEmails(inquiryData) {
  try {
    const response = await fetch("/api/send-inquiry-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templeName: inquiryData.templeName,
        customerName: inquiryData.name,
        customerEmail: inquiryData.email,
        customerPhone: inquiryData.phone,
        message: inquiryData.message,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error);
    }

    // console.log("✅ メール送信成功");

    return {
      success: true,
      message: "メールを送信しました",
    };
  } catch (error) {
    console.error("メール送信エラー:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
