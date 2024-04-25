import multer, { diskStorage } from "multer";
import { extname as _extname } from "path";
import fs from "fs";
import { randomBytes } from "crypto";
import sharp from "sharp"; // Import sharp module for image processing
import path from "path"; // Import path module for file paths
import Media from "../api/media/models/media.js";

const storage = diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = randomBytes(16).toString("hex");
    const extname = _extname(file.originalname);
    const filename = `${file.originalname}-${uniqueSuffix}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
const uploadImage = async (req, fieldNames) => {
  try {
    const fieldObj = fieldNames.map((item) => {
      return { name: item };
    });
    return new Promise((resolve, reject) => {
      upload.fields(fieldObj)(req, null, async (err) => {
        if (err) {
          console.error("Error uploading files:", err);
          reject({ error: err.message }); // Reject promise if there's an error
          return;
        }
        try {
          const uploadPromises = Object.values(req.files).flatMap(
            async (reqfile) => {
              let mediaObject;
              let file = reqfile[0];
              if (reqfile.length > 1) {
                const arrayfile = reqfile;
                let resturnREsponse = [];
                for (const file of arrayfile) {
                  if (file.mimetype.startsWith("image")) {
                    const imageInfo = await sharp(file.path).metadata();
                    const formatTypes = [
                      {
                        name: "small",
                        width: 500,
                        height: 500,
                      },
                      {
                        name: "thumbnail",
                        width: 200,
                        height: 200,
                      },
                    ];

                    let formats = {};

                    for (let index = 0; index < formatTypes.length; index++) {
                      const formatElement = formatTypes[index];
                      const fileName = `${formatElement.name}_${file.filename}`;
                      const filePath = path.join("public/uploads", fileName);
                      await sharp(file.path)
                        .resize(formatElement.width, formatElement.height)
                        .toFile(filePath);

                      const frmtsObject = {
                        name: formatElement.name + "_" + file.filename,
                        url: "/" + filePath.split("\\").join("/"),
                        size: fs.statSync(filePath).size / 1024,
                        width: formatElement.width,
                        height: formatElement.height,
                        type: formatElement.name,
                      };
                      formats[formatElement.name] = frmtsObject;
                    }

                    const filePath = file.path.split("\\").join("/");
                    const prefix = "/";
                    mediaObject = {
                      name: file.filename,
                      path: "",
                      url: prefix + filePath,
                      size: fs.statSync(filePath).size / 1024,
                      width: imageInfo.width,
                      height: imageInfo.height,
                      formats: formats,
                    };
                  }
                  const mediaEntity = await Media.create(mediaObject);
                  resturnREsponse.push(mediaEntity.dataValues);
                }
                return { [file.fieldname]: resturnREsponse };
              } else {
                if (file.mimetype.startsWith("image")) {
                  const imageInfo = await sharp(file.path).metadata();
                  const formatTypes = [
                    {
                      name: "small",
                      width: 500,
                      height: 500,
                    },
                    {
                      name: "thumbnail",
                      width: 200,
                      height: 200,
                    },
                  ];

                  let formats = {};

                  for (let index = 0; index < formatTypes.length; index++) {
                    const formatElement = formatTypes[index];
                    const fileName = `${formatElement.name}_${file.filename}`;
                    const filePath = path.join("public/uploads", fileName);
                    await sharp(file.path)
                      .resize(formatElement.width, formatElement.height)
                      .toFile(filePath);

                    const frmtsObject = {
                      name: formatElement.name + "_" + file.filename,
                      url: "/" + filePath.split("\\").join("/"),
                      size: fs.statSync(filePath).size / 1024,
                      width: formatElement.width,
                      height: formatElement.height,
                      type: formatElement.name,
                    };
                    formats[formatElement.name] = frmtsObject;
                  }

                  const filePath = file.path.split("\\").join("/");
                  const prefix = "/";
                  mediaObject = {
                    name: file.filename,
                    path: "",
                    url: prefix + filePath,
                    size: fs.statSync(filePath).size / 1024,
                    width: imageInfo.width,
                    height: imageInfo.height,
                    formats: formats,
                  };
                }
                const mediaEntity = await Media.create(mediaObject);
                return { [file.fieldname]: mediaEntity.dataValues };
              }
            }
          );

          const uploadedMedia = await Promise.all(uploadPromises);
          const Objectres = {};
          for (const item of uploadedMedia) {
            Objectres[Object.keys(item)] = Object.values(item)[0] || null;
          }
          resolve(Objectres);
        } catch (error) {
          console.error("Error processing uploaded files:", error);
          reject(error); // Reject promise if there's an error
        }
      });
    });
  } catch (error) {
    console.error("Internal server Error:", error);
    throw new Error("Internal server Error: " + error.message);
  }
};

export default uploadImage;
