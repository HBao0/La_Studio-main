const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user
router.get('/:id', async (req, res) => {
  try {
    const u = await User.findByPk(req.params.id, { raw: true });
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ name, email, phone, address });
    res.json({ success: true, user });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
