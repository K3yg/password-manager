const bcrypt = require('bcrypt');
const { performance, PerformanceObserver } = require("perf_hooks")

const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true })

// * if saltRounds is: {13 = 0.5s}, {14 = 1s}, {15 = 2s}
// * Ryzen 7 2700 3.20GHz, 16GB RAM, GTX 1050
const hash = (password, saltRounds) => {
    // performance.mark('start')
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    // performance.mark('end')
    // performance.measure('hash', 'start', 'end')
    return hashedPassword
}

const check_hash = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}


module.exports = {hash, check_hash}


