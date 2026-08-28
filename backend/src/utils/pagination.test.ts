import { describe, expect, it } from 'vitest'
import { buildPagination, getPaginationParams } from './pagination.js'

describe('getPaginationParams', () => {
  it('defaults to page 1 and limit 10 when nothing is provided', () => {
    expect(getPaginationParams()).toEqual({ currentPage: 1, currentLimit: 10, offset: 0 })
  })

  it('parses string page/limit query params and computes the offset', () => {
    expect(getPaginationParams({ page: '3', limit: '5' })).toEqual({
      currentPage: 3,
      currentLimit: 5,
      offset: 10,
    })
  })

  it('falls back to the minimum valid value for invalid input', () => {
    expect(getPaginationParams({ page: '-5', limit: 'abc' })).toEqual({
      currentPage: 1,
      currentLimit: 10,
      offset: 0,
    })
  })
})

describe('buildPagination', () => {
  it('computes totalPages and currentItems from the query result', () => {
    expect(
      buildPagination({ count: 22, rows: new Array(10).fill(0), currentPage: 2, currentLimit: 10 })
    ).toEqual({
      totalItems: 22,
      totalPages: 3,
      currentPage: 2,
      limit: 10,
      currentItems: 10,
    })
  })
})
