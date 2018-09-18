import {Image, Table} from 'semantic-ui-react'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {formatPrice} from '../utils/formatPrice'
// import AverageRating from './AverageRating'

const OrderRow = props => {
  const {order, userRoute} = props
  return (
    <Table.Row key={order.id}>
      <Table.Cell>{order.updatedAt}</Table.Cell>
      <Table.Cell>
        <NavLink to={`${userRoute}/${order.id}`}>
          {`${order.shippingZip}${order.shippingState}${order.id}`}
        </NavLink>
      </Table.Cell>
      <Table.Cell>
        <NavLink to={`/users/${order.userId}`}>
          <Image
            circular
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/patrick.png"
          />
          <span>{order.user.fullName}</span>
        </NavLink>
      </Table.Cell>
      <Table.Cell>
        {order.products.reduce((acc, curr) => acc + curr.line_item.quantity, 0)}
      </Table.Cell>
      <Table.Cell>
        {formatPrice(
          parseFloat(order.totalCost) +
            parseFloat(order.shippingCost) +
            order.products.reduce(
              (acc, curr) => acc + curr.line_item.itemPrice,
              0
            )
        )}
      </Table.Cell>
    </Table.Row>
  )
}

export default OrderRow
