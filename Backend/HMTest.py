import unittest
import HistoryManager
import DatabaseManager




def add_one_line_to_query_heb_or_answer_heb(self, heb, line):
    heb.append(line)
    pass

# this is a unit test that tests History Manager
class TestDBM(unittest.TestCase):
    @classmethod
    def setUpClass(cls):  # activates at the beginning
        pass

    @classmethod
    def tearDownClass(cls):  # activates at the end
        pass

    def setUp(self):  # activates at the beginning of every test
        # database_manager.drop_table("test1")
        pass

    def tearDown(self):  # activates at the end of every test
        # database_manager.drop_table("test1")
        pass

    def test_get_history_function(self):
        mycursor = database_manager.get_cursor()
        # initialize the database
        query_heb = []
        answer_heb = []
        for i in range(100):
            add_one_line_to_query_heb_or_answer_heb(query_heb, "hey" + str(i))
            add_one_line_to_query_heb_or_answer_heb(answer_heb, "hey" + str(i))
            args = "({userid}, \'{query}\', \'{answer}\', \'{query_heb}\', \'{answer_heb}\')".format(userid=0, query="a", answer="b", query_heb=query_heb, answer_heb=answer_heb)
            self.db_manager.insert("history", args)
            query = "SELECT answer_heb FROM history WHERE userid = 0"
            mycursor.execute(query)
            # test the get_history function
            expected_result = HistoryManager.get_history()

            self.assertEqual(expected_result, answer_heb)
            query = "SELECT query_heb FROM history WHERE userid = 0"
            mycursor.execute(query)
            expected_result = HistoryManager.get_history()
            self.assertEqual(expected_result, query_heb)
            # delete the information from the Database
            query = "DELETE FROM history WHERE userid = 0"
            mycursor.execute(query)


    def test_update_history_function(self):
        mycursor = database_manager.get_cursor()
        # initialize the database
        query_heb = []
        answer_heb = []
        for i in range(100):
            add_one_line_to_query_heb_or_answer_heb(query_heb, "hey" + str(i))
            add_one_line_to_query_heb_or_answer_heb(answer_heb, "hey" + str(i))
            history_manager.update_history(str(i), str(i), str(i+1), query_heb, answer_heb)
            query = "SELECT * FROM history WHERE userid = 0"
            mycursor.execute(query)
            # test the get_history function
            expected_result = HistoryManager.get_history()

            self.assertEqual(expected_result, str(i))
            self.assertEqual(expected_result, str(i))
            self.assertEqual(expected_result, str(i+1))
            self.assertEqual(expected_result, query_heb)
            self.assertEqual(expected_result, answer_heb)
            # delete the information from the Database
            query = "DELETE FROM history WHERE userid = 0"
            mycursor.execute(query)



if __name__ == '__main__':
    database_manager = DatabaseManager.DatabaseManager()
    history_manager = HistoryManager.HistoryManager(database_manager)
    cursor = database_manager.get_cursor()
    unittest.main()
