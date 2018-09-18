import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
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
  Statistic
} from 'semantic-ui-react'
import OrderCollection from './OrderCollection'

/**
 * COMPONENT
 */
export const UserProfile = props => {
  const {fullName, isAdmin, firstName, lastName, email, address, userId} = props
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
                <Statistic.Value>22</Statistic.Value>
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
          <Button color="teal" onClick={() => props.goToEditUser(userId)}>
            Update
          </Button>
        </Grid.Column>
      </Grid>
      <Divider hidden />
      <OrderCollection isAdmin={isAdmin} />
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    fullName: state.user.fullName,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    address: state.user.address,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserProfile)

/**
 * PROP TYPES
 */
UserProfile.propTypes = {
  fullName: PropTypes.string
}
