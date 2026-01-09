# Python 런타임
FROM python:3.11-slim

# 작업 디렉토리
WORKDIR /app

# 의존성 먼저 복사
COPY requirements.txt .

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 소스 복사
COPY . .

# Cloud Run은 8080 포트 사용
EXPOSE 8080

# 서버 실행
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
