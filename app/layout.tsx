import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Form Submission Task',
    description: 'This is a form submission for user registration',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={``}>{children}</body>
        </html>
    );
}
