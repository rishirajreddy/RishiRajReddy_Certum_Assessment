import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    const originalname = file.originalname.split(" ").join("_");
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    const extname = path.extname(originalname);
    const filename = `${originalname}-${uniqueSuffix}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

export default upload;
