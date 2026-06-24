import { useState } from 'react'

export const usePagination = (initialPage: number = 1, pageSize: number = 20) => {
  const [page, setPage] = useState(initialPage)

  const goToPage = (newPage: number) => {
    setPage(Math.max(1, newPage))
  }

  const nextPage = () => {
    setPage((p) => p + 1)
  }

  const prevPage = () => {
    setPage((p) => Math.max(1, p - 1))
  }

  const goToFirstPage = () => {
    setPage(1)
  }

  return { page, pageSize, goToPage, nextPage, prevPage, goToFirstPage }
}
