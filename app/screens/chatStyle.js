import React, { useLayoutEffect } from "react";
import SearchHTTPRequest from "./SearchHTTPRequest";
import { useTranslation } from "react-i18next";

const ChatScreen = ({ navigation, route }) => {
    const {t, i18n} = useTranslation();
    
    useLayoutEffect(() => {
        navigation.setOptions({
          title: t("Search Page")
        })
      })
    
      return (
        <SearchHTTPRequest  data={{ 'navigation': navigation,  'httpRequestType': 'Search', 'email': route.params?.email }} />
    );
}
export default ChatScreen;