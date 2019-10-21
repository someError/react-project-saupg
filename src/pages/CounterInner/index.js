import React, { Component } from 'react'

import { ArrowIcon, CheckIcon } from '../../components/Icons'
import { Button } from '../../components/Button'
import { InputDate, Input, Select, Label } from '../../components/Form'

class CounterInner extends Component {
  constructor () {
    super()

    this.state = {
      showForm: false,
      sent: false
    }

    this.submit = this.submit.bind(this)
  }

  showForm () {
    this.setState({
      showForm: true,
      sent: false
    })
  }

  hideForm () {
    this.setState({
      showForm: false
    })
  }

  submit (e) {
    e.preventDefault()

    //  TODO: это естетсвенно дамповый метод для демонстрации
    this.hideForm()
    this.setState({
      sent: 'true'
    })
  }

  render () {
    const { showForm, sent } = this.state

    return (
      <div>
        <div className='head-line'>
          <div className='head-line-left'>
            <button className='btn-back'><ArrowIcon /> Назад</button>
          </div>
          <div className='head-line-right'>
            <div className='head-line_text-modified'>Солова Галина Валентиновна
              <span>700211007</span>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='content-title'>Счетчик BK g6<sup>вкл</sup></div>
          {
            !showForm
              ? (
                <div className='content-text-right'>
                  <button className='content-link-uppercase' onClick={() => { this.showForm() }}>ввести показания счетчика</button>
                </div>
              )
              : (
                <form onSubmit={this.submit}>
                  <div className='l-two-cols l-two-cols-group-param l-two-cols-valign-top'>
                    <div className='l-two-cols-col'>
                      <Label>обороты за период</Label>
                      <Input />
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>дата ввода показания</Label>
                      <InputDate />
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>тип</Label>
                      <Select className='select--modified'>
                        <option value=''>Все филиалы</option>
                        <option value=''>Все филиалы</option>
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>служба ввода</Label>
                      <Select className='select--modified'>
                        <option value=''>Все филиалы</option>
                        <option value=''>Все филиалы</option>
                      </Select>
                    </div>
                    <div className='l-two-cols-col'>
                      <Label>Способ получения показания:</Label>
                      <Select className='select--modified'>
                        <option value=''>Все филиалы</option>
                        <option value=''>Все филиалы</option>
                      </Select>
                    </div>
                  </div>
                  <div className='content-text-center content-text-center--modified'>
                    <Button className='btn--modified'>Передать показания</Button>
                    <br />
                    <button onClick={() => { this.hideForm() }} type='button' className='content-link-uppercase'>Отмена</button>
                  </div>
                </form>
              )
          }
        </div>

        {
          sent
            ? (
              <div className='content-default-wrapper content-default-wrapper--lg'>
                <div className='content-text-center'>
                  <div className='content-text-check'>
                    <CheckIcon />Показания переданы
                  </div>
                </div>
              </div>
            )
            : null
        }

        <div className='table-indications table-indications--modified table-without-border'>
          <div className='content-title-uppercase content-title-uppercase--inner'>Прошлые показания</div>
          <table>
            <tbody>
              <tr>
                <th>Посл. показание</th>
                <th>Дата ввода</th>
                <th>Расход</th>
                <th>Тип</th>
                <th>Служба ввода</th>
                <th />
              </tr>
              <tr>
                <td><b>32546</b></td>
                <td>10.06.13</td>
                <td>3424,65р.</td>
                <td>Call-центр</td>
                <td>Идущее в реализацию</td>
                <td><ArrowIcon className='table-indications-icon' /></td>
              </tr>
              <tr>
                <td><b>32546</b></td>
                <td>10.06.13</td>
                <td>3424,65р.</td>
                <td>Call-центр</td>
                <td>Идущее в реализацию</td>
                <td><ArrowIcon className='table-indications-icon' /></td>
              </tr>
              <tr>
                <td><b>32546</b></td>
                <td>10.06.13</td>
                <td>3424,65р.</td>
                <td>Call-центр</td>
                <td>Идущее в реализацию</td>
                <td><ArrowIcon className='table-indications-icon' /></td>
              </tr>
              <tr>
                <td><b>32546</b></td>
                <td>10.06.13</td>
                <td>3424,65р.</td>
                <td>Call-центр</td>
                <td>Идущее в реализацию</td>
                <td><ArrowIcon className='table-indications-icon' /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default CounterInner
