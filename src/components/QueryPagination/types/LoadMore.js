import { Button } from '@mui/material'

function LoadMore({ queryInfo }) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = queryInfo || {}

  if (!hasNextPage) return 'Nothing more to load'

  return (
    <Button
      variant="outlined"
      onClick={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
    >
      {isFetchingNextPage ? 'Loading more...' : 'Load More'}
    </Button>
  )
}

export default LoadMore
