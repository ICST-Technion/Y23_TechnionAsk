import psycopg2

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
          print('Insertion failed - ')
          print(error)
      finally:
          self.commit()
          cur.close()

  def select(self, table_name, where_arg, to_select_arg = "*"):
      res = []
      result = []
      try:
          cur = self.get_cursor()
          query = "SELECT " + to_select_arg + " FROM " + table_name + " WHERE " + where_arg
          psycopg2.extensions.register_type(psycopg2.extensions.UNICODE, cur)
          cur.execute(query)
          result = cur.fetchall()
          if result:
              for row in result:
                  res.append(row[0])
      except (Exception, psycopg2.DatabaseError) as error: # check why Exception first
          print('Selection failed - ' + str(error))
      finally:
          self.commit()
          cur.close()
          return res


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
