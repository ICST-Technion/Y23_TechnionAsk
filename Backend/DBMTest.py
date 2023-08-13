import unittest
import psycopg2
import DatabaseManager

# this is a unit test which tests the DataBase Manager

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

    def test_create_function(self):
        for i in range(10):
            database_manager.create_table(
                "test" + str(i),
                "(userid int, query char(255), answer char(255));",
            )
            """
            with self.assertRaises(psycopg2.DatabaseError):
                mycursor = database_manager.get_cursor()
                mycursor.execute(
                    "CREATE TABLE {tablename} (name VARCHAR(255), address VARCHAR(255))".format(
                        tablename="test" + str(i)
                    )
                )
            """
        for i in range(10):
            database_manager.drop_table("test" + str(i))

    def test_insert_function(self):
        # initialize the database for testing
        mycursor = database_manager.get_cursor()
        query = "CREATE TABLE test2 (userid int, query text, answer text);"
        mycursor.execute(query)

        # test the insert function
        for i in range(100):
            args = "({userid}, '{query}', '{answer}')".format(
                userid=i,
                query="hey" + str(i),
                answer="hey there" + str(i),
            )
            database_manager.insert("test2", args)
            query = "SELECT * FROM test2 WHERE userid = {userid}".format(userid=i)
            mycursor.execute(query)
            res = mycursor.fetchall()
            self.assertEqual(res[0][0], i)
            self.assertEqual(res[0][1], "hey" + str(i))
            self.assertEqual(res[0][2], "hey there" + str(i))

        # delete the information in the database
        for i in range(100):
            query = "DELETE FROM test2 WHERE userid = {userid}".format(
                userid=i,
            )
            mycursor.execute(query)

        # drop the table
        mycursor.execute("DROP TABLE test2")

    def test_select_function(self):
        mycursor = database_manager.get_cursor()
        # mycursor.execute("DROP TABLE test2")
        # initialize the database
        query = "CREATE TABLE test3 (userid int, query text, answer text);"
        mycursor.execute(query)
        for i in range(100):
            query = "INSERT INTO test3 VALUES ({userid}, '{query}', '{answer}')".format(
                userid=i,
                query="hey" + str(i),
                answer="hey there" + str(i),
            )
            mycursor.execute(query)
        # test the select function
        for i in range(100):
            # get the function result
            to_select_arg = "*"
            where_arg = "userid = {userid1} or userid = {userid2}".format(
                userid1=i, userid2=i + 1
            )
            function_result = database_manager.select("test3", where_arg, to_select_arg)
            # print(function_result)
            # print("\n")
            # get the expected result
            mycursor = database_manager.get_cursor()
            query = "SELECT * FROM test3 WHERE userid = {userid1} or userid = {userid2}".format(
                userid1=i, userid2=i + 1
            )
            mycursor.execute(query)
            expected_result = []
            result = mycursor.fetchone() # not sure of this . when checked what res has it always returned one row even if the query returns more than one row
            if result:
                for row in result:
                    expected_result.append(row)
            # print(expected_result)
            # compare the two results
            # self.assertEqual(len(function_result), len(expected_result))
            for j in range(len(function_result)):
                self.assertEqual(function_result[j], expected_result[j])
        for i in range(100):
            query = "DELETE FROM test3 WHERE userid = {userid}".format(
                userid=i,
            )
            mycursor.execute(query)
        mycursor.execute("DROP TABLE test3")


if __name__ == "__main__":
    database_manager = DatabaseManager.DatabaseManager()
    cursor = database_manager.get_cursor()
    unittest.main()
