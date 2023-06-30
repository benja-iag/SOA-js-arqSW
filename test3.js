import { sshConf, target } from "./config/sshConfig.js";
import { validateRol } from "./DBservices/auth.js";
import { Client } from "ssh2";

const sshClient = new Client();

sshClient.on("ready", () => {
  console.log(`[Services-benj3] \tconnected to SSH server`);
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
      stream.write("00010sinitbenj3");
      stream.on("data", async (data) => {
        //validate rol
        // se deberia recibir el RUT y el tipo en ese orden
        const response = data.toString().substring(10).split("|");
        console.log(`[Services-benj3] \tData:`, data.toString());
        const responseDB = await validateRol(stream, response[0], response[1]);
        stream.write(messageAndBits("benj3" + responseDB));
      });
      stream.on("close", () => {
        sshClient.end();
      });
    }
  );
});
sshClient.connect(sshConf);
