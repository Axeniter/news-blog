# news-blog
News blog made with FastAPI + React
## How to start
### Requirements
- Python 3.13.3+
- pip 25.3+
- Node.js 24.11.0+
- npm 11.6.1+
### Backend
```
cd api
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```
cd app
npm install
npm run dev
```