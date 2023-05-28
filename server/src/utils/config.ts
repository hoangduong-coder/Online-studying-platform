import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
interface Env {
  PORT: number | undefined
  MONGO_URI: string | undefined
  SECRET: string | undefined
  BASE_URL: string | undefined
  SERVICE: string | undefined
  EMAIL_PORT: number | undefined
  USER_EMAIL: string | undefined
  USER_PASS: string | undefined
  SECURE: boolean | undefined
}

interface Config {
  PORT: number
  MONGO_URI: string
  SECRET: string
  BASE_URL: string
  SERVICE: string
  EMAIL_PORT: number
  USER_EMAIL: string
  USER_PASS: string
  SECURE: boolean
}

// Loading process.env as ENV interface

const getConfig = (): Env => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI,
    SECRET: process.env.SECRET,
    BASE_URL: process.env.BASE_URL,
    SERVICE: process.env.SERVICE,
    EMAIL_PORT: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASS: process.env.USER_PASS,
    SECURE: process.env.SECURE ? Boolean(process.env.SECURE) : undefined,
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: Env): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;