import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NoticeCard } from '../components/NoticeCard';
import { mockNotices, Notice } from '../constants/mockNotices';
import { useLocalSearchParams } from 'expo-router';

const ITEMS_PER_PAGE = 10;

export default function NoticesScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filteredNotices = mockNotices.filter(notice => 
    notice.category === category &&
    (notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     notice.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const paginatedNotices = filteredNotices.slice(0, page * ITEMS_PER_PAGE);

  const handleLoadMore = useCallback(() => {
    if (loading || paginatedNotices.length >= filteredNotices.length) return;

    setLoading(true);
    ToastAndroid.show('Fetching more notices...', ToastAndroid.SHORT);
    
    // Simulate API call delay
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  }, [loading, paginatedNotices.length, filteredNotices.length]);

  const renderItem = ({ item }: { item: Notice }) => (
    <NoticeCard
      notice={item}
      onPress={() => {
        // Handle notice press
        console.log('Notice pressed:', item.id);
      }}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category} Notices</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notices..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={paginatedNotices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
}); 