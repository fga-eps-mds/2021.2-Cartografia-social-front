import { saveLoginDataOffline, removeLoginDataOffline, offlineLogin } from '../../src/services/offilineLogin'

const correctLoginData = {
    email: 'correctEmail@correct.com',
    password: 'correctPassword',
}

const wrongLoginData = {
    email: 'correctEmail@correct.com',
    password: 'wrongPassword',
}

describe('offilineLogin', () => {
    it('can save login data', async () => {
        await expect(saveLoginDataOffline(correctLoginData.email, correctLoginData.password)).resolves.toBeUndefined()
    })

    it('can login without thown', async () => {
        await expect(offlineLogin(correctLoginData.email, correctLoginData.password)).resolves.toBeUndefined()
    })

    it('can not login with wrong data', async () => {
        await expect(offlineLogin(wrongLoginData.email, wrongLoginData.password)).rejects.toThrow('Invalid credentials')
    })
    

    it('can remove login data', async () => {
        await expect(removeLoginDataOffline()).resolves.toBeUndefined()
        await expect(offlineLogin(correctLoginData.email, correctLoginData.password)).rejects.toThrow('Invalid credentials')
    })
})