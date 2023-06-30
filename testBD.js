import { sshConf, target } from "./config/sshConfig.js";
import { Client } from "ssh2";
import { servicesDB } from "./databaseService.js";
import { messageAndBits } from "./utilService.js";
import sqlite3 from "sqlite3";
const filepath = "./fish.db";
const sshClient = new Client();
function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been established");
  return db;
}

sshClient.on("ready", () => {
  console.log(`[Services-benj1] \tconnected to SSH server`);
  sshClient.forwardOut(
    target.ip,
    1,
    target.host,
    target.port,
    (err, stream) => {
      if (err) {
        console.log("Error in SSH forwardOut", err);
        sshClient.end();
        return;
      }
      const db = createDbConnection();
      stream.write("00010sinitbenj8");

      stream.on("data", (data) => {
        const response = data.toString().substring(10);
        console.log(`[Services-benj8] \tData:`, data.toString());
        const serviceNumber = response.split("|")[0];
        if (servicesDB[serviceNumber] != null) {
          servicesDB[serviceNumber](db, response);
        } else stream.write(messageAndBits("benj" + serviceNumber + "NK"));
        console.log("response", response);
        stream.write("00010benj8" + response);
      });
      stream.on("close", () => {
        sshClient.end();
      });
    }
  );
});
sshClient.connect(sshConf);
