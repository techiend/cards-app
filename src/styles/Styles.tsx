import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  hand: {
    width: '100%',
    height: '30%',
    display: 'flex',           // No necesario en RN, pero se incluye para web
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: 'yellow',
  },
  mesa: {
    width: '100%',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
  },
  deckContainer: {
    width: '100%',
    height: '100%',
  },
  deck: {
    display: 'flex',           // No necesario en RN, pero se incluye para web
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: 'green' // Descomentado como en el original
  },
  basura: {
    display: 'flex',           // No necesario en RN, pero se incluye para web
    alignItems: 'center',
    width: '50%',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: 'red'  // Descomentado como en el original
  },
  card: {
    position: 'absolute',      // Compatible con RN
    willChange: 'transform',
    display: 'flex',           // No necesario en RN, pero útil para web
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'none',

    backgroundColor: 'transparent',
    backgroundSize: '100%',    // No nativo en RN, se maneja con ImageBackground o estilos dinámicos
    backgroundRepeat: 'no-repeat', // No nativo, se asume por defecto
    backgroundPosition: 'center',  // No nativo, se asume con align y justify
    width: '45%',             // RN no usa 'vh', ajustado más abajo
    maxWidth: 196,             // En píxeles, compatible
    height: '85%',            // RN no usa 'vh', ajustado más abajo
    maxHeight: 285,            // En píxeles, compatible
  },
});

export default styles;