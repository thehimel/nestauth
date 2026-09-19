import { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCompress from '@fastify/compress';

export async function setupCompression(app: NestFastifyApplication): Promise<void> {
  await app.register(fastifyCompress);
}
