import argparse
from NLPService import NLPService

from qa.bot import GroundedQaBot
cohere_api_key = "Cp8naemKJPATYAMFd0YZ2pEnLODLpnuIK7IMhMTO"
serp_api_key = "2ca3ce5a9db573395405b190e264c209617053e3c428510325edff9296f9942b"
verbosity = 0

class NLPWrapper(NLPService):
    def __init__(self, history_manager):
        NLPService.__init__(self, "NLPBot", history_manager)
        self.verbosity = 0
        self.serp_api_key = serp_api_key
        self.cohere_api_key = cohere_api_key
        self.bot = GroundedQaBot(self.cohere_api_key, self.serp_api_key)

    def get_answer(self, question, history=None):
        if history is None:
            history = []
        self.bot.set_chat_history(history)
        reply, source_urls, source_texts = self.bot.answer(question, verbosity=self.verbosity, n_paragraphs=2)
        sources_str = "\n".join(list(set(source_urls)))
        reply_incl_sources = f"{reply}\nSource:\n{sources_str}"
        answer = "answer: " + reply_incl_sources
        history = self.bot.chat_history
        return answer, history

    def search_eng(self, userid, query):
        old_history = self.history_manager.get_history(userid)
        answer, new_history = self.get_answer(query, old_history)
        self.history_manager.update_history(userid, query, answer)
        # answer = "answer: World War II began in Europe on September 1, 1939, when Germany invaded Poland. Great Britain and France responded by declaring war on Germany on September 3. The war between the U.S.S.R. and Germany began on June 22, 1941, with Operation Barbarossa, the German invasion of the Soviet Union. The war in the Pacific began on December 7/8, 1941, when Japan attacked the American naval base at Pearl Harbor and other American, Dutch, and British military installations\nSource:\nhttps://www.britannica.com/event/World-War-II"
        answered, sources = answer.split("answer:")[1].split("Source:\n")
        answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answered, 'Sources' : sources}
        return self.jsonResponse(answerResponse)

    def search_heb(self, userid, query_heb):
        translator = Translator(service_urls=['translate.google.com'])
        query_eng = translator.translate(text = query_heb, src='he').text
        old_history = self.history_manager.get_history(userid)
        answer, new_history = self.get_answer(query_eng, old_history)
        answer_text, sources = answer.split("answer:")[1].split("Source:\n")
        answer_heb = translator.translate(text = answer_text, dest = 'he', src='en').text
        self.history_manager.update_history(userid, query_eng, answer_text+sources, query_heb, answer_heb)
        answerResponse = {'user' : userid, 'question' : query_heb, 'answer' : answer_heb, 'Sources' : sources}
        return self.jsonResponse(answerResponse)

# This is only for testing
if __name__ == "__main__":
    answer, history = get_answer("who is a sylvester stallone?")
    print(answer, history)
