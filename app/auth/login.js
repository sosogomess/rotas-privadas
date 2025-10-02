import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn(email, password);

      if (!result.success) {
        Alert.alert("Erro", result.message || "Falha ao fazer login.");
      }
    } catch (error) {
      Alert.alert("Erro", "falha ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
}

return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <View style={styles.form}>
      <Text style={styles.emoji}>🔒</Text>
      <Text style={styles.title}>Bem-vindo de volta!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value="{password}"
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        editable={!loading}
      />
    </View>
  </KeyboardAvoidingView>
);
