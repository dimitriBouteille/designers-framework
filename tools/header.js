
const pkg = require('../package')
const currentYear = new Date().getFullYear()

/**
 * Build header
 * @returns {string}
 */
function createHeader() {

    return ['/**',
        ` * Designers Framework v${pkg.version} (${pkg.homepage})`,
        ` * Copyright 2018-${currentYear} ${pkg.author}`,
        ` * Licensed under ${pkg.license}`,
        ' */',
        ''].join('\n')
}
module.exports = createHeader();