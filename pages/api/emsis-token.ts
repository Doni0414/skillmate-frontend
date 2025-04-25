import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = Date.now();

  if (cachedToken && tokenExpiry && currentTime < tokenExpiry) {
    return res.status(200).json({ access_token: cachedToken });
  }

  try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', process.env.EMSIS_API_CLIENT_ID!);
      params.append('client_secret', process.env.EMSIS_API_CLIENT_SECRET!);
      params.append('scope', 'emsi_open');
  
      const response = await axios.post('https://auth.emsicloud.com/connect/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, expires_in } = response.data;

      cachedToken = access_token;
      tokenExpiry = currentTime + expires_in * 1000 - 5000;
  
      res.status(200).json({ access_token });
    } catch (error: any) {
      console.error('Token error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to retrieve access token' });
    }
}