export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({ error: "Telegram no está configurado" });
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

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    const result = await telegramResponse.json();

    if (!result.ok) {
      res.status(502).json({ error: "Telegram rechazó el mensaje" });
      return;
    }

    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ error: "No se pudo enviar la notificación" });
  }
}
