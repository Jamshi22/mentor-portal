import React from  'react'
import styles from './page.module.css'
import {MdAddLink} from 'react-icons/md'


const CommonButton = ({text,onClick}) =>{
    return (
        <>
        <div>
         <button className={styles.btn_common_container} onClick={onClick}><MdAddLink size={25} />{text}</button>
        </div>
        </>
    )
}

export default CommonButton