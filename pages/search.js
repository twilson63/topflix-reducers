import React from 'react'
import { connect } from 'react-redux'

import HeaderBar from '../../components/header-bar'
import Card from '../../components/card'
import { TextField, Button, List, ListItem } from 't63'
import { search } from '../db'
import R from 'ramda'
const { map } = R


const Search = props => {
  return (
    <section>
      <HeaderBar
        navLeft="/" iconLeft="chevron-left"
        title="Search"
      />
      <form className="pa4" onSubmit={props.search}>
        <TextField
          value={props.query}
          onChange={props.handleChange}
          name="Search"
          helpTxt="Enter a name of a movie and press ENTER"
        />
        <Button>Search</Button>
      </form>
      {map(m => <Card onClick={props.add(m, props.history)} key={m.id} {...m} />, props.results)}
    </section>
  )
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Search)

function mapStateToProps (state) {
  return {
    query: state.search,
    results: state.searchResults
  }
}

function mapActionsToProps (dispatch) {
  return {
    handleChange: e => {
      dispatch({type: 'SET_SEARCH', payload: e.target.value})
    },
    search: e => {
      e.preventDefault()
      dispatch(search)
    },
    add: (movie, history) => e => {
      dispatch({type: 'ADD_MOVIE', payload: movie })
      dispatch({type: 'SET_SEARCH', payload: ''})
      history.push('/')
    }
  }
}
