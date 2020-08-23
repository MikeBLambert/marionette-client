import React, {useState, useEffect, useContext} from 'react';
import {Input} from 'react-native-elements';
import {useMutation, gql} from '@apollo/client';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import AuthForm from '../../components/organisms/AuthForm';
import UserContext from '../../context/UserContext';

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

interface Props {
  navigation: StackNavigationHelpers;
}

const SignUp = ({navigation}: Props) => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signUp, {data}] = useMutation(SIGN_UP);

  const handleSignUp = () => {
    signUp({variables: {email, password, username}});
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    const userData = data.signUp;
    const {token, user} = userData;
    const {email: userEmail, _id} = user && user;
    context.setUser({token, email: userEmail, _id});
  }, [data, context]);

  return (
    <AuthForm
      submitButtonTitle="Sign Up"
      switchText="Already have an account?"
      switchButtonText="Sign In"
      onSubmit={handleSignUp}
      onSwitchButtonPress={() => navigation.navigate('SignIn')}>
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
    </AuthForm>
  );
};

export default SignUp;
