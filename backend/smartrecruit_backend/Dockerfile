# Use the official Python image from the Docker Hub
FROM python:3.11-slim-bullseye

# Set the working directory in the Docker container
WORKDIR /usr/src/smartrecruit_backend

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install netcat and essential build tools like gcc and others needed for Python packages
RUN apt-get update && \
    apt-get install -y \
    netcat \
    gcc \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    libpq-dev \
    curl

# Upgrade pip and install Cython and setuptools
RUN pip install --upgrade pip && \
    pip install Cython==0.29.32 setuptools

# Copy the Python requirements file into the container and install Python dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt -vvv

# Use spaCy CLI to download the model
RUN python -m spacy download en_core_web_lg

# Copy the entrypoint shell script into the container and prepare it
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/smartrecruit_backend/entrypoint.sh \
    && chmod +x /usr/src/smartrecruit_backend/entrypoint.sh

# Copy the rest of your application code to the container (Make sure this is the last step for efficient caching)
COPY . .

# Specify the command to run on container start, here we use the custom entrypoint script
ENTRYPOINT ["/usr/src/smartrecruit_backend/entrypoint.sh"]

CMD ["bash"]
