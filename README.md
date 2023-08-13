# TechnionAsk
A Technion CS Software-Project "TechnionAsk" for the CS Faculty.<br />

TechnionAsk is a web-based application designed that leverages powerful Natural Language Processing (NLP) services like ChatGPT to provide users with answers to their questions in a chat-like interface. Additionally, the application maintains a record of all question history, which can be used for research purposes by admin members, including research professors, at Technion.

![im1](https://github.com/ICST-Technion/TechnionAsk/assets/102249800/c5f2cb01-141c-4484-b62c-75409093a18a)

### Features

- **Chat Interface:** Communicate with the application through a user-friendly chat interface, making it intuitive for users to interact and ask questions, the user can choose a service from a few options provided.

- **NLP Integration:** Powered by state-of-the-art NLP services such as ChatGPT, ensuring accurate and contextually relevant answers to users' questions. The project integrates more than one service and provides abstraction for adding more services with ease.

- **Question History:** All interactions are logged and stored, allowing admins to analyze question patterns and gather insights for research purposes as well as monitor all activity. Admin is the client and holds the power to add more admins.

### Technology Stack

- **Frontend:** We chose React Native for the frontend to ensure an immersive user experience. Its component-based architecture and strong community support make it a great choice for building interactive and responsive user interfaces.

- **Backend:** The backend of TechnionAsk is built using Flask, a lightweight Python web framework. Flask's simplicity and flexibility were key factors in our decision, allowing us to quickly develop RESTful APIs and integrate with various libraries.

- **Database:** We use PostgreSQL as our database management system. Its reliability, performance, and support for complex data queries make it well-suited for storing and managing the question history and user data.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:

Docker: Docker Installation Guide
Node.js: Node.js Installation Guide
npm: npm Installation Guide

### Installation
# Backend Setup
1. API Key Configuration
Replace the key in api_key.txt file in the backend directory with your ChatGPT search API key.

2. PostgreSQL Database
Edit database.ini file in the backend directory and configure it with your PostgreSQL connection information:

3. Build and Run the Backend Docker Container
Navigate to the backend directory and run the following commands:

docker build -t backend-app .
docker run -dp 0.0.0.0:65435:65435 backend-app

# Frontend Setup
1. Build and Run the Frontend Docker Container
Navigate to the frontend directory and run the following commands:

docker build -t frontend-app ./
docker run -dp 0.0.0.0:19006:19006 frontend-app

### Usage

As a user (not admin), you can sign up and login to your profile which will lead you to a Chat Page where you can ask questions of any of the existing services, both in English and in Hebrew.

The bot you choose can also save the chat context of the previous questions.

![chatPage](https://github.com/ICST-Technion/TechnionAsk/assets/102249800/67a80502-9b1e-4789-9442-442bdc8eaa1d)


As an admin, you have the capabilities of a regular user, but when logging in, you will be moved to the Admin Page, where you can view all users and all the history of questions asked, you have the ability to make someone an admin or strip them of their admin rights, block them from usage or unblock, you can filter through the data and download it as CSV file.

![admin2](https://github.com/ICST-Technion/TechnionAsk/assets/102249800/2aa4180a-7253-4589-8288-dba8a2140cc8)


You may also set settings for the app where you can enable/disable (regular) user login or enable/disable users from signing up until further change.

You can move onto your own Chat Page and ask your questions as well.

## Credits

TODO

## License

TODO

