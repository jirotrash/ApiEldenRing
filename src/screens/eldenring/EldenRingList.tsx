import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useEldenRingData } from '../../hooks/useEldenRingData';
import { EldenRingCard } from '../../components/EldenRingCard';
import { EldenRingDetail } from '../../components/EldenRingDetail';
import { EldenRingElement, EldenRingContentType } from '../../interfaces/eldenRingInterfaces';

interface Props {
  navigation: any;
  route: {
    params: {
      contentType: EldenRingContentType;
      title: string;
    };
  };
}

export const EldenRingList: React.FC<Props> = ({ navigation, route }) => {
  const { contentType, title } = route.params;
  
  const [selectedItem, setSelectedItem] = useState<EldenRingElement | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    search,
    clearSearch,
  } = useEldenRingData(contentType, 20);

  const handleItemPress = (item: EldenRingElement) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedItem(null);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery.trim());
    } else {
      clearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearch();
  };

  const renderItem = ({ item }: { item: EldenRingElement }) => (
    <EldenRingCard
      item={item}
      onPress={handleItemPress}
      contentType={contentType}
    />
  );

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Buscar en ${title.toLowerCase()}...`}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearSearch}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
      >
        <Text style={styles.searchButtonText}>🔍</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => {
    if (!loading || data.length === 0) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#FFD700" />
        <Text style={styles.loadingText}>Cargando más elementos...</Text>
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={styles.emptyTitle}>No se encontraron resultados</Text>
      <Text style={styles.emptyDescription}>
        {searchQuery ? 
          `No hay elementos que coincidan con "${searchQuery}"` :
          `No hay datos disponibles para ${title.toLowerCase()}`
        }
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={styles.errorTitle}>Error al cargar datos</Text>
      <Text style={styles.errorDescription}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={refresh}>
        <Text style={styles.retryButtonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );

  if (showDetail && selectedItem) {
    return (
      <EldenRingDetail
        item={selectedItem}
        contentType={contentType}
        onClose={handleCloseDetail}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerSubtitle}>
            {data.length > 0 && `${data.length} elementos`}
          </Text>
        </View>
      </View>

      {error ? renderError() : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={!loading ? renderEmpty : null}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={loading && data.length === 0}
              onRefresh={refresh}
              tintColor="#FFD700"
              colors={["#FFD700"]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Loading overlay para carga inicial */}
      {loading && data.length === 0 && !error && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFD700" />
          <Text style={styles.loadingText}>Cargando {title.toLowerCase()}...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2C1810',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#D4AF37',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
    padding: 8,
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999999',
  },
  searchButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFD700',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 20,
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorDescription: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
  },
});