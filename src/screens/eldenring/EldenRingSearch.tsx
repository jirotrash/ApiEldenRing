import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useEldenRingSearch } from '../../hooks/useEldenRingSearch';
import { EldenRingCard } from '../../components/EldenRingCard';
import { EldenRingDetail } from '../../components/EldenRingDetail';
import { EldenRingElement } from '../../interfaces/eldenRingInterfaces';

interface Props {
  navigation: any;
}

export const EldenRingSearch: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<EldenRingElement | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<string>('');
  const [showDetail, setShowDetail] = useState(false);
  
  const { results, loading, error, search, clearResults } = useEldenRingSearch();

  const handleSearch = () => {
    if (searchQuery.trim().length >= 2) {
      search(searchQuery.trim());
    } else {
      clearResults();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearResults();
  };

  const handleItemPress = (item: EldenRingElement, itemType: string) => {
    setSelectedItem(item);
    setSelectedItemType(itemType);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedItem(null);
    setSelectedItemType('');
  };

  const getTotalResults = () => {
    if (!results) return 0;
    return results.items.length + 
           results.creatures.length + 
           results.bosses.length + 
           results.weapons.length + 
           results.armors.length;
  };

  const renderSection = (
    title: string,
    items: EldenRingElement[],
    contentType: string,
    emoji: string
  ) => {
    if (items.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {emoji} {title} ({items.length})
        </Text>
        {items.map((item, index) => (
          <EldenRingCard
            key={`${contentType}-${item.id}-${index}`}
            item={item}
            onPress={(item) => handleItemPress(item, contentType)}
            contentType={contentType}
          />
        ))}
      </View>
    );
  };

  const renderResults = () => {
    if (!results) return null;

    const totalResults = getTotalResults();

    if (totalResults === 0 && searchQuery.length >= 2) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>Sin resultados</Text>
          <Text style={styles.emptyDescription}>
            No se encontraron elementos que coincidan con "{searchQuery}"
          </Text>
        </View>
      );
    }

    if (totalResults > 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              Se encontraron {totalResults} resultados para "{searchQuery}"
            </Text>
          </View>

          {renderSection('Objetos', results.items, 'items', '🎒')}
          {renderSection('Criaturas', results.creatures, 'creatures', '🐺')}
          {renderSection('Jefes', results.bosses, 'bosses', '👹')}
          {renderSection('Armas', results.weapons, 'weapons', '⚔️')}
          {renderSection('Armaduras', results.armors, 'armors', '🛡️')}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      );
    }

    return null;
  };

  const renderSearchTips = () => (
    <View style={styles.tipsContainer}>
      <Text style={styles.tipsTitle}>💡 Consejos de búsqueda</Text>
      <View style={styles.tipItem}>
        <Text style={styles.tipText}>• Busca por nombre de elemento (ej: "Sword")</Text>
      </View>
      <View style={styles.tipItem}>
        <Text style={styles.tipText}>• Usa al menos 2 caracteres para buscar</Text>
      </View>
      <View style={styles.tipItem}>
        <Text style={styles.tipText}>• La búsqueda es en inglés</Text>
      </View>
      <View style={styles.tipItem}>
        <Text style={styles.tipText}>• Ejemplos: "Margit", "Uchigatana", "Flask"</Text>
      </View>
    </View>
  );

  if (showDetail && selectedItem) {
    return (
      <EldenRingDetail
        item={selectedItem}
        contentType={selectedItemType}
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
          <Text style={styles.headerTitle}>Búsqueda Global</Text>
          <Text style={styles.headerSubtitle}>Busca en toda la base de datos</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar objetos, jefes, armas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
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
          style={[
            styles.searchButton,
            { backgroundColor: searchQuery.length >= 2 ? '#FFD700' : '#CCCCCC' }
          ]}
          onPress={handleSearch}
          disabled={searchQuery.length < 2}
        >
          <Text style={styles.searchButtonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFD700" />
            <Text style={styles.loadingText}>Buscando...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>Error en la búsqueda</Text>
            <Text style={styles.errorDescription}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={handleSearch}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && (
          <>
            {results ? renderResults() : renderSearchTips()}
          </>
        )}
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#999999',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999999',
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C1810',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
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
  tipsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
  },
  resultsHeader: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  sectionContainer: {
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
  bottomSpacer: {
    height: 20,
  },
});