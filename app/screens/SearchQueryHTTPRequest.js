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
import { Bubble, GiftedChat, MessageImage, Send, InputToolbar, Time, Avatar, Composer } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { writingColor } from "../styles";

import { backendURL } from "./SendHTTPRequest";

const messageIcon = require('../../assets/messageTypingIcon.gif');
export const hebrewFirst = "א".charCodeAt(0);
export const hebrewLast = "ת".charCodeAt(0);
export const arabicFirst = "ؠ".charCodeAt(0);
export const arabicLast = "ي".charCodeAt(0);
var writingDirectionOfLastMessage = 'ltr';

const answeringServices = ['NLP', 'ChatGPT'];

export default class SearchQueryHTTPRequest extends React.Component {
    state = {
        data: { 'data': '' },
        query: "",
        answerService: 1,
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

    /* getNLPsearchData - Send an HTTP Request to the backend
    * route - string indicating the route path within the backend URL i.e. after backendURL
    * user - username as it is Logged in as
    * query - Question field, as string
    * Used for Search/Asking a question query specifically
    */
    async getNLPSearchData (route, user = "", query ="", answerByService = "") {
        if("user" == "" || query == "" || route == "" || answerByService == "" || route == undefined)
            return;
        this.setState({loading : true});
	    await fetch(backendURL+route+"/"+user+"/"+answerByService+"/"+query)
	    //await fetch(backendURL+route+"/"+user+"/"+query+"/"+answerByService)
        //await fetch(backendURL+route+"/"+user+"/"+query+"/"+answerService)
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
        this.getNLPSearchData();
    }


    /* These are the methods for the Chat bot
     * They declare how the chat will look and behave
     * The methods that are the methods that determine chat style: 
     *      { renderAvatar, 
     *      scrollToBottomComponent, 
     *      renderInputToolbar, 
     *      renderTime, 
     *      renderMessageImage, 
     *      renderBubble, 
     *      renderSend }
     * onSend is the method that is called upon sending a message.
     *      Updates local short-term message history, sends and receives HTTP requests from the backend.
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
                style={[styles.sendIcon, {transform: [{scaleX: document.dir == 'rtl'? -1 : 1}],}]}
                size={32}
                color='#b88d20'
                />
            </View>
        </Send>
        );
    }
    renderComposer = (props) => {
        return (
            <View style={{flexDirection: 'row', flex:1}} >
            <Composer {...props} />
            <TouchableOpacity onPress={() => {this.setState({answerService: ((this.state.answerService + 1)%(answeringServices.length))})}} style={{alignSelf:'center', backgroundColor: '#dfe9f5', height: 30, borderRadius: 10, justifyContent: 'center', marginHorizontal: 7}}><Text> {answeringServices[this.state.answerService]} </Text> </TouchableOpacity></View>
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
        await this.getNLPSearchData('search', this.props.data['email'], messages[0].text, answeringServices[this.state.answerService]);
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
            msg.text = ('Sources' in this.state.data? 'Answer: ' + this.state.data['answer'] + "\n  Sources:\n" + sources : 'Answer: ' + this.state.data['answer']);
            this.setState({'messages' : GiftedChat.append(newMsg, msg)});
        }
    }

    /* This is the view for Search Query components that require HTTP requests i.e. where question queries are sent from
     * props should receive request type 'Search' as string in its data dictionary when called
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
                        renderComposer={this.renderComposer}
                    />
                </View>
            );
        }
    }
}
