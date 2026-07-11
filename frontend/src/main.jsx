import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
    throw new Error(
        'Missing VITE_CLERK_PUBLISHABLE_KEY in your .env file.\n' +
        'Create a .env file in the project root with:\n' +
        'VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here'
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ClerkProvider publishableKey={clerkPublishableKey}>
            <App />
        </ClerkProvider>
    </StrictMode>
)
