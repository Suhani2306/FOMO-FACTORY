type dataObj = {
    name: string
    price: number
    volume24h: number
    marketCap: number
}

type tokenObj = {
    code: string
}

type coinState = {
    coin: any
    loading: boolean
    data: dataObj[]
    cryptoCodes: tokenObj[]
    isModalOpen: boolean
    token: string
}

export type { dataObj, tokenObj, coinState }