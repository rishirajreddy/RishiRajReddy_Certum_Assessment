import SQLite from "sqlite3";
export default {
  dialect: "sqlite",
  storage: "../demo.sqlite",
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
};
