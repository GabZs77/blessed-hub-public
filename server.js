// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const API_KEY = "AIzaSyDSIy5m7mTXlMMR_OOdCu2Af_EwoCd124w";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

app.post("/ai", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      }),
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Erro ao gerar resposta.";
    res.json({ text });
  } catch (e) {
    res.status(500).json({ text: "Erro no servidor." });
  }
});

app.listen(3000, () => console.log("Proxy rodando na porta 3000"));
