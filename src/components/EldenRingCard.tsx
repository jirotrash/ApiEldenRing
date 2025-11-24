import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions 
} from 'react-native';
import { EldenRingElement } from '../interfaces/eldenRingInterfaces';

interface Props {
  item: EldenRingElement;
  onPress: (item: EldenRingElement) => void;
  contentType: string;
}

const { width } = Dimensions.get('window');

export const EldenRingCard: React.FC<Props> = ({ item, onPress, contentType }) => {
  
  const getCardColor = () => {
    switch (contentType.toLowerCase()) {
      case 'items': return '#4A90E2';
      case 'creatures': return '#8B4513';
      case 'bosses': return '#DC143C';
      case 'weapons': return '#FFD700';
      case 'armors': return '#708090';
      case 'sorceries': return '#9370DB';
      case 'spirits': return '#98FB98';
      case 'classes': return '#FF6347';
      case 'talismans': return '#DDA0DD';
      case 'incantations': return '#FFA500';
      case 'ashes': return '#A0522D';
      case 'ammos': return '#696969';
      case 'locations': return '#32CD32';
      default: return '#888888';
    }
  };

  const truncateText = (text: string, maxLength: number = 100): string => {
    if (!text) return 'Sin descripción disponible';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const formatContentType = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'items': 'Objeto',
      'creatures': 'Criatura',
      'bosses': 'Jefe',
      'weapons': 'Arma',
      'armors': 'Armadura',
      'sorceries': 'Hechizo',
      'spirits': 'Espíritu',
      'classes': 'Clase',
      'talismans': 'Talismán',
      'incantations': 'Incantación',
      'ashes': 'Ceniza',
      'ammos': 'Munición',
      'locations': 'Ubicación'
    };
    return typeMap[type.toLowerCase()] || type;
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: getCardColor() }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image 
              source={{ uri: item.image }} 
              style={styles.itemImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.placeholderImage, { backgroundColor: getCardColor() }]}>
              <Text style={styles.placeholderText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.headerInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={[styles.contentType, { color: getCardColor() }]}>
            {formatContentType(contentType)}
          </Text>
        </View>
      </View>

      <Text style={styles.itemDescription}>
        {truncateText(item.description || 'Sin descripción disponible')}
      </Text>

      {/* Información adicional según el tipo */}
      <View style={styles.additionalInfo}>
        {'location' in item && item.location && (
          <Text style={styles.additionalText}>📍 {item.location}</Text>
        )}
        {'effect' in item && item.effect && (
          <Text style={styles.additionalText}>✨ {truncateText(item.effect, 50)}</Text>
        )}
        {'scaling' in item && item.scaling && (
          <Text style={styles.additionalText}>📈 {item.scaling}</Text>
        )}
        {'type' in item && item.type && (
          <Text style={styles.additionalText}>🔖 {item.type}</Text>
        )}
        {'category' in item && item.category && (
          <Text style={styles.additionalText}>📂 {item.category}</Text>
        )}
        {'region' in item && item.region && (
          <Text style={styles.additionalText}>🗺️ {item.region}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageContainer: {
    marginRight: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  contentType: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  additionalInfo: {
    marginTop: 8,
  },
  additionalText: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
});