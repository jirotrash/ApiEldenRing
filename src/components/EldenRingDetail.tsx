import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { EldenRingElement } from '../interfaces/eldenRingInterfaces';

interface Props {
  item: EldenRingElement;
  contentType: string;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

export const EldenRingDetail: React.FC<Props> = ({ item, contentType, onClose }) => {
  
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

  const renderStats = () => {
    if (contentType === 'classes' && 'stats' in item && item.stats) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
          <View style={styles.statsGrid}>
            {Object.entries(item.stats).map(([key, value]) => (
              <View key={key} style={styles.statItem}>
                <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.statValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  const renderAttackStats = () => {
    if ('attack' in item && item.attack) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>⚔️ Ataque</Text>
          <View style={styles.statsGrid}>
            {Object.entries(item.attack).map(([key, value]) => (
              <View key={key} style={styles.statItem}>
                <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.statValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  const renderDefenseStats = () => {
    if ('defence' in item && item.defence) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🛡️ Defensa</Text>
          <View style={styles.statsGrid}>
            {Object.entries(item.defence).map(([key, value]) => (
              <View key={key} style={styles.statItem}>
                <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Text style={styles.statValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  const renderRequirements = () => {
    if ('requiredAttributes' in item && item.requiredAttributes) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📋 Requisitos</Text>
          <View style={styles.statsGrid}>
            {Object.entries(item.requiredAttributes).map(([key, value]) => (
              <View key={key} style={styles.statItem}>
                <Text style={styles.statLabel}>{key.toUpperCase()}</Text>
                <Text style={styles.statValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    }
    return null;
  };

  const renderBasicInfo = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>ℹ️ Información General</Text>
      
      {'location' in item && item.location && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📍 Ubicación:</Text>
          <Text style={styles.infoValue}>{item.location}</Text>
        </View>
      )}
      
      {'region' in item && item.region && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🗺️ Región:</Text>
          <Text style={styles.infoValue}>{item.region}</Text>
        </View>
      )}
      
      {'type' in item && item.type && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🔖 Tipo:</Text>
          <Text style={styles.infoValue}>{item.type}</Text>
        </View>
      )}
      
      {'category' in item && item.category && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📂 Categoría:</Text>
          <Text style={styles.infoValue}>{item.category}</Text>
        </View>
      )}
      
      {'scaling' in item && item.scaling && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📈 Escalado:</Text>
          <Text style={styles.infoValue}>{item.scaling}</Text>
        </View>
      )}
      
      {'weight' in item && item.weight && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>⚖️ Peso:</Text>
          <Text style={styles.infoValue}>{item.weight}</Text>
        </View>
      )}
      
      {'cost' in item && item.cost && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>💰 Costo:</Text>
          <Text style={styles.infoValue}>{item.cost}</Text>
        </View>
      )}
      
      {'fpCost' in item && item.fpCost && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🔮 Costo FP:</Text>
          <Text style={styles.infoValue}>{item.fpCost}</Text>
        </View>
      )}
      
      {'hpCost' in item && item.hpCost && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>❤️ Costo HP:</Text>
          <Text style={styles.infoValue}>{item.hpCost}</Text>
        </View>
      )}
      
      {'slots' in item && item.slots && (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎰 Espacios:</Text>
          <Text style={styles.infoValue}>{item.slots}</Text>
        </View>
      )}
    </View>
  );

  const renderEffects = () => {
    const effects = [];
    
    if ('effect' in item && item.effect) {
      effects.push({ label: '✨ Efecto', value: item.effect });
    }
    
    if ('effects' in item && item.effects) {
      effects.push({ label: '✨ Efectos', value: item.effects });
    }
    
    if ('skill' in item && item.skill) {
      effects.push({ label: '🎯 Habilidad', value: item.skill });
    }
    
    if ('affinity' in item && item.affinity) {
      effects.push({ label: '🔗 Afinidad', value: item.affinity });
    }

    if (effects.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🎭 Efectos y Habilidades</Text>
        {effects.map((effect, index) => (
          <View key={index} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{effect.label}:</Text>
            <Text style={styles.infoValue}>{effect.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderDrops = () => {
    if ('drops' in item && item.drops && Array.isArray(item.drops) && item.drops.length > 0) {
      return (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>💎 Objetos que deja</Text>
          {item.drops.map((drop, index) => (
            <Text key={index} style={styles.dropItem}>• {drop}</Text>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderWeaknessResistance = () => {
    const sections = [];
    
    if ('weakness' in item && item.weakness && Array.isArray(item.weakness) && item.weakness.length > 0) {
      sections.push({
        title: '🎯 Debilidades',
        items: item.weakness,
        color: '#FF6B6B'
      });
    }
    
    if ('resistance' in item && item.resistance && Array.isArray(item.resistance) && item.resistance.length > 0) {
      sections.push({
        title: '🛡️ Resistencias',
        items: item.resistance,
        color: '#4ECDC4'
      });
    }

    if (sections.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        {sections.map((section, index) => (
          <View key={index} style={[styles.subsection, index > 0 && { marginTop: 16 }]}>
            <Text style={[styles.sectionTitle, { color: section.color }]}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <Text key={itemIndex} style={[styles.dropItem, { color: section.color }]}>
                • {item}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Imagen y título principal */}
        <View style={[styles.mainHeader, { borderBottomColor: getCardColor() }]}>
          <View style={styles.imageContainer}>
            {item.image ? (
              <Image 
                source={{ uri: item.image }} 
                style={styles.mainImage}
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
          
          <View style={styles.titleContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={[styles.contentType, { color: getCardColor() }]}>
              {formatContentType(contentType)}
            </Text>
          </View>
        </View>

        {/* Descripción */}
        {item.description && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>📜 Descripción</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}

        {/* Información básica */}
        {renderBasicInfo()}

        {/* Estadísticas (para clases) */}
        {renderStats()}

        {/* Ataque */}
        {renderAttackStats()}

        {/* Defensa */}
        {renderDefenseStats()}

        {/* Requisitos */}
        {renderRequirements()}

        {/* Efectos */}
        {renderEffects()}

        {/* Objetos que deja */}
        {renderDrops()}

        {/* Debilidades y resistencias */}
        {renderWeaknessResistance()}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  mainHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 3,
  },
  imageContainer: {
    marginRight: 20,
  },
  mainImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titleContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  contentType: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  dropItem: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },
  subsection: {
    marginTop: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});