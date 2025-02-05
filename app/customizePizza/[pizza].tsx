import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { PIZZAS } from '@/utils/pizzas'
import { useState, useEffect } from 'react'
import { PizzaData, PizzaSize, IngredientsType, IngredientListWithPosition } from '@/types/types'
import PizzaImage from '@/components/PizzaImage'
import SizeBtns from '@/components/SizeBtns'
import Ingredients from '@/components/Ingredients'
import { INGREDIENTS, INGREDIENTSUNITS } from '@/utils/ingredients'

export default function customizePizza() {

    const { pizza } = useLocalSearchParams()

    const [pizzaSelected, setPizzaSelected] = useState<PizzaData | null>(null)
    const [pizzaSize, setPizzaSize] = useState<PizzaSize>('m')
    const [ingredientsList, setIngredientsList] = useState<IngredientListWithPosition[] | []>([])


    const addIngredient = (newIngredient: IngredientsType) => {
        const IsIn = ingredientsList.find((i) => i.name == newIngredient.name)

        if (!IsIn) {
            const ingredientUnit = INGREDIENTSUNITS.find((unit) => newIngredient?.name == unit.name)
            if (ingredientUnit) {
                const topRandom = Math.floor(Math.random() * 60)
                const leftRandom = Math.floor(Math.random() * 60)
                const newIngredientWPosition = { ...ingredientUnit, top: topRandom, left: leftRandom }
                setIngredientsList([...ingredientsList, newIngredientWPosition])

            }
        } else {
            const newIngredientsList = ingredientsList.filter((i) => i.name !== newIngredient.name)
            setIngredientsList(newIngredientsList)
        }
    }

    useEffect(() => {
        const pizzaSelected = PIZZAS.find((p) => p.id == pizza)
        if (pizzaSelected) {
            setPizzaSelected(pizzaSelected)
        }
    }, [])

    return (
        <>
            {
                pizzaSelected ?
                    <View style={styles.container}>
                        < Text style={{ fontSize: 25, fontWeight: 500, textAlign: 'center' }} > {pizzaSelected?.name}</Text >


                        <View style={styles.pizzaContent}>

                            <PizzaImage
                                Pizza={pizzaSelected}
                                SizePizza={pizzaSize}
                                Ingredients={ingredientsList}
                            />

                            <SizeBtns
                                setPizzaSize={setPizzaSize}
                                size={pizzaSize}
                            />

                            <Ingredients
                                addIngredient={addIngredient}
                                listIngredients={ingredientsList}
                            />


                        </View>
                    </View >

                    : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f2',
        paddingHorizontal: 10
    },
    pizzaContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})