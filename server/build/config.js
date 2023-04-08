import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
// Loading process.env as ENV interface
const getConfig = () => {
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
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
export default sanitizedConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBWTVELHVDQUF1QztBQUV2QyxNQUFNLFNBQVMsR0FBRyxHQUFRLEVBQUU7SUFDMUIsT0FBTztRQUNMLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7UUFDN0QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztLQUNqQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYseURBQXlEO0FBQ3pELDREQUE0RDtBQUM1RCwwREFBMEQ7QUFDMUQsK0RBQStEO0FBQy9ELGNBQWM7QUFFZCxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBVyxFQUFVLEVBQUU7SUFDaEQsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxHQUFHLGdCQUFnQixDQUFDLENBQUM7U0FDckQ7S0FDRjtJQUNELE9BQU8sTUFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixNQUFNLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztBQUUzQixNQUFNLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUVsRCxlQUFlLGVBQWUsQ0FBQyJ9