import React, {useState, useEffect, useContext} from 'react';
import {Input} from 'react-native-elements';
import {useMutation, gql} from '@apollo/client';
import AuthForm from '../../components/organisms/AuthForm';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import UserContext from '../../context/UserContext';

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: {email: $email, password: $password}) {
      token
      user {
        email
        _id
      }
    }
  }
`;

interface Props {
  navigation: StackNavigationHelpers;
}

const SignIn = ({navigation}: Props) => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, {data, error}] = useMutation(SIGN_IN);

  const handleSignIn = () => {
    signIn({variables: {email, password}});
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    const userData = data.signIn;
    const {token, user} = userData;
    const {email: userEmail, _id} = user && user;

    context.setUser({token, email: userEmail, _id});
  }, [data, error, context]);

  return (
    <AuthForm
      submitButtonTitle="Sign In"
      switchText="Don't have an account?"
      switchButtonText="Sign Up"
      onSubmit={handleSignIn}
      onSwitchButtonPress={() => navigation.navigate('SignUp')}>
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
    </AuthForm>
  );
};

export default SignIn;
