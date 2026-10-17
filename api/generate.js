export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Please use POST"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "API key is not configured"
    });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predictLongRunning",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: req.body.prompt
            }
          ],
          parameters: {
            aspectRatio: "16:9",
            sampleCount: 1
          }
        })
      }
    );

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Veo generation error:", error);
    return res.status(500).json({
      error: error.message || "Video generation request failed"
    });
  }
}

    
