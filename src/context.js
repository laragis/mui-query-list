import create from 'zustand-store-addons'
import createContext from 'zustand/context'
import shallow from 'zustand/shallow'
import { SIMPLE } from './constants'
import produce from 'immer'
import { get } from 'lodash'

export const createStore = () => create((set, get) => ({
  pagination: SIMPLE,
  queryKey: [],

  init: (props) => {
    let queryKey = [
      props.queryKey,
      {
        url: props.url,
        // pagination: props.pagination,
        // params: {
        //   page: props.page > 0 ? props.page : 1,
        //   perPage: props.perPage > 0 ? props.perPage : 20,
        // }
      }
    ]

    console.log(queryKey)

    set({
      queryKey,
      pagination: props.pagination,
      selected: false
    })
  },

  selected: false,
  setSelected: selected => set({selected}),

  setPage: (page) => set(
    produce((state) => {
      state.queryKey[1].params.page = page
    })
  ),

  setPerPage: (perPage) => set(
    produce((state) => {
      state.queryKey[1].params.perPage = perPage
    })
  ),
}), {
  computed: {
    perPage(){
      return get(this.queryKey, `1.params.perPage`)
    },

    page(){
      return get(this.queryKey, `1.params.page`)
    }
  }
})


const context = createContext()

export const Provider = context.Provider

export const useStore = (selector, equalityFn) => {
  return context.useStore(...stateHook(selector, equalityFn))
}

const stateHook = (selector, equalityFn) => {
  if (typeof selector === 'string') {
    if (selector.indexOf(',') !== -1) {
      const props = selector.split(',').map(part => part.trim())
      return [state => props.map(prop => state[prop]), shallow]
    }
    return [state => state[selector], equalityFn]
  }
  return [selector, equalityFn]
}


// import axios from "axios";
// import { defaultTo, includes, isString, mapKeys, mapValues } from 'lodash'
// import { SIMPLE } from '../constants'
//
// // const requestWatchers = mapValues(mapKeys(['page', 'perPage']), (name) => function(newValue, preValue){
// //   console.log(name, newValue, preValue);
// //   this.get().fetchData()
// // })
//
// const defaultPage = 1
// const defaultPerPage = 10
//
// const useQueryStore = create(
//   (set, get) => ({
//     loading: false,
//     setLoading: (loading) => set({ loading }),
//
//     url: null,
//     setUrl: (url) => set({ url }),
//
//     pagination: SIMPLE,
//     setPagination: (pagination) => set({ pagination }),
//
//     page: defaultPage,
//     setPage: (payload) => {
//       let page = parseInt(payload)
//
//       if(page > 0) set({ page })
//       if(isNaN(page)) set({ page: defaultPage })
//     },
//
//     perPage: defaultPerPage,
//     setPerPage: (payload) => {
//       let perPage = parseInt(payload)
//
//       if(perPage > 0) set({ perPage })
//       if(isNaN(perPage)) set({ perPage: defaultPerPage })
//     },
//
//     lastPage: null,
//
//     data: [],
//     setData: (data) => set({ data }),
//
//     meta: null,
//     links: null,
//     setResponse: (resp) => {
//       let meta = resp.meta,
//           data = resp.data
//
//       if(includes(['load-more', 'infinite-loading'], get().pagination)) {
//         meta.from = 1
//         data = get().data.concat(data)
//       }
//
//       set({
//         meta,
//         links: resp.links,
//         data,
//         lastPage: resp.meta.last_page
//       })
//     },
//
//     init: (props) => {
//       let page = defaultTo(props.page, 1),
//         perPage = props.perPage,
//         pagination = defaultTo(props.pagination, 'simple'),
//         initPage = page,
//         initPerPage = perPage
//
//       if (pagination === 'load-more' && page > 1) {
//         initPage = 1
//         initPerPage = perPage * page
//       }
//
//       set({
//         url: props.url,
//         page,
//         perPage,
//         pagination
//       })
//
//       get().fetchData({
//         page: initPage,
//         perPage: initPerPage
//       })
//     },
//
//     reset: () => {
//       set({
//         page: 1,
//         data: [],
//       })
//     },
//
//     fetchData: async (params) => {
//       get().setLoading(true)
//
//       try {
//         const response = await axios(get().getRequest(params)).then(resp => resp.data)
//         get().setResponse(response)
//       } catch (err){
//         console.error(err);
//       } finally {
//         get().setLoading(false)
//       }
//     },
//
//     handleSuccess: null,
//
//     setHandleSuccess: (handleSuccess) => set({handleSuccess}),
//
//     nextPage: () => {
//       get().hasNextPage && get().setPage(get().page+1)
//     },
//
//     getRequest: (params = {}) => {
//       const { page = get().page, perPage = get().perPage} = params
//
//       if(isString(get().url)) {
//         return {
//           method: 'get',
//           url: get().url,
//           params: {
//             page,
//             perPage
//           }
//         }
//       }
//
//       return get().url
//     },
//   }),
//   {
//     computed: {
//
//       response: function() {
//         return {
//           meta: this.meta,
//           links: this.links,
//           data: this.data,
//         }
//       },
//
//       hasNextPage: function(){
//         return this.page <= this.lastPage
//       },
//
//       hasGoTo: function(){
//         return this.page <= this.lastPage
//       }
//     },
//     watchers: {
//
//     },
//     middleware: [],
//     settings: {},
//   }
// )
//
// export default useQueryStore