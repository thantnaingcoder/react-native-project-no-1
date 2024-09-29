import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const data = [
  {
    id: '1',
    title: 'First Slide',
    image: 'https://via.placeholder.com/1200x800',
  },
  {
    id: '2',
    title: 'Second Slide',
    image: 'https://via.placeholder.com/1200x800/ff7f7f',
  },
  {
    id: '3',
    title: 'Third Slide',
    image: 'https://via.placeholder.com/1200x800/87cefa',
  },
];

export default function CarouselBackground() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        {/* Background image for the slide */}
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={data}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={true} // Make the carousel loop infinitely
        autoplay={true} // Autoplay the slides
        autoplayInterval={3000} // Set the autoplay interval
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: darken background to improve text visibility
    padding: 20,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
