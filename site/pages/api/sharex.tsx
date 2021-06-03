export default (req, res) => {
  res.json({
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
  })
}
