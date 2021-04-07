import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const base64: string = req.body.image;
  const image_data = base64.split(",")[1];
  const url =
    "https://darwin.v7labs.com/ai/models/ec41834d-c791-4bf5-b16e-eb8e6149cca4/infer";
  const token = process.env.MAKERBAY_KEY;
  const data = {
    image: { base64: image_data },
  };
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `ApiKey ${token}`,
    },
  };
  try {
    const response = await axios.post(url, data, config);
    res.status(response.status).json(response.data.result);
  } catch (err) {
    console.log(err);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
