import { useState, useMemo } from 'react'

export function useViewOptions(lions) {
  const [partFilter, setPartFilter] = useState('전체')
  const [sortBy, setSortBy] = useState('최신추가순')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLions = useMemo(() => {
    let result = [...lions]

    // 파트 필터
    if (partFilter !== '전체') {
      result = result.filter((l) => l.part === partFilter)
    }

    // 이름 검색 (실시간)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((l) => l.name.toLowerCase().includes(q))
    }

    // 정렬
    if (sortBy === '이름순') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }
    // 최신추가순은 배열 순서(기본)

    return result
  }, [lions, partFilter, sortBy, searchQuery])

  return {
    partFilter, setPartFilter,
    sortBy, setSortBy,
    searchQuery, setSearchQuery,
    filteredLions,
  }
}
