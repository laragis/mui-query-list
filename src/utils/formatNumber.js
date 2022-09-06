import numeral from 'numeral'

function formatNumber(number, format = '0,0') {
  return numeral(number).format(format)
}

export default formatNumber