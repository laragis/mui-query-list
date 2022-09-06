import {
  MenuItem,
  Pagination as MuiPagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useMemo } from 'react'
import { useStore } from '../../../context'
import { flow, sortBy, uniq } from 'lodash'

function Advanced({ meta, sizes, size }) {
  const [perPage, setPerPage, setPage] = useStore(
    'perPage, setPerPage, setPage'
  )
  const lastPage = meta?.last_page
  const page = meta?.current_page

  const onChange = (event, value) => setPage(value)

  const handleGoto = (event) => {
    let inputPage = parseInt(event.target.value)

    if (
      (event.key === 'Enter' || event.type === 'blur') &&
      inputPage > 0 &&
      inputPage !== page
    ) {
      if (inputPage <= lastPage) {
        setPage(inputPage)
      } else {
        alert(`Not found page ${inputPage}`)
      }
    }
  }

  const handleSizeChange = (event) => setPerPage(parseInt(event.target.value))

  const sizeList = useMemo(
    () => flow([uniq, sortBy])(sizes.concat(size)),
    [sizes, size]
  )

  console.log(sizeList)

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <MuiPagination
        variant="outlined"
        showFirstButton
        showLastButton
        shape="rounded"
        onChange={onChange}
        count={lastPage}
        page={page}
      />
      <TextField
        select
        label="Size"
        value={perPage}
        onChange={handleSizeChange}
        size="small"
        style={{ width: 110 }}
      >
        {sizeList.map((value, k) => (
          <MenuItem key={k} value={value} defaultValue>
            {value} / page
          </MenuItem>
        ))}
      </TextField>
      <Typography>Go to</Typography>
      <TextField
        label="Page"
        variant="outlined"
        onKeyUp={handleGoto}
        onBlur={handleGoto}
        size="small"
        type="number"
        style={{ width: 85 }}
      />
    </Stack>
  )
}

Advanced.defaultProps = {
  sizes: [10, 20, 50, 100, 200]
}

export default Advanced