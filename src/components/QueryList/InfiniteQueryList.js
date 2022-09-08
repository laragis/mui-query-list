import { useInfiniteQuery } from '@tanstack/react-query'
import { InView } from 'react-intersection-observer'
import { get, has, keys, omit } from 'lodash'
import React, { forwardRef, Fragment, useEffect, useMemo } from 'react'
import { INFINITE_LOADING } from '../../constants'
import { Box, Button, LinearProgress, Stack } from '@mui/material'
import { useInit } from '../../hooks'
import { useStore } from '../../context'
import fetchData from '../../utils/fetchData'
import QueryPagination from '../QueryPagination/QueryPagination'
import { scrollTo } from 'scroll-js'
import ListItem from '../../utils/renderListItem'

const InfiniteQueryList = forwardRef((props, ref) => {
  const { renderListItem: ListItem, renderList: List, wrapperListItem, onRowClicked } = props

  const [queryKey, selected, setSelected] = useStore('queryKey, selected, setSelected')

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

  const firstRow = useMemo(() => get(data, 'pages.0.data.0'), [get(data, 'pages.0.data.0')])

  useEffect(() => {
    console.log(ref)
  }, [])

  return (
    <div>
      {status === 'loading' ? (
        <LinearProgress className="w-full" color="primary" />
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

          <List meta={data?.meta} firstRow={firstRow} aaa={123}>
            {data.pages?.map((page, pageIndex) => (
              <Fragment key={pageIndex}>
                {page.data.map((item, itemIndex) => {
                  let serial = itemIndex + page.meta.from,
                    hasInView = (
                      props.pagination === INFINITE_LOADING &&
                      props.threshold &&
                      props.threshold > 0 &&
                      props.threshold <= page.data.length &&
                      page.data.length - props.threshold === itemIndex + 1
                    ),
                    onChange = (inView, entry) => handleNextPage(inView, entry, pageIndex),
                    wrapperListItemProps = {
                      key: itemIndex,
                      component: hasInView ? InView : Box,
                      onChange
                    },
                    listItemProps = {
                      serial,
                      data: item,
                      meta: page.meta,
                      onRowClicked: (e, data) => {
                        let itemSelected = selected === serial ? false : serial

                        setSelected(itemSelected)
                        onRowClicked(e, { item: data, selected: itemSelected })
                      },
                      selected: serial === selected,
                      setSelected
                    }

                  if(!wrapperListItem) return <ListItem key={itemIndex} {...listItemProps} />

                  return (
                    <Box {...wrapperListItemProps}>
                      <ListItem {...listItemProps} />
                    </Box>
                  )
                })}
              </Fragment>
            ))}
          </List>



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
              <LinearProgress className="w-full" color="primary" />
            </Stack>
          ) : null}
        </>
      )}
    </div>
  )
})

InfiniteQueryList.defaultProps = {
  wrapperListItem: true
}

export default InfiniteQueryList