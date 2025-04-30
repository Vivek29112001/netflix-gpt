# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Netflix GPT
- create vite.js
- Configured TailwindCss
- Header
- Login Form
- Signup Form
- routing
- form validation
- useRef Hook
- firebase setup
- deploying app to production 
- create signup user account
- Implement Sign In user Api
- created Redux Store with user slice
- Implement signout page
- updated profile
- BugFix:Signup user displayName and profile picture update
- BugFix: if the user is logged in redirect /browser to login page and vice-versa
- BugFix: unscribed to the onAuthstatechanged callback
- Add hardcoded values to the constant file
- Register TMDB API & create an app & get access token 
- get data from TMDB now playing movie list
 


# Features
### Login/SignUp
- Sign In/ Sign Up Form
- redirect to Browser Page


### Browser (after authentication)
- Header
- Main Movie
    - Tailer in Background
    - Title & Description
    - MovieSuggestions
        - MovieList * N
- NetflixGPT
    - Search Bar
    - Movie Suggestion