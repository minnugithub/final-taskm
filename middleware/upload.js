import util from 'util';
import multer from 'multer'
import { GridFsStorage } from "multer-gridFs-storage";
const dbConfig = {
  url: "mongodb://localhost:27017/",
  database: "image-upload",
  imgBucket: "photos",
  fileBucket:"fs",
};
var storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg","image/pdf","image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }
    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
export default uploadFilesMiddleware;