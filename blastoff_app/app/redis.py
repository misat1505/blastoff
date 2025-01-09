import pickle

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis.asyncio import Redis

from app.settings import settings


class RedisClient:
    def __init__(self, redis_url: str):
        self.redis_url = redis_url
        self.redis = None

    async def init_connection(self):
        self.redis = Redis.from_url(self.redis_url, decode_responses=False)
        FastAPICache.init(RedisBackend(self.redis), prefix="launch_cache")

    async def close_connection(self):
        if self.redis:
            await self.redis.close()

    async def get_cache(self, key: str):
        self.__check_connection()
        cached_data = await self.redis.get(key)
        if cached_data:
            return pickle.loads(cached_data)
        return None

    async def set_cache(self, key: str, value: str, expire: int = 3600):
        self.__check_connection()
        value_str = pickle.dumps(value)
        await self.redis.set(key, value_str, ex=expire)

    async def delete_cache(self, key: str):
        self.__check_connection()
        await self.redis.delete(key)

    async def flush_all(self):
        self.__check_connection()
        await self.redis.flushall()

    def __check_connection(self):
        if not self.redis:
            raise ConnectionError("Redis connection is not initialized")


class RedisKeys:
    @staticmethod
    def future_launches():
        return "future_launches"

    @staticmethod
    def launch_details(id: str):
        return f"launches:{id}"

    @staticmethod
    def rocket_details(id: int):
        return f"rocket:{id}"


redis = RedisClient(settings.redis_uri)
