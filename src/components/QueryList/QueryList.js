import { includes } from 'lodash'
import { INFINITE_LOADING, LOAD_MORE, SIMPLE } from '../../constants'
import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import InfiniteQueryList from './InfiniteQueryList'
import SimpleQueryList from './SimpleQueryList'
import { createStore, Provider } from '../../context'
import { useScrollList } from '../../hooks'
import renderListItem from '../../utils/renderListItem'
import renderList from '../../utils/renderList'

const QueryList = forwardRef((props, ref) => {
  const scrollPosition = useScrollList(props)

  const queryListProps = {
    ...props,
    scrollPosition
  }

  return (
    <Provider createStore={createStore}>
      {includes([LOAD_MORE, INFINITE_LOADING], props.pagination) ? (
        <InfiniteQueryList ref={ref} {...queryListProps} />
      ) : (
        <SimpleQueryList ref={ref} {...queryListProps} />
      )}
    </Provider>
  )
})

QueryList.propTypes = {
  queryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  pagination: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  perPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  select: PropTypes.func,
  threshold: PropTypes.number,

  scrollTop: PropTypes.bool,
  scrollTarget: PropTypes.string,
}

QueryList.defaultProps = {
  pagination: SIMPLE,
  page: 1,
  perPage: 10,
  renderListItem: renderListItem,
  renderList: renderList,
  backToTop: false,
  onRowClicked: () => {}
}

export default QueryList
