const prompt = require("prompt-sync")({ sigint: true });
const { sshConf, target } = require("./sshConfig")
const Client = require("ssh2").Client    

const sshClient = new Client();




sshClient.on('ready', () => {
    console.log(`[Services-benj3] \tconnected to SSH server`)
    sshClient.forwardOut(target.ip, 0, target.host, target.port, (err, stream) => {
        if (err) {
            console.log("Error in SSH forwardOut", err)
            sshClient.end()
            return
        }
        stream.write("00010sinitbenj3")
        stream.on("data", (data) => {
            const response = data.toString().substring(10).split("|")[1];
            console.log(`[Services-benj3] \tData:`, data.toString())
            stream.write("00010benj3"+response)
        })
        stream.on("close", () => {
        sshClient.end()
        })
    })
})
sshClient.connect(sshConf)
