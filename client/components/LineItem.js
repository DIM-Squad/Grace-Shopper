import {Image, Item, Table} from 'semantic-ui-react'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {formatPrice} from '../utils/formatPrice'
import AverageRating from './AverageRating'

const LineItem = props => {
  console.log('Line Item Props =>', props)
  return (
    <Table.Row>
      <Table.Cell>
        <Item>
          <Image size="tiny" src={props.lineItem.product.imageUrl} />
        </Item>
      </Table.Cell>
      <Table.Cell selectable>
        <NavLink to={`/products/${props.lineItem.productId}`}>
          {props.lineItem.product.name}
        </NavLink>
      </Table.Cell>
      <Table.Cell>{props.lineItem.quantity}</Table.Cell>
      <Table.Cell>{formatPrice(props.lineItem.itemPrice)}</Table.Cell>
      <Table.Cell>
        <AverageRating avgRating={props.lineItem.product.avgRating} />
      </Table.Cell>
    </Table.Row>
  )
}

export default LineItem
