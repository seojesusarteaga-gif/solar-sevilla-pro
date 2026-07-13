const SYSTEM_PROMPT = `Eres el asistente virtual de Hispalense Solar, empresa de instalación de placas solares en Sevilla. Tu objetivo es recoger estos datos del cliente de forma natural y conversacional:

1. Nombre
2. Tipo de instalación (residencial o comercial)
3. Teléfono de contacto
4. Municipio (en la provincia de Sevilla)
5. Si tiene tejado propio

Reglas:
- Pregunta un dato a la vez, de forma natural y cercana
- Sé profesional pero cercano, tutea al cliente
- Si el usuario pregunta sobre precios, dile que depende del consumo y tipo de instalación, y que un técnico le dará presupuesto personalizado en menos de 24h
- Cuando tengas TODOS los datos, haz un resumen breve y pide confirmación
- Cuando el usuario confirme los datos, responde con un mensaje de despedida amable e incluye al final de tu mensaje exactamente este bloque (sin mostrarlo al usuario):
[LEAD_DATA]{"name":"...","phone":"...","installation_type":"residencial o comercial","municipality":"...","own_roof":true o false}[/LEAD_DATA]
- No inventes datos; si el usuario no da alguno, pregunta de nuevo
- Responde siempre en español
- Respuestas breves: máximo 2-3 frases por turno
- No uses emojis`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Chat not configured" });
  }

  const { messages } = req.body ?? {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages required" });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 250,
    }),
  });

  if (!response.ok) {
    return res.status(502).json({ error: "AI service unavailable" });
  }

  const data = await response.json();
  const reply = data.choices[0].message.content;

  res.status(200).json({ reply });
}
