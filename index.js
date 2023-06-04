// historial medico
// registro
// login
const services = require("./clientServices")
const Client = require("ssh2").Client
const prompt = require("prompt-sync")({sigint: true})

const { sshConf, target } = require("./sshConfig")
const sshClient = new Client()

sshClient.on("ready", () => {
    console.log("Connected to SSH server")
    sshClient.forwardOut("127.0.0.1", 0, target.host, target.port, (err , stream) => {
        if (err) {
            console.log("Error in SSH forwardOut", err)
            sshClient.end()
            return
        }
        console.log("Elija una opcion: ")
        services.forEach((option, index) => {
            console.log(index + ") " + option.name)
        })
        const option = prompt("Opcion: ")
        services[option].func(stream)
        console.log("\n----------------------------------\n")
        stream.on("data", (data) => {
            console.log("[Client] \tReceived from SOCKS server:", data.toString())
        })
        stream.on("close", () => {
            console.log("sshClient closed")
            sshClient.end()
        })
    } )
})
sshClient.on("error", (err) => {
    console.log("Error in connection to SSH server", err)
    sshClient.end()
})
sshClient.connect(sshConf)