import { View, Text, Pressable, StyleSheet } from 'react-native'
import { PizzaSize } from '@/types/types'

interface PropsSizeBtns {
    setPizzaSize: (size: PizzaSize) => void
    size: PizzaSize
}

export default function SizeBtns({ setPizzaSize, size }: PropsSizeBtns) {


    return (
        <View style={styles.container}>

            <Pressable
                onPress={() => setPizzaSize('s')}
                style={[styles.btn, size == 's' ? styles.shadow : {}]}
            >
                <Text style={styles.text}>S</Text>
            </Pressable>

            <Pressable
                onPress={() => setPizzaSize('m')}
                style={[styles.btn, size == 'm' ? styles.shadow : {}]}
            >
                <Text style={styles.text}>M</Text>
            </Pressable>

            <Pressable
                onPress={() => setPizzaSize('l')}
                style={[styles.btn, size == 'l' ? styles.shadow : {}]}
            >
                <Text style={styles.text}>L</Text>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    btn: {
        backgroundColor: 'white',
        borderRadius: 999,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '500'
    },
    shadow: {
        transform: [{ scale: 1.3 }],
        shadowColor: "#000",
        backgroundColor: '#d2d4be',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})