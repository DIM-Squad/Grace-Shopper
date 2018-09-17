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
          <Image size="tiny" src={props.product.imageUrl} />
        </Item>
      </Table.Cell>
      <Table.Cell selectable>
        <NavLink to={`/products/${props.product.id}`}>
          {props.product.name}
        </NavLink>
      </Table.Cell>
      <Table.Cell>{props.product.line_item.quantity}</Table.Cell>
      <Table.Cell>{formatPrice(props.product.line_item.itemPrice)}</Table.Cell>
      <Table.Cell>
        <AverageRating avgRating={props.product.avgRating} />
      </Table.Cell>
    </Table.Row>
  )
}

export default LineItem
