import React from 'react'
import CommingSoonSvg from '../../utils/svgs/commingSoonsvg'
import style from './comming.module.css'


const CommingSoonComponent = () =>{
    return (
        <>
        <section className={style.commingSoon_container}>
        <div className={style.container}>
           <CommingSoonSvg/>
           <div className={style.textContainer}>
            <p>Coming Soon...</p>
            <p>"Stay tuned—something amazing is coming soon!"</p>
           </div>
        </div>
     </section>
        </>
    )
}


export default CommingSoonComponent