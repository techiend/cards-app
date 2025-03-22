import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native';

// import styles from '@/styles/Styles';

import styles from './styles.module.css';
import Deck from '@/components/Deck/Deck';
import Trash from '@/components/Trash/Trash';
// import Deck from './Deck';
// import Trash from './Trash';

export default function Index() {
  const [trash, setTrash] = useState<string[]>([]);
  const deckRef: any = useRef(null);
  const trashRef: any = useRef(null);
  const [trashPosition, setTrashPosition] = useState(0);

  useEffect(() => {
    console.log('Cargandooo...')
    if (deckRef.current && trashRef.current) {
      const deckRect = deckRef.current.getBoundingClientRect();
      const trashRect = trashRef.current.getBoundingClientRect();
      // Calcula la distancia relativa desde el centro de Deck al centro de Trash
      const relativeX = (trashRect.left + trashRect.width / 2) - (deckRect.left + deckRect.width / 2);
      setTrashPosition(relativeX);
    }
  }, []);
  
  return (
    <div className={styles.mesa}>
      <Deck ref={deckRef} sendToTrash={setTrash} trashPosition={trashPosition} />
      <Trash ref={trashRef} trash={trash} />
    </div>
  )
}
