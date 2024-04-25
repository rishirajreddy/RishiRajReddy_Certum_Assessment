import { promises as fs } from "fs";
import path from "path";

/**
 * @typedef {Object} permissionsObject
 * @property {string} api - The API identifier.
 * @property {string} endpoint - The API endpoint.
 * @property {string} method - The HTTP method of the API (e.g., 'GET', 'POST').
 * @property {string} name - The name or description of the API.
 */

/**
 * @typedef {Object} RouteObject
 * @property {string} endpoint - The route endpoint.
 * @property {string} method - The HTTP method of the route (e.g., 'GET', 'POST').
 * @property {string} name - The name or description of the route.
 * @property {Function} handler - The function handling the route logic.
 * @property {Array<Function>} middlewares - An array of middleware functions.
 */

/**
 * @typedef {Object} ApiAndRoutesObject
 * @property {Array<permissions>} permissions - An array of objects representing APIs.
 * @property {Array<RouteObject>} routes - An array of objects representing routes.
 */

/**
 * Returns an object with properties 'apis' and 'routes'.
 *
 * @returns {ApiAndRoutesObject} - An object with properties 'apis' and 'routes'.
 */

export default async function () {
  try {
    const readPermissions = async (filePath) => {
      try {
        const fullPath = path.resolve(filePath);
        const module = await import("file://" + fullPath);
        const permissions = module.default;
        return permissions;
      } catch (error) {
        console.log(error);
        console.error(
          `Error reading permissions from file ${filePath}: ${error.message}`
        );
        return null;
      }
    };

    /**
     *
     * @param {string} apiDirectory
     *
     */
    const readApiPermissions = async (apiDirectory) => {
      let permissions;
      const files = await fs.readdir(apiDirectory);
      for (const file of files) {
        const filePath = path.join(apiDirectory, file);
        const stats = await fs.stat(filePath);
        if (stats.isFile() && path.extname(file) === ".js") {
          const filePermissions = await readPermissions(filePath);
          if (filePermissions) {
            permissions = filePermissions;
          }
        }
      }
      return permissions;
    };

    const apiDirectory = path.resolve("./src/api");
    const apiFolders = await fs.readdir(apiDirectory);
    const allApiPermissions = await Promise.all(
      apiFolders.map((apiFolder) =>
        readApiPermissions(path.join(apiDirectory, apiFolder, "routes"))
      )
    );
    const arrr = allApiPermissions.filter((item) => item !== undefined);
    if (!arrr) {
      return { message: "Unable to Fetch Routes" };
    }
    let filteredApis = arrr.flatMap((item) =>
      item.routes.map((r) => ({
        api: item.api,
        endpoint: r.endpoint,
        method: r.method,
        name: r.name,
      }))
    );
    let routes = arrr.flatMap((item) =>
      item.routes.map((r) => ({
        api: item.api,
        endpoint: r.endpoint,
        method: r.method,
        name: r.name,
        handler: r.handler,
        middlewares: r.middlewares,
      }))
    );
    return { permissions: filteredApis, routes };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
