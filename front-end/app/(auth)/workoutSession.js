import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const WorkoutSession = () => {
    return (
        <View style={styles.container}>
            <Button title="Workout Completed" onPress={() => alert('Workout Completed!')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WorkoutSession;