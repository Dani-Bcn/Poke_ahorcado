import React from 'react';

const CardButtons = ({letters,countTries,handleClick,items}) => {
    return (
        <> 
            <section className="container-buttons">
                {
                    letters.map((e, i) => (
                        <button className="buttons" key={i} id={i} onClick={handleClick}
                            ref={(e) => items.current[i] = e}>{e}</button>
                    ))
                }
            </section>
            <article>
                <h4> Intentos : {countTries}</h4>
            </article>
        </>
    );
}

export default CardButtons;
