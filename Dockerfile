FROM python:3.12-alpine
WORKDIR /track_a_tron

# Copy folders:
COPY app app
COPY requirements requirements

# Config files:
COPY .env .env
COPY gunicorn.conf.py gunicorn.conf.py
COPY supervisord.conf supervisord.conf
COPY supervisor.apps.ini supervisor.apps.ini

# Create logs directory:
RUN mkdir -p /track_a_tron/logs

# timezone:
ENV TZ=Europe/London
RUN apk add --update --no-cache linux-headers tzdata

# Install weasyprint requirements:
RUN apk add py3-pip gcc musl-dev  \
    python3-dev pango zlib-dev jpeg-dev  \
    openjpeg-dev g++ libffi-dev

# Install weasyprint fonts:
RUN apk add --update --upgrade --no-cache  \
    fontconfig ttf-freefont font-noto  \
    terminus-font && fc-cache -f && fc-list | sort

# Install pip requirements:
RUN pip install --upgrade pip
RUN pip install -r requirements/production.txt

# START
ENTRYPOINT ["supervisord"]
