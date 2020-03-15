import React from 'react'
import styles from './index.module.scss'

const TextArea = ({ className, ...rest }) => (
    <textarea className={`form-input ${styles.textarea} ${className}`} {...rest} />
)

export default TextArea