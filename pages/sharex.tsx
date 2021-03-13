import { GetServerSideProps } from "next";

export default function Sharex() {
  return null;
}
const sharexInfo = {
  Version: "13.1.0",
  DestinationType: "ImageUploader",
  RequestMethod: "POST",
  RequestURL: "https://simp.pics/api/image/upload",
  Headers: {
    Authorization: "paste-your-api-token-here",
  },
  Body: "MultipartFormData",
  Arguments: {
    tags: "screenshot",
    file: "$input$",
    public: "false",
    nsfw: "false",
  },
  FileFormName: "file",
  URL: "https://simp.pics/image/$json:slug$",
  ThumbnailURL: "$json:url$",
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.write(JSON.stringify(sharexInfo, null, 2));
  res.end();
  return { props: {} };
};
