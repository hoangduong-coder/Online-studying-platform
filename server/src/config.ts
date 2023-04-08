import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface Env {
  PORT: number | undefined
  MONGO_URI: string | undefined
}

interface Config {
  PORT: number
  MONGO_URI: string
}

// Loading process.env as ENV interface

const getConfig = (): Env => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    MONGO_URI: process.env.MONGO_URI
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