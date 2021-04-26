import axios, { AxiosRequestConfig } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Label } from "../../components/canvas";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const base64: string = req.body.image;
  const image_data = base64.split(",")[1];
  const url = "http://models.deploif.ai/cknyjmyqb055955odynhcx7mj/predict";
  const token = process.env.MAKERBAY_KEY;
  const data = {
    input: image_data,
  };
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `ApiKey ${token}`,
    },
  };
  try {
    const response = await axios.post(url, data, config);
    console.log(response.data);
    const label_data = response.data.output[0];
    const confidences = response.data.output[1];
    const classes = response.data.output[2];
    const resdata: Label[] = label_data.map((l, index) => {
      const retval: Label = {
        bounding_box: {
          x: l[0],
          y: l[1],
          w: l[2],
          h: l[3],
        },
        confidence: confidences[index],
        label: classes[index],
        name: "Dog",
        polygon: { path: [] },
      };
      return retval;
    });
    res.status(response.status).json(resdata);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
