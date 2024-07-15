const express = require('express')
const cors = require('cors')
const connectDb = require('./db')
const Coin = require('./coin')

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json())

const cryptoApiKey = "c8b3f11a-897b-4ab7-97e4-0c66a7fd635a"; //Put this in env file
const apiBaseUrl = "https://api.livecoinwatch.com"

// Connect to MongoDB
connectDb().then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});

const fetchCoinsData = async () => {
    try {
        const response = await fetch(`${apiBaseUrl}/coins/list`, {
            method: 'POST',
            headers: new Headers({
                "content-type": "application/json",
                "x-api-key": cryptoApiKey,
            }),
            body: JSON.stringify({
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: false,
            }),
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Crypto Api Failed", error)
    }
}

app.get('/fetch-coin', async (req, res) => {
    try {
        const data = await fetchCoinsData();

        // Insert data into MongoDB
        for (const coin of data) {
            const crypto = new Coin({
                name: coin?.code,
                price: coin?.rate,
                marketCap: coin?.cap,
                volume24h: coin?.volume
            });

            await crypto.save();
        }
  
        res.json({ cryptoData: data });
    } catch (error) {
        console.error("Failed to fetch and save data:", error);
        res.status(500).json({ error: "Failed to fetch data" })
    }
})

app.get('/crypto/:code', async (req, res) => {
    const code = req.params.code;
    try {
        const coinData = await Coin.find({ name: code }).limit(20);
        if (!coinData || coinData.length === 0) {
            return res.status(404).json({ error: 'Coin not found' });
        }
        res.json(coinData);
    } catch (error) {
        console.error("Failed to fetch coin data:", error);
        res.status(500).json({ error: "Failed to fetch coin data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});