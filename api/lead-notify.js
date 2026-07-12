export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, phone, installation_type, message, botcheck } = req.body ?? {};

  if (botcheck) {
    res.status(200).json({ success: true });
    return;
  }

  if (!name || !phone) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
    return;
  }

  const text = [
    "Nueva solicitud de presupuesto",
    "",
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Tipo de instalación: ${installation_type || "No especificado"}`,
    `Mensaje: ${message || "-"}`,
  ].join("\n");

  const results = await Promise.allSettled([
    sendTelegram(text),
    sendEmail({ name, phone, installation_type, message }),
  ]);

  const telegramOk = results[0].status === "fulfilled";
  const emailOk = results[1].status === "fulfilled";

  if (!telegramOk && !emailOk) {
    res.status(502).json({ error: "No se pudo enviar la notificación" });
    return;
  }

  res.status(200).json({ success: true, telegram: telegramOk, email: emailOk });
}

async function sendTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );

  const result = await response.json();
  if (!result.ok) throw new Error("Telegram rejected");
}

async function sendEmail({ name, phone, installation_type, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!apiKey || !to) return;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Hispalense Solar <leads@hispalensesolar.es>",
      to,
      subject: `Nuevo lead: ${name} — ${installation_type || "Sin especificar"}`,
      html: [
        "<h2>Nueva solicitud de presupuesto</h2>",
        "<table style='border-collapse:collapse'>",
        `<tr><td style='padding:6px 12px;font-weight:bold'>Nombre</td><td style='padding:6px 12px'>${esc(name)}</td></tr>`,
        `<tr><td style='padding:6px 12px;font-weight:bold'>Teléfono</td><td style='padding:6px 12px'>${esc(phone)}</td></tr>`,
        `<tr><td style='padding:6px 12px;font-weight:bold'>Tipo</td><td style='padding:6px 12px'>${esc(installation_type || "No especificado")}</td></tr>`,
        `<tr><td style='padding:6px 12px;font-weight:bold'>Mensaje</td><td style='padding:6px 12px'>${esc(message || "-")}</td></tr>`,
        "</table>",
      ].join(""),
    }),
  });

  if (!response.ok) throw new Error("Resend rejected");
}

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
