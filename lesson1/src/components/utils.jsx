export function validateEmail({target}, setErrorEmail, setIsValidEmail) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(target.value)) {
        setErrorEmail('Введен не корректный Email')
        setIsValidEmail(false)
    } else {
        setErrorEmail(null)
        setIsValidEmail(true)
    }
}

export function validatePasswordChange({target}, setErrorPassword, setIsValidPassword) {
    if (target.name !== 'password') return

    let error = null
    let valid = true
    const value = target.value
    if (!/\d/.test(value)) {
        error = 'Пароль должен содержать хотя бы одну цифру'
        valid = false
    } else if (!/[a-z]/.test(value)) {
        error = 'Пароль должен содержать строчную букву.'
        valid = false
    } else if (!/[A-Z]/.test(value)) {
        error = 'Пароль должен содержать заглавную букву.'
        valid = false
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        error = 'Пароль должен содержать хотя бы один спецсимвол.'
        valid = false
    }
    setErrorPassword(error)
    setIsValidPassword(valid)
}
