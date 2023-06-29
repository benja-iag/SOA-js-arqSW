import { sshConf, target } from "./sshConfig.js";
import { Client } from "ssh2";
const sshClient = new Client();

const parseUser = (data) => {
    const user = data.split("|");
    return {
        mail: user[0],
        password: user[1],
    };
};

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
            stream.write("00010sinitbenj1");
            stream.on("data", (data) => {
                const response = data.toString().substring(10).split("|")[0];
                console.log(`[Services-benj1] \tData:`, data.toString());
                console.log("response", response);
                stream.write("00010benj1" + response);
            });
            stream.on("close", () => {
                sshClient.end();
            });
        }
    );
});
sshClient.connect(sshConf);
