import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';

class Rate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nota: 0,
      votos: 0,
    };
  }

  componentWillReceiveProps({ nota, votos }) {
    this.setState({
      nota: parseFloat(nota).toFixed(1),
      votos: parseInt(votos, 10),
    });
  }

  changeRating(newRating) {
    this.setState({
      nota: newRating,
    });
  }

  render() {
    return (
      <div
        style={{
          width: '26%',
          marginLeft: '2%',
        }}
      >
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
        <div
          style={{
            display: 'inline',
            marginLeft: '7%',
            verticalAlign: 'middle',
          }}
        >
          <span
            style={{
              fontSize: 18,
            }}
          >
            {this.state.nota} ({this.state.votos} votos)
          </span>
        </div>
      </div>
    );
  }
}

export default Rate;
