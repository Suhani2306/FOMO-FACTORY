type action = {
    type: string
    payload?: any
}

const initialState = {
    loading: true,
    data: [],
    cryptoCodes: [],
    isModalOpen: false,
    token: 'BTC'
};

const coinReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case 'SET_TABLE_LOADING':
            return { ...state, loading: action.payload}
        case 'SET_COINS':
            return { ...state, data: action.payload }
        case 'SET_CRYPTO_CODES':
            return { ...state, cryptoCodes: action.payload}
        case 'SET_MODAL_OPEN':
            return { ...state, isModalOpen: action.payload}
        case 'SET_SELECTED_TOKEN':
            return { ...state, token: action.payload}
        default:
            return state
    }
}

export default coinReducer
