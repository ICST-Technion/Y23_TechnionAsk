from DatabaseManager import DatabaseManager
class UserManager:
    def __init__(self, db_manager : DatabaseManager):
        self.db_manager = db_manager

    def insertUser(self, name, password):
        return self.db_manager.insert('accounts (username, password)', "('" + name + "', '" + password + "')")


    def getUserId(self, name):
        user_id = self.db_manager.select('accounts', "username = '" + name + "'", 'userid')
        if(len(user_id) == 0):
            return None
        return user_id[0]

    def authenticateUser(self, name, password):
        user_password = self.db_manager.select('accounts', "username = '" + name + "'", 'password')
        #Lara - temporary add checking not empty list is returned 
        if user_password is not None and not(user_password == []):
            if user_password[0] == password:
                return True
        return False

    #Lara - Adding for Admin View test
    def getAllDBUsers(self):
        return self.db_manager.select('accounts', 'True', '(username, password)')

    def getUsername(self, userId):
        user_name = self.db_manager.select('accounts', "userid = '" + userId + "'", 'username')
        if(len(user_name) == 0):
            return None
        return user_name[0]
