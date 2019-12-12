import { Component } from 'react'
import PropTypes from 'prop-types'
// ---
import SignInWithAppleService from '../../utils/SignInWithAppleService'

class SignInWithAppleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isStartCallService: false,
      response_type: "id_token code",
      response_mode: "fragment",
    }
  }

  onSignIn = () => {
    this.setState({
      isStartCallService: true
    })
  }

  onNavigationStateChange = (webViewState) => {
    const { onCallBack } = this.props
    const appleUri = "https://appleid.apple.com"
    const getParam = webViewState.url.split("/auth/")
    if (getParam[0] !== appleUri) {
      const getQuery = webViewState.url.split("#")
      if (getQuery.length > 0) {
        const getData = getQuery[1].split("&")
        const getValue = getData.reduce((prev, curr) => {
          const value = curr.split("=")
          if (value[1]) {
            prev[value[0]] = value[1]
          }
          return prev
        }, {})
        if (getValue) {
          this.setState({
            isStartCallService: false
          })
          onCallBack(getValue)
        }
      }
    }
  }

  render() {
    const {
      render,
      initialConfig: {
        redirect_uri,
        client_id,
        state,
      }
    } = this.props
    const {
      isStartCallService,
      response_type,
      response_mode,
    } = this.state

    const getUri = SignInWithAppleService.create({
      response_type: response_type,
      response_mode: response_mode,
      client_id: client_id,
      redirect_uri: redirect_uri,
      state: state
    })

    return render({
      getUri,
      isStartCallService,
    })
  }
}

SignInWithAppleContainer.propTypes = {
  render: PropTypes.func.isRequired,
  initialConfig: PropTypes.object.isRequired,
}

export default SignInWithAppleContainer