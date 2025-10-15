import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NewsCategory } from '@/types/news';

interface CategoryFilterProps {
  selectedCategory: NewsCategory | null;
  onSelectCategory: (category: NewsCategory | null) => void;
}

const CATEGORIES: { label: string; value: NewsCategory | null }[] = [
  { label: 'All', value: null },
  { label: 'Technology', value: 'technology' },
  { label: 'Business', value: 'business' },
  { label: 'Sports', value: 'sports' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Health', value: 'health' },
];

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {CATEGORIES.map(category => {
          const isSelected = selectedCategory === category.value;
          return (
            <TouchableOpacity
              key={category.label}
              style={[styles.button, isSelected && styles.buttonSelected]}
              onPress={() => onSelectCategory(category.value)}
              activeOpacity={0.7}>
              <Text style={[styles.buttonText, isSelected && styles.buttonTextSelected]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  buttonSelected: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
});
