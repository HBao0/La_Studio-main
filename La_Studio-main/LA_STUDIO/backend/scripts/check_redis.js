const path = require('path');
const fs = require('fs');

async function createRedisClient() {
  // Thử dùng client của dự án nếu có (backend/utils/redisClient.js)
  const clientPath = path.join(__dirname, '..', 'utils', 'redisClient.js');
  if (fs.existsSync(clientPath)) {
    try {
      console.log('Sử dụng redis client của dự án:', clientPath);
      const redis = require(clientPath);
      return { redis, fromProject: true };
    } catch (e) {
      console.warn('Không thể import redisClient từ dự án (sẽ tạo client mới).', e.message);
    }
  }

  // Nếu không có file client của dự án thì tạo mới
  const Redis = require('ioredis');
  const host = process.env.REDIS_HOST || '127.0.0.1';
  const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;
  const password = process.env.REDIS_PASS || process.env.REDIS_PASSWORD || undefined;

  console.log(`Tạo Redis client mới -> host=${host}, port=${port}, pass=${password ? '***' : '(none)'} `);

  const redis = new Redis({ host, port, password, maxRetriesPerRequest: 1 });

  redis.on('connect', () => console.log('✅ Redis client connected (new client)'));
  redis.on('error', (e) => console.error('Redis client error (new client):', e.message || e));

  return { redis, fromProject: false };
}

async function healthCheck() {
  const { redis, fromProject } = await createRedisClient();
  let quitCalled = false;

  try {
    // Ping
    console.log('Gửi PING...');
    const pong = await redis.ping();
    console.log('PING response:', pong);

    // Thử set/get một key tạm thời
    const key = 'la_studio:healthcheck';
    const value = new Date().toISOString();
    console.log(`SET ${key} -> ${value} (expire 10s)`);
    await redis.set(key, value, 'EX', 10);
    const got = await redis.get(key);
    console.log('GET:', got);

    if (got) {
      console.log('\n✅ KẾT LUẬN: Redis hoạt động bình thường (ping + set/get thành công).');
      // Nếu client tạo mới thì đóng kết nối; nếu dùng redis client của dự án, việc quit có thể ảnh hưởng app đang chạy,
      // nên ta chỉ quit nếu chúng ta tự tạo client (fromProject === false)
      if (!fromProject && typeof redis.quit === 'function') {
        await redis.quit();
        quitCalled = true;
      }
      process.exit(0);
    } else {
      throw new Error('Không đọc được giá trị đã set trở lại');
    }
  } catch (err) {
    console.error('\n❌ Redis health check failed:', err && (err.message || err));
    try {
      if (!quitCalled && redis && typeof redis.quit === 'function') await redis.quit();
    } catch (e) { /* ignore */ }
    process.exit(1);
  }
}

healthCheck();


