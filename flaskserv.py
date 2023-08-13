# import main Flask class and request object
from flask import Flask, request, jsonify
import re
from googletrans import Translator
import DatabaseManager, HistoryManager, UserManager
from NLPWrapper import NLPWrapper
from chatGPT import ChatGPTService
# create the Flask app
app = Flask(__name__)
database_manager = None
history_manager = None
user_manager = None
chatgpt_instance = None
nlpwrapper_instance = None
login_enabled = True
signup_enabled = True
search_enabled = True

fixedUsers = [['Test123', True, 'Blocked'],
          ['MalikKhalaf', True, 'Active'],
          ['Mohammad', False, 'Active'],
          ['NoamAlon', False, 'Blocked'],]

def jsonResponse(stringData):
    response = jsonify(stringData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

def keep_letters_until_space(string):
    result = re.findall(r'^[^\s]+', string)
    return result[0] if result else ""

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
    if not signup_enabled:
        return jsonResponse({'data' : 'signup', 'result' : False, 'error' : 'Signup disabled!'})
    username = request.args.get("username")
    userPassword = request.args.get("password")
    userid = user_manager.getUserId(username)
    if userid is not None: #username already exists
        # return 'This account already exists'
        return jsonResponse({'data' : 'sign-up', 'result' : False, 'error' : 'Username already exists!'})
        #jsonResponse({'data': 'signup', 'result': False})
    user_manager.insertUser(username, userPassword)
    # return 'Successfully registered'
    return jsonResponse({'data' : 'sign-up', 'result' : True})
    #jsonResponse({'data': 'signup', 'result': True})


@app.route('/login')
def login():
    #send a request to User service
    # database_manager.insert('accounts', "(10, 'Test')")
    username = request.args.get("username")
    userPassword = request.args.get("password")
    result = user_manager.authenticateUser(username, userPassword)
    is_admin = False
    if result:
        print(user_manager.isAdmin(username))
        is_admin = True if user_manager.isAdmin(username) else False
    print(jsonResponse({'data' : 'login', 'result' : result, 'admin' : is_admin, 'email': username}))
    if not login_enabled and not is_admin:
        return jsonResponse({'data': 'login', 'result' : False, 'error' : 'Login disabled!'})
    return jsonResponse({'data' : 'login', 'result' : result, 'admin' : is_admin, 'email': username})

@app.route('/search/<username>/<service>/<query>')
def search(username, service, query):
    userid = user_manager.getUserId(username)
    answer = ""
    if 'NLP' in service:
        translator = Translator(service_urls=['translate.google.com'])
        lang = translator.detect(query).lang
        if (lang == 'iw' or lang == 'he'):
            return nlpwrapper_instance.search_heb(userid, query)
        else:
            return nlpwrapper_instance.search_eng(userid, query)
        #answer = "answer: World War II began in Europe on September 1, 1939, when Germany invaded Poland. Great Britain and France responded by declaring war on Germany on September 3. The war between the U.S.S.R. and Germany began on June 22, 1941, with Operation Barbarossa, the German invasion of the Soviet Union. The war in the Pacific began on December 7/8, 1941, when Japan attacked the American naval base at Pearl Harbor and other American, Dutch, and British military installations\nSource:\nhttps://www.britannica.com/event/World-War-II"
        #answered, sources = answer.split("answer:")[1].split("Source:\n")
    else:
        return chatgpt_instance.search_eng(userid, query)
       # answered = chatGPT.ask_question(query)
        #sources = "ChatGPT"
    #answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answered, 'Sources' : sources}
    #return jsonResponse(answerResponse)
    #translator = Translator(service_urls=['translate.google.com'])
    #lang = translator.detect(query).lang
    #print(lang)
    #if (lang == 'iw' or lang == 'he'):
    #    return search_heb(userid, query)
    #else:
    #return new_search_eng(userid, query)

# def new_search_eng(userid, query):
#     answered = chatGPT.ask_question(query)
#     answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answered, 'Sources' : "ChatGPT"}
#     return jsonResponse(answerResponse)


# def search_eng(userid, query):
#     old_history = history_manager.get_history(userid)
#     answer, new_history = NLPWrapper.get_answer(query, old_history)
#     history_manager.update_history(userid, query, answer)
#     # answer = "answer: World War II began in Europe on September 1, 1939, when Germany invaded Poland. Great Britain and France responded by declaring war on Germany on September 3. The war between the U.S.S.R. and Germany began on June 22, 1941, with Operation Barbarossa, the German invasion of the Soviet Union. The war in the Pacific began on December 7/8, 1941, when Japan attacked the American naval base at Pearl Harbor and other American, Dutch, and British military installations\nSource:\nhttps://www.britannica.com/event/World-War-II"
#     answered, sources = answer.split("answer:")[1].split("Source:\n")
#     answerResponse = {'data' : 'search', 'user' : userid, 'question' : query, 'answer' : answered, 'Sources' : sources}
#     return jsonResponse(answerResponse)

# def search_heb(userid, query_heb):
#     translator = Translator(service_urls=['translate.google.com'])
#     query_eng = translator.translate(text = query_heb, src='he').text
#     old_history = history_manager.get_history(userid)
#     answer, new_history = NLPWrapper.get_answer(query_eng, old_history)
#     answer_text, sources = answer.split("answer:")[1].split("Source:\n")
#     answer_heb = translator.translate(text = answer_text, dest = 'he', src='en').text
#     history_manager.update_history(userid, query_eng, answer_text+sources, query_heb, answer_heb)
#     answerResponse = {'user' : userid, 'question' : query_heb, 'answer' : answer_heb, 'Sources' : sources}
#     return jsonResponse(answerResponse)

@app.route('/getAllUsers')
def getAllUsers():
    # Lara - TODO Add Admin Check for username
    # username = request.args.get("username")
    # userPassword = request.args.get("password")
    users = (user_manager.getAllDBUsers())
    for i in range(len(users)):
        users[i] = (users[i][1:len(users[i])-1].replace("\"", "")).split(',')
        users[i][0] = keep_letters_until_space(users[i][0])
        users[i][1] = False if users[i][1] == 'f' else True
        users[i][2] = 'Blocked' if users[i][2] == 't' else 'Active'
    return jsonResponse({'data' : 'getAllUsers', 'tableHead': ['Username', 'Privileges', 'Status'] ,'result' : users})

@app.route('/getAllHistory')
def getAllHistory():
    # Lara - TODO Add Admin Check for username
    # username = request.args.get("username")
    # userPassword = request.args.get("password")
    history = (history_manager.get_all_history())
    for i in range(len(history)):
        history[i] = history[i][1:len(history[i])-1]
        userId = history[i].split(',')[0]
        question = history[i][len(userId) + 1 :len(history[i])].split("\"")[1]
        answer = [item for item in history[i][len(userId) + 1 :len(history[i])].split("\"") if item != '']
        answer = answer[len(answer)-1]
        history[i] = [(str(user_manager.getUsername(userId))).strip(), str(question).strip(), answer]
    return jsonResponse({'data' : 'getAllHistory', 'tableHead': ['Username', 'Question', 'Answer'], 'result' : history})

@app.route('/changeAccess')
def changeAccess():
    data = request.args
    userToChange = data.get('username')
    new_blocked_value = False if user_manager.isBlocked(userToChange) else True
    user_manager.setBlocked(userToChange, new_blocked_value)
    # adminBlocking = data.get('adminBlocking')
    # Lara TODO add check userToBlock is not client
    # Add admin check
    # Change in database
    # for user in fixedUsers:
    #     if user[0] == userToChange:
    #         if user[2] == "Blocked":
    #             user[2] = "Active"
    #         else:
    #             user[2] = "Blocked"
    return jsonResponse({'data' : 'changeAccess', 'result' : True})

@app.route('/changePrivilege')
def changePrivilege():
    data = request.args
    userToChange = data.get('username')
    new_admin_value = False if user_manager.isAdmin(userToChange) else True
    user_manager.setAdmin(userToChange, new_admin_value)
    # adminBlocking = data.get('adminBlocking')
    # Lara TODO add check userToChange is not client
    # Add admin check
    # Change in database
    # for user in fixedUsers:
    #     if user[0] == userToChange:
    #         user[1] = not user[1]
    return jsonResponse({'data' : 'changePrivilege', 'result' : True})

@app.route('/changeAdminSettings')
def changeAdminSettings():
    global login_enabled
    global signup_enabled
    data = request.args
    if not ('loginEnabled' in data and 'signupEnabled' in data):
        return jsonResponse({'data' : 'changeAdminSettings', 'result' : False})
    login_value = data.get('loginEnabled')
    signup_value = data.get('signupEnabled')
    login_enabled = False if login_value == 'false' else True
    signup_enabled = False if signup_value == 'false' else True
    return jsonResponse({'data' : 'changeAdminSettings', 'result' : True})

@app.route('/viewAdminSettings')
def viewAdminSettings():
    data = request.args
    user = data.get('username')
    if not user_manager.isAdmin(user):
        return jsonResponse({'data' : 'viewAdminSettings', 'result' : False})
    return jsonResponse({'data' : 'viewAdminSettings', 'result' : True, 'login_enabled' : login_enabled, 'signup_enabled' : signup_enabled})

if __name__ == '__main__':
    # run app in debug mode on port 5000
    database_manager = DatabaseManager.DatabaseManager()
    database_manager.connect()
    history_manager = HistoryManager.HistoryManager(database_manager)
    user_manager = UserManager.UserManager(database_manager)
    chatgpt_instance = ChatGPTService(history_manager)
    nlpwrapper_instance = NLPWrapper(history_manager)
    app.run(host='0.0.0.0', debug=True, port=65435)
