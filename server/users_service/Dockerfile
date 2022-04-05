FROM python:3.9-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY Pipfile Pipfile.lock /code/
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile
COPY . /code/
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
