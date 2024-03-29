// Import necessary libraries
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create an Express application
const app = express();

const whitelist = ['chrome-extension://clkieljoegojdljjgmaopjknmdjinhek',
                    'chrome-extension://hlpaohgljohnkmmiaffdochgnnjngjca'
]; // Replace with your extension's ID
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'], // Allow only GET and POST requests
};
// Enable CORS for your server
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Define the port
const PORT = process.env.PORT || 3000;

// Define a route to handle requests from your extension
app.post('/ask', async (req, res) => {
  try {
    const { question, articleText } = req.body;
    const prompt = `Please provide a very pithy and concise answer to the following question:\n${question}\n\nBased on the article:\n${articleText}`;

    // Replace 'YOUR_API_KEY' with your actual OpenAI API key
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4-0125-preview',
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Send the response back to the extension
    res.json({ answer: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
