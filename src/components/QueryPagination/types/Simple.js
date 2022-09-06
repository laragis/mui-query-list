import { Pagination as MuiPagination } from '@mui/material'
import { useStore } from '../../../context'

function Simple({ meta }) {
  const setPage = useStore('setPage')

  const onChange = (event, value) => setPage(value)

  return (
    <MuiPagination
      variant="outlined"
      showFirstButton
      showLastButton
      onChange={onChange}
      count={meta?.last_page}
      page={meta?.current_page}
    />
  )
}

export default Simple