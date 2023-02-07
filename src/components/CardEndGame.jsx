import React from "react";
import { AnimatePresence, motion as m } from 'framer-motion'


const CardEnfGame = (({ name, valuesImg, funcResetGame, phrase }) => {

    return (  

        <m.section className="container-end-game"
            animate={{
                y: [500, 0],
                opacity: [0, 1],
                transition: {
                    duration: 1
                }

            }}
        >
            <section className="card-end-game">
                <h3>{phrase}</h3>
                <h2>{name}</h2>
                {
                    screen.width > 400 && (
                        <button className="btn-end2" onClick={funcResetGame}>Volver</button>
                    )
                }
            </section>
            <m.section className="img-end"
                whileInView={{
                    x: [300, 0],
                    opacity: [0, 1],
                    transition: {
                        duration: 1,
                        delay: 1
                    }
                }}
            >
                <img src={valuesImg} alt="" />
            </m.section>
            {console.log(screen.width < 400)}
            {
                screen.width < 400 && (
                    <button className="btn-end2" onClick={funcResetGame}>Volver</button>
                )
            }
        </m.section>

    )
})

export default CardEnfGame;