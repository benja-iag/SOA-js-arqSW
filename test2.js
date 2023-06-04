const prompt = require("prompt-sync")({ sigint: true });
const { sshConf, target } = require("./sshConfig")
const Client = require("ssh2").Client    

const sshClient = new Client();




sshClient.on('ready', () => {
    console.log(`[Services-benj2] \tconnected to SSH server`)
    sshClient.forwardOut(target.ip, 0, target.host, target.port, (err, stream) => {
        if (err) {
            console.log("Error in SSH forwardOut", err)
            sshClient.end()
            return
        }
        stream.write("00010sinitbenj2")
        stream.on("data", (data) => {
            console.log(`[Services-benj2] \tReceived from SOCKS server:`, data.toString())
            option.func(data.toString())
            stream.write("00010benj2"+"/")
        })
        stream.on("close", () => {
        sshClient.end()
        })
    })
})
sshClient.connect(sshConf)