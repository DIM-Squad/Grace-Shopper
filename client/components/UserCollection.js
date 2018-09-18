import {Table, Divider, Container, Header} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {fetchUsers} from '../store/users'

class UserCollection extends Component {
  componentDidMount = () => {
    if (!this.props.match.params.filterId) {
      this.props.fetchUsers()
    } else {
      this.props.fetchUsers('search', this.props.match.params.filterId)
    }
  }

  goToUser = id => {
    this.props.history.push(`/users/${id}`)
  }

  render() {
    return (
      <Container>
        <Divider hidden />
        <Header as="h1" textAlign="left">
          User List
        </Header>
        <Divider horizontal />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Surname</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user => {
              return (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <NavLink to={`/users/${user.id}`}>{user.id}</NavLink>
                  </Table.Cell>
                  <Table.Cell>{user.firstName}</Table.Cell>
                  <Table.Cell>{user.lastName}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = state => ({users: state.users})
const mapDispatchToProps = dispatch => ({
  fetchUsers: (filterType, filterId) =>
    dispatch(fetchUsers(filterType, filterId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCollection)
)
