const packageConfig = require('./../package')

function getHeader() {

    const author = packageConfig.author
    return [
        `Designers v${packageConfig.version} - ${packageConfig.homepage}`,
        `Copyright 2019 - ${new Date().getFullYear()} ${author.name}`,
        `Licensed under ${packageConfig.license}`,
        ].join('\n')
}

module.exports = getHeader()