import { getSchedule } from "./DBservices/scheduler.js";
import { sshConf, target } from "./config/sshConfig.js";
import { Client } from "ssh2";
const sshClient = new Client();

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
      stream.write("00010sinitbenj5");
      stream.on("data", async (data) => {
        const response = data.toString().substring(10).split("|");
        console.log(`[Services-benj5] \tData:`, data.toString());
        console.log("response", response[0]);
        const responseDB = await getSchedule(stream, response[0]);
        stream.write(messageAndBits("benj5" + responseDB));
      });
      stream.on("close", () => {
        sshClient.end();
      });
    }
  );
});
sshClient.connect(sshConf);
