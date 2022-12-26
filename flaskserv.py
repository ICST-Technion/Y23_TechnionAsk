# import main Flask class and request object
from flask import Flask, request
import psycopg2

# create the Flask app
app = Flask(__name__)
database_manager = None

@app.route('/login')
def login():
    #send a request to User service
    database_manager.insert('accounts', "(10, 'Test')")
    return 'Login String Example'

@app.route('/sign-up')
def signup():
    return 'Sign Up String Example'

@app.route('/query-example')
def query_example():
    return 'Query String Example'

@app.route('/form-example')
def form_example():
    return 'Form Data Example'

@app.route('/json-example')
def json_example():
    return 'JSON Object Example'



class DatabaseManager:
  def __init__(self): #add host name and credentials
    self.host = "technionaskdb.cefqptmvyq28.us-east-1.rds.amazonaws.com"
    self.database = 'TechnionAskIDB'
    self.user = 'technionask'
    self.password = 'Technionask2022'
    self.port = '5432'
    self.conn = None

  def connect(self):
      if self.conn is not None:
          return self.conn
      try:
          # connect to the PostgreSQL server
          print('Connecting to the PostgreSQL database...')
          self.conn = psycopg2.connect(user=self.user,
                                        password=self.password,
                                        host=self.host,
                                        port=self.port,
                                        database=self.database)

      except (Exception, psycopg2.DatabaseError) as error:
          print(error)
      finally:
          return self.conn

  def disconnect(self):
      if self.conn is not None:
          self.conn.close()
      self.conn = None

  def get_cursor(self):
      conn = self.connect()
      if conn is not None:
          return conn.cursor()
      return None

  def commit(self):
      if self.conn is not None:
          self.conn.commit()

  def insert(self,table_name, args_string):
      try:
          cur = self.get_cursor()
          query = "INSERT INTO " + table_name + " VALUES " + args_string
          cur.execute(query)
      except (Exception, psycopg2.DatabaseError) as error: # check why Exception first
          print('Insertion failed - ' + error)
      finally:
          self.commit()
          cur.close()



  def delete(self):
      #TODO
      pass

  def create_table(self, table_name, args_string):
      try:
          cur = self.get_cursor()
          query = 'CREATE TABLE ' + table_name + ' ' + args_string
          cur.execute(query)
      except (Exception, psycopg2.DatabaseError) as error: # check why Exception first
          print('Table creation failed - ' + error)
      finally:
          self.commit()
          cur.close()



if __name__ == '__main__':
    # run app in debug mode on port 5000
    database_manager = DatabaseManager()
    database_manager.connect()
    app.run(host='0.0.0.0', debug=True, port=65432)