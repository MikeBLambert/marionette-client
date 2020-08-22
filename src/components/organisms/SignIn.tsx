import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useMutation, gql} from '@apollo/client';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: {email: $email, password: $password}) {
      token
      user {
        username
        _id
      }
    }
  }
`;

interface Props {}

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, {data, error}] = useMutation(SIGN_IN);

  const handleSignIn = () => {
    console.log({email, password});
    signIn({variables: {email, password}});
  };

  useEffect(() => {
    console.log({data, error});
    if (!data) return;
    const userData = data.signIn;
    const {token, user} = userData;
    const {username, _id} = user && user;

    AsyncStorage.setItem('user', JSON.stringify({token, username, _id}));
  }, [data, error]);

  return (
    <ScrollView>
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        accessibilityLabel="email"
        placeholder="Email"
      />
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        accessibilityLabel="password"
        placeholder="Password"
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </ScrollView>
  );
};

export default SignIn;
