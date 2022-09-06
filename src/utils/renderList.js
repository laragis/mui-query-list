import formatNumber from './formatNumber'
import { Divider, Stack } from '@mui/material'

function renderList({ children, meta, ...props }) {
  return (
    <Stack spacing={1}>
      <div>
        Kết quả từ {formatNumber(meta.from)}-{formatNumber(meta.to)} trong số{' '}
        {formatNumber(meta.total)}
      </div>

      <Stack
        spacing={2}
        divider={<Divider orientation="horizontal" />}
        sx={{ py: 2 }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default renderList