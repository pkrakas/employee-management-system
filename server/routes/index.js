const fs = require('fs')

function loadRoutes(app) {
    try {
        const files = fs.readdirSync(__dirname)
        files.forEach(fileName => {
            const route = fileName.split('.')[0]
            if(route !== 'index')
                app.use(`/api/${route}`, require(`${__dirname}/${fileName}`))
        })
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = loadRoutes