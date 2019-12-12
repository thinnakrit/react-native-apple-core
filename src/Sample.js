import React, {Component} from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import SignInWithApple from '../views/SignInWithApple/SignInWithApple'
class Sample extends Component {

  handleOpenSignIn = () => {
    this.signinRef.openSignIn()
  }

  handleSuccess = (result) => {
    console.log('handleSuccess', result)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.handleOpenSignIn}>
          <Image
            style={{
              height: 40,
              width: 200,
              borderRadius: 5,
            }}
          source={{uri: "https://developer.apple.com/design/human-interface-guidelines/sign-in-with-apple/images/apple-id-sign-in-with_2x.png"}} />
        </TouchableOpacity>
        <SignInWithApple
          ref={ ref => this.signinRef = ref}
          initialConfig={{
            redirect_uri: "https://www.example.app/apple-callback",
            client_id: "web.app.exampleapp",
            state: "xxkxkxkkxkxxkxk", // for compare response data
          }}
          onSuccess={ this.handleSuccess }
        />
      </View>
    )
  }
}

export default Sample