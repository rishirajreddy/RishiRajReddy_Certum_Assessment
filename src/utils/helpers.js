import crypto from "crypto";

export function getPagination(pagination) {
  if (pagination == undefined) {
    return { limit: 25, offset: null };
  } else {
    const limit = +pagination.size;
    const offset =
      pagination.page <= 1 ? 0 * limit : (pagination.page - 1) * limit;
    return { limit, offset };
  }
}

export function generatePaginationMeta({ pagination, data_length }) {
  const meta = {
    pagination: {
      page: pagination ? parseInt(pagination.page) : 1,
      pageSize: pagination ? parseInt(pagination.size) : data_length,
      pageCount: pagination ? Math.ceil(data_length / pagination.size) : 1,
      total: data_length,
    },
  };
  return meta;
}

export function generateUniqueIDs({ name, prefix }) {
  function shortenName(name) {
    const firstPart = name.substring(0, 3).toUpperCase();
    const lastChar = name.charAt(name.length - 1).toUpperCase();
    return firstPart + lastChar;
  }
  const hash = crypto
    .createHash("sha256")
    .update(name)
    .digest("hex")
    .slice(0, 5)
    .toUpperCase(); // Shortened hash
  const uniqueIdentifier = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  const shortname = shortenName(name);
  return `${prefix}-${shortname}${hash}${uniqueIdentifier}`;
}
