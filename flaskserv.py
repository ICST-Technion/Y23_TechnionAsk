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

def jsonResponse(stringData):
    response = jsonify(stringData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def keep_letters_until_space(string):
    result = re.findall(r'^[^\s]+', string)
    return result[0] if result else ""

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
    user_manager.insertUser(username, userPassword)
    # return 'Successfully registered'
    return jsonResponse({'data' : 'sign-up', 'result' : True})

@app.route('/login')
def login():
    #using User manager to authenticate the user.
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
    else:
        return chatgpt_instance.search_eng(userid, query)

'''This request returns a list of all of the signed up users.'''
@app.route('/getAllUsers')
def getAllUsers():
    users = (user_manager.getAllDBUsers())
    for i in range(len(users)):
        users[i] = (users[i][1:len(users[i])-1].replace("\"", "")).split(',')
        users[i][0] = keep_letters_until_space(users[i][0])
        users[i][1] = False if users[i][1] == 'f' else True
        users[i][2] = 'Blocked' if users[i][2] == 't' else 'Active'
    return jsonResponse({'data' : 'getAllUsers', 'tableHead': ['Username', 'Privileges', 'Status'] ,'result' : users})

'''This request returns the question history of all of the users'''
@app.route('/getAllHistory')
def getAllHistory():
    history = (history_manager.get_all_history())
    for i in range(len(history)):
        history[i] = history[i][1:len(history[i])-1]
        userId = history[i].split(',')[0]
        question = history[i][len(userId) + 1 :len(history[i])].split("\"")[1]
        answer = [item for item in history[i][len(userId) + 1 :len(history[i])].split("\"") if item != '']
        answer = answer[len(answer)-1]
        history[i] = [(str(user_manager.getUsername(userId))).strip(), str(question).strip(), answer]
    return jsonResponse({'data' : 'getAllHistory', 'tableHead': ['Username', 'Question', 'Answer'], 'result' : history})

'''This request updates the access of a specific user, blocked or allowed'''
@app.route('/changeAccess')
def changeAccess():
    data = request.args
    userToChange = data.get('username')
    new_blocked_value = False if user_manager.isBlocked(userToChange) else True
    user_manager.setBlocked(userToChange, new_blocked_value)
    return jsonResponse({'data' : 'changeAccess', 'result' : True})

'''This request updates the privilege of a specific user'''
@app.route('/changePrivilege')
def changePrivilege():
    data = request.args
    userToChange = data.get('username')
    new_admin_value = False if user_manager.isAdmin(userToChange) else True
    user_manager.setAdmin(userToChange, new_admin_value)
    return jsonResponse({'data' : 'changePrivilege', 'result' : True})

'''This request updates the settings of the application - login and signup enabling.'''
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

'''This request returns the settings of the application - login and signup enabling.'''
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
