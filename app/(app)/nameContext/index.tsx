import React from 'react';
import { ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { NameContextListItem } from '@/components/NameContextListItem';
import { Colors } from '@/constants/Colors';

import { NameContext } from '@/types/NameContext';

import useApi from '@/hooks/useApi';

export default function NameContextListView() {
  const api = useApi();

  const [refreshing, setRefreshing] = React.useState(false);

  const [nameContexts, setNameContexts] = React.useState<NameContext[]>([]);

  function fetchNameContexts() {
    setRefreshing(true);
    api.get('/nameContexts').then((resp) => {
      setNameContexts(resp.data);
      console.log(resp);
      setRefreshing(false);
    }).catch((err) => {
      setRefreshing(false);
      alert(err);
    })
  }

  React.useEffect(() => {
    fetchNameContexts();
  }, [])

  if (refreshing) {
    return <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.core.orange} />
    </ThemedView>
  }

  return (
    <ThemedView style={{ flex: 1 }} lightColor={Colors.core.tan} darkColor={Colors.core.black}>
      <ScrollView
        style={{padding: 10}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchNameContexts}/>}>
          {nameContexts.map(nameContext => {
            return <NameContextListItem
              key={nameContext.id}
              id={nameContext.id}
              name={nameContext.name}
              matches={nameContext.matches.length}
              participants={nameContext.participants.length}
            />
          })}
      </ScrollView>
    </ThemedView>
  );
}
