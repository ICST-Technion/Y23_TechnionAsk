import openai
from NLPService import NLPService


def_context = "For the next question, i want you to provide links for the answers(URL sources), first provide the answer and then an empty line and then the word ' Sources:' and then the sources in a seperate new line\nUser:"
def_question = "What was the exact date that the second world war occurred in?"

class ChatGPTService(NLPService):
    def __init__(self, history_manager):
        NLPService.__init__(self, "ChatGPT", history_manager)
        with open("api_key.txt", "r") as key_file:
            openai.api_key = key_file.read().strip()

    def search_eng(self, userid, query):
        answer, sources = self.ask_question(query)
        answer_with_sources = answer + ' - Sources:' + sources
        self.history_manager.update_history(userid, query, answer_with_sources)
        answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answer, 'Sources' : sources}
        return self.jsonResponse(answerResponse)

    def separate_answer_and_sources(self, answer):
        sources_start = "Sources:"
        
        # Find the index where the answer and sources start
        sources_index = answer.find(sources_start)
        
        # Extract the answer and sources from the input string
        answer_text = answer[:sources_index].strip()
        sources_text = answer[sources_index + len(sources_start):].strip()
        
        return answer_text, sources_text

    # Define a function to ask questions
    def ask_question(self, question, context=def_context):
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=context + "\nQ: " + question + "\nA:",
            max_tokens=1000,
            n=1,
            stop=None,
            temperature=0.7
        )
        returned_answer = response.choices[0].text.strip()
        return self.separate_answer_and_sources(returned_answer)
