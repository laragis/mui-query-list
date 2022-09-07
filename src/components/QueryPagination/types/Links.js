import React from 'react'
import { Button, List } from '@mui/material'
import { usePagination } from '@mui/lab'
import { filter, includes } from 'lodash'
import { useStore } from '../../../context'

function Links({ meta }) {
  const setPage = useStore('setPage')

  const { items } = usePagination({
    count: meta?.last_page,
    onChange: (event, value) => setPage(value),
  })

  const filteredItems = filter(items, (item) =>
    includes(['previous', 'next'], item.type)
  )

  return (
    <nav>
      <List>
        {filteredItems.map(({ page, type, selected, ...item }, index) => {
          return (
            <Button type="button" {...item} key={index}>
              {type}
            </Button>
          )
        })}
      </List>
    </nav>
  )
}

export default Links