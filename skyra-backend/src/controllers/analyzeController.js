const { GoogleGenAI } = require("@google/genai");

const promptGemini = async (prompt) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
      console.log(response.text);
      return response.text;
}

const getHTML = async (url) => {
    
}

const getBackendConfig = async () => {

}

const analyzeBackendConfig = async () => {
    await getBackendConfig();
}

const analyze = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        
        await getHTML(url);

        // const html = await getHTML(url);
        // console.log('HTML content:', html);
        
        // const result = await promptGemini(html, text);
        // console.log('Result:', result);

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error analyzing URL:', error);
        return res.status(500).json({ error: 'Failed to analyze URL' });
    }
};
  
module.exports = {
    analyze
};
