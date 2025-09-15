import { TextInput, View } from "react-native";


export default function Index() {
  return (
    <View style={{
      flex: 1
    }}>
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
    </View>
  );
}
