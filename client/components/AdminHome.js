import React from 'react'
import {SearchBar} from './'
import {Container} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default () => {
  return (
    <Container>
      <SearchBar type="users" label="Search users by name" />
      <SearchBar type="order" label="Search users by order#" />
      <NavLink to="/add/product">Add a new product</NavLink>
    </Container>
  )
}
