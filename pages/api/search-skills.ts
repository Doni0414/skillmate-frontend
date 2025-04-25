import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const localhostURL = "http://localhost:3000";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const accessTokenResponse = await axios.get(`${localhostURL}/api/emsis-token`);
        const { access_token } = accessTokenResponse.data;

        const response = await axios.get("https://emsiservices.com/skills/versions/latest/skills", {
            params: {
                ...req.query,
                typeIds: "ST1,ST2,ST3",
                fields: "id,name,type,infoUrl"
            },
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        return res.status(200).json({ ...response.data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to obtain skills" });
    }
}