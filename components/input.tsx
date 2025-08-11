import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#fff"
        {...props}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  input: {
    borderRadius: 30,
    padding: 20,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#562c76",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
});
