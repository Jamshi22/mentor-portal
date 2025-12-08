import React from 'react'
import FaqQuestions from '../../components/faqquestions'
import Sidebars from '../../components/Sidebars'
import Navbars from '../../components/Navbars'
import { Fa0 } from 'react-icons/fa6'
import styles from '../page.module.css'

const Faq = () =>{
    return (
        <>
      <div className={styles.containers}>
      <Sidebars />
        <div className={styles.contents}>
          <FaqQuestions/>
        </div>
    </div>
        </>
    )
}





export default Faq