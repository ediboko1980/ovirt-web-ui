import { getOsHumanName } from '../components/utils'
import { enumMsg } from '_/intl'

const compareMap = {
  name: (item, filter) => !!filter.find(n => item.get('name').includes(n)),
  os: (item, filter) => getOsHumanName(item.getIn(['os', 'type'])) === filter,
  status: (item, filter) => enumMsg('VmStatus', item.get('status')) === filter,
}

export const mapFilterValues = {
  name: (value) => value,
  os: (value) => value,
  status: (value) => value,
}

export function filterVms (item, filters) {
  let res = true
  for (let name in filters) {
    if (compareMap[name]) {
      res &= compareMap[name](item, filters[name])
    }
  }
  return res
}
