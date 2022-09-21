import{get as e,debounce as t,isEmpty as r,isString as a,isUndefined as n,flow as o,uniq as l,sortBy as i,filter as s,includes as c,has as m}from"lodash";import u,{useRef as d,useCallback as p,useEffect as g,useMemo as f,isValidElement as y,forwardRef as h,Fragment as v}from"react";import E from"prop-types";import{useQueryClient as P,useInfiniteQuery as w,useQuery as k}from"@tanstack/react-query";import{InView as x}from"react-intersection-observer";import{Pagination as b,Stack as L,TextField as N,MenuItem as T,Typography as q,Button as C,List as O,LinearProgress as I,Box as K,Alert as z,Divider as R}from"@mui/material";import S from"zustand-store-addons";import j from"zustand/context";import F from"zustand/shallow";import _ from"immer";import{useRafState as B,useUpdateEffect as M}from"react-use";import Q from"jquery";import U from"axios";import{usePagination as A}from"@mui/lab";import{scrollTo as D}from"scroll-js";import G from"numeral";const J="simple",V="advanced",X="load-more",Y="links",$="infinite-loading",H={simple:"Simple",links:"Links",advanced:"Advanced","load-more":"Load More","infinite-loading":"Infinite Loading"};function W(){return W=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},W.apply(this,arguments)}function Z(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t.indexOf(r=o[a])>=0||(n[r]=e[r]);return n}const ee=()=>S((e,t)=>({pagination:"simple",queryKey:[],init:t=>{let r=[t.queryKey,{url:t.url}];console.log(r),e({queryKey:r,pagination:t.pagination,selected:!1})},selected:!1,setSelected:t=>e({selected:t}),setPage:t=>e(_(e=>{e.queryKey[1].params.page=t})),setPerPage:t=>e(_(e=>{e.queryKey[1].params.perPage=t}))}),{computed:{perPage(){return e(this.queryKey,"1.params.perPage")},page(){return e(this.queryKey,"1.params.page")}}}),te=j(),re=te.Provider,ae=(e,t)=>te.useStore(...ne(e,t)),ne=(e,t)=>{if("string"==typeof e){if(-1!==e.indexOf(",")){const t=e.split(",").map(e=>e.trim());return[e=>t.map(t=>e[t]),F]}return[t=>t[e],t]}return[e,t]},oe=e=>{const t=P(),[a,n]=ae("queryKey, init");g(()=>{!r(a)&&t.cancelQueries(a),n(e)},[JSON.stringify(e.queryKey),e.url,e.page,e.perPage])},le=["url","params"];var ie=async({pageParam:e,queryKey:t,signal:r})=>{const o=t[1],{url:l,params:i}=o;Z(o,le);const s=a(l)?W({method:"get",url:l},i):W({params:W({},i,null==l?void 0:l.params)},l);return n(e)||(s.params.page=e),(await U(W({signal:r},s))).data};function se({meta:e}){const t=ae("setPage");/*#__PURE__*/return u.createElement(b,{variant:"outlined",showFirstButton:!0,showLastButton:!0,onChange:(e,r)=>t(r),count:null==e?void 0:e.last_page,page:null==e?void 0:e.current_page})}function ce({meta:e,sizes:t,size:r}){const[a,n,s]=ae("perPage, setPerPage, setPage"),c=null==e?void 0:e.last_page,m=null==e?void 0:e.current_page,d=e=>{let t=parseInt(e.target.value);("Enter"===e.key||"blur"===e.type)&&t>0&&t!==m&&(t<=c?s(t):alert(`Not found page ${t}`))},p=f(()=>o([l,i])(t.concat(r)),[t,r]);return console.log(p),/*#__PURE__*/u.createElement(L,{direction:"row",spacing:2,alignItems:"center",justifyContent:"center"},/*#__PURE__*/u.createElement(b,{variant:"outlined",showFirstButton:!0,showLastButton:!0,shape:"rounded",onChange:(e,t)=>s(t),count:c,page:m}),/*#__PURE__*/u.createElement(N,{select:!0,label:"Size",value:a,onChange:e=>n(parseInt(e.target.value)),size:"small",style:{width:110}},p.map((e,t)=>/*#__PURE__*/u.createElement(T,{key:t,value:e,defaultValue:!0},e," / page"))),/*#__PURE__*/u.createElement(q,null,"Go to"),/*#__PURE__*/u.createElement(N,{label:"Page",variant:"outlined",onKeyUp:d,onBlur:d,size:"small",type:"number",style:{width:85}}))}ce.defaultProps={sizes:[10,20,50,100,200]};const me=["page","type","selected"];function ue(t){const r=ae("pagination"),a="function"==typeof(n=r)&&y(n())?r:e(ue.types,r,se);var n;/*#__PURE__*/return u.createElement(a,t)}ue.propTypes={type:E.oneOfType([E.string,E.func])},ue.types={simple:se,links:function({meta:e}){const t=ae("setPage"),{items:r}=A({count:null==e?void 0:e.last_page,onChange:(e,r)=>t(r)}),a=s(r,e=>c(["previous","next"],e.type));/*#__PURE__*/return u.createElement("nav",null,/*#__PURE__*/u.createElement(O,null,a.map((e,t)=>{let{type:r}=e,a=Z(e,me);/*#__PURE__*/return u.createElement(C,W({type:"button"},a,{key:t}),r)})))},advanced:ce,"load-more":function({queryInfo:e}){const{isFetchingNextPage:t,fetchNextPage:r,hasNextPage:a}=e||{};return a?/*#__PURE__*/u.createElement(C,{variant:"outlined",onClick:()=>r(),disabled:!a||t},t?"Loading more...":"Load More"):"Nothing more to load"},"infinite-loading":function({queryInfo:e,threshold:t}){const{isFetchingNextPage:r,fetchNextPage:a,hasNextPage:n}=e||{};return n?r?/*#__PURE__*/u.createElement(I,{className:"w-full mt-12",color:"secondary"}):t?null:/*#__PURE__*/u.createElement(L,{alignItems:"center"},/*#__PURE__*/u.createElement(x,{as:C,onClick:()=>a(),disabled:!n||r,onChange:e=>e&&n&&a()},"Load More")):"Nothing more to load"}};const de=h((t,r)=>{var a,n;const{renderListItem:o,renderList:l,wrapperListItem:i,onRowClicked:s}=t,[c,d,p]=ae("queryKey, selected, setSelected"),y=w(c,ie,{getPreviousPageParam:(e,t)=>{let r=e.meta.current_page-1;return r>0?r:void 0},getNextPageParam:(e,t)=>{let r=e.meta.current_page+1;return r<=e.meta.last_page?r:void 0}}),{status:h,data:E,error:P,isFetching:k,isFetchingNextPage:b,isFetchingPreviousPage:N,fetchNextPage:T,fetchPreviousPage:q,hasNextPage:O,hasPreviousPage:z}=y;oe(t);const R=f(()=>e(E,"pages.0.data.0"),[e(E,"pages.0.data.0")]);return g(()=>{},[]),/*#__PURE__*/u.createElement("div",null,"loading"===h?/*#__PURE__*/u.createElement(I,{className:"w-full",color:"primary"}):"error"===h?/*#__PURE__*/u.createElement("span",null,"Error: ",P.message):/*#__PURE__*/u.createElement(v,null,t.page>1&&/*#__PURE__*/u.createElement(C,{className:"mb-6",onClick:()=>q(),disabled:!z||N},N?"Loading more...":z?"Load Older":"Nothing more to load"),/*#__PURE__*/u.createElement(l,{meta:null==E?void 0:E.meta,firstRow:R,aaa:123},null==(a=E.pages)?void 0:a.map((e,r)=>/*#__PURE__*/u.createElement(v,{key:r},e.data.map((a,n)=>{let l=n+e.meta.from,c={serial:l,data:a,meta:e.meta,onRowClicked:(e,t)=>{let r=d!==l&&l;p(r),s(e,{item:t,selected:r})},selected:l===d,setSelected:p};return i?/*#__PURE__*/u.createElement(K,{key:n,component:"infinite-loading"===t.pagination&&t.threshold&&t.threshold>0&&t.threshold<=e.data.length&&e.data.length-t.threshold===n+1?x:K,onChange:(e,t)=>((e,t,r)=>{e&&O&&!m(E,["pages",r+1])&&T()})(e,0,r)},/*#__PURE__*/u.createElement(o,c)):/*#__PURE__*/u.createElement(o,W({key:n},c))})))),t.backToTop&&(null==(n=t.scrollPosition)?void 0:n.y)>400&&/*#__PURE__*/u.createElement(C,{onClick:()=>{D(document.querySelector(t.scrollTarget)||window,{top:0,duration:200})},className:"fixed",sx:{bottom:90,right:100,zIndex:100},variant:"outlined"},/*#__PURE__*/u.createElement("i",{className:"fa-solid fa-arrow-up-to-line mr-10"}),"Back to top"),/*#__PURE__*/u.createElement(L,{direction:"row",justifyContent:"center"},/*#__PURE__*/u.createElement(ue,{queryInfo:y,data:E,threshold:t.threshold})),k&&!b?/*#__PURE__*/u.createElement(L,{className:"mt-6",alignItems:"center",spacing:1},/*#__PURE__*/u.createElement("p",{className:"font-semibold"},"Background Updating..."),/*#__PURE__*/u.createElement(I,{className:"w-full",color:"primary"})):null))});de.defaultProps={wrapperListItem:!0};var pe=de;function ge(t){var r;const{renderListItem:a,renderList:n,onRowClicked:o}=t,[l,i,s]=ae("queryKey, selected, setSelected"),c=k(l,ie,{keepPreviousData:!0,staleTime:5e3}),{isLoading:m,isSuccess:d,isFetching:p,error:g,data:y}=c;oe(t),M(()=>{Q(t.scrollTarget||window).scrollTop(0)},[y]);const h=f(()=>e(y,"data.0"),[e(y,"data.0")]);/*#__PURE__*/return u.createElement(L,{spacing:1.5},m&&/*#__PURE__*/u.createElement(I,null),(null==g?void 0:g.message)&&/*#__PURE__*/u.createElement(z,{variant:"filled",severity:"error"},null==g?void 0:g.message),d&&/*#__PURE__*/u.createElement(v,null,/*#__PURE__*/u.createElement(n,{meta:null==y?void 0:y.meta,firstRow:h},null==y||null==(r=y.data)?void 0:r.map((e,t)=>{let r=y.meta.from+t;/*#__PURE__*/return u.createElement(a,{key:t,serial:y.meta.from+t,data:e,meta:null==y?void 0:y.meta,onRowClicked:(t,a)=>{let n=i!==r&&r;s(n),o(t,{item:e,selected:n})}})})),p&&/*#__PURE__*/u.createElement(I,null)),(null==y?void 0:y.meta)&&/*#__PURE__*/u.createElement(ue,{meta:y.meta,size:t.perPage,sizes:t.sizes}))}function fe(e,t="0,0"){return G(e).format(t)}const ye=["children","meta"],he=h((e,r)=>{const a=(({scrollTarget:e,scrollIndex:r,wait:a=300})=>{const n=d(),[o,l]=B({x:0,y:0}),i=p(t=>{let r=e?{x:"scrollLeft",y:"scrollTop"}:{x:"pageXOffset",y:"pageYOffset"};l({x:n.current[r.x],y:n.current[r.y]})},[e]);return g(()=>(n.current=e?document.querySelector(e):window,n.current.addEventListener("scroll",t(i,a)),()=>{n.current.removeEventListener("scroll",i)}),[]),g(()=>{setTimeout(()=>{scrollTo(Q(e).get(0))},1e3)},[r]),o})(e),n=W({},e,{scrollPosition:a});/*#__PURE__*/return u.createElement(re,{createStore:ee},c(["load-more","infinite-loading"],e.pagination)?/*#__PURE__*/u.createElement(pe,W({ref:r},n)):/*#__PURE__*/u.createElement(ge,W({ref:r},n)))});he.propTypes={queryKey:E.oneOfType([E.string,E.array]),url:E.oneOfType([E.string,E.object]),pagination:E.oneOfType([E.string,E.func]),page:E.oneOfType([E.string,E.number]),perPage:E.oneOfType([E.string,E.number]),select:E.func,threshold:E.number,scrollTop:E.bool,scrollTarget:E.string},he.defaultProps={pagination:"simple",page:1,perPage:10,renderListItem:function({serial:e,data:t}){/*#__PURE__*/return React.createElement("div",null,e,") ",t.id)},renderList:function(e){let{children:t,meta:r}=e;return Z(e,ye),/*#__PURE__*/React.createElement(L,{spacing:1},/*#__PURE__*/React.createElement("div",null,"Kết quả từ ",fe(r.from),"-",fe(r.to)," trong số"," ",fe(r.total)),/*#__PURE__*/React.createElement(L,{spacing:2,divider:/*#__PURE__*/React.createElement(R,{orientation:"horizontal"}),sx:{py:2}},t))},backToTop:!1,onRowClicked:()=>{}};var ve=he;export{V as ADVANCED,$ as INFINITE_LOADING,Y as LINKS,X as LOAD_MORE,H as PAGINATION_TYPES,ve as QueryList,J as SIMPLE};
//# sourceMappingURL=index.modern.mjs.map
