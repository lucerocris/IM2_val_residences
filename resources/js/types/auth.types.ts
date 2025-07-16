export type ForgotPasswordData = {
    email: string;
}

export type ResetPasswordData = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthPageProps {
    status?: string;
    errors?: Record<string, string[]>;
}
