import unittest
import UserManager
import DatabaseManager

# this is a unit test that test User Manager


class TestUM(unittest.TestCase):
    @classmethod
    def setUpClass(cls):  # activates at the beginning
        pass

    @classmethod
    def tearDownClass(cls):  # activates at the end
        pass

    def setUp(self):  # activates at the beginning of every test
        pass

    def tearDown(self):  # activates at the end of every test
        pass

    def test_insert_user_function(self):
        # initialize the database for testing
        for i in range(100):
            user_manager.insertUser("user" + str(i), "pass" + str(i))

        # test the getUserId function
        for i in range(100):
            user_id = self.db_manager.select(
                "accounts", "Name = " + "user" + str(i), "userid"
            )
            self.assertEqual(len(user_id), 1)

        # delete the information in the database
        for i in range(100):
            user_manager.deleteUser("user" + str(i))

    def test_getUserId_function(self):
        # initialize the database for testing
        for i in range(100):
            user_manager.insertUser("user" + str(i), "pass" + str(i))

        # test the getUserId function
        for i in range(100):
            user_id_expected = self.db_manager.select(
                "accounts", "Name = " + "user" + str(i), "userid"
            )
            user_id_function = user_manager.getUserId("user" + str(i))
            self.assertEqual(user_id_expected, user_id_function)

        # delete the information in the database
        for i in range(100):
            user_manager.deleteUser("user" + str(i))

    def test_authenticateUser_function(self):
        # initialize the database
        for i in range(100):
            user_manager.insertUser("user" + str(i), "pass" + str(i))
            
        # test the authentication function
        for i in range(100):
            authenticated = user_manager.authenticateUser(
                "user" + str(i), "pass" + str(i)
            )
            not_authenticated = user_manager.authenticateUser(
                "user" + str(i + 1), "pass" + str(i)
            )
            self.assertEquals(authenticated, True)
            self.assertEqual(not_authenticated, False)
        # delete the information in the database
        for i in range(100):
            user_manager.deleteUser("user" + str(i))


if __name__ == "__main__":
    database_manager = DatabaseManager.DatabaseManager()
    user_manager = UserManager.UserManager(database_manager)
    cursor = database_manager.get_cursor()
    unittest.main()
