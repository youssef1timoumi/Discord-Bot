require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const express = require('express'); // Required to keep Azure happy

const app = express();
const port = process.env.PORT || 8080;

// Dummy endpoint to prevent Azure shutdown
app.get("/", (req, res) => {
    res.send("Discord's AI Discord bot is running! 🚀");
});

// Start the web server
app.listen(port, () => {
    console.log(`✅ Web server is running on port ${port}`);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const AZURE_AI_ENDPOINT = process.env.AZURE_AI_ENDPOINT;
const AZURE_AI_KEY = process.env.AZURE_AI_KEY;
const AZURE_AI_DEPLOYMENT_NAME = process.env.AZURE_AI_DEPLOYMENT_NAME;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const DISCORD_MESSAGE_LIMIT = 2000;
const MAX_EMBED_LENGTH = 4096;

// Function to get AI response
async function getAIResponse(prompt) {
    try {
        const response = await axios.post(
            `${AZURE_AI_ENDPOINT}/openai/deployments/${AZURE_AI_DEPLOYMENT_NAME}/chat/completions?api-version=2023-05-15`,
            {
                messages: [{ role: "user", content: prompt }],
                max_tokens: 1000,
                temperature: 0.7
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": AZURE_AI_KEY
                }
            }
        );

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("❌ Error with Discord's AI API:", error.response ? error.response.data : error);
        return "⚠️ Error: Unable to fetch AI response.";
    }
}

// Function to send structured AI response
async function sendAIResponse(channel, responseText) {
    if (responseText.length <= DISCORD_MESSAGE_LIMIT) {
        await channel.send(`🤖 **Discord's AI:** ${responseText}`);
    } else if (responseText.length <= MAX_EMBED_LENGTH) {
        const embed = new EmbedBuilder()
            .setTitle("🤖 Discord's AI Response")
            .setDescription(responseText.substring(0, MAX_EMBED_LENGTH))
            .setColor(0x00ff00);

        await channel.send({ embeds: [embed] });
    } else if (responseText.length <= 10000) {
        const chunks = responseText.match(new RegExp(`.{1,${DISCORD_MESSAGE_LIMIT}}`, "g"));
        for (const chunk of chunks) {
            await channel.send(chunk);
        }
    } else {
        fs.writeFileSync('response.txt', responseText);
        await channel.send({
            content: "📂 The response is too long. Download it here:",
            files: ['./response.txt']
        });
    }
}

// Listen for "ai prompt"
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== DISCORD_CHANNEL_ID) return;

    if (message.content.startsWith("ai ")) {
        const prompt = message.content.slice(3).trim();
        if (!prompt) return message.reply("⚠️ Please provide a prompt. Example: `ai What is AI?`");

        await message.channel.send(`⏳ Thinking...`);
        const aiResponse = await getAIResponse(prompt);
        await sendAIResponse(message.channel, aiResponse);
    }
});

// Start the bot
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("✅ Discord bot is running!"))
    .catch(err => console.error("❌ Failed to log in:", err));
