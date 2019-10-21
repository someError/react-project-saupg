import { combineReducers } from 'redux'

import forms from './forms/reducer'
import abonents from './abonents/reducer'
import organizations from './organizations/reducer'
import account from './account/reducer'
import user from './user/reducer'
import requests from './requests/reducer'
import content from './content/reducer'
import breadcrumbs from './breadcrumbs/reducer'

export default combineReducers({
  forms,
  abonents,
  organizations,
  account,
  user,
  requests,
  content,
  breadcrumbs
})
