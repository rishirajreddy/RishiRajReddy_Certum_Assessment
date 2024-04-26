import pg from "pg";
const { Pool } = pg;
import { readFileSync } from "fs";
import { exec } from "child_process";
import { createInterface } from "readline";

// Create readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user for database details
rl.question("Enter PostgreSQL username: ", (username) => {
  rl.question("Enter PostgreSQL database name: ", (database) => {
    rl.question("Enter PostgreSQL password: ", (password) => {
      // Set up PostgreSQL connection pool

      // Read SQL dump file
      const sqlDumpFilePath = "./database_dump.sql"; // Provide the path to your SQL dump file
      const psqlCommand = `psql -U ${username} -d ${database} -f ${sqlDumpFilePath}`;
      //   const sqlDump = readFileSync(sqlDumpFilePath, "utf8");

      exec(psqlCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing psql command: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`psql error: ${stderr}`);
          return;
        }
        console.log(`Database restored successfully: ${stdout}`);
      });
      // Restore database
      //   restoreDatabase(sqlDump);
    });
  });
});
