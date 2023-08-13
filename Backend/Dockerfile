FROM python:3.7
ADD requirements.txt ./
RUN pip3.7 install --upgrade pip
RUN pip3.7 install -r requirements.txt
RUN pip3.7 install psycopg2-binary
RUN pip3.7 install googletrans
ADD qa ./qa
ADD *.py ./
ADD api_key.txt ./
ADD database.ini ./
CMD [ "python3.7", "./flaskserv.py" ]
