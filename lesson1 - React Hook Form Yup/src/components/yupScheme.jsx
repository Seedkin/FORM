import * as yup from 'yup'
export const scheme = yup.object().shape({
    email: yup
        .string()
        .test('email', 'email', (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ''))
        .required('Введите Email'),
    password: yup
        .string()
        .min(6, 'min')
        .test('digit', 'digit', (value) => /\d/.test(value || ''))
        .test('lower', 'lower', (value) => /[a-z]/.test(value || ''))
        .test('upper', 'upper', (value) => /[A-Z]/.test(value || ''))
        .test('special', 'special', (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value || '')),

    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})
