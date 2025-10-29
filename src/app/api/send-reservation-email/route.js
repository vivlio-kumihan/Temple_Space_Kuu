// @/app/api/send-reservation-email/route.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// SMTPトランスポーター（送信設定）を作成
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    // リクエストのボディ（JSON）を取得
    const data = await request.json();
    // 分割代入でデータを取り出す
    const {
      templeName,
      date,
      times,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      message,
      deadline,
    } = data;

    // 1. 運営者への通知メール
    //    メールの内容を定義する。
    const adminMailOptions = {
      from: process.env.MAIL_FROM, // 送信元
      to: process.env.ADMIN_EMAIL, // 送信先（運営者）
      subject: `【新規予約】${templeName} - ${customerName}様`,
      text: `
予約リクエストがありました。

■ 予約情報
寺院: ${templeName}
日付: ${date}
時間: ${times}
お名前: ${customerName}
メール: ${customerEmail}
電話: ${customerPhone}
住所: ${customerAddress || "未記入"}
メッセージ: ${message || "なし"}

管理画面で確認してください。
      `,
    };
    // transporter.sendMail関数がやっていること
    //   1. SMTPサーバー（quad9.sakura.ne.jp）に接続
    //   2. 認証（user, pass）
    //   3. メールを送信
    //   4. 結果を返す（成功 or 失敗）
    await transporter.sendMail(adminMailOptions);
    // console.log("✅ 運営者への通知メール送信完了");

    // 2. お客様への確認メール
    const customerMailOptions = {
      from: process.env.MAIL_FROM,
      to: customerEmail,
      subject: "【仮予約完了】ご予約ありがとうございます",
      text: `
${customerName} 様

この度は${templeName}のご予約をいただき、ありがとうございます。
以下の内容で仮予約を承りました。

■ 予約内容
寺院: ${templeName}
日付: ${date}
時間: ${times}

■ お支払いについて
下記の口座に、3日以内にお振込みをお願いいたします。

【振込先】
銀行名: ${process.env.BANK_NAME}
支店名: ${process.env.BANK_BRANCH}
口座種別: ${process.env.BANK_ACCOUNT_TYPE}
口座番号: ${process.env.BANK_ACCOUNT_NUMBER}
口座名義: ${process.env.BANK_ACCOUNT_NAME}

振込期限: ${deadline}

※ 振込手数料はお客様負担となります
※ 期限内に入金が確認できない場合、予約は自動的にキャンセルされます

ご入金の確認後、正式な予約確定のご連絡をいたします。

何かご不明点がございましたら、お気軽にお問い合わせください。

────────────────────────
寺院レンタルサービス
Email: ${process.env.MAIL_FROM}
Tel: 090-xxxx-xxxx
────────────────────────
      `,
    };

    await transporter.sendMail(customerMailOptions);
    // console.log("✅ お客様への確認メール送信完了");

    // await transporter.sendMail(adminMailOptions);
    // await transporter.sendMail(customerMailOptions);
    // それぞれのメール送信の処理がうまく行けば
    // 成功を返してメール送信の処理を終了。
    return NextResponse.json({
      success: true,
      message: "メールを送信しました",
    });
  } catch (error) {
    console.error("メール送信エラー:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
