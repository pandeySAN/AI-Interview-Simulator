# 🤖 AI Interview Simulator

An **AI-powered mock interview platform** built with **Next.js (TypeScript)** to help users **practice interviews, improve confidence, and land their dream job**. The simulator generates dynamic interview questions, provides real-time feedback, and creates an interactive environment for preparing both **technical** and **behavioral** interviews.

---

## 🚀 Features

* 🔮 **AI-Generated Questions** – Adaptive interview questions based on role, tech stack, and experience level.
* 📝 **Text & Voice Interaction** – Answer questions via text or voice (configurable).
* 📊 **Performance Insights** – Get instant feedback and improvement suggestions.
* 🎯 **Customizable Scenarios** – Choose role, difficulty level, and interview style (HR / Technical / Behavioral).
* ☁️ **Deployed on Vercel** – Accessible anywhere for quick practice sessions.

---

## 🛠️ Tech Stack

* **Frontend Framework**: Next.js (TypeScript)
* **Styling**: CSS Modules / Tailwind (if enabled)
* **AI Integration**: OpenAI / Gemini APIs (for question generation & feedback)
* **Backend / Storage**: Firebase (for user data, session handling, etc.)
* **Deployment**: Vercel

---

## 🌐 Live Demo

👉 [AI Interview Simulator on Vercel](https://ai-interview-simulator-green.vercel.app)

---

## 📦 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/pandeySAN/AI-Interview-Simulator.git
cd AI-Interview-Simulator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add your API keys (OpenAI/Gemini, Firebase, etc.):

```env
NEXT_PUBLIC_API_KEY=your_api_key_here
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
```

*(update with actual variables you’re using)*

### 4. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start practicing interviews.

---

## 📖 Usage

1. Select your **role, level, and tech stack**.
2. Start the mock interview.
3. Answer questions either in **text** or **voice** (if enabled).
4. Receive instant **feedback, suggestions, and scores**.
5. Track progress to improve over time.

---

## 🛤️ Roadmap

* ✅ Basic AI question generation
* ✅ Next.js frontend with role/level selection
* 🔲 Voice-to-text (speech interview mode)
* 🔲 Advanced analytics & performance tracking
* 🔲 Multi-round interview simulation (HR + Technical + System Design)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/my-feature`)
3. Commit your changes
4. Open a Pull Request

---

## 🙌 Acknowledgments

* Next.js for the React framework
* Firebase for backend support
* OpenAI / Gemini for powering the interview intelligence
