import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { LoginButton,AccessToken  } from 'react-native-fbsdk';


export default class FBLoginButton extends Component {
  state = {
    name: '',
    name2:''
    }
  initUser = (token) => {
    console.log("Token ",token)
    fetch('https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' + token)
        .then((response) => {
            response.json().then((json) => {
                const ID = json.id
                console.log("ID " + ID);

                const EM = json.email
                console.log("Email " + EM);

                const FN = json.first_name
                console.log("First Name " + FN);
                this.setState({name:FN})

                const LN = json.last_name
                console.log("Last Name " + FN);
                this.setState({name2:LN})
            })
        })
        .catch(() => {
            console.log('ERROR GETTING DATA FROM FACEBOOK')
        })
}
  render() {
    return (
      <View>
        <LoginButton
         publishPermissions={['publish_actions']}
         readPermissions={['public_profile']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + error.message);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
                AccessToken.getCurrentAccessToken().then((data) => {
                  const { accessToken } = data
                  // console.log(accessToken);
                  this.initUser(accessToken)
              })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
          <Text>Name {this.state.name} {this.state.name2}</Text>
      </View>
    );
  }
};

module.exports = FBLoginButton;