import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useViewOptions(lions) {
  const [searchParams, setSearchParams] = useSearchParams()

  const partFilter = searchParams.get('part') || '전체'
  const sortBy = searchParams.get('sort') || '최신추가순'
  const searchQuery = searchParams.get('q') || ''

  const updateParams = (key, value, defaultVal) => {
    const next = new URLSearchParams(searchParams)
    if (value === defaultVal || value === '') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next)
  }

  const setPartFilter = (v) => updateParams('part', v, '전체')
  const setSortBy = (v) => updateParams('sort', v, '최신추가순')
  const setSearchQuery = (v) => updateParams('q', v, '')

  const filteredLions = useMemo(() => {
    let result = [...lions]
    if (partFilter !== '전체') {
      result = result.filter((l) => l.part === partFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((l) => l.name.toLowerCase().includes(q))
    }
    if (sortBy === '이름순') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    return result
  }, [lions, partFilter, sortBy, searchQuery])

  return {
    partFilter, setPartFilter,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    filteredLions,
  }
}
