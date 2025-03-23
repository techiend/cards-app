import React, { ForwardedRef, forwardRef, useEffect } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { View } from 'react-native';
import styles from '@/styles/Styles';
import { Card } from '@/types/Card';

// import styles from './styles.module.css'
// import commonStyles from '../../styles.module.css';

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -0.5,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100, 
})
const from = (_i: number) => ({ 
  x: 0,
  rot: 0,
  scale: 1.7
})

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number) =>
  `rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg)`;

type TrashProps = {
  trash: Card[],
};

const Trash = forwardRef(({trash}: TrashProps, ref: ForwardedRef) => {
  const [props, api] = useSprings(trash.length, i => ({
    ...to(i),
    from: from(i),
    config: { tension: 300, friction: 30 }, // Añadimos config para una animación más suave
  })) 

  useEffect(() => {
    api.start({
      to: {
        x: 0
      },
    })
  }, [trash])

  return (
    <View ref={ref} style={styles.basura}>
      {props.map(({ rot, x }, i) => (
        <animated.div
          key={i}
          style={{
            ...styles.card,
            x,
            transform: interpolate([rot], trans),
            backgroundImage: `url(${trash[i].img})`,
          }}
        />
      ))}
    </View>
  )
});

export default Trash;
