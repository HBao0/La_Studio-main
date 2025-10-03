const express = require('express');
const router = express.Router();
const redis = require('../utils/redisClient');
const logger = require('../logger');
const auth = require('../middleware/auth');

// Add to cart API
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) return res.status(400).json({ error: "Missing fields" });

  const cartKey = `cart:${userId}`;
  let cart = JSON.parse(await redis.get(cartKey)) || [];
  const index = cart.findIndex(item => item.productId === productId);
  if (index >= 0) cart[index].quantity += quantity;
  else cart.push({ productId, quantity });

  await redis.set(cartKey, JSON.stringify(cart), 'EX', 3600); // TTL 1h
  logger.info('Cart updated', { userId, cart });
  res.json({ cart });
});

router.get("/me", auth, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }
  res.json(req.user);
});

module.exports = router;