import {StyleSheet} from 'react-native';

export default Styles = StyleSheet.create({
  View: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Card: {
    width: '70%',
    height: '55%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
  },
  ImageRight: {
    width: 325,
    height: 368,
    position: 'absolute',
    right: -80,
    bottom: -90,
  },
  ImageLeft: {
    width: 240,
    height: 253,
    position: 'absolute',
    left: -75,
    top: 0,
  },
});
