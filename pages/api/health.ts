import { handle } from "@/lib/middleware";
import { trpc } from "@/lib/trpc";

export default handle((_req, res) => {
  res.status(200).end();
});
