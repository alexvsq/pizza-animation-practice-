import { View, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { PizzaData, PizzaSize, IngredientListWithPosition } from '@/types/types'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useLayoutsSizes } from '@/store/LayoutSize'

interface PropsPizzaImage {
    Pizza: PizzaData
    SizePizza: PizzaSize
    Ingredients: IngredientListWithPosition[]
}

export default function PizzaImage({ Pizza, SizePizza, Ingredients }: PropsPizzaImage) {

    const { id, img } = Pizza
    const { setDropSize, setPizzaPosition } = useLayoutsSizes()

    const viewRef = useRef<View>(null);

    const scaleAnimValue = useSharedValue(2)
    const rotationAnimValue = useSharedValue(0)

    const scaleAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: scaleAnimValue.value }, { rotate: `${rotationAnimValue.value}deg` }]
    }), [scaleAnimValue])

    const StartAnimation = () => {
        scaleAnimValue.value = withSpring(0.8)
    }
    const RotationAnimated = () => {
        if (rotationAnimValue.value < 90) {
            rotationAnimValue.value = withSpring(90)
        } else {
            rotationAnimValue.value = withSpring(0)
        }
    }

    const SizaChangeAnimated = () => {
        RotationAnimated()
        if (SizePizza == 's') {
            scaleAnimValue.value = withSpring(0.7)
        } else if (SizePizza == 'm') {
            scaleAnimValue.value = withSpring(0.85)
        } else {
            scaleAnimValue.value = withSpring(1)
        }
    }

    const getPosition = () => {
        if (viewRef.current) {
            viewRef.current.measureInWindow((x, y, width, height) => {
                setPizzaPosition({
                    Pizzax: x,
                    Pizzay: y
                })
                setDropSize({
                    dropWidth: width,
                    dropHeight: height
                })
            });
        }
    };

    useEffect(() => {
        SizaChangeAnimated()
    }, [SizePizza])



    useEffect(() => {
        StartAnimation()
    }, [])


    return (
        <View>


            <Animated.View style={[scaleAnimation]}>
                <View ref={viewRef}
                    onLayout={getPosition}
                    style={{ position: 'relative', width: '100%', aspectRatio: 1 }}>
                    <Image
                        source={require('@/assets/images/pizza/box/dish.webp')}
                        style={{ width: '100%', height: '100%', position: 'absolute' }}
                        resizeMode="contain"
                    />
                    <View style={{ width: '90%', height: '90%', position: 'absolute', top: '5%', left: '5%' }}>

                        <Image
                            source={img}
                            style={{ width: '100%', height: '100%', position: 'absolute' }}
                            resizeMode="contain"
                        />
                        {
                            Ingredients.map((item, index) => {

                                return (
                                    <View
                                        key={item.name + index}
                                        style={{ width: '100%', height: '100%', position: 'absolute' }} >
                                        <Image
                                            source={item.img}
                                            resizeMode='contain'
                                            style={{ width: '20%', height: '20%', position: 'absolute', top: `${item.top}%`, left: `${item.left}%` }}
                                        />
                                        <Image
                                            source={item.img}
                                            resizeMode='contain'
                                            style={{ width: '20%', height: '20%', position: 'absolute', top: `${70 - item.top}%`, left: `${70 - item.left}%` }}
                                        />
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}