import uploadFilesMiddleware from '../middleware/upload'
import { MongoClient, GridFSBucket } from 'mongodb'
const baseUrl = "http://localhost:3001/files/";
const dbConfig = {
  url: "mongodb://localhost:27017/",
  database: "image-upload",
  imgBucket: "photos",
  fileBucket:"fs",
};
const url = dbConfig.url;
const mongoClient = new MongoClient(url);
const uploadFiles = async (req, res) => {
  try {
    await uploadFilesMiddleware(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send({
        message: "You must select a file.",
      });
    }
    return res.send(req.file);
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Error when trying upload image: ${error}",
    });
  }
};
const getListFiles = async (req, res) => {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");
    const cursor = images.find({});
    if ((await cursor.count()) === 0) {
      return res.status(500).send({
        message: "No files found!",
      });
    }
    let fileInfos = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });
    return res.status(200).send(fileInfos);
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};
const download = async (req, res) => {
  try {
    await mongoClient.connect();
  
    const database = mongoClient.db(dbConfig.database);

    let bucket =  new GridFSBucket(database,{

      bucketName: dbConfig.imgBucket,

    });

    if (req.params.name.endsWith('.pdf')) {

      bucket = new GridFSBucket(database,{

        bucketName: dbConfig.fileBucket,

      });

    }
    let downloadStream = bucket.openDownloadStreamByName(req.params.name);
    downloadStream.on("data", function (data) {
      return res.status(200).write(data);
    });
    downloadStream.on("error", function (err) {
      return res.status(404).send({ message: "Cannot download the Image!" });
    });
    downloadStream.on("end", () => {
      return res.end();
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};


export {uploadFiles, getListFiles, download};