import { z } from "zod";
import { foundationType } from "../types/foundation";

export const foundationSchema = z.object({
  category: foundationType,
  title: z.string({ required_error: "Title is required" }),
  banner: z.string().optional(),
  //   detailInfo:
});
