import argparse

from qa.bot import GroundedQaBot
cohere_api_key = "Cp8naemKJPATYAMFd0YZ2pEnLODLpnuIK7IMhMTO"
serp_api_key = "2ca3ce5a9db573395405b190e264c209617053e3c428510325edff9296f9942b"
verbosity = 0

bot = GroundedQaBot(cohere_api_key, serp_api_key)

def NLPWrapper(question, history=None):
    if history is None:
        history = []
    bot.set_chat_history(history)
    reply, source_urls, source_texts = bot.answer(question, verbosity=verbosity, n_paragraphs=2)
    sources_str = "\n".join(list(set(source_urls)))
    reply_incl_sources = f"{reply}\nSource:\n{sources_str}"
    answer = "answer: " + reply_incl_sources
    history = bot.chat_history
    return answer, history

# This is only for testing
if __name__ == "__main__":
    answer, history = NLPWrapper("who is a sylvester stallone?")
    print(answer, history)