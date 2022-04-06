import { login } from '../../src/services/loginService';
import AsyncStorage from '@react-native-community/async-storage';

jest.mock('@react-native-firebase/auth', () => {
    return () => ({
        signInWithEmailAndPassword: async (_, __) =>
        ({
            user: {
                getIdToken: async () => 'token'
            }
        }),
    })
});

const correctUserData = {
    email: 'a@a.com',
    password: 'pocoto123',
}
describe('loginService', () => {
    it('can login correctly', async () => {
        await expect(login(correctUserData.email, correctUserData.password)).resolves.toStrictEqual({});
        await expect(AsyncStorage.getItem('access_token')).resolves.toStrictEqual('Bearer token');
    })
})