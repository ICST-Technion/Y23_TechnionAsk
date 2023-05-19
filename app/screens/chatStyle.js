import React, { useLayoutEffect } from "react";
import SearchQueryHTTPRequest from "./SearchQueryHTTPRequest";
import { useTranslation } from "react-i18next";

const ChatScreen = ({ navigation, route }) => {
    const {t, i18n} = useTranslation();
    
    useLayoutEffect(() => {
        navigation.setOptions({
          title: t("Search Page")
        })
      })
    
      return (
        <SearchQueryHTTPRequest  data={{ 'navigation': navigation,  'httpRequestType': 'Search', 'email': route.params?.email==undefined? 'Guest' : route.params?.email }} />

    );
}
export default ChatScreen;