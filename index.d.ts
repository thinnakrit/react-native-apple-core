declare module 'react-native-apple-core' {
  import React from 'react';
  interface Props {
      onSuccess?: any;
      initialConfig?: any;
  }
  export default class SignInWithApple extends React.Component<Props, any> {}
}
