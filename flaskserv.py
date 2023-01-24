# import main Flask class and request object
from flask import Flask, request, jsonify
from googletrans import Translator
import DatabaseManager, HistoryManager, UserManager, NLPWrapper
# create the Flask app
app = Flask(__name__)
database_manager = None
history_manager = None
user_manager = None

def jsonResponse(stringData):
    response = jsonify(stringData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/testlogin')
def userTest():
    username = request.args.get("username")
    password = request.args.get("password")
    print('username is:' + username + ' and the password is:' + password)
    # if user_manager.authenticateUser(username, password):
        # return 'authentication succeeded'
    return jsonResponse({'data' : 'login', 'result' : 'authentication succeeded'})
    # else:
    #     # return 'authentication failed'
    #     return jsonResponse({'data' : 'login', 'result' : 'authentication failed'})

@app.route('/signup')
def signup():
    username = request.args.get("username")
    userPassword = request.args.get("password")
    userid = user_manager.getUserId(username)
    if userid is not None: #username already exists
        # return 'This account already exists'
        return jsonResponse({'data' : 'sign-up', 'result' : 'This account already exists'})
        #jsonResponse({'data': 'signup', 'result': False})
    user_manager.insertUser(username, userPassword)
    # return 'Successfully registered'
    return jsonResponse({'data' : 'sign-up', 'result' : 'Successfully registered'})
    #jsonResponse({'data': 'signup', 'result': True})


@app.route('/login')
def login():
    #send a request to User service
    # database_manager.insert('accounts', "(10, 'Test')")
    username = request.args.get("username")
    userPassword = request.args.get("password")
    result = user_manager.authenticateUser(username, userPassword)
    print(result)
    return jsonResponse({'data' : 'login', 'result' : result})
@app.route('/search/<username>/<query>')
def search(username, query):
    userid = user_manager.getUserId(username)
    translator = Translator(service_urls=['translate.google.com'])
    lang = translator.detect(query).lang
    print(lang)
    if (lang == 'iw' or lang == 'he'):
        return search_heb(userid, query)
    else:
        return search_eng(userid, query)

def search_eng(userid, query):
    old_history = history_manager.get_history(userid)
    answer, new_history = NLPWrapper.get_answer(query, old_history)
    history_manager.update_history(userid, query, answer)
    # answer = "answer: World War II began in Europe on September 1, 1939, when Germany invaded Poland. Great Britain and France responded by declaring war on Germany on September 3. The war between the U.S.S.R. and Germany began on June 22, 1941, with Operation Barbarossa, the German invasion of the Soviet Union. The war in the Pacific began on December 7/8, 1941, when Japan attacked the American naval base at Pearl Harbor and other American, Dutch, and British military installations\nSource:\nhttps://www.britannica.com/event/World-War-II"
    answered, sources = answer.split("answer:")[1].split("Source:\n")
    answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answered, 'Sources' : sources}
    return jsonResponse(answerResponse)

def search_heb(userid, query_heb):
    translator = Translator(service_urls=['translate.google.com'])
    query_eng = translator.translate(text = query_heb, src='he').text
    old_history = history_manager.get_history(userid)
    answer, new_history = NLPWrapper.get_answer(query_eng, old_history)
    answer_text, sources = answer.split("answer:")[1].split("Source:\n")
    answer_heb = translator.translate(text = answer_text, dest = 'he', src='en').text
    history_manager.update_history(userid, query_eng, answer_text+sources, query_heb, answer_heb)
    answerResponse = {'user' : userid, 'question' : query_heb, 'answer' : answer_heb, 'Sources' : sources}
    return jsonResponse(answerResponse)

#@app.route('/sign-up')
#def signup():
#    return jsonResponse({'data' : 'sign-up', 'result' : True})

@app.route('/query-example')
def query_example():
    return jsonResponse({'data' : 'Query String Example'})

@app.route('/form-example')
def form_example():
    return jsonResponse({'data' : 'Form Data Example'})

@app.route('/json-example')
def json_example():
    return jsonResponse({'data' : 'JSON Object Example'})





if __name__ == '__main__':
    # run app in debug mode on port 5000
    database_manager = DatabaseManager.DatabaseManager()
    database_manager.connect()
    history_manager = HistoryManager.HistoryManager(database_manager)
    user_manager = UserManager.UserManager(database_manager)
    app.run(host='0.0.0.0', debug=True, port=65435)
