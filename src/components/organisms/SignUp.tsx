import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {useMutation, gql} from '@apollo/client';

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $username: String!) {
    signUp(input: {email: $email, password: $password, username: $username}) {
      token
      user {
        email
        _id
        username
      }
    }
  }
`;

interface Props {}

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signUp, {data}] = useMutation(SIGN_UP);

  const handleSignUp = () => {
    signUp({variables: {email, password, username}});
  };

  useEffect(() => {
    if (!data) return;
    console.log({data});

    const userData = data.signUp;

    const {token, user} = userData;
    const {email: userEmail, _id} = user && user;

    AsyncStorage.setItem(
      'user',
      JSON.stringify({token, email: userEmail, _id}),
    );
  }, [data]);

  return (
    <ScrollView>
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        accessibilityLabel="email"
        placeholder="Email"
      />
      <Input
        value={username}
        onChangeText={(text) => setUsername(text)}
        accessibilityLabel="username"
        placeholder="Username"
      />
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        onChange={(e) => console.log(e)}
        accessibilityLabel="password"
        placeholder="Password"
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </ScrollView>
  );
};

export default SignUp;
