const redis = require('../utils/redisClient');
const logger = require('../logger');

function cacheMiddleware(ttlSeconds = 60) {
  return async (req, res, next) => {
    try {
      // build cache key: route + query params (sorted)
      const q = Object.keys(req.query).sort().map(k => `${k}=${req.query[k]}`).join('&');
      const key = `cache:${req.path}?${q}`;

      const cached = await redis.get(key);
      if (cached) {
        logger.info(`Cache HIT ${key}`);
        res.setHeader('X-Cache', 'HIT');
        return res.json(JSON.parse(cached));
      }

      // monkey-patch res.json to cache the response
      const _json = res.json.bind(res);
      res.json = async (body) => {
        try {
          await redis.setex(key, ttlSeconds, JSON.stringify(body));
          logger.info(`Cache SET ${key} TTL ${ttlSeconds}s`);
        } catch (err) {
          logger.error('Redis SET error', err);
        }
        res.setHeader('X-Cache', 'MISS');
        return _json(body);
      };

      next();
    } catch (err) {
      logger.error('Cache middleware error', err);
      next();
    }
  };
}

module.exports = cacheMiddleware;
