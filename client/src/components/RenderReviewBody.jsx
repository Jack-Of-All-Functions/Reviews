import React from 'react';
import { Button, Typography } from '@material-ui/core';

class RenderReviewBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      fullBody: this.props.body,
      first250Char: this.props.body.slice(0, 249),
    };
    this.toggleShowAll = this.toggleShowAll.bind(this);
  }

  toggleShowAll() {
    this.setState(state => ({
      showAll: !(this.state.showAll),
    }));
  }

  render() {
    return (this.state.showAll)
      ? (
        <Typography>
          {this.state.fullBody}
          <br />
          <Button size="small" onClick={this.toggleShowAll}>Show Less</Button>
        </Typography>
      )
      : (
        <Typography>
          {this.state.first250Char}
          ...
          <br />
          <Button size="small" onClick={this.toggleShowAll}>Continue Reading</Button>
        </Typography>
      );
  }
}

export default RenderReviewBody;
