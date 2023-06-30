import { sshConf, target } from "./config/sshConfig.js";
import { registerValidate } from "./DBservices/auth.js";
import { Client } from "ssh2";

const sshClient = new Client();

sshClient.on("ready", () => {
  console.log(`[Services-benj2] \tconnected to SSH server`);
  sshClient.forwardOut(
    target.ip,
    0,
    target.host,
    target.port,
    (err, stream) => {
      if (err) {
        console.log("Error in SSH forwardOut", err);
        sshClient.end();
        return;
      }
      stream.write("00010sinitbenj2");
      stream.on("data", async (data) => {
        const response = data.toString().substring(10).split("|");
        console.log(`[Services-benj2] \tData:`, data.toString());
        const responseDB = await registerValidate(
          stream,
          response[0],
          response[1],
          response[2],
          response[3],
          response[4]
        );
        stream.write(messageAndBits("benj2" + responseDB));
      });
      stream.on("close", () => {
        sshClient.end();
      });
    }
  );
});
sshClient.connect(sshConf);
