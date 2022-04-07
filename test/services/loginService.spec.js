import { login, USER_ENTITY, getUserInfo } from '../../src/services/loginService';
import AsyncStorage from '@react-native-community/async-storage';
import mockAxios from 'jest-mock-axios';
import * as localDatabase from '../../src/services/localDatabase';

jest.mock('@react-native-firebase/auth', () => {
    return () => ({
        signInWithEmailAndPassword: async(_, __) =>
            ({
                user: {
                    getIdToken: async() => 'token',
                    displayName: 'name',
                    providerId: 'id',
                }
            }),
    })
});
const mockUserInfo = {
    email: 'a@a.com',
    name: "name",
    cellPhone: "cellPhone",
    type: "type",
    uid: "uid",
    id: "id",
    imageUrl: "imageUrl"
}

const correctUserData = {
    email: 'a@a.com',
    password: 'pocoto123',
}

const userLogData = {
    name: 'name',
    id: 'id',
    token: 'token',
    email: 'a@a.com',
    data: mockUserInfo,
}

afterEach(() => {
    mockAxios.reset();
});

describe('loginService', () => {
    it('can login correctly', async() => {
        mockAxios.get.mockResolvedValue({ data: mockUserInfo });
        await expect(login(correctUserData.email, correctUserData.password)).resolves.toStrictEqual(userLogData);
        await expect(AsyncStorage.getItem('access_token')).resolves.toStrictEqual('Bearer token');
        await expect(localDatabase.get(USER_ENTITY, mockUserInfo.id)).resolves.toStrictEqual(userLogData);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
    })

    it('can login offline', async() => {
        await expect(login(correctUserData.email, correctUserData.password, true)).resolves.toStrictEqual(userLogData);
        await expect(localDatabase.get(USER_ENTITY, mockUserInfo.id)).resolves.toStrictEqual(userLogData);
        expect(mockAxios.get).toHaveBeenCalledTimes(0);
    })

    it('cannot login offline with incorrect data', async() => {
        await expect(login(correctUserData.email, 'wrong pass', true)).rejects.toThrow();
        expect(mockAxios.get).toHaveBeenCalledTimes(0);
    })

    it('cannot login offline with incorrect email', async() => {
        await expect(login('wrong email', correctUserData.password, true)).rejects.toThrow();
        expect(mockAxios.get).toHaveBeenCalledTimes(0);
    })
})