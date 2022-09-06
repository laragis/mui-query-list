import { useQueryClient } from '@tanstack/react-query'
import { useStore } from './context'
import { useCallback, useEffect, useRef } from 'react'
import { debounce, isEmpty } from 'lodash'
import { useRafState } from 'react-use'
import $ from 'jquery'

export const useInit = (props) => {
  const queryClient = useQueryClient()

  const [queryKey, init] = useStore('queryKey, init')

  useEffect(() => {
    !isEmpty(queryKey) && queryClient.cancelQueries(queryKey)

    init(props)
  }, [props.queryKey, props.url, props.page, props.perPage])
}

export const useScrollList = ({scrollTarget, scrollIndex, scrollTop, wait = 300}) => {
  const ref = useRef()

  const [position, setPostion] = useRafState({
    x: 0,
    y: 0,
  });

  const handler = useCallback((event) => {
    let positionKeys = scrollTarget ? {x: 'scrollLeft', y: 'scrollTop'} : {x: 'pageXOffset', y: 'pageYOffset'}

    setPostion({
      x:  ref.current[positionKeys.x],
      y:  ref.current[positionKeys.y],
    });
  }, [scrollTarget])

  useEffect(() => {
    ref.current = scrollTarget ? document.querySelector(scrollTarget) : window

    ref.current.addEventListener('scroll', debounce(handler, wait));

    return () => {
      ref.current.removeEventListener('scroll', handler);
    }

  }, [])


  useEffect(() => {
    // console.log($(`#item-${scrollIndex}`).get(0), scrollIndex);
    // let element = $(`#item-${scrollIndex}`).get(0)
    // if(element) scrollIntoView(element, $(scrollTarget).get(0))

    setTimeout(() => {
      console.log(scrollTarget);
      scrollTo($(scrollTarget).get(0))
    }, 1000)
    // console.log(scrollIndex);
  }, [scrollIndex])

  return position
}