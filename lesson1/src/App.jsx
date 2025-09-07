import {useState, useRef, useEffect} from 'react'
import styles from './app.module.css'
import {useStore} from './components/hooks'
import {validateEmail} from './components/utils'
import {validatePasswordChange} from './components/utils'

function sendData(formData) {
    console.log(formData)
}

export const App = () => {
    const {getState, updateState, resetState} = useStore()
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorMatch, setErrorMatch] = useState(null)
    const [isValidPassword, setIsValidPassword] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)

    const {email, password, password2} = getState()

    const submitBtn = useRef(null)

    function onSubmit(event) {
        event.preventDefault()
        sendData(getState())
        resetState()
        setIsValidPassword(false)
        setIsValidEmail(false)
        setPasswordMatch(false)
    }

    const onChange = ({target}) => {
        updateState(target.name, target.value)

        if (target.type === 'email') {
            validateEmail({target}, setErrorEmail, setIsValidEmail)
        }
        if (target.type === 'password') {
            validatePasswordChange({target}, setErrorPassword, setIsValidPassword)
        }
    }

    function onBlur({target}) {
        const value = target.value
        if (target.name === 'password2' && value !== password) {
            setErrorMatch('Пароли не совпадают')
        }
    }

    useEffect(() => {
        setPasswordMatch(password && password2 && password === password2)
    }, [password, password2])

    useEffect(() => {
        if (isValidPassword && isValidEmail && passwordMatch) {
            submitBtn.current?.focus()
        }
    }, [isValidPassword, isValidEmail, passwordMatch])

    return (
        <div className={styles.formContainer}>
            {errorEmail && <div className={styles.error}>{errorEmail}</div>}
            {errorPassword && <div className={styles.error}>{errorPassword}</div>}
            {errorMatch && <div className={styles.error}>{errorMatch}</div>}
            <h2>Регистрация</h2>
            <form
                className={styles.form}
                onSubmit={onSubmit}
            >
                <input
                    className={styles.input}
                    type="email"
                    name="email"
                    required
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                />
                <input
                    className={styles.input}
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                />

                <input
                    className={styles.input}
                    type="password"
                    name="password2"
                    value={password2}
                    placeholder="Password replay"
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <button
                    ref={submitBtn}
                    className={styles.btn}
                    type="submit"
                    disabled={!isValidPassword || !isValidEmail || !passwordMatch}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )
}
