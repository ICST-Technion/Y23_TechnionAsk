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

//Chat import
import { Bubble, GiftedChat, MessageImage, Send, InputToolbar, Time, Avatar } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { writingColor } from "../styles";

//Translation import
import { t } from "./i18n"

const messageIcon = require('../../assets/messageTypingIcon.gif');
const backendURL = 'http://ec2-3-82-191-102.compute-1.amazonaws.com:65435/';
export const hebrewFirst = "א".charCodeAt(0);
export const hebrewLast = "ת".charCodeAt(0);
export const arabicFirst = "ؠ".charCodeAt(0);
export const arabicLast = "ي".charCodeAt(0);
var writingDirectionOfLastMessage = 'ltr';

export default class SearchHTTPRequest extends React.Component {
    state = {
        data: { 'data': '' },
        searchState: false,
        query: "When was World War II?",
        loading: false,
        animatedState: new Animated.Value(0.5),
        messages : [{
                        _id: 1,
                        text: 'Hello, '+ this.props.data['email'] +'. Enter your question',
                        createdAt: new Date(),
                        user: {
                            _id: 2,
                            name: 'Bot',
                        },
                    },],
    }

    //Login Check
    authenticateEmailCredentials = (username, password) => {
        if (username == "" || password == "") { return; }
        return this.getNLPdata("login", '?username=' + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
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

    //Send an HTTP Request to the backend for Sign up or Login
    getNLPdata = (route, paramList = "") => {
        if (route == "" || route == undefined)
            return;
        this.setState({ loading: true });
        fetch(backendURL+route+paramList)
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
                searchState: false,
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

    //Send a query question to the backend
    async getNLPsearchData (route, user = "", query ="") {
        if("user" == "" || query == "" || route == "" || route == undefined)
            return;
        this.setState({loading : true});
        await fetch(backendURL+route+"/"+user+"/"+query)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data: responseJson,
                searchState: true,
                query : query,
                loading : false
            }, this.forceUpdate());
        })
        .catch(error => {
            this.setState({loading : false});
            this.setState({data: {'data' : 'Error'}})
        });
    }
    componentDidMount = () => {
        if (this.props.data['httpRequestType'] == 'Search') { this.getNLPsearchData() }
        else { this.getNLPdata() }
        this.animationStateChange()
    }
    /* These are the methods for the chat bot
     * They declare how the chat will look and behave
     * The methods: renderMessageImage, renderBubble, renderSend are the methods that determine chat style.
     * onSend is the method that is called upon sending a message, it updates local short-term message history, sends and receives HTTP requests from the backend.
     */
    renderAvatar(props){
        return (
          <Avatar
            {...props}
            imageStyle={{
              left: {
                backgroundColor: '#b88d20',
              },
            }}
          />
        );
      }
    scrollToBottomComponent() {
        return (
            <FontAwesome name = 'angle-double-down' 
            size={22}
            color='#1c1c1c'
            />
        );
    }
    renderInputToolbar (props) {
        return <InputToolbar {...props} containerStyle={{backgroundColor: '#fff', color: 'black'}} placeholderTextColor='black'/>
    }
    renderTime (props) {
        return (
          <Time
          {...props}
            timeTextStyle={{
              left: {
                color: 'gray',
              },
              right: {
                color: '#fff',
              },
            }}
          />
        );
      };
    renderMessageImage(props) {
        return (
            <MessageImage 
            {...props} 
            imageStyle={{
                height:20
            }} 
            />
        );
    }
    renderBubble(props) {
        return (
        <Bubble {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#b88d20',
                    maxWidth : Dimensions.get('screen').width*0.9,
                },
                left: {
                    backgroundColor: '#fff',
                    maxWidth : Dimensions.get('screen').width*0.9,
                }
            }}
            textStyle = {{
                right: {
                    color: '#fff',
                    writingDirection: writingDirectionOfLastMessage,
                },
                left: {
                    writingDirection: writingDirectionOfLastMessage,
                },
            }} 
        />
        );
    }
    renderSend = (props) => {
        return (
        <Send {...props}>
            <View>
                <MaterialCommunityIcons 
                name='send' 
                style={styles.sendIcon}
                size={32}
                color='#b88d20'
                />
            </View>
        </Send>
        );
    }
    async onSend(messages = []) {
        var firstLetter = messages[0].text[0].charCodeAt(0);
        if((firstLetter >= hebrewFirst && firstLetter <= hebrewLast) || (firstLetter >= arabicFirst && firstLetter <= arabicLast))
            writingDirectionOfLastMessage = 'rtl';
        else
            writingDirectionOfLastMessage = 'ltr';
        const newMsg = [...messages,...this.state.messages ]
        this.setState({'messages' : GiftedChat.append(this.state.messages, messages)});
        this.setState({'messages' : GiftedChat.append(newMsg, 
            {
                _id: this.state.messages.length+1,
                image: messageIcon,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Bot',
                }}
        )});
        await this.getNLPsearchData('search', this.props.data['email'], messages[0].text);
        if('data' in this.state.data && this.state.data['data']=="Error")
        {
            let msg = this.state.messages[0];
            msg.image = null;
            msg.text = 'The NLP service could not answer your question due to overload in the system.\n  Please try again later';
            this.setState({'messages' : GiftedChat.append(newMsg, msg)});
        }
        else {
            let sources = '';
            let sourcesArray = 'Sources' in this.state.data? this.state.data['Sources'].split('\n') : [];
            for(let i=0; i < sourcesArray.length; i++) {
                sources += sourcesArray[i];
                sources += "\n";
            }
            let msg = this.state.messages[0];
            msg.image = null;
            msg.text = 'Answer: ' + this.state.data['answer'] + "\n  Sources:\n" + sources;
            this.setState({'messages' : GiftedChat.append(newMsg, msg)});
        }
    }

    /* This is the view for all components that require HTTP requests
     * Return Data in accordance with the type of HTTP request needed
     * props should receive request type in its data dictionary when called
     */ 
    render() {
        if(this.props.data['httpRequestType'] == 'Search') {
            return (
                <View style={styles.outterContainer}>
                <GiftedChat  messages={this.state.messages} onSend={messages => {this.onSend(messages);} } 
                user={{_id: 1,}} 
                renderBubble={this.renderBubble} 
                alwaysShowSend
                renderSend={this.renderSend}
                scrollToBottom
                scrollToBottomComponent={this.scrollToBottomComponent}
                renderMessageImage={this.renderMessageImage}
                renderInputToolbar={this.renderInputToolbar}
                renderTime={this.renderTime}
                renderAvatar={this.renderAvatar}
                /></View>
                );
                }
        if (this.props.data['httpRequestType'] == 'Sign-up') {
            return (
                <View style={styles.alignment}>

                    <TouchableOpacity style={styles.login_button} onPress={() => { this.getNLPdata('signup', '?username=' + encodeURIComponent(this.props.data['email']) + "&password=" + encodeURIComponent(this.props.data['password'])); }}>
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
                    {this.state.data['data'] == 'login' && 'result' in this.state.data ? (this.state.data['result'] ? this.props.data['navigation'].navigate('Search Page', { 'email': this.props.data['email'] }) : <Text style={styles.errorColor}>Wrong Credentials</Text>) : null}
                    {this.state.data['data'] == 'Error' ?  <Text  style={styles.errorColor}>Error occurred, please try again later</Text>: null}
                </View>
            );
        }
    }
}