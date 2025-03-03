# **🤖 Discord AI Bot**

A **Discord bot** powered by **Azure AI** that answers user questions in a dedicated Discord channel. The bot ensures cost optimization by implementing a **10-minute slow mode** and requires users to **prefix messages with **`` to trigger responses.

---

## **🚀 Features**

- ✅ Uses **Azure AI** for intelligent responses
- ✅ **Slow Mode:** 10 minutes ⏳ (to optimize usage for free-tier Azure students)
- ✅ Supports **long messages**, breaking them into structured responses
- ✅ Saves ultra-long messages as a downloadable file
- ✅ **Web Server** to keep the bot alive on **Azure App Services**

### **⚠️ Current Limitations & Future Enhancements**

❌ *No image generation yet* (Coming soon! 🎨)\
❌ *Doesn't accept image inputs* (We're working on it!)

---

## **📌 How to Use the Bot?**

1️⃣ **Start your message with **``

- Example: `ai What is artificial intelligence?` 2️⃣ **Wait for the bot to respond** 🤖\
  3️⃣ **Receive a structured and detailed response!**

---

## **🛠 Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/discord-ai-bot.git
cd discord-ai-bot
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a **.env** file in the root directory and add your credentials:

```env
DISCORD_TOKEN=your-discord-bot-token
DISCORD_CHANNEL_ID=your-discord-channel-id
AZURE_AI_ENDPOINT=your-azure-ai-endpoint
AZURE_AI_KEY=your-azure-ai-key
AZURE_AI_DEPLOYMENT_NAME=your-deployment-name
PORT=8080 # Default port
```

### **4️⃣ Run the Bot**

```sh
node bot.js
```

---

## **📦 Deployment (Azure App Service)**

This bot is optimized for **Azure App Services**. Since Azure requires a running web service, we added an **Express server** to prevent shutdowns.

### **Deploy to Azure**

1. **Push your code to GitHub**
2. **Go to Azure Portal → App Services → Create a Web App**
3. **Connect GitHub repository** for continuous deployment
4. **Set environment variables** under **Configuration → Application Settings**
5. **Deploy and test your bot!**

---

## **🔧 Technologies Used**

- **Node.js** (JavaScript runtime)
- **Discord.js** (Discord API library)
- **Axios** (HTTP requests for AI responses)
- **Azure AI** (AI-powered chatbot responses)
- **Express.js** (Web server to prevent Azure shutdowns)

---

## **👨‍💻 Contributing**

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

Enjoy using **Discord's AI Bot**! 🚀

