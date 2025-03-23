import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { CardBackImg, CardsList } from '@/constants/Constant'
import styles from '@/styles/Styles';
import { View } from 'react-native';
import { Card } from '@/types/Card';

let cards: Card[] = CardsList.sort((a, b) => 0.5 - Math.random());

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
  setDeck: Function,
  sendToTrash: Function,
  trashPosition: number,
  sendPlayer: Function,
  playerPosition: number,
  sendOponent: Function,
  oponentPosition: number,
};

const Deck = forwardRef((props : DeckProps, ref : ForwardedRef) => {
  const [flipped, setFlipped] = useState(cards.map(() => false)); // Estado para controlar si cada tarjeta está volteada
  const [springProps, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) 

  const handleClickTrash = (index: number) => {
    setFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });

    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const rotateY = springProps[i].rotateY.get() === 0 ? 180 : 0;
      const scale = springProps[i].scale.get() === 1 ? 1.5 : 1;
      
      return {
        x: rotateY === 180 ? props.trashPosition : 0,
        rotateY,
        scale,
        config: { tension: 400, friction: 80 }, // Ajusta la suavidad de la animación
        onRest: () => {
          props.sendToTrash((prevTrash: any) => [...prevTrash, cards[i]]);
          cards.splice(index, 1);
          props.setDeck(cards);
        }
      }
    })

  }

  const handleClick = (index: number) => {
    setFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });

    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const rotateY = springProps[i].rotateY.get() === 0 ? 180 : 0;
      const scale = springProps[i].scale.get() === 1 ? 1.5 : 1;
      
      return {
        y: rotateY === 180 ? props.playerPosition : 0,
        rotateY,
        scale,
        config: { tension: 400, friction: 80 }, // Ajusta la suavidad de la animación
        onRest: () => {
          props.sendPlayer((prevPlayer: any) => [...prevPlayer, cards[i]]);
          cards.splice(index, 1);
          props.setDeck(cards);
        }
      }
    })

  }

  useEffect(() => {
    props.setDeck(cards);
  }, [cards]);

  return (
    // <View style={styles.deckContainer}>
      <View ref={ref} style={styles.deck}>
        {springProps.map(({ rotateY }, i) => (
          <animated.div
          key={i}
          onClick={() => handleClick(i)}
          style={{
            ...styles.card,
            backgroundImage: interpolate([rotateY], ry => 
              ry <= 90 ? `url(${CardBackImg})` : `url(${cards[i].img})`
            ),
            transform: interpolate([rotateY], ry => 
              ry > 90 ? 'rotateY(180deg)' : 'rotateY(0deg)' // Corrección para el frente
            ),
            ...springProps[i],
          }}
          />
        ))}
      </View>
    // </View>
  )
});

export default Deck;
