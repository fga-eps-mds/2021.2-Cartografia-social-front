import { login, USER_ENTITY } from '../../src/services/loginService';
import AsyncStorage from '@react-native-community/async-storage';
import mockAxios from 'jest-mock-axios';
import * as localDatabase from '../../src/services/localDatabase';

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
const mockUserInfo = {
    "email": "email",
    "name": "name",
    "cellPhone": "cellPhone",
    "type": "type",
    "uid": "uid",
    "id": "id",
    "imageUrl": "imageUrl"
}

const correctUserData = {
    email: 'a@a.com',
    password: 'pocoto123',
}
describe('loginService', () => {
    it('can login correctly', async () => {
        mockAxios.get.mockResolvedValue({ data: mockUserInfo });
        await expect(login(correctUserData.email, correctUserData.password)).resolves.toStrictEqual(mockUserInfo);
        await expect(AsyncStorage.getItem('access_token')).resolves.toStrictEqual('Bearer token');
        await expect(localDatabase.get(USER_ENTITY, mockUserInfo.id)).resolves.toStrictEqual(mockUserInfo);
    })
})