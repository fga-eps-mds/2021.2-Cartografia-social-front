import auth from '@react-native-firebase/auth';
import * as localDatabase from './localDatabase';
import AsyncStorage from '@react-native-community/async-storage';

const firebaseLogin = async (email, password) => {
    const userCredentials = await auth().signInWithEmailAndPassword(
        email.trim(),
        password.trim(),
    );
    return await userCredentials.user.getIdToken();
}

export const login = async (email, password) => {
    const token = await firebaseLogin(email, password);
    await AsyncStorage.setItem('access_token', `Bearer ${token}`);
    return {}
}