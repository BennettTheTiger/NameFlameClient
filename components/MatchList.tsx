import React from 'react';
import { Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useActiveNameContext } from '@/contexts/activeNameContext';

function MatchList() {
    const { matches } = useActiveNameContext()

    if (matches.length === 0) {
        return <Text style={{ textAlign: 'center', padding: 10 }}>No matched names.</Text>
    }
    return (
        <>
            <View style={{ backgroundColor: Colors.core.tanLighter, height: 2 }} />
            {matches.map((name, index) => {
                return (
                    <React.Fragment key={name}>
                        <View style={{
                            padding: 5,
                            backgroundColor: Colors.core.tan,
                            borderRadius: 5,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                color: Colors.core.black,
                                fontSize: 16,
                                fontFamily: 'Bricolage-Grotesque',
                                fontWeight: '600',
                            }}>{index + 1}. {name}</Text>
                        </View>
                        <View style={{ backgroundColor: Colors.core.tanLighter, height: 2 }} />
                    </React.Fragment>
                );
            })}
        </>
    );
}

export default MatchList;