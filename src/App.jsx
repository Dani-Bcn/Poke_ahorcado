import React, { useEffect, useRef, useState } from "react";
import { motion as m, AnimatePresence, animate } from 'framer-motion'
import CardEndGame from "./components/CardEndGame";
import CardButtons from "./components/CardButtons";
import './App.css'


const App = () => {
 
  const limitCalls = 1200 
  const endPointApi = `https://pokeapi.co/api/v2/pokemon?limit=${limitCalls}`
  const [valuesForImg, setValuesForImg] = useState([])
  const [valuesApi, setValuesApi] = useState([])
  const [valuesImg, setValuesImg] = useState()
  const [randomWords, setRandomWords] = useState(Math.round(Math.random() * limitCalls))
  const [stateSecret, setStateSecret] = useState([])
  const [stateWinner, setStateWinner] = useState(false)
  const [stateLose, setStateLose] = useState(false)
  const [countTries, setCountTries] = useState(6)
  const [resetGame, setResetGame] = useState(false)
  const [buttonPress, setButtonPress] = useState(false)
  const [items, setItems] = useState(useRef({}))
  const [phrase, setPhrase] = useState(" El pokemon era ...")
  const [score, setScore] = useState(0)
  const [countGames, setCountGames] = useState(1)

  let name = []
  let letters = []
  let id
  let letter

  const funcResetGame = (() => {
    setCountGames(countGames + 1)
    setValuesForImg([])
    setValuesApi([])
    setValuesImg()
    setRandomWords(Math.round(Math.random() * limitCalls))
    setStateSecret([])
    setStateWinner(false)
    setStateLose(false)
    setCountTries(6)
    setResetGame(false)
    setButtonPress(false)
    setPhrase(" El pokemon era ...")
    let name = []
    let id
    let letter
    letters.map((e, i) => (
      items.current[i].style.backgroundColor = "rgba(0, 0, 0, 0)"
    ))
  })

  useEffect(() => {
    fetch(endPointApi)
      .then(resp => resp.json())
      .then(resp => setValuesApi(prev => [...prev, resp.results[randomWords]]))
  }, [resetGame])

  useEffect(() => {
    if (valuesApi.length !== 0) {
      fetch(url2)
        .then(res => res.json())
        .then(res => setValuesImg((res.sprites.other.home.front_default)))
    }
  }, [resetGame])

  let url2
  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode(i + 97))
  }

  letters.push(String.fromCharCode(45))
  valuesApi.map((e, i) => {
    name = e.name.split("")
    url2 = e.url
  })

  useEffect(() => {
    if (name) {
      name.map((e, i) => {
        setStateSecret(prev => [...prev, "_"])
      })
    }
  }, [valuesApi])

  const funcCountLose = (() => {
    setCountTries(countTries - 1)
    setValuesForImg(prev => [...prev, valuesImg])
    if (valuesForImg.length > 0) console.log(valuesApi)
  })

  useEffect(() => {
    if (countTries < 1) {
      
      setCountTries(0)
      setResetGame(true)
      setStateWinner(true)
    }
  },)

  let count = 0
  const handleClick = (({ target }) => {

    id = target.id
    items.current[id].style.backgroundColor = "rgba(126, 103, 150, 0.911)"
    letter = target.innerHTML
    name.map((e, i) => {
      if (letter === e) {       
        stateSecret[i] = e
        count++
        if (!stateSecret.includes("_")) {
          setScore(score + 50)        
          setPhrase("Perfecto !!!")
          setStateWinner(true)
          setResetGame(true)
        }
      }
      setStateSecret([...stateSecret])
    })
    if (count === 0) {

      funcCountLose()
    }
  })

  return (
    <AnimatePresence>
      <m.main
        whileInView={{
          opacity: [0, 1]
        }}
        exit={{
          opacity: [1, 0],

        }}
      >

        <m.section className="container-title"
          initial={{
            y: -300
          }}
          animate={{
            y: 0,
            transition: {
              duration: 0.5,
              ease: "backOut"
            }
          }}>
        
          <h1 className="back-h1">Poke_Ahorcado</h1>
          <h1>Poke_Ahorcado</h1>
        </m.section>
        <article className="score"><h4> Puntos {score} en {countGames} partidas</h4></article>
        <m.section className="container-letters"
          animate={{
            y: [100, 0]
          }}>
          {
            stateSecret.map((e, i) => {
              return (
                <m.h3 key={i} className="letters">{e} </m.h3>
              )
            })
          }
        </m.section>
        <CardButtons
          letters={letters}
          countTries={countTries}
          handleClick={handleClick}
          items={items}>
        </CardButtons>
        {
          stateWinner && (
            <AnimatePresence>
              <CardEndGame
                phrase={phrase}
                name={name}
                valuesImg={valuesImg}
                funcResetGame={funcResetGame}>
              </CardEndGame>



            </AnimatePresence>
          )
        }
      </m.main >
    </AnimatePresence>
  )
}

export default App;
