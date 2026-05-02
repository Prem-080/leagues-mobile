import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { login } from "@/src/features/auth/api";
import { useAuth } from "@/src/features/auth/context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();

  const handleLogin = async () => {
    const res = await login(email, password);
    loginUser(res.token);
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}