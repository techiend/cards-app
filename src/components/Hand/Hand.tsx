import React, { ForwardedRef, forwardRef, useEffect } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { View } from 'react-native';
import styles from '@/styles/Styles';
import { Card } from '@/types/Card';

const to = (i: number) => ({
  x: 0,
  scale: 0.5,
  delay: i * 100, 
})

type HandProps = {
  xPosition: number,
  yPosition: number,
  hand: Card[],
  setHand: Function,
};

const Hand = forwardRef(({xPosition, yPosition, hand, setHand}: HandProps, ref: ForwardedRef) => {
  const [props, api] = useSprings(hand.length, i => ({
    ...to(i),
    from: { 
      x: xPosition,
      y: yPosition,
      rot: 0,
      scale: 1.7
    },
    config: { tension: 300, friction: 30 }, // Añadimos config para una animación más suave
  })) 

  const trans = (i: number, x: number) => {
    let pos = 0;
    pos += (105 * i);
    return `translateX(${pos}%)`; 
  };

  useEffect(() => {
    api.start({
      to: {
        x: xPosition,
        y: 0
      },
    })
  }, [hand])

  return (
    <View ref={ref} style={styles.hand}>
      {props.map(({ x }, i) => (
        <animated.div
          key={i}
          style={{
            ...styles.card,
            x,
            transform: interpolate([i, xPosition], trans),
            backgroundImage: `url(${hand[i].img})`,
          }}
        />
      ))}
    </View>
  )
});

export default Hand;
