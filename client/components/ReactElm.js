var React = require('react')

export default class Elm extends React.Component {
  ref = node => {
    if (node === null) return
    const app = this.props.src.init({node, flags: this.props.flags})
    if (typeof this.props.ports !== 'undefined') this.props.ports(app.ports)
  }
  shouldComponentUpdate = () => {
    return false
  }
  render = () => {
    return <div ref={this.ref} />
  }
}
