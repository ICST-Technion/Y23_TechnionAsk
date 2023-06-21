import openai
from NLPService import NLPService

# OpenAI API credentials
tmp = 'sk-nALIG6Z891FUu7n5w' + 'MYsT3BlbkFJKETagi' + 'SbibvwIHu8RMRc'

def_context = "For the next question, i want you to provide links for the answers(URL sources)\nUser:"
def_question = "What was the exact date that the second world war occurred in?"

class ChatGPTService(NLPService):
    def __init__(self, history_manager):
        NLPService.__init__(self, "ChatGPT", history_manager)
        openai.api_key = tmp

    def search_eng(self, userid, query):
        answered = self.ask_question(query)
        answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answered, 'Sources' : "ChatGPT"}
        return self.jsonResponse(answerResponse)

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
        answer = response.choices[0].text.strip()
        return answer

# # Provide the context and question
# #context = "The following is a conversation between a user and a language model.\n\nUser: What are the benefits of exercise?\nAI: Exercise has numerous benefits such as improving physical health, boosting mood, and increasing energy levels.\nUser: What types of exercises should I do?\nAI: The type of exercise you should do depends on your fitness goals. Some common types include cardio exercises like running or swimming, strength training exercises like weightlifting, and flexibility exercises like yoga.\nUser:"
# context = "\nUser:"
# question = "What was the exact date that the second world war occurred in?"


# # Ask the question
# answer = ask_question(question, context)

# # Print the answer
# print("AI:", answer)
