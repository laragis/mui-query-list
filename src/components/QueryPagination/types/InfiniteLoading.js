import React from 'react'
import { Button, LinearProgress, Stack } from '@mui/material'
import { InView } from 'react-intersection-observer'

function InfiniteLoading({ queryInfo, data, threshold }) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = queryInfo || {}

  const handleNextPage = (inView) => inView && hasNextPage && fetchNextPage()

  if (!hasNextPage) return ''

  if (isFetchingNextPage)
    return <LinearProgress className="w-full mt-12" color="secondary" />

  if (threshold) return null

  return (
    <Stack alignItems="center">
      <InView
        as={Button}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        onChange={handleNextPage}
      >
        Load More
      </InView>
    </Stack>
  )
}

export default InfiniteLoading