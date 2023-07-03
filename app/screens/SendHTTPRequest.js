import { styles } from "../styles";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Linking,
    Animated,
    Dimensions
} from "react-native";

//Translation import
import { t } from "./i18n"

import { writingColor } from "../styles";

export const backendURL = 'http://ec2-44-212-18-109.compute-1.amazonaws.com:65435/';

export default class SendHTTPRequest extends React.Component {
    state = {
        data: { 'data': '' },
        loading: false,
        animatedState: new Animated.Value(0.5),
    }

    //Login Check
    authenticateEmailCredentials = (username, password) => {
        if (username == "" || password == "") { return; }
        return this.getNLPData("login", '?username=' + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
    }
    CheckIfAdmin = () => {
        if(this.props.data['email'] == 'Test123')
        return 'Admin View Page'
      if('email' in this.props.data && 'admin' in this.props.data && this.props.data['admin'] == true) {
	  return 'Admin View Page';
      }
      return 'Search Page';
    }

    //Loading Animation
    animationStateChange = () => {
        Animated.loop(
            Animated.timing(this.state.animatedState, {
                toValue: 25,
                duration: 3000,
                useNativeDriver: false,
            })).start()
    };
    animationLoading = () => {
        return (
            <View>
                <Text>{this.state.loading ?
                    <Animated.View style={{
                        alignItems: 'center',
                        opacity: this.state.animatedState, // Binds directly
                        height: 10,
                        transform: [
                            {
                                rotate: this.state.animatedState.interpolate({
                                    inputRange: [0, 25],
                                    outputRange: ['0deg', '360deg'],
                                }),
                            },
                        ],
                    }}>
                        <Image style={styles.loadingIcon} source={require('../../assets/loading-icon.png')} />
                    </Animated.View> : null}
                </Text>
            </View>
        );
    }

    /* getNLPData - Send an HTTP Request to the backend
    * route - string indicating the route path within the backend URL i.e. after backendURL
    * paramList - List of parameters as a string
    *   structure should be "?'field1'='encoded URI component of value1' &'field2' = 'encoded URI component of value2'"
    * Used for Sign up or Login specifically
    */
    async getNLPData (route, paramList = "") {
        if (route == "" || route == undefined)
            return;
        this.setState({ loading: true });
	await fetch(backendURL+route+paramList)
        // The option above sends Email and Password as parameters, 
        // the option below sends them in a json body, uncomment in backend adding headers
        //  ,{
        //     method: 'OPTIONS',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: this.props.data['email'],
        //         password: this.props.data['password'],
        //     })
        // })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: responseJson,
                query: this.state.query,
                loading: false
            })
            return this.state.data['data'];
        })
        .catch(error => {
            this.setState({ loading: false });
            this.setState({data: {'data' : 'Error'}})
        });
    }
    componentDidMount = () => {
        this.getNLPData();
    }

    /* This is the view for components that require HTTP requests
     * Return Data in accordance with the type of HTTP request needed
     * props should receive request type as string in its data dictionary when called
     */ 
    render() {
        if (this.props.data['httpRequestType'] == 'Sign-up') {
            return (
                <View style={styles.alignment}>

                    <TouchableOpacity style={styles.login_button} onPress={() => { this.getNLPData('signup', '?username=' + encodeURIComponent(this.props.data['email']) + "&password=" + encodeURIComponent(this.props.data['password'])); }}>
                        <Text style={{color: '#fff'}}>{t("Sign up")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.data['navigation'].navigate('Login Page')}>
                        <Text  style={{color: writingColor}}>{t("Already have an account? Login")}</Text>
                    </TouchableOpacity>
                    <this.animationLoading />
                    {this.state.data['data'] == 'sign-up' && 'result' in this.state.data ? (this.state.data['result'] == 'Successfully registered' ? this.props.data['navigation'].navigate('Search Page', { 'email': this.props.data['email'] }) : <Text style={styles.errorColor}>Unable to sign up with given credentials</Text>) : null}
                    {this.state.data['data'] == 'Error' ?  <Text  style={styles.errorColor}>Error occurred, please try again later</Text>: null}
                </View>
            );
        }
        if (this.props.data['httpRequestType'] == 'Login') {
            return (
                <View style={styles.alignment}>
                    <TouchableOpacity style={styles.login_button} onPress={() => { this.authenticateEmailCredentials(this.props.data['email'], this.props.data['password']) }}>
                        <Text style={{color: '#fff'}}>{t("Login")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.data['navigation'].navigate('Sign up Page')}>
                        <Text style={{color: writingColor}}>{t("Don't have an account? Sign up")}</Text>
                    </TouchableOpacity>
                    <this.animationLoading />
                    {this.state.data['data'] == 'login' && 'result' in this.state.data ? (this.state.data['result'] ? this.props.data['navigation'].navigate(this.CheckIfAdmin(), { 'email': this.props.data['email'] }) : <Text style={styles.errorColor}>Wrong Credentials</Text>) : null}
                    {this.state.data['data'] == 'Error' ?  <Text  style={styles.errorColor}>Error occurred, please try again later</Text>: null}
                </View>
            );
        }
    }
}
