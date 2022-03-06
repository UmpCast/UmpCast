FROM python:3.9-slim

WORKDIR /code

COPY pyproject.toml poetry.lock /code/

RUN pip install poetry

RUN poetry install

COPY . /code

CMD ["poetry", "run", "python", "app.py"]