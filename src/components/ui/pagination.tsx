import React, { memo, useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage = 1, totalPages = 5, onPageChange }: PaginationProps) {
  const pageNumbers = useMemo(() =>  Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);
  return (
    <div className="flex items-center space-x-2 mt-4 overflow-x-auto">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-gray-200 text-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md ${
            currentPage === number ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-gray-200 text-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default memo(Pagination);