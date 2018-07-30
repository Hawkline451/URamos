import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class Rate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nota: 0,
    };
  }

  componentWillReceiveProps({ nota }) {
    this.setState({
      nota: parseFloat(nota).toFixed(3),
    });
  }

  changeRating(newRating) {
    this.setState({
      nota: newRating,
    });
  }

  render() {
    return (
      <div style={{ width: '20.6%' }}>
        <Ratings
          rating={parseFloat(this.state.nota)}
          widgetRatedColors={'rgb(255,175,0)'}
          widgetDimensions="30px"
          widgetSpacings="3px"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings>
      </div>
    );
  }
}

export default Rate;
