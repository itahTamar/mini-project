const prodUrl = process.env.CLIRNT_PROD_URL
const devUrl = process.env.CLIRNT_DEV_URL

if (!prodUrl || !devUrl) throw new Error("no url in .env");


export const allowedOrigins = [devUrl, prodUrl]