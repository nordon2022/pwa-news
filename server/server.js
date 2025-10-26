const express = require("express");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // разрешаем все CORS запросы

app.get('/img-proxy', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    // Определяем тип контента
    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.setHeader('Content-Type', contentType);

    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch image');
  }
});

app.get("/rss", async (req, res) => {
  const url = req.query.url; // RSS URL передаётся как query parameter

  if (!url) {
    return res.status(400).json({ error: "URL parameter is required" });
  }

  try {
    const response = await axios.get(url);
 const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
const json = parser.parse(response.data);
res.json(json);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch RSS" });
  }
});

app.listen(port, () => {
  console.log(`RSS proxy running at http://localhost:${port}`);
});
