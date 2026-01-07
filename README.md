# Auth App - Angular 19 Frontend

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm start
```

Navigate to `http://localhost:4200`

## Features

- **Login Page**: User authentication with JWT
- **Register Page**: New user registration
- **Profile Page**: Protected route showing user information
- **Auth Guard**: Route protection
- **HTTP Interceptor**: Automatic JWT token injection

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/          # Login component
│   │   ├── register/       # Registration component
│   │   └── profile/        # User profile component
│   ├── services/
│   │   └── auth.service.ts # Authentication service
│   ├── models/
│   │   └── user.model.ts   # TypeScript interfaces
│   ├── guards/
│   │   └── auth.guard.ts   # Route guard
│   ├── interceptors/
│   │   └── auth.interceptor.ts # HTTP interceptor
│   ├── app.component.ts    # Root component
│   └── app.routes.ts       # Route configuration
├── styles.scss             # Global styles
└── index.html              # Main HTML file
```

## Configuration

Update the API URL in `src/app/services/auth.service.ts`:

```typescript
private apiUrl = 'https://localhost:7000/api/auth';
```

## Building for Production

```bash
npm run build
```

Build artifacts will be in the `dist/` directory.

## Routes

- `/login` - Login page
- `/register` - Registration page
- `/profile` - User profile (protected)

## Styling

The app uses SCSS with a modern gradient design. Global styles are in `src/styles.scss`.
