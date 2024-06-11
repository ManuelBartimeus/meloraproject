import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function OnlyButton4() {
  const [isSearching, setIsSearching] = useState(true);
  const shazamAnimation = new Animated.Value(0);

  useEffect(() => {
    if (isSearching) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isSearching]);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(shazamAnimation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })
    ).start();
  };

  const stopAnimation = () => {
    shazamAnimation.stopAnimation();
    shazamAnimation.setValue(0);
  };

  const handleTap = () => {
    setIsSearching(prev => !prev);
  };

  return (
    <View style={styles.viewContainer}>
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={handleTap} style={styles.buttonContainer}>
          <Animated.Image
            source={require('./assets/meloraImage.png')}
            style={[
              styles.logo,
              {
                transform: [
                  {
                    rotate: shazamAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg']
                    })
                  }
                ]
              }
            ]}
          />
          {isSearching && (
            <View style={styles.rippleContainer}>
              {[0.5, 0.4, 0.3].map((opacity, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.ripple,
                    {
                      opacity,
                      transform: [
                        {
                          scale: shazamAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 4 + index]
                          })
                        }
                      ]
                    }
                  ]}
                />
              ))}
            </View>
          )}
        </TouchableOpacity>
      </View>
      {isSearching && (
        <View style={styles.listeningTextContainer}>
          <Text style={styles.listeningText}>Listening</Text>
          <Text style={styles.listeningSubText}>Make sure your device can hear the</Text>
          <Text style={styles.listeningSubText}>song clearly</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#132b47'
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    position: 'relative',
  },
  logo: {
    width: width * 0.3,
    height: (width * 0.324) * 0.92,
  },
  rippleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: (width * 0.4) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  listeningTextContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    alignSelf: 'center',
    alignItems:'center'
  },
  listeningText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
  listeningSubText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
});
