import * as Joi from "joi";

export const envValidationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test"),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().allow(null, ""),
  POSTGRES_DATABASE: Joi.string().required(),
  PORT: Joi.number().default(3000),
});
