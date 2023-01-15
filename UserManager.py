from DatabaseManager import DatabaseManager
class UserManager:
    def __init__(self, db_manager : DatabaseManager):
        self.db_manager = db_manager

    def insertUser(self, name, password):
        return self.db_manager.insert('accounts (username, password)', "('" + name + "', '" + password + "'")


    def getUserId(self, name):
        user_id = self.db_manager.select('accounts', 'Name = ' + name, 'userid')
        return None

    def authenticateUser(self, name, password):
        user_password = self.db_manager.select('accounts', 'username = ' + name, 'password')
        if user_password is not None:
            if user_password == password:
                return True
        return False
