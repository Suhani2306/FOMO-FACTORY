import { dataObj, tokenObj } from "./types";

export const setTableLoading = (loading: boolean) => ({
    type: 'SET_TABLE_LOADING',
    payload: loading
})

export const setCoins = (data: dataObj[]) => ({
    type: 'SET_COINS',
    payload: data
});

export const setCryptoCodes = (codes: tokenObj[]) => ({
    type: 'SET_CRYPTO_CODES',
    payload: codes
})

export const setModalOpen = (flag: boolean) => ({
    type: 'SET_MODAL_OPEN',
    payload: flag
})

export const setSelectedToken = (token: string) => ({
    type: 'SET_SELECTED_TOKEN',
    payload: token
})