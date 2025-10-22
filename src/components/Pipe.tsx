import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { Pipe as PipeType } from '../types/GameTypes';
import { GAME_CONFIG } from '../constants/GameConstants';

interface PipeProps {
  pipe: PipeType;
}

const Pipe: React.FC<PipeProps> = ({ pipe }) => {
  const { x, topHeight, bottomY, width } = pipe;
  
  return (
    <View style={[styles.pipe, { left: x }]}>
      {/* Top pipe */}
      <Svg width={width} height={topHeight} style={styles.topPipe}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={topHeight}
          fill={GAME_CONFIG.COLORS.PIPE}
          stroke={GAME_CONFIG.COLORS.PIPE_OUTLINE}
          strokeWidth={3}
        />
        {/* Pipe cap */}
        <Rect
          x={-5}
          y={topHeight - 20}
          width={width + 10}
          height={20}
          fill={GAME_CONFIG.COLORS.PIPE}
          stroke={GAME_CONFIG.COLORS.PIPE_OUTLINE}
          strokeWidth={3}
        />
      </Svg>
      
      {/* Bottom pipe */}
      <Svg width={width} height={GAME_CONFIG.SCREEN_HEIGHT - bottomY} style={[styles.bottomPipe, { top: bottomY }]}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={GAME_CONFIG.SCREEN_HEIGHT - bottomY}
          fill={GAME_CONFIG.COLORS.PIPE}
          stroke={GAME_CONFIG.COLORS.PIPE_OUTLINE}
          strokeWidth={3}
        />
        {/* Pipe cap */}
        <Rect
          x={-5}
          y={0}
          width={width + 10}
          height={20}
          fill={GAME_CONFIG.COLORS.PIPE}
          stroke={GAME_CONFIG.COLORS.PIPE_OUTLINE}
          strokeWidth={3}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  pipe: {
    position: 'absolute',
    zIndex: 5,
  },
  topPipe: {
    position: 'absolute',
  },
  bottomPipe: {
    position: 'absolute',
  },
});

export default Pipe;
