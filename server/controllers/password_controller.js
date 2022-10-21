const bcrypt = require('bcrypt');
const crypto = require('crypto');
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

const secret = 'pppppppppppppppppppppppppppppppppppppppppppppppp'

const encrypt = (password) => {
    const iv = Buffer.from(crypto.randomBytes(16))
    console.log(iv)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret), iv)

    let encrypted = Buffer.concat([cipher.update(password), cipher.final()])

    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
}

const decrypt = (encrypted_password) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret), Buffer.from(encrypted_password.iv, 'hex'))
    let decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted_password.encryptedData, 'hex')), decipher.final()])
    return decrypted.toString()
}

module.exports = {hash, check_hash, encrypt, decrypt}


