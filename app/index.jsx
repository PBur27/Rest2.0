import { Button } from "@react-navigation/elements";
import { TextInput, View } from "react-native";


export default function Index() {

  const handleLogIn = () => {
    console.log("Log In button pressed");
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
        onPress={{/* Navigation to account creation screen logic here */}}
      />
    </View>
  );
}
