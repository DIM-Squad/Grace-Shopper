var React = require('react')

export default class Elm extends React.Component {
  ref(node) {
    if (node === null) return
    var app = this.props.src.embed(node, this.props.flags)
    if (typeof this.props.ports !== 'undefined') this.props.ports(app.ports)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return <div ref={this.ref} />
  }
}
