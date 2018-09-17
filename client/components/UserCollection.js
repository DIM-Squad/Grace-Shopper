import {Card, Button, Image, Divider} from 'semantic-ui-react'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchUsers} from '../store/users'

class UserCollection extends Component {
  componentDidMount = () => {
    this.props.fetchUsers('search', this.props.match.params.filterId)
  }

  goToUser = id => {
    this.props.history.push(`/users/${id}`)
  }

  render() {
    return (
      <Fragment>
        <Divider hidden />
        <Card.Group stackable centered>
          {this.props.users.map(user => (
            <Card key={user.id}>
              <Card.Content>
                <Image size="medium" src={user.imageUrl} style={styles.image} />
                <Card.Header>{user.fullName}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="teal"
                  floated="right"
                  onClick={() => this.goToUser(user.id)}
                >
                  More details
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({users: state.users})
const mapDispatchToProps = dispatch => ({
  fetchUsers: (filterType, filterId) =>
    dispatch(fetchUsers(filterType, filterId))
})

const styles = {
  image: {
    marginBottom: 20
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCollection)
)
