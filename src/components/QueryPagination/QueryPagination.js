import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import Simple from './types/Simple'
import Advanced from './types/Advanced'
import LoadMore from './types/LoadMore'
import Links from './types/Links'
import InfiniteLoading from './types/InfiniteLoading'
import { ADVANCED, INFINITE_LOADING, LINKS, LOAD_MORE, SIMPLE } from '../../constants'
import { isFunctionComponent } from '../../utils/detectReactObject'
import { useStore } from '../../context'

function QueryPagination(props) {
  const type = useStore('pagination')

  const Component = isFunctionComponent(type) ? type : get(QueryPagination.types, type, Simple)

  return <Component {...props} />
}

QueryPagination.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

QueryPagination.types = {
  [SIMPLE]: Simple,
  [LINKS]: Links,
  [ADVANCED]: Advanced,
  [LOAD_MORE]: LoadMore,
  [INFINITE_LOADING]: InfiniteLoading,
}

export default QueryPagination;