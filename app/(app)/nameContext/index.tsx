import React, { useEffect } from 'react';
import { ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { NameContextListItem } from '@/components/NameContextListItem';
import { Colors } from '@/constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
import { NameContext } from '@/types/NameContext';

import useApi from '@/hooks/useApi';
import { useSocket } from '@/contexts/socketContext';
import showNotification from '@/notifications/showNotification';
import { useSystemUserContext } from '@/contexts/systemUserContext';

export default function NameContextListView() {
  const api = useApi();
  const { socket } = useSocket();
  const { systemUser } = useSystemUserContext();

  const [refreshing, setRefreshing] = React.useState(false);

  const [nameContexts, setNameContexts] = React.useState<NameContext[]>([]);

  function fetchNameContexts() {
    setRefreshing(true);
    api.get('/nameContexts').then((resp) => {
      setNameContexts(resp.data);
      setRefreshing(false);
    }).catch((err) => {
      setRefreshing(false);
    })
  };

  useEffect(() => {
    if (socket) {
      nameContexts.forEach(nameContext => {
        socket.emit('joinNameContext', nameContext.id);
      });

      socket.on('nameContextUpdated', (nameContext: NameContext) => {
        setNameContexts((prevNameContexts) =>
          prevNameContexts.map((context) =>
            context.id === nameContext.id ? { ...context, ...nameContext } : context
          )
        );
      })

      if (systemUser?.allowNotifications) {
        socket.on('newMatch', (nameContext: NameContext) => {
          console.log('newMatch', systemUser);

          showNotification(
            `New Matches for ${nameContext.name}`,
            `The name context "${nameContext.name}" has new matches.`,
            { nameContextId: nameContext.id }
          );
        });
      }

    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('nameContextUpdated');
      socket.off('newMatch');
    }
  }}, [nameContexts, socket, systemUser]);

  useFocusEffect(
    React.useCallback(() => {
      fetchNameContexts();
    }, [])
  );

  if (refreshing) {
    return <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={Colors.core.orange} />
    </ThemedView>
  }

  function renderNameContextData() {
    if (nameContexts.length === 0) {
      return <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>No Name Contexts found. Add one to begin!</ThemedText>
      </ThemedView>
    }

    return nameContexts.map(nameContext => {
      return <NameContextListItem
        key={nameContext.id}
        id={nameContext.id}
        name={nameContext.name}
        matches={nameContext.matches}
        participants={nameContext.participants}
        updatedAt={nameContext.updatedAt}
      />
    })
  }

  return (
    <ThemedView style={{ flex: 1 }} lightColor={Colors.core.tan} darkColor={Colors.core.black}>
      <ScrollView
        style={{padding: 10}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchNameContexts}/>}>
          {renderNameContextData()}
      </ScrollView>
    </ThemedView>
  );
}
