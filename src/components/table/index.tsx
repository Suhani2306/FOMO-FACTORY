import './style.css'
import Loader from '../loader/index'
import { dataObj } from '@/src/redux/types'

type tableProps = {
    data: dataObj[]
    loading: boolean
}

const Table = ({ data, loading }: tableProps) => {
    const formatNumberToBillionsOrTrillions = (number: number) => {
        if (number >= 1e12) {
            return (number / 1e12).toFixed(3) + ' T'
        } else if (number >= 1e9) {
            return (number / 1e9).toFixed(3) + ' B'
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(3) + ' M'
        }
        return number // Return the number if it's less than a million
    }

    return (
        loading ? (
            <Loader />
        ) : (
            <table>
                <caption>Real Time Token Prices</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Rate($)</th>
                        <th>Volume</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((coin: dataObj, index: number) => {
                        return (
                            <tr key={index}>
                                <td data-label="Name">{coin?.name}</td>
                                <td data-label="Rate($)">$ {coin?.price?.toFixed(2)}</td>
                                <td data-label="Volume">$ {formatNumberToBillionsOrTrillions(coin?.volume24h)}</td>
                                <td data-label="Market Cap">$ {formatNumberToBillionsOrTrillions(coin?.marketCap)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    )
}

export default Table
