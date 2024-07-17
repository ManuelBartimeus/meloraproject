import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

import Praise from './assets/Praise.jpg';
import Joy from './assets/Joy.jpg';
import Born from './assets/Born.jpg';
import Good from './assets/Good.jpg';
import Sure from './assets/Sure.jpg';
import Same from './assets/Same.png';

const songTitles = [
  "Back To Life - Bethel Music and Zahriya Zachary",
  "Praise - Elevation Worship",
  "Been So Good - Elevation Worship",
  "Sure Been Good - Elevation Worship",
  "Same God - Elevation Worship",
  "joy. - for KING & COUNTRY",
];

const images = [
  Born,
  Praise, // Use the imported image
  Good,
  Sure,
  Same,
  Joy,
];

const songs = [
  require('./assets/02. Back To Life (Live).mp3'),
  require('./assets/Praise_feat_Brandon_Lake_Chris_Brown_Chandler_Moore_Elevation_WorshipMP3.mp3'),
  require('./assets/Elevation_Worship,_Tiffany_Hudson_Been_So_Good_feat_Tiffany.mp4.mp3'),
  require('./assets/elevation_worship_sure_been_good_feat_tiffany_hudson_elevation_w.m4a'),
  require('./assets/Elevation_Worship_-_Same_God_CeeNaija.com_.mp3'),
  require('./assets/joy. - for KING   COUNTRY.m4a'),
];

export default function Library() {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -100) { // Swipe left threshold
          navigation.navigate('Home'); // Navigate to Home on swipe left
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  async function playSound(index) {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      if (playingIndex === index) {
        setPlayingIndex(null);
        return;
      }
    }

    const { sound: newSound } = await Audio.Sound.createAsync(songs[index]);
    setSound(newSound);
    setIsPlaying(true);
    setPlayingIndex(index);
    await newSound.playAsync();
  }

  return (
    <LinearGradient
      colors={['#195497', '#000033']}
      style={styles.scrollContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.viewContainer} {...panResponder.panHandlers}>
          <View style={styles.libraryTextAndIcon}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.gearIcon}>
              <FontAwesome name="gear" size={width * 0.1} color="white" />
            </TouchableOpacity>
            <Text style={styles.libraryText}>Library</Text>
          </View>

          <View style={styles.tabContainer0}>
            <TouchableOpacity style={styles.tab0}>
              <Text style={styles.tabText}>Melora Hits</Text>
              <FontAwesome name="music" size={width * 0.06} color="gray" style={styles.tabIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab0}>
              <Text style={styles.tabText}>Artists</Text>
              <FontAwesome6 name="headphones" size={width * 0.06} color="gray" style={styles.tabIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab0}>
              <Text style={styles.tabText}>Playlists for you</Text>
              <FontAwesome6 name="list-check" size={width * 0.06} color="gray" style={styles.tabIcon} />
            </TouchableOpacity>
          </View>

          <View><Text style={styles.subHead}>Recent Hits</Text></View>
          <View style={styles.tabContainer1}>
            {images.map((image, index) => (
              <TouchableOpacity key={index} style={styles.tab} onPress={() => playSound(index)}>
                <Image source={image} style={styles.tabImage} />
                <FontAwesome name={isPlaying && playingIndex === index ? "pause" : "play"} size={width * 0.1} color="white" style={styles.playPauseIcon} />
                <View style={styles.tabFooter}>
                <Text style={styles.footerText}>{songTitles[index]}</Text>
      
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.03,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: height * 0.005,
  },
  libraryTextAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.05
  },
  libraryText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: width * -0.08,
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  tabContainer1: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    marginTop: height * 0.02,
  },
  tab: {
    width: (width * 0.5) - (width * 0.06), // Adjusted for equal spacing
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'lightgray',
    height: height * 0.4,
    borderRadius: 12,
    marginHorizontal: width * 0.02,
    flexDirection: 'column',
    margin: height * 0.01,
    overflow: 'hidden',
  },
  tabImage: {
    width: '100%',
    height: '85%',
    borderRadius: 12,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },
  tabFooter: {
    width: '100%',
    height: '15%',
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  footerText: {
    color: 'white',
    fontSize: width * 0.03,
    marginRight: width * 0.02,
  },
  footerIcon: {
    color: 'white',
  },
  subHead: {
    fontSize: width * 0.065,
    color: '#ffffff',
  },
  gearIcon: {
    right: width * 0.3,
  },
  tabText: {
    marginLeft: 10,
  },
  tabIcon: {
    marginLeft: 'auto',
    right: 10,
  },
  playPauseIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  tab0: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    height: height * 0.06,
    borderRadius: 5,
    marginHorizontal: width * 0.01,
    flexDirection: 'row',
    margin: height * 0.01,
  },
  tabContainer0: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
});
