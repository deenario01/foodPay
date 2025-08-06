# FoodPay 

A modern, secure app that eases how you order food and pay the bill. 

## 🚀 Features

- **OTP Authentication**: Secure login using email and 6-digit OTP
- **Supabase Integration**: Full authentication backend powered by Supabase
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Modern UI with professional styling
- **Route Protection**: Automatic redirection for unauthorized access
- **User Dashboard**: Protected dashboard with user information
- **Session Management**: Automatic session handling with Supabase
- **OTP Expiration**: 2-minute expiration for security

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: Supabase Auth with OTP
- **Styling**: CSS Modules with modern design
- **State Management**: React useState & useEffect
- **Routing**: Next.js Navigation

## 📁 Project Structure

```
foodPay/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── page.tsx          # Auth callback handler
│   │   ├── dashboard/
│   │   │   ├── dashboard.module.css  # Dashboard styles
│   │   │   └── page.tsx              # Protected dashboard page
│   │   ├── verify/
│   │   │   ├── verify.module.css     # Verify page styles
│   │   │   └── page.tsx              # OTP verification page
│   │   ├── homepage.module.css       # Homepage styles
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Login page
│   ├── lib/
│   │   └── supabaseClient.ts         # Supabase client configuration
│   └── ...
├── public/
│   └── images/
│       ├── smiling_burger.png        # App logo
│       └── smiling_food.png          # Additional assets
├── .env.local                        # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd foodPay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from Settings > API
   - Enable Email Auth in Authentication > Settings

4. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 How It Works

### Authentication Flow

1. **Login Page** (`/`)
   - User enters email address
   - System sends 6-digit OTP via Supabase Auth
   - User is redirected to verification page
   - Email and timestamp stored in localStorage

2. **Verification Page** (`/verify`)
   - User enters the 6-digit OTP received via email
   - System validates OTP against Supabase
   - Checks for OTP expiration (2 minutes)
   - On successful verification, user is redirected to dashboard

3. **Dashboard** (`/dashboard`)
   - Protected page accessible only after successful authentication
   - Displays user information (email, ID, creation date)
   - Provides logout functionality

### Security Features

- **OTP Generation**: 6-digit OTP via Supabase Auth
- **OTP Expiration**: 2-minute expiration for security
- **Local Storage**: Email and timestamp stored for verification
- **Route Protection**: Automatic redirection for unauthorized access
- **Input Validation**: Email format validation and required field checks
- **Session Management**: Automatic session handling with Supabase

## 📧 Email Configuration

The application uses Supabase Auth for email delivery:

### Supabase Auth
- Handles OTP generation and delivery
- Manages authentication sessions
- Uses Supabase's built-in email templates
- Provides secure OTP verification

## 🎨 UI Components

### Login Page
- Modern design with red accent columns
- Centered layout with professional styling
- Email input with validation
- Loading states for better UX
- Disabled button when email is empty
- FoodPay branding with smiling burger logo

### Verification Page
- Clean, centered design
- OTP input with proper formatting
- Real-time validation feedback
- Secure OTP comparison
- Expiration handling

### Dashboard
- Clean, professional design
- User information display
- Logout functionality
- Loading states during authentication check

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository**
2. **Add environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Deploy automatically** on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |

## 📦 Dependencies

The project includes the following key dependencies:
- `next`: Next.js framework
- `react` & `react-dom`: React library
- `typescript`: TypeScript support
- `@supabase/supabase-js`: Supabase client
- `@supabase/auth-helpers-nextjs`: Next.js auth helpers
- `@supabase/auth-helpers-react`: React auth helpers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify your Supabase credentials are correct
3. Ensure all environment variables are set
4. Check the Network tab for API response details
5. Verify Supabase Auth is properly configured

## 🔮 Future Enhancements

- [ ] Database integration for user profiles
- [ ] Password-based authentication option
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Rate limiting for OTP requests
- [ ] User profile management
- [ ] Real-time features with Supabase Realtime
- [ ] File upload functionality
- [ ] Payment integration
- [ ] Food ordering system
- [ ] Payment processing

---

**Built with ❤️ using Next.js, TypeScript, and Supabase**
