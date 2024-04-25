// import { getPagination, getMeta, errorResponse } from "rapidjet";
import Media from "../models/media.js";
import { request, response } from "express";
import path from "path";
import sharp from "sharp";
import {
  generatePaginationMeta,
  getPagination,
} from "../../../utils/helpers.js";

export const create = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(500).send({ error: "No files uploaded" });
    } else {
      // console.log(sequelize.models);
      const uploadPromises = req.files.map(async (file) => {
        let mediaObject;
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
            const element = formatElement;
            const fileName = `${element.name}_${file.filename}`;
            const filePath = path.join("public/uploads", fileName);
            const resizedFile = await sharp(file.path)
              .resize(element.width, element.height)
              .toFile(filePath);
            const prefix = "/";

            const frmtsObject = {
              name: element.name + "_" + file.filename,
              url: prefix + filePath.split("\\").join("/"),
              size: resizedFile.size / 1024,
              width: element.width,
              height: element.height,
              type: element.name,
            };
            formats[element.name] = frmtsObject;
          }

          const filePath = file.path.split("\\").join("/");
          const prefix = "/";

          mediaObject = {
            name: file.filename,
            path: "",
            url: prefix + filePath,
            size: file.size,
            width: imageInfo.width,
            height: imageInfo.height,
            formats: formats,
          };
        } else if (file.mimetype.startsWith("video")) {
          const videoInfo = await getVideoInfo(file.path);

          const filePath = file.path.split("\\").join("/");
          const prefix = "/";
          console.log(filePath.split("/")[-1]);
          mediaObject = {
            name: file.filename,
            path: "",
            url: `/api/uploads/${file.filename}/stream`,
            size: file.size,
            type: "video",
            width: videoInfo.resolution.width,
            height: videoInfo.resolution.height,
            duration: videoInfo.duration,
          };
        } else {
          return res.status(500).send({ error: "Unsupported file type" });
        }

        const mediaEntity = await Media.create(mediaObject);
        return mediaEntity;
      });

      const uploadedMedia = await Promise.all(uploadPromises);
      return res.status(200).send(uploadedMedia);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 500,
      message: "Internal server Error",
      error: error.message,
    });
  }
};

export const find = async (req, res) => {
  try {
    let pagination = req.query.pagination;
    let meta;
    var files_data;
    const getFiles = async (offset, limit) => {
      const files = await Media.findAndCountAll({
        offset: offset,
        limit: limit,
      });
      return files;
    };

    if (pagination) {
      if (Object.keys(pagination).length > 0) {
        const { limit, offset } = getPagination(
          pagination.page,
          pagination.size
        );

        files_data = await getFiles(offset, limit);
        meta = generatePaginationMeta({
          pagination,
          data_length: files_data.count,
        });
      }
    } else {
      files_data = await getFiles(null, null);
      meta = generatePaginationMeta({
        pagination: null,
        data_length: files_data.count,
      });
    }
    return res.status(200).send({ data: files_data, meta });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal server Error",
        details: error.message,
      })
    );
  }
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Media.findByPk(id);
    if (upload) {
      return res.status(200).send(upload);
    } else {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Invalid  ID" }));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: "Internal server Error" }));
  }
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Media.findByPk(id);
    if (upload) {
      const update = await Media.update(req.body);
      return res.status(200).send(update);
    } else {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Invalid  ID" }));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: "Internal server Error" }));
  }
};
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Media.findByPk(id);
    if (upload) {
      const destroyMedia = await Media.destroy({
        where: { id: id },
      });
      return res.status(200).send({ message: "File Deleted Successfully" });
    } else {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Invalid  ID" }));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: "Internal server Error" }));
  }
};

export const streamVideo = async (req, res) => {
  try {
    const fs = require("fs");
    const path = require("path");

    const { filename } = req.params;
    const videoPath = path.join(process.cwd(), "public", "uploads", filename);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.set("Content-Type", "video/mp4");
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: "Internal server Error" }));
  }
};
