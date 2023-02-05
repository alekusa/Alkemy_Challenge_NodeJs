import bcrypt from 'bcrypt'

class serviceEncryption {
    async encryptPassword(password) {
        return await bcrypt.hash(password, 10)
    }
    async comparePassword(password, receivedPassword) {
        return await bcrypt.compare(password, receivedPassword)
    }
}

export default serviceEncryption
