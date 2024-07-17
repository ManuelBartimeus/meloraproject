import {FontAwesome } from '@expo/vector-icons';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function ResultsNotFound() {
  return (
    <View style={styles.container}>
     <FontAwesome name="ban" size={width * 0.27} color="#FFFFFF" style={styles.icon}/>
      <Text style={styles.NoResulttext} >No Result</Text>
       <Text style={styles.Messagetext} >We didn't quite catch that</Text>
       <TouchableOpacity style={styles.touchableButton} >
        <Text style={styles.TryAgaintext}> Try Again </Text>
       </TouchableOpacity>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#421572',
  },
  NoResulttext: {
    fontSize: 29,
    color: '#FFFFFF',
    fontWeight:'bold',
    marginLeft: width * 0.335,
    marginTop: height * 0.34,
  },  icon: {
    marginLeft: width * 0.38,
    top: height * 0.33,
    bottom: height * 0.02,
  },
  Messagetext: {
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: width * 0.27,
    marginTop: height * 0.01,
},
TryAgaintext: {
    fontSize: 30,
    backgroundColor: '#3660D1',
    marginLeft: width * 0.01,
    marginTop: height * 0.1,
   alignSelf:'center'
  },
  touchableButton:{
    borderRadius:'100',
    backgroundColor:''
  }
});