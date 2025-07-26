# FoodPay - Email OTP Authentication System

A modern, secure authentication system built with Next.js and TypeScript that uses email-based OTP (One-Time Password) verification.

## 🚀 Features

- **Email-based Authentication**: Secure login using email and OTP
- **Real-time OTP Generation**: 6-digit random OTP generation
- **Email Integration**: Automated email delivery using Resend API
- **TypeScript Support**: Full type safety throughout the application
- **Responsive Design**: Centered, professional UI layout
- **Local Storage**: Secure OTP storage for verification
- **Route Protection**: Automatic redirection for unauthorized access

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Inline CSS with Flexbox
- **Email Service**: Resend API
- **State Management**: React useState
- **Routing**: Next.js Navigation

## 📁 Project Structure

```
foodPay/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-email/
│   │   │       └── route.ts          # Email API endpoint
│   │   ├── verify/
│   │   │   └── page.tsx              # OTP verification page
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard page
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Login page
│   └── ...
├── .env.local                        # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Resend account for email service

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

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Get your Resend API key**
   - Sign up at [resend.com](https://resend.com)
   - Go to API Keys section
   - Create a new API key
   - Copy the key to your `.env.local` file

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
   - System generates 6-digit OTP
   - OTP is sent via email using Resend API
   - User is redirected to verification page

2. **Verification Page** (`/verify`)
   - User enters the OTP received via email
   - System validates OTP against stored value
   - On successful verification, user is redirected to dashboard

3. **Dashboard** (`/dashboard`)
   - Protected page accessible only after successful authentication

### Security Features

- **OTP Generation**: Cryptographically secure random 6-digit numbers
- **Local Storage**: OTP stored securely in browser localStorage
- **Route Protection**: Automatic redirection for unauthorized access
- **Input Validation**: Email format validation and required field checks

## 📧 Email Configuration

The application uses Resend for email delivery. To configure:

1. **Verify your domain** (recommended for production)
   - Add your domain in Resend dashboard
   - Update the `from` address in the API route

2. **For testing** (free tier)
   - You can only send emails to your own email address
   - Perfect for development and testing

## 🎨 UI Components

### Login Page
- Centered layout with professional styling
- Email input with validation
- Loading states for better UX
- Disabled button when email is empty

### Verification Page
- Clean, centered design
- OTP input with proper formatting
- Real-time validation feedback
- Secure OTP comparison

## 🔧 API Endpoints

### POST `/api/send-email`

Sends OTP via email using Resend API.

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": 123456
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository**
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Your Resend API key | Yes |

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
2. Verify your Resend API key is correct
3. Ensure all environment variables are set
4. Check the Network tab for API response details

## 🔮 Future Enhancements

- [ ] Database integration for user management
- [ ] Password-based authentication
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Email templates customization
- [ ] Rate limiting for OTP requests
- [ ] Session management
- [ ] User profile management

---

**Built with ❤️ using Next.js and TypeScript**
