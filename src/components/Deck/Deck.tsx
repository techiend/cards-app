import React, { ForwardedRef, forwardRef, useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { CardImgList, CardBackImg } from '@/constants/Constant'
import styles from '@/styles/Styles';
import { View } from 'react-native';

let cards = CardImgList.sort((a, b) => 0.5 - Math.random());

const to = (i: number) => ({
  x: 0,
  y: i * -0.5,
})

const from = (_i: number) => ({ 
  x: 0,
  scale: 1,
  rotateY: 0
})

type DeckProps = {
  sendToTrash: Function,
  trashPosition: number,
};

const Deck = forwardRef(({sendToTrash, trashPosition} : DeckProps, ref : ForwardedRef) => {
  const [flipped, setFlipped] = useState(cards.map(() => false)); // Estado para controlar si cada tarjeta está volteada
  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) 

  const handleClick = (index: number) => {
    setFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });

    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const rotateY = props[i].rotateY.get() === 0 ? 180 : 0;
      const scale = props[i].scale.get() === 1 ? 1.5 : 1;
      
      return {
        x: rotateY === 180 ? trashPosition : 0,
        rotateY,
        scale,
        config: { tension: 400, friction: 80 }, // Ajusta la suavidad de la animación
        onRest: () => {
          sendToTrash((prevTrash: any) => [...prevTrash, cards[i]]);
          cards.splice(index, 1);
        }
      }
    })

  }

  return (
    <div ref={ref} style={styles.deck}>
      {props.map(({ rotateY }, i) => (
        <animated.div
          key={i}
          onClick={() => handleClick(i)}
          style={{
            ...styles.card,
            backgroundImage: interpolate([rotateY], ry => 
              ry <= 90 ? `url(${CardBackImg})` : `url(${cards[i]})`
            ),
            transform: interpolate([rotateY], ry => 
              ry > 90 ? 'rotateY(180deg)' : 'rotateY(0deg)' // Corrección para el frente
            ),
            ...props[i],
          }}
        />
      ))}
    </div>
  )
});

export default Deck;
