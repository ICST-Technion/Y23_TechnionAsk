from DatabaseManager import DatabaseManager
class HistoryManager:
    def __init__(self, db_manager : DatabaseManager):
        self.db_manager = db_manager

    def get_history(self, userid):
        where_arg = "userid = " + userid
        select_arg = "question"
        return self.db_manager.select("history", where_arg, select_arg)

    def update_history(self, userid, query):
        args = "({userid}, \'{query}\')".format(userid=userid, query=query)
        self.db_manager.insert("history", args)
