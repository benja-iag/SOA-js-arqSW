const messageAndBits = (message) => {
    const size = message.length
    const bits = size >= 10 ? "000" : "0000"
    return bits + size.toString() + message
}
const validateFormat = (value, service) => {
    const numbers = value.substring(0, 5)
    const topic = value.substring(5, 10)
    const data = value.substring(10).split("|")
    console.log(numbers, topic, data)
    if (numbers != topic.length + data.length) {
        return "NK" + service+ "invalidFormat"
    }
    return data[0]
}
module.exports = {validateFormat, messageAndBits}