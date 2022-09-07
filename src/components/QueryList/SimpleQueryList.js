import React, {Fragment} from 'react'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '../../context'
import { useInit } from '../../hooks'
import fetchData from '../../utils/fetchData'
import QueryPagination from '../QueryPagination/QueryPagination'
import { Alert, LinearProgress, Stack } from '@mui/material'
import { useUpdateEffect } from 'react-use'
import $ from 'jquery'

function SimpleQueryList(props) {
  const { renderListItem: ListItem, renderList: List } = props

  const queryKey = useStore('queryKey')

  const queryInfo = useQuery(queryKey, fetchData, {
    keepPreviousData: true,
    staleTime: 5000,
  })

  const { isLoading, isSuccess, isFetching, error, data } = queryInfo

  useInit(props)

  useUpdateEffect(() => {
    $(props.scrollTarget || window).scrollTop(0)
  }, [data])

  return (
    <Stack spacing={1.5}>
      {isLoading && <LinearProgress />}
      {error?.message && (
        <Alert variant="filled" severity="error">
          {error?.message}
        </Alert>
      )}

      {isSuccess && (
        <>
          <List meta={data?.meta}>
            {data?.data?.map((item, k) => {
              return (
                <ListItem
                  key={k}
                  serial={data.meta.from + k}
                  data={item}
                  meta={data?.meta}
                />
              )
            })}
          </List>
          {isFetching && <LinearProgress />}
        </>
      )}

      {data?.meta && (
        <QueryPagination
          meta={data.meta}
          size={props.perPage}
          sizes={props.sizes}
        />
      )}
    </Stack>
  )
}

export default SimpleQueryList