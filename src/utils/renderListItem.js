function renderListItem({serial, data}){
  return (
    <div>
      {serial}) {data.id}
    </div>
  )
}

export default renderListItem