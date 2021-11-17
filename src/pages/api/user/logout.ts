import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";

const logout:NextApiHandler = async (req, res) => {

  try {
    console.log("API::/user/logout")
    await req.session.destroy();

    res.status(200).json({});

  } catch (error) {
    res.status(500).send(error.message)
  }

};

export default withSessionRoute(logout);
