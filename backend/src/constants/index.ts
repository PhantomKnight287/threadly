/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
import zod from 'zod';

export const envSchema = zod.object({
  PORT: zod.string().default('3000'),
  JWT_SECRET: zod.string({
    required_error: 'JWT_SECRET is required',
  }),
});

export const config = envSchema.safeParse(process.env);

if (config.success === false) {
  throw new Error(config.error.errors[0].message);
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends zod.infer<typeof envSchema> {}
  }
}
