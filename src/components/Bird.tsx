import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Bird as BirdType } from '../types/GameTypes';
import { GAME_CONFIG } from '../constants/GameConstants';

interface BirdProps {
  bird: BirdType;
}

const Bird: React.FC<BirdProps> = ({ bird }) => {
  const { position, rotation, size } = bird;
  
  return (
    <View
      style={[
        styles.bird,
        {
          left: position.x - size / 2,
          top: position.y - size / 2,
          transform: [{ rotate: `${rotation}deg` }],
        },
      ]}
    >
      <Svg width={size} height={size} viewBox="0 0 30 30">
        {/* Bird body */}
        <Circle
          cx={15}
          cy={15}
          r={12}
          fill={GAME_CONFIG.COLORS.BIRD}
          stroke="#FFA500"
          strokeWidth={2}
        />
        {/* Bird eye */}
        <Circle
          cx={18}
          cy={12}
          r={3}
          fill="#000000"
        />
        {/* Bird beak */}
        <Path
          d="M 25 15 L 30 12 L 30 18 Z"
          fill="#FF8C00"
        />
        {/* Bird wing */}
        <Path
          d="M 8 10 Q 12 8 16 12 Q 12 16 8 14 Z"
          fill="#FFA500"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  bird: {
    position: 'absolute',
    zIndex: 10,
  },
});

export default Bird;
