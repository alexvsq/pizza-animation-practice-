import { View, Text, FlatList, Image, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PizzaData, IngredientsType } from '@/types/types'
import { INGREDIENTS } from '@/utils/ingredients'
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming, useAnimatedReaction, runOnJS } from 'react-native-reanimated'
import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';
import { useLayoutsSizes } from '@/store/LayoutSize'

interface PropsIngredients {
    addIngredient: (ingredient: IngredientsType) => void
    listIngredients: IngredientsType[]
}

export default function Ingredients({ addIngredient, listIngredients }: PropsIngredients) {

    return (
        <View style={{ marginVertical: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }} >
            {INGREDIENTS.map((item, index) => {
                const isSelected = listIngredients.find((i) => i.name === item.name);
                return (
                    <IngredientItem
                        key={item.name + index}
                        isSelected={!!isSelected}
                        addIngredient={addIngredient}
                        item={item}
                    />
                );
            })}
        </View>
    )
}

interface StylesIngredients {
    isSelected: boolean
    addIngredient: (ITEM: IngredientsType) => void
    item: IngredientsType
}

const IngredientItem = ({ isSelected, addIngredient, item }: StylesIngredients) => {

    const { dropSize, pizzaPosition } = useLayoutsSizes()

    const [isInDropZonState, setIsInDropZoneState] = useState<boolean>(false)

    const pressed = useSharedValue<boolean>(false);
    const offsetX = useSharedValue<number>(0);
    const offsetY = useSharedValue<number>(0);

    const startX = useSharedValue<number>(0);  // Posición inicial en X
    const startY = useSharedValue<number>(0);  // Posición inicial en Y

    useAnimatedReaction(
        () => {
            const currentX = startX.value + offsetX.value;
            const currentY = startY.value + offsetY.value;

            return (
                currentX >= pizzaPosition.Pizzax &&
                currentX <= pizzaPosition.Pizzax + dropSize.dropWidth &&
                currentY >= pizzaPosition.Pizzay &&
                currentY <= pizzaPosition.Pizzay + dropSize.dropHeight
            );
        },
        (isInsideDropZone, prevIsInsideDropZone) => {
            if (isInsideDropZone !== prevIsInsideDropZone) {
                runOnJS(setIsInDropZoneState)(isInsideDropZone);
            }
        }
    );


    const pan = Gesture.Pan()
        .onBegin(() => {
            pressed.value = true;
        })
        .onChange((event) => {
            offsetX.value = event.translationX
            offsetY.value = event.translationY
        })
        .onFinalize(() => {
            offsetX.value = withSpring(0);
            offsetY.value = withSpring(0);
            pressed.value = false;
        });

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
        position: 'absolute',
        zIndex: 100
    }));

    useEffect(() => {
        if (isInDropZonState) {
            addIngredient(item)
        }
    }, [isInDropZonState])

    return (
        <Pressable
            style={styles.container}
        >
            <View style={[styles.containerImage, isSelected ? styles.isSelected : {}]}>
                <GestureDetector gesture={pan}>
                    <Animated.View style={[animatedStyles]}>
                        <Image
                            source={item.img}
                            style={{ width: 40, height: 40 }}
                            resizeMode='contain'
                        />
                    </Animated.View>
                </GestureDetector>
            </View>
            <Text style={{ textAlign: 'center' }}>{item.name}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    containerImage: {
        width: 55,
        height: 55,
        borderRadius: 999,
        backgroundColor: '#d2d4be',
        justifyContent: 'center', alignItems: 'center'
    },
    isSelected: {
        borderWidth: 2,
        borderColor: 'red'
    }
})