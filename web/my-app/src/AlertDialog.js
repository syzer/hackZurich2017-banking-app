import React, { Component } from 'react'
import { Dialog, FlatButton } from 'material-ui'

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
}

// props: isOpen, message
export default class AlertDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: this.props.isOpen
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.onDialogClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.props.onDialogClose}
      />
    ]

    return (
      <div>
        <Dialog
          title="Message"
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.props.isOpen}
        >
          {this.props.message}
        </Dialog>
      </div>
    )
  }
}