# Voice-Based IVR System with Plivo API

This project is a **multi-level Interactive Voice Response (IVR) system** built using **Plivo’s Voice API**. It demonstrates outbound call initiation, DTMF-based user input handling, dynamic call flow branching, and call forwarding to a live agent — all controlled via a simple web interface.

The goal of this project is to showcase real-world API integration, backend call logic, webhook handling, and frontend interaction in a clean and scalable way.

---

## 🚀 Features

- Outbound call triggering via web UI
- Multi-level IVR menu
- Language selection (English / Spanish)
- DTMF-based user input handling
- Dynamic call flow branching
- Audio message playback
- Call forwarding to a live agent
- Graceful handling of invalid inputs
- Public webhook exposure using ngrok
- Clean and simple frontend interface

---

## 🧠 IVR Flow

### Level 1: Language Selection
- Press 1 → English  
- Press 2 → Spanish  

### Level 2: Based on Language Selection
- Press 1 → Play a short message  
- Press 2 → Connect to a live agent  

---


---

## 🏗️ Tech Stack

| Layer       | Technology            |
|------------|------------------------|
| Frontend   | HTML, CSS, JavaScript |
| Backend    | Node.js, Express      |
| Voice API  | Plivo                 |
| Tunneling  | ngrok                 |
| Environment| dotenv                |

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/sanjaydsetty/Voice-Based-IVR-System-with-Plivo-API.git
cd plivo-ivr-demo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
PLIVO_AUTH_ID=your_auth_id
PLIVO_AUTH_TOKEN=your_auth_token
PLIVO_FROM_NUMBER=your_plivo_number
AGENT_NUMBER=your_phone_number
BASE_URL=your_ngrok_url
```

### 4. Start the server
```bash
npm start
```

### 5. Run ngrok
```bash
ngrok http 3000
```
