# Roadkill Detection Dashboard

AI 기반 도로 위험 객체 탐지 관제 보조 시스템

## 팀원 소개
202212377 최승연: 프론트엔드
202112347 조세현: AI
202112349 조용국: 백엔드
202011943 채희준: 기획 및 문서화

## 프로젝트 개요

본 프로젝트는 도로 이미지에서 로드킬 사체 또는 동물 객체를 탐지하고, 탐지 결과를 관제 담당자가 대시보드에서 확인·관리할 수 있도록 지원하는 AI 기반 관제 보조 시스템이다.
기존 도로 관제 방식은 관제 담당자가 여러 CCTV 화면을 직접 확인하거나 순찰 인력이 현장을 점검하는 방식에 크게 의존한다. 그러나 이러한 방식은 관제 인력의 피로 누적, 야간 및 악천후 상황에서의 시인성 저하, 작은 객체 탐지 누락 등의 문제가 있다.
특히 로드킬 사체와 같은 도로 위 위험 요소는 일정 시간 방치될 경우 2차 사고로 이어질 수 있다. 이에 본 프로젝트는 주기적으로 수집된 도로 이미지를 AI 객체 탐지 모델로 분석하고, 동물 객체가 탐지된 경우 이를 이벤트로 저장하여 관리자 대시보드에서 확인할 수 있도록 구성하였다.
초기에는 실시간 CCTV 영상 스트리밍 기반 탐지 구조를 고려하였으나, 프로젝트 기간과 구현 난이도를 고려하여 최종 MVP는 주기적 도로 이미지 분석 기반 구조로 조정하였다.

## 주요 기능

- 도로 이미지 기반 동물 객체 탐지
- 탐지 결과 기반 이벤트 생성
- 관리자 대시보드에서 이벤트 목록 조회
- 이벤트 상세 정보 확인
- 탐지 이미지 표시
- 탐지 이미지 위 Bounding Box 시각화
- 이벤트 위험도 표시
- 이벤트 상태 변경
- 처리 메모 저장 및 조회

## 시스템 흐름

도로 이미지가 입력되면 AI 객체 탐지 모델이 이미지를 분석한다.  
동물 객체가 탐지되면 탐지 결과가 JSON 형태로 생성되고, 백엔드 서버로 전달된다.  
백엔드는 탐지 결과를 이벤트로 저장하고, 프론트엔드는 저장된 이벤트를 관리자 대시보드에 표시한다.  
관제 담당자는 대시보드에서 이벤트 상세 정보, 탐지 이미지, Bounding Box, 위험도, 처리 상태를 확인하고 이벤트 상태와 처리 메모를 관리한다.

전체 흐름은 다음과 같다.

도로 이미지 입력
→ AI 객체 탐지
→ 동물 객체 여부 판단
→ 탐지 결과 생성
→ 백엔드 서버 전달
→ 데이터베이스 저장
→ 관리자 대시보드 표시
→ 관제 담당자 상태 관리

## 기술 스택
Frontend
- TypeScript
- React
- Vite
- React Router
- React Context
- Fetch API
- lucide-react
- Vercel
  
Backend
- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Docker
- Docker Compose
- Swagger / OpenAPI
- Uvicorn
- Pydantic v2
  
AI
- YOLOv8
- AIHub 이미지 및 라벨 데이터
- 객체 탐지 모델 학습

## 주요 API
- `GET /api/events`: 이벤트 목록 조회
- `GET /api/events/{eventId}`: 이벤트 상세 조회
- `PATCH /api/events/{eventId}/status`: 이벤트 상태 변경
- `GET /api/events/{eventId}/comments`: 이벤트 메모 목록 조회
- `POST /api/events/{eventId}/comments`: 이벤트 메모 저장
- `POST /api/events/detect`: 이미지 업로드 기반 AI 탐지 이벤트 생성
- `GET /static/images/…`: 저장된 탐지 이미지 조회

## 설치 및 실행 방법
본 프로젝트는 Vercel을 통해 배포되어 있으며, 별도 설치 없이 아래 배포 주소에서 실행 결과를 확인할 수 있다.

배포 주소: https://roadkill-detection.vercel.app

로컬에서 실행할 경우에는 다음 명령어를 사용한다.

1. 프로젝트 클론
git clone https://github.com/haruby2357/Roadkill-Detection.git
cd Roadkill-Detection

2. 패키지 설치
npm install

3. 개발 서버 실행
npm run dev 로컬 실행 후 브라우저에서 http://localhost:5173 으로 접속한다.

4. 빌드 확인
npm run build

