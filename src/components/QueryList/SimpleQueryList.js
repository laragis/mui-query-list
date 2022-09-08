import React, { Fragment, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useStore } from '../../context'
import { useInit } from '../../hooks'
import fetchData from '../../utils/fetchData'
import QueryPagination from '../QueryPagination/QueryPagination'
import { Alert, LinearProgress, Stack } from '@mui/material'
import { useUpdateEffect } from 'react-use'
import $ from 'jquery'
import { get } from 'lodash'

function SimpleQueryList(props) {
  const { renderListItem: ListItem, renderList: List, onRowClicked } = props

  const [queryKey, selected, setSelected] = useStore('queryKey, selected, setSelected')

  const queryInfo = useQuery(queryKey, fetchData, {
    keepPreviousData: true,
    staleTime: 5000,
  })

  const { isLoading, isSuccess, isFetching, error, data } = queryInfo

  useInit(props)

  useUpdateEffect(() => {
    $(props.scrollTarget || window).scrollTop(0)
  }, [data])

  const firstRow = useMemo(() => get(data, 'data.0'), [get(data, 'data.0')])

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
          <List meta={data?.meta} firstRow={firstRow}>
            {data?.data?.map((item, key) => {
              let serial = data.meta.from + key,
                  listItemProps = {
                  key,
                  serial: data.meta.from + key,
                  data: item,
                  meta: data?.meta,
                  onRowClicked: (e, data) => {
                    let itemSelected = selected === serial ? false : serial
                    setSelected(itemSelected)
                    onRowClicked(e, { item, selected: itemSelected })
                  },
              }

              return <ListItem {...listItemProps}/>
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