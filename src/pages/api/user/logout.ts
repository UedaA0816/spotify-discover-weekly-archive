import { NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/withSession";

const authorize:NextApiHandler = async (req, res) => {

  await req.session.destroy();

  res.status(200).redirect('/');
};

export default withSessionRoute(authorize);
