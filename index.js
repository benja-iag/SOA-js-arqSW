// historial medico
// registro
// login
import { services } from "./ClientServices.js"
import { isValidOption } from "./verify/index.js"
import { Client } from "ssh2"
import { sshConf, target } from "./sshConfig.js"
import prompt from "prompt-sync"
const input = prompt({ sigint: true })

const sshClient = new Client()

const options = (stream) => {
    console.log("Elija una opcion: ")
    forEach((option, index) => {
        console.log(index + ") " + option.name)
    })
    const option = input("Opcion: ")
    if (!isValidOption(option)) {
        console.log("Por favor, ingrese una opcion valida");
        options(stream);
        return;
    }
    services[option].func(stream)
    console.log("\n----------------------------------\n")
}
sshClient.on("ready", () => {
    console.log("Connected to SSH server")
    sshClient.forwardOut("127.0.0.1", 0, target.host, target.port, (err, stream) => {
        if (err) {
            console.log("Error in SSH forwardOut", err)
            sshClient.end()
            return
        }
        options()
        stream.on("data", (data) => {
            console.log("[Client] \tReceived from SOCKS server:", data.toString())
            options()
        })
        stream.on("close", () => {
            console.log("sshClient closed")
            sshClient.end()
        })
    })
})
sshClient.on("error", (err) => {
    console.log("Error in connection to SSH server", err)
    sshClient.end()
})
sshClient.connect(sshConf)