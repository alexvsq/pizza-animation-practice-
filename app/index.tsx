import { Text, View, FlatList, Pressable, StyleSheet } from "react-native";
import { PIZZAS } from '@/utils/pizzas'
import { router } from 'expo-router'

export default function Index() {



  const navigateToPizza = ({ idPizza }: { idPizza: string }) => {
    router.push({
      pathname: '/customizePizza/[pizza]',
      params: { pizza: idPizza }
    })
  }


  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text style={styles.textTitle}>Choose your pizza</Text>

      <FlatList
        data={PIZZAS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.BtnPizza}
              onPress={() => navigateToPizza({ idPizza: item.id })}
            >
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }} >{item.name}</Text>
            </Pressable>
          )
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
  },
  BtnPizza: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
});