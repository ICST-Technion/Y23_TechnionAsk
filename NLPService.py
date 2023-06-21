from flask import Flask, request, jsonify

class NLPService:
  def __init__(self, service_name, history_manager): #add host name and credentials
    self.service_name = service_name
    self.history_manager = history_manager

  def ask_question(question, history=None):
    pass

  def jsonResponse(self, stringData):
    response = jsonify(stringData)
    response.headers.add('Access-Control-Allow-Origin', '*')
    # response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    # response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response
