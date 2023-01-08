import * as Yup from "yup";
export const tikokLiveSchema = Yup.object().shape({
  tiktokUsername: Yup.string()
    .min(6, "TikTok username must be at least 6 characters long")
    .max(25, "TikTok username must be 15 characters or less")
    .required("TikTok username is required"),
  //options: Yup.array()
  //  .of(Yup.string().oneOf(["like", "comment", "share", "live", "gift"]).min(1))
  //  .min(1, "must choose one"),
});
