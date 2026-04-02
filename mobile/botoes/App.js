import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.icone}>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#804256',
    alignItems: 'center',
    justifyContent: 'center',
    width: 450,
    height: 950,
  },
  botao:{
    backgroundColor: '#716f35',
    width: 150,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: '#a09d51',
    borderWidth: 5,
  },

  icone:{
    width: 40,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
