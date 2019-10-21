import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'libphonenumber-js'
import { formatBalance, strToAbsNum, pluralize, validatePhone } from '../../utils'
import { writePhone } from '../../redux/account/actions'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import api from '../../api'

import { PhoneIcon } from '../../components/Icons'
import Template from '../../components/Template'
import { Modal } from '../../components/Modal'
import { Input, Label, InputPhone, ErrorMessage } from '../../components/Form'
import { Button } from '../../components/Button'

import './SearchResultCard.css'

class SearchResultCard extends React.Component {
  constructor (props) {
    super()
    this.state = {
      showModal: false,
      phone: (props.data && props.data.phone_websaupg) || ''
    }
  }
  render () {
    const { state, props } = this
    const { children, data, _path, id, location, history, user } = props
    console.log(props)
    // if (user.roles.indexOf('ROLE_CALL_OPERATOR') === -1) {
    return (
      <NavLink
        to={
          {
            pathname: `${_path}account/${id}`,
            state: { backToSearchUrl: `${location.pathname}${location.search || ''}` }
          }
        }
        className='search-result-line'
      >
        { children }
      </NavLink>
    )
    // }
    // return (
    //   <Template>
    //     <a
    //       href='#'
    //       className='search-result-line'
    //       onClick={(e) => {
    //         e.preventDefault()
    //         this.setState({ showModal: true })
    //       }}
    //     >
    //       { children }
    //     </a>
    //     <Modal
    //       isOpen={state.showModal}
    //       onCloseClick={() => { this.setState({ showModal: false }) }}
    //       contentLabel='Укажите номер'
    //     >
    //       <form
    //         className='modal-wrapper-center'
    //         onSubmit={(e) => {
    //           e.preventDefault()
    //           if (validatePhone(state.phone)) {
    //             api.writePhone(id, state.phone)
    //               .then(() => {
    //                 this.props.writePhone(state.phone)
    //                 history.push({pathname: `${_path}/account/${id}`})
    //               })
    //           }
    //         }}
    //       >
    //         <h4>Введите контактный номер телефона абонента.</h4>
    //         <div className='modal-line'>
    //           <Label>Номер телефона</Label>
    //           <InputPhone
    //             value={state.phone}
    //             onChange={(e) => { this.setState({phone: e.target.value}) }}
    //           />
    //           <Button disabled={!validatePhone(state.phone)}>Отправить</Button>
    //         </div>
    //       </form>
    //     </Modal>
    //   </Template>
    // )
  }
}

const SearchResult = ({ id, data, name, title, contract, location, isOrg, history, ...props }) => {
  const balance = Number(props.balance)
  const phone = (data.phone_lk || data.phone || '').replace(/^7/, '')
  const _path = props.path.replace('search', '')
  // console.log(location)
  return (
    <SearchResultCard _path={_path} writePhone={props.writePhone} location={location} data={data} id={id} history={history} user={props.user}>
      <Template>
        <div className='search-result-line-left'>
          <div className='search-result-line_title'>
            {isOrg ? title : data.address}
          </div>
          {
            isOrg ? (
              <div>
                <span className='search-result-line_text search-result-line_text--bg'>№{ contract }</span>
                {
                  props.objects_count > 0 &&
                    <span className='search-result-line_text'>
                      { props.objects_count + pluralize(props.objects_count, ' объект', ' объекта', ' объектов') }
                    </span>
                }
              </div>
            ) : (
              <div>
                <span className='search-result-line_text'>{ name }</span>
                <span className='search-result-line_text search-result-line_text--bg'>№{ contract }</span>
              </div>
            )
          }

        </div>
        <div className='search-result-line-right'>
          {
            balance && balance < 0 && props.user.roles.indexOf('ROLE_CALL_OPERATOR') === -1
              ? <div className='search-result-line_title search-result-line_debt search-result-line_title--color'>Долг: { formatBalance(strToAbsNum(balance)) }</div>
              : null
          }

          {
            phone && !isOrg
              ? (
                <div className='search-result-line_text-icon'>
                  {/* <a href={`tel:${phone}`}><PhoneIcon />{ format(phone, 'RU', 'International') }</a> */}
                  <span><PhoneIcon />{ format(phone, 'RU', 'International') }</span>
                </div>
              )
              : null
          }
        </div>
      </Template>
    </SearchResultCard>

  )
}

SearchResult.propTypes = {
  data: PropTypes.object,
  name: PropTypes.string,
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  contract: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

const mapDispatchToProps = (dispatch) => {
  return {
    writePhone (phone) {
      return dispatch(writePhone(phone))
    }
  }
}

export default withRouter(connect(({user}) => ({user}), mapDispatchToProps)(SearchResult))
