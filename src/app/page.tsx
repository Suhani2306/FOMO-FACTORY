"use client"
import { useEffect } from "react"
import Modal from "../components/modal"
import Table from "../components/table"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setTableLoading, setCoins, setCryptoCodes, setModalOpen } from "../redux/actions"
import { coinState } from "../redux/types"

const Home = () => {
  const dispatch = useDispatch()
  const { loading, data: tableData, isModalOpen, token } = useSelector((state: coinState) => state.coin)

  const fetchCoinsData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/fetch-coin")
      dispatch(setCryptoCodes(response?.data?.cryptoData))
    } catch (error) {
      console.error(error, "Failed to fetch crypto data")
    }
  }

  const fetchIndividualCoinData = async (token: string) => {
    try {
      dispatch(setTableLoading(true))
      const response = await axios.get(`http://localhost:8080/crypto/${token}`)
      dispatch(setCoins(response?.data))
      dispatch(setTableLoading(false))
    } catch(error) {
      console.error(error, "Failed to fetch individual crypto data")
    }
  }

  useEffect(() => {
    fetchCoinsData()
    fetchIndividualCoinData(token)
    const intervalId = setInterval(() => {
      fetchCoinsData()
      fetchIndividualCoinData(token)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [token])

  const openModal = () => {
    dispatch(setModalOpen(true))
  }

  const closeModal = () => {
    dispatch(setModalOpen(false))
  }

  return (
    <div>
      <button className="button" onClick={openModal}>Choose Another Token</button>
      <Table data={tableData} loading={loading} />
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  )
}

export default Home