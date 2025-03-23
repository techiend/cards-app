import 'expo-router/entry';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text } from 'react-native';


import Deck from '@/components/Deck/Deck';
import Trash from '@/components/Trash/Trash';
import styles from '@/styles/Styles';
import { Card } from '@/types/Card';
import Hand from '@/components/Hand/Hand';

export default function Home() {
  const [loading, setLoading] = useState<Boolean>(true);

  const [player, setPlayer] = useState<Card[]>([]);
  const [oponent, setOponent] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);
  const [trash, setTrash] = useState<Card[]>([]);

  const deckRef: any = useRef(null);
  const trashRef: any = useRef(null);
  const oponentRef: any = useRef(null);
  const playerRef: any = useRef(null);

  const [trashPosition, setTrashPosition] = useState(0);
  const [oponentPosition, setOponentPosition] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [startPosition, setStartPosition] = useState(0);

  useEffect(() => {
    if (deckRef.current && trashRef.current && oponentRef.current && playerRef.current) {
      const deckRect = deckRef.current.getBoundingClientRect();
      const trashRect = trashRef.current.getBoundingClientRect();
      // const oponentRect = oponentRef.current.getBoundingClientRect();
      const playerRect = playerRef.current.getBoundingClientRect();

      // Calcula la distancia relativa desde el centro de Deck al centro de Trash
      const deckX = -(deckRect.left + deckRect.width / 2);
      const relativeX = (trashRect.left + trashRect.width / 2) - deckX;

      const relativeYPlayer = (playerRect.top + playerRect.height / 2) - (deckRect.top + deckRect.height / 2);

      setTrashPosition(relativeX);
      setStartPosition(deckX);
      setPlayerPosition(relativeYPlayer);
      // setLoading(false);
    }
  }, []);
  
  return (
    <View style={styles.container}>
      {/* {!loading &&  */}
        <Hand 
          ref={oponentRef}
          xPosition={startPosition}
          yPosition={oponentPosition}
          hand={oponent}
          setHand={setOponent}/>
      {/* } */}
      <View style={styles.mesa}>
        <Deck 
          ref={deckRef}
          setDeck={setDeck}
          sendToTrash={setTrash}
          trashPosition={trashPosition}
          sendPlayer={setPlayer}
          playerPosition={playerPosition}
          sendOponent={setOponent} 
          oponentPosition={oponentPosition} />
        <Trash
          ref={trashRef}
          trash={trash} />
      </View>
      {/* {!loading && */}
        <Hand
          ref={playerRef}
          xPosition={startPosition}
          yPosition={playerPosition}
          hand={player}
          setHand={setPlayer}/>
      {/* } */}
    </View>
  )
}
