import React from 'react'
import {Item} from 'semantic-ui-react'
import {connect} from 'react-redux'

const Review = props => {
  //console.log('PROPS', props)
  return (
    <Item.Group>
      <Item>
        <Item.Image
          size="tiny"
          src="https://semantic-ui.com/images/avatar2/large/elyse.png"
        />
        <Item.Content>
          <Item.Header>{props.review.title}</Item.Header>
          <Item.Description>{props.review.description} </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default Review
