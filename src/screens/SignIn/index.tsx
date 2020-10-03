import React, {useState, useEffect, useContext} from 'react';
import {Input} from 'react-native-elements';
import {gql} from '@apollo/client';
import AuthForm from '../../components/organisms/AuthForm';
import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';
import UserContext from '../../context/UserContext';
import {SCREENS} from '../../navigations/contants';
import useAuth from '../../hooks/useAuth';

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
  const {useMutation} = useAuth();
  const context = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, response] = useMutation(SIGN_IN, {});

  const handleSignIn = () => {
    signIn({variables: {email, password}});
  };

  useEffect(() => {
    if (!response.data) {
      return;
    }
    const userData = response.data.signIn;
    const {token, user} = userData;
    const {email: userEmail, _id} = user && user;

    context.setUser({token, email: userEmail, _id});
  }, [response.data, response.error, context]);

  return (
    <AuthForm
      submitButtonTitle="Sign In"
      switchText="Don't have an account?"
      switchButtonText="Sign Up"
      onSubmit={handleSignIn}
      onSwitchButtonPress={() => navigation.navigate(SCREENS.signUp)}>
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
