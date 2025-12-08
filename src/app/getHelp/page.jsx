import React from 'react'
import Sidebars from '../../components/Sidebars'
import Help from '../../components/help'
import styles from '../page.module.css'
import CommingSoonComponent from '../../components/Comming/comingSoon'

const GetHelp = () =>{
  const error = true
    return (
        <>
      <div className={styles.containers}>
      <Sidebars />
        <div className={styles.contents}>
         {error ? <CommingSoonComponent/> : <Help/> }  
        </div>
    </div>
        </>
    )
}





export default GetHelp