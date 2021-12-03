import { NextApiHandler } from "next";

import { withSessionRoute } from "@/lib/withSession";
import { StatusApiResponse } from "@/types/api/status";

const status:NextApiHandler<StatusApiResponse> = async (req, res) => {
  console.log(`API::${req.method}:${req.url} |${req.session.user?.userId}| `,{query:req.query,body:req.body})
  try {
    switch (req.method) {
      case "GET": {
        
        res.status(200).json({
          code:"200",
          message:"success",
        });
        break;
      }
      case "POST": {
        
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
    console.error(error)
    res.status(500).send({
      code:"500",
      message:error.message,
      error:error
    })
  }
};

export default withSessionRoute(status);
