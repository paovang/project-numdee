import { NestFactory } from '@nestjs/core';
import { CacheModule } from '@/infrastructure/adapters/cache/redis/cache.module';
import { CACHE_SERVICE } from '@/infrastructure/adapters/cache/inject-key';

async function bootstrap() {
  let app;
  try {
    app = await NestFactory.createApplicationContext(CacheModule);
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1);
  }

  try {
    const cacheService = app.get(CACHE_SERVICE);
    await cacheService.clearCache();
    console.info('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  } finally {
    try {
      await app.close();
      console.info('Application closed successfully');
    } catch (closeError) {
      console.error('Error closing application:', closeError);
    } finally {
      // Ensure the script exits
      process.exit();
    }
  }
}

bootstrap();