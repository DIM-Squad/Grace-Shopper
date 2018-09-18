import {Table, Divider, Container, Header, Pagination} from 'semantic-ui-react'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, NavLink} from 'react-router-dom'
import {fetchUsers} from '../store/users'

class UserCollection extends Component {
  state = {
    offset: 0,
    limit: 20,
    activePage: 1
  }

  componentDidMount = () => {
    if (!this.props.match.params.filterId) {
      this.props.fetchUsers(this.state.offset, this.state.limit)
    } else {
      this.props.fetchUsers('search', this.props.match.params.filterId)
    }
    this.props.fetchUsers(
      this.state.offset,
      this.state.limit,
      this.props.match.params.filterType,
      this.props.match.params.filterId
    )
  }

  goToUser = id => {
    this.props.history.push(`/users/${id}`)
  }

  handlePageChange = (e, {activePage}) => {
    this.props.fetchUsers(
      this.state.limit * (activePage - 1),
      this.state.limit,
      this.props.match.params.filterType,
      this.props.match.params.filterId
    )
    this.setState(prevState => ({
      activePage,
      offset: prevState.limit * (activePage - 1)
    }))
  }

  render() {
    const {users, numOfUsers} = this.props.users
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
            {users.map(user => {
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
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handlePageChange}
          totalPages={numOfUsers / this.state.limit}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  numOfUsers: state.numOfUsers
})
const mapDispatchToProps = dispatch => ({
  fetchUsers: (offset, limit, filterType, filterId) =>
    dispatch(fetchUsers(offset, limit, filterType, filterId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCollection)
)
