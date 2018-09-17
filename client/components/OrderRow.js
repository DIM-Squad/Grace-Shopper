import {Image, Item, Table} from 'semantic-ui-react'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {formatPrice} from '../utils/formatPrice'
import AverageRating from './AverageRating'

const OrderRow = props => {
  return (
    <Table.Row>
      <Table.Cell>{props.orders.updatedAt}</Table.Cell>
      <Table.Cell>
        <NavLink to={`/orders/${props.product.id}`}>
          {props.product.name}
        </NavLink>
      </Table.Cell>
    </Table.Row>
  )
}

export default OrderRow
