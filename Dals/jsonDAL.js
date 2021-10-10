const jsonFile = require('jsonfile')


const readJsonFile = (fileName) => {
    return new Promise((resolve, reject) => {
        jsonFile.readFile('./Dals/' + fileName, (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

const writeToJsonFile = (fileName, data) => {
    return new Promise((resolve, reject) => {
        jsonFile.writeFile('./Dals/' + fileName, data, (err) => {
            if (err) {
                reject(err)
            }
            resolve("good")
        })
    })
}

module.exports = {readJsonFile, writeToJsonFile}