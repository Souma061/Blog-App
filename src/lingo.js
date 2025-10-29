import dotenv from 'dotenv';
import lingo from 'lingo.dev';
dotenv.config();

lingo.init({ apiKey: process.env.VITE_LINGO_DEV_API_KEY });

export default lingo;
