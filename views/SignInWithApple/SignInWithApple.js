import React, {Component, Fragment} from 'react'
import { Text, View, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview'
import PropTypes from 'prop-types'
// ---
import { container as SignInWithAppleContainer } from '../../modules//SignInWithApple'
import RBSheet from "react-native-raw-bottom-sheet"

class SignInWithApple extends Component {
  openSignIn = () => {
    this.signInContainerRef.onSignIn()
    this.actionSheetRef.open()
  }

  handleNavigationStateChange = (webViewState) => {
    this.signInContainerRef.onNavigationStateChange(webViewState)
  }

  handleCallBack = (result) => {
    const { onSuccess } = this.props
    onSuccess(result)
    this.actionSheetRef.close()
  }

  render() {
    const { initialConfig } = this.props
    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)
    return (
      <SignInWithAppleContainer
        initialConfig={ initialConfig }
        ref={ref => this.signInContainerRef = ref }
        onCallBack={this.handleCallBack}
        render={({
          getUri,
          isStartCallService,
        }) => {
          return (
            <Fragment>
              <RBSheet
                ref={ref => {
                  this.actionSheetRef = ref;
                }}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={screenHeight - 100}
                duration={250}
                customStyles={{
                  container: {
                    justifyContent: "center",
                    alignItems: "center"
                  }
                }}
              >
                {isStartCallService ? (
                  <View style={{flex: 1, height: screenHeight - 100}}>
                    <WebView
                      ref="webview"
                      source={{ uri: getUri }}
                      onNavigationStateChange={this.handleNavigationStateChange}
                      javaScriptEnabled = {true}
                      domStorageEnabled = {true}
                      startInLoadingState={false}
                      style={{
                        flex: 1,
                        resizeMode: 'cover',
                        width: screenWidth,
                        height: screenHeight - 100,
                      }}
                    />
                  </View>
                ) : (
                  <Fragment />
                )}
              </RBSheet>
            </Fragment>
          )
        }}
      />
    )
  }
}

SignInWithApple.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  initialConfig: PropTypes.object.isRequired,
}

export default SignInWithApple
