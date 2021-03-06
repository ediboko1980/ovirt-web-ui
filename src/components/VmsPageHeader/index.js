import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import VmUserMessages from '../VmUserMessages'
import Bellicon from '../VmUserMessages/Bellicon'
import UserMenu from './UserMenu'
import Header from '../Header'
import { hrefWithoutHistory } from '_/helpers'

import { refresh } from '_/actions'
import { msg } from '_/intl'
import OverlayTooltip from '../OverlayTooltip'

/**
 * Main application header on top of the page
 */
const VmsPageHeader = ({ page, onRefresh }) => {
  const [show, setShow] = useState(false)
  const idPrefix = `pageheader`

  return (
    <Header>
      <div className='collapse navbar-collapse'>
        <VmUserMessages show={show} onClose={() => setShow(!show)} />
        <ul className='nav navbar-nav navbar-right navbar-iconic'>
          <li>
            <OverlayTooltip id={`${idPrefix}-tooltip`} tooltip={msg.refresh()} placement='bottom'>
              <a href='#' className='nav-item-iconic' onClick={hrefWithoutHistory(() => onRefresh(page))} id={`${idPrefix}-refresh`}>
                <i className='fa fa-refresh' />
              </a>
            </OverlayTooltip>
          </li>
          <UserMenu />
          <Bellicon handleclick={() => setShow(!show)} />
        </ul>
      </div>
    </Header>
  )
}
VmsPageHeader.propTypes = {
  page: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    page: state.vms.get('page'), // number of pages to request refresh
  }),
  (dispatch) => ({
    onRefresh: (page) => dispatch(refresh({ shallowFetch: false, page })),
  })
)(VmsPageHeader)
