import {useEffect, useRef, useState} from 'react'
import styles from './app.module.css'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {scheme} from './components/yupScheme'
import {isRulePassedPassword, isRulePassedEmail} from './components/utils'
import ValidateList from './components/ValidateList'

function sendData(formData) {
    console.log(formData)
}

export const App = () => {
    const [validPassword, setValidPassword] = useState(false)
    const [validEmail, setValidEmail] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
    } = useForm({
        resolver: yupResolver(scheme, {abortEarly: false}),
        mode: 'onChange',
        criteriaMode: 'all',
    })

    const submitBtn = useRef(null)

    function onSubmit(formDate) {
        sendData(formDate)
        reset()
        setValidPassword(false)
        setValidEmail(false)
    }

    useEffect(() => {
        submitBtn.current.focus()
    }, [isValid])

    return (
        <div className={styles.formContainer}>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>Регистрация</h2>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    {...register('email', {
                        onChange: () => isRulePassedEmail(errors, setValidEmail),
                    })}
                />
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        onChange: () => isRulePassedPassword(errors, setValidPassword),
                    })}
                />

                <input
                    className={styles.input}
                    type="password"
                    placeholder="Password replay"
                    {...register('confirmPassword')}
                />
                <button
                    ref={submitBtn}
                    className={styles.btn}
                    type="submit"
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </button>
            </form>
            <ValidateList
                validEmail={validEmail}
                validPassword={validPassword}
                errors={errors}
            />
        </div>
    )
}
