import React, { Component } from 'react';
import DogAvatar from './Avatars/DogAvatar';
import CatAvatar from './Avatars/CatAvatar';
import DuckAvatar from './Avatars/DuckAvatar';
import CowAvatar from './Avatars/CowAvatar';
import ChickenAvatar from './Avatars/ChickenAvatar';
import SheepAvatar from './Avatars/SheepAvatar';
import WolfAvatar from './Avatars/WolfAvatar';
import OwlAvatar from './Avatars/OwlAvatar';
import PigAvatar from './Avatars/PigAvatar';
import CricketAvatar from './Avatars/CricketAvatar';
import BearAvatar from './Avatars/BearAvatar';

class AnimalAvatar extends Component {
  getAvatar(name) {
    if (name === 'miau') {
      return <CatAvatar />;
    } else if (name === 'guau') {
      return <DogAvatar />;
    } else if (name === 'cuak cuak') {
      return <DuckAvatar />;
    } else if (name === 'muuuuu') {
      return <CowAvatar />;
    } else if (name === 'pio pio') {
      return <ChickenAvatar />;
    } else if (name === 'beeee') {
      return <SheepAvatar />;
    } else if (name === 'auuuuh') {
      return <WolfAvatar />;
    } else if (name === 'hooo hoooo hoo') {
      return <OwlAvatar />;
    } else if (name === 'oink oink') {
      return <PigAvatar />;
    } else if (name === 'cri cri') {
      return <CricketAvatar />;
    } else if (name === 'grrrr') {
      return <BearAvatar />;
    }
  }

  render() {
    console.log(this.props.name.split(' ')[0]);
    return (
      <div style={{ marginLeft: '25%' }}>
        {this.getAvatar(this.props.name.split(' ')[0])}
      </div>
    );
  }
}

export default AnimalAvatar;
