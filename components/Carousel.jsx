import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ data, autoScrollInterval = null }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = data.length;

  // Auto-scroll functionality
  useEffect(() => {
    let interval = null;
    if (autoScrollInterval) {
      interval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalItems) {
          nextIndex = 0;
        }
        scrollToIndex(nextIndex);
      }, autoScrollInterval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, autoScrollInterval, totalItems]);

  const scrollToIndex = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * index, animated: true });
      setCurrentIndex(index);
    }
  };

  const onScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setCurrentIndex(index);
  };

  const renderItems = () => {
    return data.map((item, index) => (
      <View style={styles.itemContainer} key={index}>
        <Image resizeMode='contain' source={{ uri: item.image }} style={styles.image} />
      
      </View>
    ));
  };

  const renderIndicators = () => {
    return (
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        // Enable snapping to intervals
        decelerationRate="fast"
      >
        {renderItems()}
      </ScrollView>
      {renderIndicators()}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: 150, // Adjust the height as needed
  },
  itemContainer: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: set a background color
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  captionContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    paddingVertical: 5,
  },
  caption: {
    color: '#fff',
    fontSize: 16,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  backgroundImage: {
    borderRadius: 20,
    width: "100%",
    height: 145,
    justifyContent: "center", // Center the content
    
  },
});

export default Carousel;
