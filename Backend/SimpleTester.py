import DatabaseManager, HistoryManager, UserManager
import unittest

database_manager = None
history_manager = None
user_manager = None

class InterfaceTester(unittest.TestCase):
    def testEmptyHistory(self):
        user_manager.insertUser("JohnCena", "BINGCHILLING")
        id = user_manager.getUserId("JohnCena")

        hist = history_manager.get_history(id)
        self.assertEqual(hist, [], "Should be True")

    
    def testSingletonHistory(self):
        user_manager.insertUser("SussyBaka", "I<3UKRAINE")
        id = user_manager.getUserId("SussyBaka")

        self.assertEqual(user_manager.authenticateUser("SussyBaka", "I<3UKRAINE"), True, "Should be True")
        self.assertEqual(user_manager.authenticateUser("SussyBaka", "I<3RUSSIA"), False, "Should be False")
        history_manager.update_history(id, "WHO OWNS CRIMEA?", "censored")
        hist = history_manager.get_history(id)
        self.assertEqual(hist, ["WHO OWNS CRIMEA?"], "Should be True")
    
    def testLongerHistory(self):
        user_manager.insertUser("AvivCensor", "georgi")
        id = user_manager.getUserId("AvivCensor")

        history_manager.update_history(id, "who is epsilon?", "e>0")
        history_manager.update_history(id, "who is delta?", "neighbor of epsilon")
        history_manager.update_history(id, "who is bigger?", "probably delta")

        hist = history_manager.get_history(id)
        self.assertEqual(hist, ["who is epsilon?", "who is delta?", "who is bigger?"], "Should be True")


if __name__ == '__main__': #YOU SHOULD MANUALLY DELETE THE TABLES BEFORE RUNNING THE TEST
    database_manager = DatabaseManager.DatabaseManager()
    database_manager.connect()
    history_manager = HistoryManager.HistoryManager(database_manager)
    user_manager = UserManager.UserManager(database_manager)

    unittest.main()


