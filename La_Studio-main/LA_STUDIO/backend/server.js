const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sequelize = require('./config/db');
const logger = require('./logger');
const productRoutes = require('./routes/productRoutes');
const redis = require('./utils/redisClient');
const Admin = require('./models/Admin');
const userRoutes = require('./routes/userRoutes');
const auth = require('./middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

sequelize.authenticate()
  .then(() => logger.info('✅ MySQL connection has been established successfully.'))
  .catch(err => logger.error('❌ Unable to connect to MySQL:', err));

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
// rate limit (cho public API)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

app.use(limiter);

// Route trả về thông tin user từ JWT
app.get('/api/auth/me', auth, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Chưa đăng nhập' });
  }
  res.json(req.user);
});

// Routes
app.use('/api/products', productRoutes);

// Login API (sử dụng bcrypt + JWT)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Tạo JWT token
    const token = jwt.sign({ admin_id: admin.admin_id, email: admin.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      token,
      user: { admin_id: admin.admin_id, email: admin.email }
    });
  } catch (err) {
    logger.error('Login error', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// health
app.get('/health', (req, res) => res.json({ ok: true, time: Date.now() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`🚀 Server running on ${PORT}`);
});

