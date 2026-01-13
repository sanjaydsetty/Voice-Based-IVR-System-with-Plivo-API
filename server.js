require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const plivo = require("plivo");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const client = new plivo.Client(
  process.env.PLIVO_AUTH_ID,
  process.env.PLIVO_AUTH_TOKEN
);

// Trigger outbound call
app.post("/call", async (req, res) => {
  const { to } = req.body;

  try {
    const response = await client.calls.create(
      process.env.PLIVO_FROM_NUMBER,
      to,
      `${process.env.BASE_URL}/ivr`
    );

    res.json({ success: true, callUUID: response.requestUuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// Level 1 IVR
app.all("/ivr", (req, res) => {
  const xml = `
<Response>
  <GetDigits action="${process.env.BASE_URL}/language" method="POST" timeout="7" numDigits="1">
    <Speak>Welcome to Inspire Works.</Speak>
    <Speak>Press 1 for English.</Speak>
    <Speak>Press 2 for Spanish.</Speak>
  </GetDigits>
  <Speak>No input received. Goodbye.</Speak>
</Response>
  `;
  res.type("text/xml");
  res.send(xml);
});

// Language selection
app.all("/language", (req, res) => {
  const digit = req.body.Digits || req.query.Digits;

  let xml = "";

  if (digit === "1") {
    xml = `
<Response>
  <GetDigits action="${process.env.BASE_URL}/english-menu" method="POST" timeout="7" numDigits="1">
    <Speak>You selected English.</Speak>
    <Speak>Press 1 to play a message.</Speak>
    <Speak>Press 2 to talk to an agent.</Speak>
  </GetDigits>
</Response>
    `;
  } else if (digit === "2") {
    xml = `
<Response>
  <GetDigits action="${process.env.BASE_URL}/spanish-menu" method="POST" timeout="7" numDigits="1">
    <Speak>Has seleccionado español.</Speak>
    <Speak>Presiona 1 para escuchar un mensaje.</Speak>
    <Speak>Presiona 2 para hablar con un agente.</Speak>
  </GetDigits>
</Response>
    `;
  } else {
    xml = `
<Response>
  <Speak>Invalid input.</Speak>
  <Redirect>${process.env.BASE_URL}/ivr</Redirect>
</Response>
    `;
  }

  res.type("text/xml");
  res.send(xml);
});

// English Menu
app.all("/english-menu", (req, res) => {
  const digit = req.body.Digits || req.query.Digits;
  let xml = "";

  if (digit === "1") {
    xml = `
<Response>
  <Speak>This is a demo message in English.</Speak>
</Response>
    `;
  } else if (digit === "2") {
    xml = `
<Response>
  <Dial>${process.env.AGENT_NUMBER}</Dial>
</Response>
    `;
  } else {
    xml = `
<Response>
  <Speak>Invalid input.</Speak>
  <Redirect>${process.env.BASE_URL}/ivr</Redirect>
</Response>
    `;
  }

  res.type("text/xml");
  res.send(xml);
});

// Spanish Menu
app.all("/spanish-menu", (req, res) => {
  const digit = req.body.Digits || req.query.Digits;
  let xml = "";

  if (digit === "1") {
    xml = `
<Response>
  <Speak>Este es un mensaje de demostración en español.</Speak>
</Response>
    `;
  } else if (digit === "2") {
    xml = `
<Response>
  <Dial>${process.env.AGENT_NUMBER}</Dial>
</Response>
    `;
  } else {
    xml = `
<Response>
  <Speak>Entrada inválida.</Speak>
  <Redirect>${process.env.BASE_URL}/ivr</Redirect>
</Response>
    `;
  }

  res.type("text/xml");
  res.send(xml);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
