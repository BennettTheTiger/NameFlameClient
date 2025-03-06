import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Colors } from '@/constants/Colors';

type NamePopularity = {
  males: number;
  females: number;
};

type PopularityForYear = {
  [year: string]: NamePopularity;
};

type NamePopularityProps = {
  popularity: PopularityForYear;
  gender: 'male' | 'female' | 'neutral';
};

export function NamePopularityGraph(props: NamePopularityProps) {
  const { popularity, gender } = props;

  const maleData = Object.keys(popularity).map((year) => ({
    value: popularity[year].males || 0,
    label: year,
  }));

  const femaleData = Object.keys(popularity).map((year) => ({
    value: popularity[year].females || 0,
    label: year,
  }));

  // Get screen width
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { width: screenWidth }]}>
        <LineChart
          curved
          data={gender === 'male' ? maleData : femaleData}
          color={gender === 'male' ? Colors.core.orange : Colors.core.purple}
          dataPointsColor={gender === 'male' ? Colors.core.orange : Colors.core.purple}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

