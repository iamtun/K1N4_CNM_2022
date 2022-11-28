import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = (key, val) => {
    return AsyncStorage.setItem(key, JSON.stringify(val)).then(() => {
        //console.log(`save ${key} success!`);
        return key;
    });
};

export const getItem = (key) => {
    return AsyncStorage.getItem(key).then((val) => {
        if (!val) throw new Error('404 token');
        else return val;
    });
};

export const removeItem = (key) => {
    console.log('logout!');
    return AsyncStorage.removeItem(key);
};
