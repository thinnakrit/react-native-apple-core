
import React from 'react';

declare module 'react-native-apple-core' {
  export type RNAppleCoreProps = {
      onSuccess?: (result: any) => void;
      initialConfig?: any;
  }
  export default class AppleCore extends React.Component<RNAppleCoreProps> {
    openSignIn(): void;
  }
}
