import * as React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // fixed typo here

export default function SignUpScreen() {
  const router = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = React.useState(false);

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Sign Up Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        Alert.alert('Verification Failed', 'Invalid code or session.');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 justify-center">
          {/* Logo */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="fitness" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">Join FitTracker</Text>
            <Text className="text-lg text-gray-600 text-center">Start your fitness journey</Text>
          </View>

          {pendingVerification ? (
            <>
              <Text className="text-lg font-semibold mb-2">Enter Verification Code</Text>
              <TextInput
                value={code}
                placeholder="Verification code"
                keyboardType="number-pad"
                onChangeText={setCode}
                className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
              />
              <TouchableOpacity
                onPress={onVerifyPress}
                disabled={isLoading}
                className={`rounded-xl py-4 shadow-sm mb-4 ${
                  isLoading ? 'bg-gray-400' : 'bg-blue-600'
                }`}
              >
                <Text className="text-white font-semibold text-lg text-center">
                  {isLoading ? 'Verifying...' : 'Verify Email'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons name="mail-outline" size={20} color="#687280" />
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={emailAddress}
                    placeholder="Enter your email"
                    onChangeText={setEmailAddress}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
                  <Ionicons name="lock-closed-outline" size={20} color="#6B7280" />
                  <TextInput
                    secureTextEntry
                    value={password}
                    placeholder="Create a password"
                    onChangeText={setPassword}
                    className="flex-1 ml-3 text-gray-900"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={onSignUpPress}
                disabled={isLoading}
                className={`rounded-xl py-4 shadow-sm mb-4 ${
                  isLoading ? 'bg-gray-400' : 'bg-blue-600'
                }`}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Ionicons name="refresh" size={20} color="white" />
                  ) : (
                    <Ionicons name="person-add-outline" size={20} color="white" />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          {/* Terms and Sign-In Link */}
          <Text className="text-xs text-gray-500 text-center mb-4">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </Text>

          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 font-semibold">Sign in</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Footer */}
          <View className="pb-6">
            <Text className="text-center text-gray-500 text-sm">
              Start transforming your fitness
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
