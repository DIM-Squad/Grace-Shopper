import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Button,
  Container,
  Card,
  Grid,
  Table,
  Image,
  Icon,
  Header,
  Divider,
  Statistic,
  Segment
} from 'semantic-ui-react'
import OrderCollection from './OrderCollection'
import EntityNotFound from './EntityNotFound'
import {fetchSelectedUser} from '../store/selectedUser'

/**
 * COMPONENT
 */

class UserProfile extends Component {
  componentDidMount = () => {
    this.props.fetchSelectedUser(Number(this.props.match.params.userId))
  }
  render() {
    if (this.props.selectedUser.fullName) {
      const {
        fullName,
        isAdmin,
        firstName,
        lastName,
        email,
        address,
        userId
      } = this.props.selectedUser
      const city = address
        .trim()
        .split(' ')[3]
        .slice(0, -1)
      return (
        <Container>
          <Divider hidden />
          <Header as="h1">
            Hello {fullName}, I think I do like {firstName}
          </Header>
          <Divider hidden />
          <Grid stackable columns={3}>
            <Grid.Column>
              <Card centered>
                <Image
                  size="medium"
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                />
                <Card.Content>
                  <Card.Header>{fullName}</Card.Header>
                  <Card.Meta>
                    <span className="date">Joined in 2015</span>
                  </Card.Meta>
                  <Card.Description>
                    {firstName} is a loyal customer living in {city}.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Statistic size="mini" horizontal>
                    <Icon name="shipping" />
                    <Statistic.Value>
                      {this.props.selectedUser.orders.length}
                    </Statistic.Value>
                    <Statistic.Label>Orders so far!</Statistic.Label>
                  </Statistic>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>First Name:</Table.Cell>
                    <Table.Cell>{firstName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Last Name:</Table.Cell>
                    <Table.Cell>{lastName}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Email:</Table.Cell>
                    <Table.Cell>{email}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Address:</Table.Cell>
                    <Table.Cell>{address}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button color="teal" as={Link} to={`/users/${userId}/edit`}>
                Update
              </Button>
            </Grid.Column>
          </Grid>
          <Divider hidden />
          <OrderCollection isAdmin={isAdmin} />
        </Container>
      )
    } else {
      return (
        <Container>
          <Divider hidden>
            <Segment>
              <EntityNotFound entity="user" />
            </Segment>
          </Divider>
        </Container>
      )
    }
  }
}

const mapState = state => {
  return {
    selectedUser: state.selectedUser
  }
}

const mapDispatch = dispatch => ({
  fetchSelectedUser: userId => dispatch(fetchSelectedUser(userId))
})

export default connect(mapState, mapDispatch)(UserProfile)
