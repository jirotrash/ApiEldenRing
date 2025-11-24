import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { EldenRingContentType } from '../../interfaces/eldenRingInterfaces';

interface Props {
  navigation: any;
}

const { width } = Dimensions.get('window');

const categoryData = [
  {
    id: EldenRingContentType.ITEMS,
    title: 'Objetos',
    icon: '🎒',
    description: 'Objetos consumibles y otros elementos',
    color: '#4A90E2',
  },
  {
    id: EldenRingContentType.CREATURES,
    title: 'Criaturas',
    icon: '🐺',
    description: 'Enemigos y bestias del mundo',
    color: '#8B4513',
  },
  {
    id: EldenRingContentType.BOSSES,
    title: 'Jefes',
    icon: '👹',
    description: 'Jefes principales y mini-jefes',
    color: '#DC143C',
  },
  {
    id: EldenRingContentType.WEAPONS,
    title: 'Armas',
    icon: '⚔️',
    description: 'Espadas, arcos y otras armas',
    color: '#FFD700',
  },
  {
    id: EldenRingContentType.ARMORS,
    title: 'Armaduras',
    icon: '🛡️',
    description: 'Armaduras y protección',
    color: '#708090',
  },
  {
    id: EldenRingContentType.SORCERIES,
    title: 'Hechizos',
    icon: '🔮',
    description: 'Hechizos de inteligencia',
    color: '#9370DB',
  },
  {
    id: EldenRingContentType.INCANTATIONS,
    title: 'Incantaciones',
    icon: '✨',
    description: 'Hechizos de fe',
    color: '#FFA500',
  },
  {
    id: EldenRingContentType.SPIRITS,
    title: 'Espíritus',
    icon: '👻',
    description: 'Espíritus invocables',
    color: '#98FB98',
  },
  {
    id: EldenRingContentType.CLASSES,
    title: 'Clases',
    icon: '🎭',
    description: 'Clases iniciales del juego',
    color: '#FF6347',
  },
  {
    id: EldenRingContentType.TALISMANS,
    title: 'Talismanes',
    icon: '🏺',
    description: 'Talismanes y accesorios',
    color: '#DDA0DD',
  },
  {
    id: EldenRingContentType.ASHES,
    title: 'Cenizas',
    icon: '🔥',
    description: 'Cenizas de guerra',
    color: '#A0522D',
  },
  {
    id: EldenRingContentType.AMMOS,
    title: 'Municiones',
    icon: '🏹',
    description: 'Flechas y municiones',
    color: '#696969',
  },
  {
    id: EldenRingContentType.LOCATIONS,
    title: 'Ubicaciones',
    icon: '🏰',
    description: 'Lugares del mundo',
    color: '#32CD32',
  },
];

export const EldenRingHome: React.FC<Props> = ({ navigation }) => {
  
  const navigateToCategory = (contentType: EldenRingContentType, title: string) => {
    navigation.navigate('EldenRingList', {
      contentType,
      title,
    });
  };

  const navigateToSearch = () => {
    navigation.navigate('EldenRingSearch');
  };

  const renderCategoryCard = (category: typeof categoryData[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[styles.categoryCard, { borderLeftColor: category.color }]}
      onPress={() => navigateToCategory(category.id, category.title)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
          <Text style={styles.categoryIcon}>{category.icon}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color: category.color }]}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Elden Ring</Text>
        <Text style={styles.headerSubtitle}>Guía Completa</Text>
      </View>

      {/* Search Button */}
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={navigateToSearch}
        activeOpacity={0.8}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Buscar en toda la base de datos</Text>
      </TouchableOpacity>

      {/* Categories */}
      <ScrollView 
        style={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Explora las Categorías</Text>
        
        {categoryData.map(renderCategoryCard)}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Explora el vasto mundo de Elden Ring y descubre todos sus secretos
          </Text>
        </View>
      </ScrollView>
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D4AF37',
    textAlign: 'center',
    marginTop: 4,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  searchText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
  },
  categoriesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginVertical: 16,
    textAlign: 'center',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
  },
  arrowContainer: {
    marginLeft: 12,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});