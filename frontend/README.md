# 🤖 ChatBotX Frontend

A modern, responsive React frontend for ChatBotX AI Application with an attractive UI and full chat functionality.

## 🌟 Features

### ✨ Core Features
- **Modern Dashboard** - Beautiful home page with hero section and feature highlights
- **Real-time Chat** - Seamless conversation with AI chatbot
- **User Authentication** - Secure login and registration system
- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Smooth Animations** - Delightful micro-interactions and transitions
- **Dark-Modern UI** - Gradient purple theme with modern design patterns

### 🎨 UI Components
- **Navbar** - Sticky navigation with responsive mobile menu
- **Home Dashboard** - Landing page with features showcase and call-to-action
- **Chat Interface** - Full-featured chat with message history and auto-scrolling
- **Login Page** - Secure authentication with demo credentials info
- **Register Page** - Account creation with password validation
- **Feature Cards** - Six key features displayed in responsive grid
- **How It Works** - Step-by-step guide for new users

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html           # Main HTML file
│   └── package.json
├── src/
│   ├── components/
│   │   └── Navbar.jsx       # Navigation bar component
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication context
│   ├── pages/
│   │   ├── Home.jsx         # Home dashboard page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   └── ChatDashboard.jsx # Chat interface
│   ├── services/
│   │   └── api.js           # API calls with axios
│   ├── styles/
│   │   └── globalStyles.js  # Global CSS and animations
│   ├── App.js               # Main app component
│   └── index.js             # React entry point
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 🎨 Design Highlights

### Color Scheme
- **Primary Gradient**: #667eea → #764ba2 (Purple)
- **Background**: #f8f9fa (Light Gray)
- **Surface**: White
- **Text**: #1a1a1a (Dark)
- **Accent**: #667eea (Purple)

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

### Animations
- `slideInLeft` - Page elements slide in smoothly
- `float` - Gentle floating animation
- `pulse` - Pulsing circle animation
- `bounce` - Bouncing dots animation

## 📱 Page Details

### Home Page (`/`)
- Hero section with ChatBotX branding
- 6 feature cards highlighting key benefits
- "How It Works" section with 4 steps
- Call-to-action buttons
- Footer with links

### Login Page (`/login`)
- Email and password fields
- Error handling with user feedback
- Link to registration
- Demo credentials info box
- Animated form entrance

### Register Page (`/register`)
- Email, password, and confirm password fields
- Password validation (minimum 6 characters)
- Password match validation
- Feature highlights sidebar
- Loading states for better UX

### Chat Dashboard (`/chat`)
- Clean message interface
- Sidebar with "New Chat" button
- Messages with distinct user/assistant styling
- Suggested prompts for new chats
- Real-time message loading indicator
- Auto-scroll to latest messages
- Keyboard support (Enter to send, Shift+Enter for new line)
- Responsive design maintains usability on mobile

## 🔐 Authentication

- JWT token-based authentication
- Tokens stored in localStorage
- Automatic logout functionality
- Protected routes via PrivateRoute component
- Public routes via PublicRoute component

## 🌐 API Integration

All API calls are handled through `src/services/api.js`:

```javascript
// Available endpoints
registerUser(data)      // POST /auth/register
loginUser(data)         // POST /auth/login
sendMessage(data)       // POST /chat/
```

## 🎯 Usage Examples

### Login
```
Email: demo@example.com
Password: demo123
```

### Starting a Chat
1. Click "Sign Up" or "Login"
2. Navigate to Chat page
3. Start typing your message
4. Press Enter or click send button

## 🔧 Customization

### Change Color Scheme
Edit the gradient color in multiple places:
- `Navbar.jsx` - navbar background
- `Home.jsx` - hero and button colors
- `ChatDashboard.jsx` - send button colors
- `styles/globalStyles.js` - animation colors

### Modify Features
Edit the features array in `Home.jsx`:
```javascript
{
  icon: '⚡',
  title: 'Lightning Fast',
  description: 'Get instant responses to your questions with our advanced AI'
}
```

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

## 🐛 Troubleshooting

### Blank Page
- Check browser console for errors
- Verify backend API is running on http://localhost:8000
- Clear localStorage: `localStorage.clear()`

### CORS Issues
- Ensure backend allows CORS from frontend origin
- Check API base URL in `services/api.js`

### Authentication Errors
- Verify token is being saved correctly
- Check AuthContext in DevTools
- Clear localStorage and login again

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎓 Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **CSS-in-JS** - Inline styling for components
- **Vite** - Build tool and dev server

## 📞 Support

For issues or questions, please check the backend documentation or contact support.

## 📄 License

This project is part of the ChatBotX AI Application.

---

**Made with ❤️ for ChatBotX**
