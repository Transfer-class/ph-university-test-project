import { v2 as cloudinary } from "cloudinary";

import multer from "multer";
import fs from "fs";

cloudinary.config({
  cloud_name: "dyv2wz6o",
  api_key: "54645345435",
  api_secret: "Hdfafdsafd_ffFadfasd",
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  // Configuration

  // these name and key and api secret should be stored into env we are using here. but the best practice is to use it into .env

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, {
      public_id: imageName,
    }),
      function (error: any, result: any) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
          fs.unlink(path, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("file is deleted");
            }
          });
        }
      };
    // delete a file asynchronously
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
