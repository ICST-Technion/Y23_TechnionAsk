import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Welcome to TechnionAsk": "Welcome to TechnionAsk",
            "change language": "change language",
            "Login": "Login",
            "Welcome Page": "Welcome Page",
            "Login Page": "Login Page",
            "Forgot Password?": "Forgot Password?",
            "Email.": "Email.",
            "Password.": "Passrowd.",
            "Forgot Password Page": "Forgot Password Page",
            "Please enter your email": "Please enter your email",
            "Email": "Email",
            "Reset Password": "Reset Password",
            "Sign up Page": "Sign up Page",
            "Sign up": "Sign up",
            "Already have an account? Login": "Already have an account? Login",
            "Don't have an account? Sign up": "Don't have an account? Sign up",
        }
    },
    he: {
        translation: {
            "Welcome to TechnionAsk": "TechnionAsk ברוכים הבאים ל",
            "change language": "שנה שפה",
            "Login": "היכנס",
            "Welcome Page": "דף הבית",
            "Login Page": "כניסה",
            "Forgot Password?": "שכחת סיסמה?",
            "Email.": "אימייל.",
            "Email": "אימייל",
            "Password.": "סיסמה.",
            "Forgot Password Page": "שכחתי סיסמה",
            "Please enter your email": "אנא הכנס את האימייל שלך",
            "Reset Password": "אפס סיסמה",
            "Sign up Page": "הרשמה",
            "Sign up": "הירשם",
            "Already have an account? Login": "כבר יש לך חשבון? היכנס",
            "Don't have an account? Sign up": "אין לך חשבון? הירשם",
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export function t(name) {
    return i18n.t(name)
}