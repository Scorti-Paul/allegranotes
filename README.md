![logo](https://allegranotes.vercel.app/logo.png)  
<br />

# Project Documentation

### Table of Content
- Project Overview
- Installation & Setup
- Folder Structure 
- Core Features
- Tech Stack
- API Documentation
- Future Improvements
- Others

## 1. Project Overview
A basic note-taking application that allows users to **create**, **view**, **edit**, and **delete** notes.

#### Live Site
[Visit Live Site](https://allegranotes.vercel.app)

### UI/UX Design
[Link To Prototype](https://www.figma.com/proto/HrX5Wfv1HG6KQIpwD57PVB/Allergo---Notes?node-id=0-1&t=NfmqdhGrwc8WSO65-1)

## 2. Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Typescript


### Setup Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Scorti-Paul/allegranotes.git
   ```
2. Navigate to the project directory:
   ```sh
   cd allegranotes
   ```
3. Create .env file:
   ```sh
   REACT_APP_URL=http://localhost:3500/api
   ```
4. Install dependencies:
   ```sh
   npm install  
   # OR
   yarn install
   ```
5. Start the development server:
   ```sh
   npm run dev
   # OR
   yarn dev
   ```

## 3. Folder Structure
```
project-folder/
│── src/
│   ├── api/              # API request functions
│   ├── assets/           # API request functions
│   ├── components/       # Reusable UI components
│   ├── navigator/        # Routes
│   ├── pages/            # Page components
│   ├── utils/            # Helper functions
│   ├── index.css         # Global styles
│   ├── App.tsx           # Main application file
│   ├── index.tsx         # Entry point
│── public/
│── .gitignore
│── package.json
│── README.md
│── tailwind.config.js
│── tsconfig.json
```

## 4. Core Features
- **Notes Management**: Create, view, update, and delete notes
- **Categories & Tags**: Assign categories and tags to notes
- **Error Handling**: Implemented with an **Error Boundary**
- **State Management**: React state + React Query for async data fetching
- **Custom Styling**: Tailwind CSS and react-select custom styles
- **API Integration**: Axios for API requests

## 5. Tech Stack
- **Frontend**: React + TypeScript
- **State Management**: React Query
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **API Calls**: Axios
- **Error Handling**: React Error Boundaries

## 8. Others

#### Shortcuts
A starter project I built to efficiently bootstrap new projects with essential features pre-configured.


#### Future Improvement
**Planned Features**
- User authentication (Sign up, Sign in)
- User authorization to manage only their notes
- Note reminders and priority flags  

**Potential Enhancements**
- Dark mode support
- Offline storage using IndexedDB or PWA
- Markdown support for rich text editing
