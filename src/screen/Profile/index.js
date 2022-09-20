import { Link } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function Profile(props) {
  console.log(props, '1234')
  const toDetailAccount = () => {
    props.navigation.navigate('AppScreen', {
      screen: 'DetailAccount',
    })
    console.log('hai')
  }
  const toHistory = () => {
    props.navigation.navigate('AppScreen', {
      screen: 'History',
    })
  }
  return (
    <ScrollView>
      <View>
        {/* <TouchableOpacity onPress={toDetailAccount} style={{ fontSize: 18, margin: '5%' }}>
            <Text>Detail Account</Text></TouchableOpacity> */}
        <Text onPress={(e) => toDetailAccount(e)} style={{ fontSize: 18, margin: '5%' }}>
          Sign Up
        </Text>
      </View>
    </ScrollView>
  )
}
export default Profile