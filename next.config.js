/** @format */

const path = require("path");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

const withImages = require("next-images");
dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv(
  withImages({
    images: {
      domains: [
        "graph.facebook.com",
        "lh3.googleusercontent.com",
        "images.unsplash.com",
        "storage.googleapis.com",
      ],
    },
    webpack: (config) => {
      config.resolve.alias["components"] = path.resolve(
        __dirname,
        "components"
      );
      config.resolve.alias["public"] = path.resolve(__dirname, "public");
      return config;
    },
  })
);
