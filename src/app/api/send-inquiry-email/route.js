// @/app/api/send-inquiry-email/route.js

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// SMTPトランスポーターを作成
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
    const data = await request.json();

    const {
      templeName,
      customerName,
      customerEmail,
      customerPhone,
      message,
    } = data;

    // 1. 運営者への通知メール
    const adminMailOptions = {
      from: process.env.MAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `【新規予約】${templeName} - ${customerName}様`,
      text: `
お問い合わせがありました。

■ 予約情報
寺院: ${templeName}
お名前: ${customerName}
メール: ${customerEmail}
電話: ${customerPhone}

■ お問い合わせ内容
${message}

返信をお願いします。
      `,
    };

    await transporter.sendMail(adminMailOptions);
    console.log("✅ 運営者への通知メール送信完了（問い合わせ）");

    // 2. お客様への確認メール
    const customerMailOptions = {
      from: process.env.MAIL_FROM,
      to: customerEmail,
      subject: "【お問い合わせ受付】ご連絡ありがとうございます",
      text: `
${customerName} 様

この度は、${templeName}へのお問い合わせをいただき、ありがとうございます。
以下の内容でお問い合わせを承りました。

■ お問い合わせ内容
${message}

内容を確認の上、3営業日以内にご返信いたします。
今しばらくお待ちくださいませ。

何かご不明点がございましたら、お気軽にお問い合わせください。

────────────────────────
寺院レンタルサービス
Email: ${process.env.MAIL_FROM}
Tel: 090-xxxx-xxxx
────────────────────────
      `,
    };

    await transporter.sendMail(customerMailOptions);
    console.log("✅ お客様への確認メール送信完了（問い合わせ）");    

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
