import React from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GoogleSignin from '../components/GoogleSignin';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onSignInPress = async () => {
    if (!isLoaded) return;
    if (!emailAddress || !password) {
      alert("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error('Additional steps required:', JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error('Sign-in error:', JSON.stringify(err, null, 2));
      alert("Invalid credentials or sign-in issue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 px-6 justify-center"
      >
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
            <Ionicons name="fitness" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">FitTracker</Text>
          <Text className="text-lg text-gray-600 text-center">Sign in to your account</Text>
        </View>

        {/* Email Input */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200">
            <Ionicons name="mail-outline" size={20} color="#6B7280" />
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              value={emailAddress}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
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
              value={password}
              placeholder="Enter your password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={true}
              onChangeText={setPassword}
              className="flex-1 ml-3 text-gray-900"
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={isLoading}
          className={`rounded-xl py-4 shadow-sm mb-4 ${
            isLoading ? 'bg-gray-400' : 'bg-blue-600'
          }`}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            {isLoading ? (
              <Ionicons name="refresh" size={20} color="white" />
            ) : (
              <Ionicons name="log-in-outline" size={20} color="white" />
            )}
            <Text className="text-white font-semibold text-lg ml-2">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="px-4 text-gray-500 text-sm">or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Google Sign In */}
        <GoogleSignin />

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Footer */}
        <View className="pb-6 mt-6">
          <Text className="text-center text-gray-500 text-sm">
            Start your fitness journey today
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
