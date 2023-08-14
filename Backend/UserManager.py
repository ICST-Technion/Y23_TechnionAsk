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
        if self.isBlocked(name) and not self.isAdmin(name):
            return False
        user_password = self.db_manager.select('accounts', "username = '" + name + "'", 'password')
        #Lara - temporary add checking not empty list is returned 
        if user_password is not None and not(user_password == []):
            if user_password[0] == password:
                return True
        return False
    
    def isBlocked(self, name):
        result = self.db_manager.select('accounts', "username = '" + name + "'", 'blocked')
        return result[0]

    def setBlocked(self, name, value):
        self.db_manager.update('accounts', 'blocked', value, 'username', name)
        return
    
    def isAdmin(self, name):
        result = self.db_manager.select('accounts', "username = '" + name + "'", 'admin')
        return result[0]

    def setAdmin(self, name, value):
        self.db_manager.update('accounts', 'admin', value, 'username', name)
        return

    #Lara - Adding for Admin View test
    def getAllDBUsers(self):
        return self.db_manager.select('accounts', 'True ORDER BY userid', '(username, admin, blocked)')

    def getUsername(self, userId):
        user_name = self.db_manager.select('accounts', "userid = '" + userId + "'", 'username')
        if(len(user_name) == 0):
            return None
        return user_name[0]
