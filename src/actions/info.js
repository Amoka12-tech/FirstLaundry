import * as api from '../apis/info';

export const getAppInfo = async () => {
    try {
        const { data } = await api.getAppInfo();
        return data;
    } catch (error) {
        alert('Failed to fetch app informations.');
        return null;
    }
};