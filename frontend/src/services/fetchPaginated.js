import { token } from "@/auth/auth"

const API_URL = import.meta.env.VITE_API_URL

const delay = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms))

export const fetchPaginated = async ({
  endpoint,
  pageParam = 1,
  pageSize = 10,
}) => {
  await delay(300)

  const res = await fetch(
    `${API_URL}/${endpoint}/?page=${pageParam}&size=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Error en la petición")
  }

  const data = await res.json()

  const nextCursor = data.page >= data.pages ? undefined : data.page + 1

  return {
    items: data.items,
    nextCursor,
    total: data.total,
  }
}
