import axios from "axios"
import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

const useFetchAll = (endpoint, dependencies = []) => {
  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [total, setTotal] = useState()
  const [loading, setLoading] = useState(true)
  const [isRefetching, setIsRefetching] = useState(false)

  const fetchAll = async () => {
    let allData = []
    let currentPage = 1
    const pageSize = 100

    try {
      while (true) {
        const response = await axios.get(`${API_URL}/${endpoint}?page=${currentPage}&size=${pageSize}`)
        let items = []
        let totalItems = 0
        let pages = 1

        // Verificamos si la respuesta es un array directo (sin paginación)
        if (Array.isArray(response.data)) {
          items = response.data
          totalItems = items.length
          pages = 1
        } else {
          items = response.data.items || []
          totalItems = response.data.total || items.length
          pages = response.data.pages || 1
        }

        console.log(`[useFetchAll] Página ${currentPage} recibida:`, items)
        setTotal(totalItems)
        allData = [...allData, ...items]

        if (currentPage >= pages) break
        currentPage++

      }

      setData(allData)
    } catch (err) {
      setError(err)

      if (err.response?.status === 401 || err.response?.status === 403) {
        console.log("Unauthorized or forbidden access. Please check your credentials or permissions.")
      }
    } finally {
      setLoading(false)
      setIsRefetching(false)
    }

    return allData
  }

  useEffect(() => {
    if (endpoint) {
      fetchAll()
    } else {
      setLoading(false)
    }
  }, [endpoint, ...dependencies])

  const refetch = () => {
    if (isRefetching) return
    setIsRefetching(true)
    fetchAll()
  }

  return { data, error, loading, refetch, isRefetching, total }
}

export default useFetchAll
