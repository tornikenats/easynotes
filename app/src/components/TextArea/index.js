import React from 'react'
import styles from './index.module.scss'

const TextArea = props => (
    <textarea className={`form-input ${styles.textarea}`} {...props}/>
)

export default TextArea