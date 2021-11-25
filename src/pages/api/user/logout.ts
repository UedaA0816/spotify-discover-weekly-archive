import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";
import { LogoutApiResponse } from "@/types/api/user/logout";

const logout:NextApiHandler<LogoutApiResponse> = async (req, res) => {

  try {
    console.log("API::/user/logout")
    await req.session.destroy();

    res.status(200).json({
      code:"200",
      message:"success",
    });

  } catch (error) {
    console.error(error)
    res.status(500).send({
      code:"500",
      message:error.message,
      error:error
    })
  }

};

export default withSessionRoute(logout);
