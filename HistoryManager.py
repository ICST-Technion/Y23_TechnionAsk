from DatabaseManager import DatabaseManager
class HistoryManager:
    def __init__(self, db_manager : DatabaseManager):
        self.db_manager = db_manager

    def get_history(self, userid):
        where_arg = "userid = " + str(userid)
        select_arg = "question"
        history = self.db_manager.select("history", where_arg, select_arg)
        for i, row in enumerate(history):
            history[i] = row.rstrip()
        return history

    def update_history(self, userid, query, answer, query_heb = None, answer_heb = None):
        if query_heb:
            args = "({userid}, \'{query}\', \'{answer}\', \'{query_heb}\', \'{answer_heb}\')".format(userid=userid, query=query, answer=answer, query_heb=query_heb, answer_heb=answer_heb)
        else:
            args = "({userid}, \'{query}\', \'{answer}\')".format(userid=userid, query=query, answer=answer)
        self.db_manager.insert("history", args)
