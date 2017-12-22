import React, { Component } from 'react';

class Pairwise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false,
    };
  }

  render() {
    if (!this.state.completed) {
      return (
        <div>
          COMPLETED
        </div>
      );
    }

    return (
      <div>
        NOT COMPLETED
      </div>
    );
  }
}

export default Pairwise;
