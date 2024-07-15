"use client"
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import '../../app/globals.css'
import { setSelectedToken } from '@/src/redux/actions'
import { coinState, tokenObj } from '@/src/redux/types'

type modalProps = {
    closeModal: () => void
}

const Modal = ({ closeModal }: modalProps) => {
    const dispatch = useDispatch()

    const { cryptoCodes: cryptoData , token: selectedToken} = useSelector((state: coinState) => state.coin)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const selectedToken = e.currentTarget.querySelector('input[name="cryptoToken"]:checked') as HTMLInputElement
    
        if (selectedToken) {
            dispatch(setSelectedToken(selectedToken.value))
            closeModal()
        }
    }
    
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-button" onClick={closeModal}>&times;</button>
                <div className="modal-content">
                    <p>Select a token to know its price:</p>
                    <form onSubmit={handleSubmit}>
                        <div className="radio-options">
                            {cryptoData?.map((token: tokenObj, index: number) => (
                                <label key={index}>
                                    <input 
                                        type="radio" 
                                        name="cryptoToken" 
                                        value={token?.code}
                                    />
                                    {token?.code}
                                </label>
                            ))}   
                        </div>
                        <div className="button-group">
                            <button className="button" style={{marginRight: "6px"}} type="submit">Save</button>
                            <button className="button" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal
