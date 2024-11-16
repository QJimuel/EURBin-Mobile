import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, Linking } from 'react-native';

const ArticlePreview = ({ articleUrl }) => {
  const [metaData, setMetaData] = useState({ title: '', image: '' });
  const [loading, setLoading] = useState(true);

  // Function to fetch Open Graph metadata
  const fetchOpenGraphData = async (url) => {
    try {
      const response = await fetch(url);
      const html = await response.text();

      // Regex to extract Open Graph metadata
      const titleMatch = html.match(/<meta property="og:title" content="(.*?)"/);
      const imageMatch = html.match(/<meta property="og:image" content="(.*?)"/);

      const title = titleMatch ? titleMatch[1] : 'No Title Found';
      const image = imageMatch ? imageMatch[1] : 'https://via.placeholder.com/150'; // Fallback image if none is found

      setMetaData({ title, image });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching metadata:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenGraphData(articleUrl);
  }, [articleUrl]);

  const handlePress = () => {
    // Open the URL in the default web browser
    Linking.openURL(articleUrl).catch((err) => console.error("Couldn't load page", err));
  };

  if (loading) {
    return <ActivityIndicator  color="#800000" />;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: metaData.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{metaData.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Recycle Page Component to show list of articles
const RecyclePage = () => {
  const articleUrls = [
    'https://www.plasticsoupfoundation.org/en/plastic-problem/sustainable-development/individual-sdgs/',
    'https://www.rts.com/blog/plastic-bottle-recycling-facts/',
    'https://education.nationalgeographic.org/resource/one-bottle-time/',
    'https://healthyhumanlife.com/blogs/news/plastic-water-bottle-pollution-plastic-bottles-end',
    // Add more article URLs here
  ];

  
  const renderItem = ({ item }) => <ArticlePreview articleUrl={item} />;

  return (
    <FlatList
      style={styles.scrollContainer}
      data={articleUrls}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()} // Unique key for each item
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RecyclePage;