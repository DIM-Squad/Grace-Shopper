import {Item, Rating} from 'semantic-ui-react'
import React from 'react'

const AverageRating = props => {
  if (!props.avgRating) {
    return null
  }
  return (
    <Item.Meta>
      <Rating
        icon="star"
        defaultRating={props.avgRating}
        maxRating={5}
        disabled
      />
    </Item.Meta>
  )
}

export default AverageRating
