import pickle

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis.asyncio import Redis

from app.settings import settings


class RedisClient:
    """
    RedisClient is a wrapper for managing Redis connections and caching operations.

    It handles initialization, connection management, and provides methods to interact with
    Redis for storing, retrieving, deleting, and flushing cached data.

    Attributes:
        redis_url (str): The URL of the Redis server.
        redis (Redis): The Redis client instance used for interactions with Redis.
    """

    def __init__(self, redis_url: str):
        """
        Initializes the RedisClient instance with a Redis URL.

        Args:
            redis_url (str): The URL of the Redis server to connect to.
        """
        self.redis_url = redis_url
        self.redis = None

    async def init_connection(self):
        """
        Initializes the connection to Redis and sets up FastAPI cache backend.

        This method creates a Redis client using the provided Redis URL and initializes
        FastAPI Cache with Redis as the backend.
        """
        self.redis = Redis.from_url(self.redis_url, decode_responses=False)
        FastAPICache.init(RedisBackend(self.redis), prefix="launch_cache")

    async def close_connection(self):
        """
        Closes the connection to Redis if it is initialized.
        """
        if self.redis:
            await self.redis.close()

    async def get_cache(self, key: str):
        """
        Retrieves cached data from Redis.

        Args:
            key (str): The cache key to look up.

        Returns:
            The deserialized cached data, or None if no cache is found.

        Raises:
            ConnectionError: If the Redis connection is not initialized.
        """
        self.__check_connection()
        cached_data = await self.redis.get(key)
        if cached_data:
            return pickle.loads(cached_data)
        return None

    async def set_cache(self, key: str, value: str, expire: int = 3600):
        """
        Sets a cache value in Redis.

        Args:
            key (str): The cache key.
            value (str): The data to store in cache, which will be serialized.
            expire (int, optional): The expiration time for the cache in seconds. Defaults to 3600 seconds (1 hour).

        Raises:
            ConnectionError: If the Redis connection is not initialized.
        """
        self.__check_connection()
        value_str = pickle.dumps(value)
        await self.redis.set(key, value_str, ex=expire)

    async def delete_cache(self, key: str):
        """
        Deletes a cache entry from Redis.

        Args:
            key (str): The cache key to delete.

        Raises:
            ConnectionError: If the Redis connection is not initialized.
        """
        self.__check_connection()
        await self.redis.delete(key)

    async def flush_all(self):
        """
        Flushes all cached data from Redis.

        This method deletes all the keys stored in Redis.

        Raises:
            ConnectionError: If the Redis connection is not initialized.
        """
        self.__check_connection()
        await self.redis.flushall()

    def __check_connection(self):
        """
        Checks if the Redis connection has been initialized.

        Raises:
            ConnectionError: If the Redis connection is not initialized.
        """
        if not self.redis:
            raise ConnectionError("Redis connection is not initialized")


class RedisKeys:
    """
    RedisKeys provides utility methods to define common Redis cache keys.

    It contains static methods that generate cache keys for various entities like launches, rockets, etc.
    """

    @staticmethod
    def future_launches():
        """
        Returns the cache key for future launches.

        Returns:
            str: The cache key for future launches.
        """
        return "future_launches"

    @staticmethod
    def launch_details(id: str):
        """
        Returns the cache key for a specific launch by its ID.

        Args:
            id (str): The ID of the launch.

        Returns:
            str: The cache key for the specified launch.
        """
        return f"launches:{id}"

    @staticmethod
    def rocket_details(id: int):
        """
        Returns the cache key for a specific rocket by its ID.

        Args:
            id (int): The ID of the rocket.

        Returns:
            str: The cache key for the specified rocket.
        """
        return f"rocket:{id}"


redis = RedisClient(settings.redis_uri)
