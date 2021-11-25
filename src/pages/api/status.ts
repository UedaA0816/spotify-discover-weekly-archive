import { NextApiHandler } from "next";

import { withSessionRoute } from "@/lib/withSession";
import { StatusApiResponse } from "@/types/api/status";

const status:NextApiHandler<StatusApiResponse> = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        console.log("API::GET:/status")
        res.status(200).json({
          code:"200",
          message:"success",
        });
        break;
      }
      case "POST": {
        console.log("API::POST:/status")
        res.status(200).json({
          code:"200",
          message:"success",
        });
        break;
      }
    
      default:
        res.status(404).end()
        break;
    }
    
  } catch (error) {
    res.status(500).send({
      code:"500",
      message:error.message,
      error:error
    })
  }
};

export default withSessionRoute(status);
