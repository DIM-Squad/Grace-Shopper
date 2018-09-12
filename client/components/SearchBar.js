import React, {Component} from 'react'
import {Button, Form} from 'semantic-ui-react'

export default class SearchBar extends Component {
  handleChange = e => {
    console.log(e.target.value)
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <input
            placeholder="search for a product"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type="submit">Search</Button>
      </Form>
    )
  }
}
