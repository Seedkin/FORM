import styles from './validateList.module.css'

function ValidateList({validEmail, validPassword, errors}) {
    return (
        <div className={styles.errorContainer}>
            <h2>Валидация</h2>
            <ul className={styles.errorList}>
                <li className={`${styles.errorListItem} ${validEmail && !errors.email?.types?.email ? styles.errorDone : ''}`}>Введен не корректный Email</li>
                <li className={`${styles.errorListItem} ${validPassword && !errors.password?.types?.digit ? styles.errorDone : ''}`}>Пароль должен содержать хотя бы одну цифру</li>
                <li className={`${styles.errorListItem} ${validPassword && !errors.password?.types?.lower ? styles.errorDone : ''}`}>Пароль должен содержать строчную букву</li>
                <li className={`${styles.errorListItem} ${validPassword && !errors.password?.types?.upper ? styles.errorDone : ''}`}>Пароль должен содержать заглавную букву</li>
                <li className={`${styles.errorListItem} ${validPassword && !errors.password?.types?.special ? styles.errorDone : ''}`}>Пароль должен содержать хотя бы один спецсимвол</li>
                {errors.confirmPassword?.types?.oneOf && <li className={styles.errorListItem}>Пароли не совпадают</li>}
            </ul>
        </div>
    )
}

export default ValidateList
