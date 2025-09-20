import { router } from "expo-router";
import { Button, Text, TextInput, View } from "react-native";


export default function LoginScreen() {

  const handleLogIn = () => {
    console.log("Log In button pressed");
    router.push("/HomeScreen");
  }
  const registerRedirect = () => {
    console.log("Register button pressed");
    router.push("/RegisterScreen");
  }
  

  return (
    <View>
      <Text>
        Login
      </Text>
      <TextInput
        placeholder="Enter your email"
      />
      <Text>
        Password
      </Text>
      <TextInput
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Button
        title="Log In"
        onPress={handleLogIn}
      />
      <Button
        title="Create an Account"
        onPress={registerRedirect}
      />
    </View>
  );
}
