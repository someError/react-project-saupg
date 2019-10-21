import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'

import Dadata, { API_KEY } from '../../utils/Dadata'

import '../Form/Input.css'
import './Suggestions.css'

const theme = {
  container: 'react-autosuggest__container form-input-wrap',
  containerOpen: 'react-autosuggest__container--open',
  input: 'form_input',
  inputOpen: 'react-autosuggest__input--open',
  inputFocused: 'react-autosuggest__input--focused',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList: 'react-autosuggest__suggestions-list',
  suggestion: 'react-autosuggest__suggestion',
  suggestionFirst: 'react-autosuggest__suggestion--first',
  suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
  sectionContainer: 'react-autosuggest__section-container',
  sectionContainerFirst: 'react-autosuggest__section-container--first',
  sectionTitle: 'react-autosuggest__section-title'
}

const getSuggestionValue = (suggestion) => suggestion.value

const renderSuggestion = (suggestion) => {
  return <div>{suggestion.value || ''}</div>
}

class Suggestions extends Component {
  constructor () {
    super()

    this.state = {
      suggestions: []
    }

    this.dadata = new Dadata(API_KEY)

    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
  }

  onSuggestionsFetchRequested ({value, reason}) {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    if (this.req) {
      this.req.cancel()
    }

    this.timeout = setTimeout(() => {
      this.req = this.dadata.address({
        query: value
      })

      this.req.then(({data}) => {
        this.setState({
          suggestions: data.suggestions || []
        })
      })
    }, reason === 'input-focused' ? 0 : 300)
  }

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    })
  }

  render () {
    const { suggestions } = this.state

    return <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      theme={theme}
      {...this.props}
    />
  }
}

export default Suggestions
