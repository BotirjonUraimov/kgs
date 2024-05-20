import express from "express";
import axios from "axios";
import NodeCache from "node-cache";

interface Item {
  market_hash_name: string;
  currency: string;
  suggested_price: number;
  item_page: string;
  market_page: string;
  min_price: number | null;
  max_price: number | null;
  mean_price: number | null;
  median_price?: number | null;
  created_at: number;
  updated_at: number;
  min_price_tradable: number | null;
  min_price_non_tradable: number | null;
}

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 600 seconds (10 minutes)

router.get("/", async (req, res) => {
  try {
    // Check if data is in cache
    let items = cache.get<Item[]>("items");
    if (!items) {
      // If no data in cache, fetch from API
      console.log("got from API");
      const response = await axios.get<Item[]>(
        "https://api.skinport.com/v1/items",
        {
          params: { app_id: 730, currency: "EUR" }, // Example parameters
        }
      );
      items = response.data.map((item: any) => ({
        ...item,
        min_price_tradable: calculateMinPrice(item) ? item.min_price : null,
        min_price_non_tradable: !calculateMinPrice(item)
          ? item.suggested_price
          : null,
      }));
      // Store fetched data in cache
      cache.set("items", items);
    }
    // Send data from cache or fetched data
    res.json(items);
  } catch (error) {
    res.status(500).send("Failed to fetch items");
  }
});

export default router;

function calculateMinPrice(item: any) {
  const isTradable = item.quantity > 0 && item.min_price != null;
  return isTradable;
}
