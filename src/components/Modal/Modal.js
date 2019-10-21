import React from 'react'
import { default as ReactModal } from 'react-modal'
import classNames from 'classnames'

import { CloseIcon } from '../../components/Icons'

import './Modal.css'

const Modal = ({ className, overlayClassName, onCloseClick, children, ...props }) => {
  const clsName = classNames('modal', className)
  const overlayClsName = classNames('modal-bg', overlayClassName)

  return (
    <ReactModal
      className={clsName}
      overlayClassName={overlayClsName}
      {...props}
    >
      <CloseIcon
        onClick={
          () => { onCloseClick() }
        }
        className='modal__close'
      />

      { children }
    </ReactModal>
  )

  // return <div>
  //   <div className='modal-bg'>
  //     {/* Добавляем класс modal--inner получаем текст спасибо */}
  //     <div className='modal'>
  //       <div className='modal-wrapper'>
  //         <button className='btn-close'><CloseIcon /></button>
  //         <div className='modal-title'>Добавление пользователя в ЛК</div>
  //         <div className='modal-wrapper-center'>
  //           <div className='modal-line'>
  //             <label className='label' htmlFor=''>Филиал</label>
  //             {/* Добавляем класс form_input--modified и получаем серый текст в input */}
  //             <input className={`form_input ${className}`} {...otherProps} />
  //             <div className='modal-helper'>На этот номер придет СМС с кодом для подтверждения</div>
  //           </div>
  //           <div className='modal-line'>
  //             <label className='label' htmlFor=''>Электронная почта</label>
  //             <input className={`form_input ${className}`} {...otherProps} />
  //           </div>
  //           {/* Это блок ввода кода смс */}
  //           <div className='modal-line modal-code'>
  //             <label className='label' htmlFor=''>введите код из смс</label>
  //             <input className={`form_input form_input--error ${className}`} {...otherProps} />
  //             <a href='#' className='content-link-uppercase'>Отмена</a>
  //             <div className='form-error-text'>Неверный код</div>
  //           </div>
  //           {/* Убираем класс btn--mute получаем дефолтную кнопку */}
  //           <button className='btn btn--mute'>Добавить</button>
  //         </div>
  //         <div className='modal-message'>
  //           <div className='modal-message-title'>Спасибо, пользователь добавлен</div>
  //           <div className='modal-message-text'>Это окно закроется через несколько секунд</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
}

export default Modal
