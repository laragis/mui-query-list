import { useInfiniteQuery } from '@tanstack/react-query'
import { InView } from 'react-intersection-observer'
import { has } from 'lodash'
import React, { Fragment } from 'react'
import { INFINITE_LOADING } from '../../constants'
import { Box, Button, LinearProgress, Stack } from '@mui/material'
import { useInit } from '../../hooks'
import { useStore } from '../../context'
import fetchData from '../../utils/fetchData'
import QueryPagination from '../QueryPagination/QueryPagination'
import { scrollTo } from 'scroll-js'

function InfiniteQueryList(props) {
  const { renderListItem: ListItem, renderList: List } = props

  const queryKey = useStore('queryKey')

  const queryInfo = useInfiniteQuery(queryKey, fetchData, {
    getPreviousPageParam: (firstPage, allPages) => {
      let previousPage = firstPage.meta.current_page - 1
      return previousPage > 0 ? previousPage : undefined
    },
    getNextPageParam: (lastPage, allPages) => {
      let nextPage = lastPage.meta.current_page + 1
      return nextPage <= lastPage.meta.last_page ? nextPage : undefined
    },
  })

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = queryInfo

  useInit(props)

  const handleNextPage = (inView, entry, index) => {
    if (inView && hasNextPage && !has(data, ['pages', index + 1])) {
      fetchNextPage()
    }
  }

  const onScrollTop = () => {
    scrollTo(document.querySelector(props.scrollTarget) || window, {
      top: 0,
      duration: 200,
    })
  }

  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {props.page > 1 && (
            <Button
              className="mb-6"
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? 'Loading more...'
                : hasPreviousPage
                ? 'Load Older'
                : 'Nothing more to load'}
            </Button>
          )}

          {data.pages?.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.map((item, itemIndex) => {
                let Component = List,
                  serial = itemIndex + page.meta.from

                if (
                  props.pagination === INFINITE_LOADING &&
                  props.threshold &&
                  props.threshold > 0 &&
                  props.threshold <= page.data.length &&
                  page.data.length - props.threshold === itemIndex + 1
                ) {
                  Component = InView
                }

                return (
                  <Box
                    key={itemIndex}
                    component={Component}
                    onChange={(inView, entry) =>
                      handleNextPage(inView, entry, pageIndex)
                    }
                  >
                    <ListItem serial={serial} data={item} meta={page.meta} />
                  </Box>
                )
              })}
            </Fragment>
          ))}

          {props.backToTop && props.scrollPosition?.y > 400 && (
            <Button
              onClick={onScrollTop}
              className="fixed"
              sx={{ bottom: 90, right: 100, zIndex: 100 }}
              variant="outlined"
            >
              <i className="fa-solid fa-arrow-up-to-line mr-10"></i>
              Back to top
            </Button>
          )}

          <Stack direction="row" justifyContent="center">
            <QueryPagination
              queryInfo={queryInfo}
              data={data}
              threshold={props.threshold}
            />
          </Stack>

          {isFetching && !isFetchingNextPage ? (
            <Stack className="mt-6" alignItems="center" spacing={1}>
              <p className="font-semibold">Background Updating...</p>
              <LinearProgress className="w-full" color="secondary" />
            </Stack>
          ) : null}
        </>
      )}
    </div>
  )
}

export default InfiniteQueryList