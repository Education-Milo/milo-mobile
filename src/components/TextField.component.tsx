import React, { forwardRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@theme/colors';

interface TextFieldComponentProps extends TextInputProps {
  icon?: React.ReactNode;
  type?: 'email' | 'password' | 'text';
  error?: string;
  height?: number;
}

const TextFieldComponent = forwardRef<TextInput, TextFieldComponentProps>(
  (props, ref) => {
    const { style, icon, type, error, height = 48, ...rest } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <View style={styles.container}>
        <View style={[
          styles.inputIconContainer,
          { height },
          error && styles.inputError
        ]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <TextInput
            ref={ref}
            {...rest}
            style={[styles.input, { height}]}
            placeholderTextColor={colors.placeholder}
            secureTextEntry={type === 'password' && !isPasswordVisible}
          />
          {type === 'password' && (
            <TouchableOpacity
              style={styles.rightIconContainer}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color={colors.IconColor}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text style={styles.errorText}>
            {error}
          </Text>
        )}
      </View>
    );
  }
);

TextFieldComponent.displayName = 'TextFieldComponent';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 9999,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.border?.light || '#DDD',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderWidth: 1.5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    height: 43,
    color: colors.text?.primary || '#11181C',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
    marginLeft: 15,
  },
});

export default TextFieldComponent;