import React, { useState, useEffect } from "react"
import "./style.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareTwitter } from "@fortawesome/free-brands-svg-icons"
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons"

export default function App() {
  const [quotes, setQuotes] = useState([])
  const [rand, setRand] = useState(0)
  const [color, setColor] = useState("white")

  const pastelColors = [
    "#006BA6",
    "#0496FF",
    "#FFBC42",
    "#D81159",
    "#8F2D56"
  ]

  useEffect(() => {
    async function getQuotes() {
      const res = await fetch("https://dummyjson.com/quotes")
      const data = await res.json()
      setQuotes(data.quotes)
      setRand(Math.floor(Math.random() * data.quotes.length))

      let randomColor =
        pastelColors[Math.floor(Math.random() * pastelColors.length)]
      setColor(randomColor)
    }
    getQuotes()
  }, [])

  function randomQuote() {
    let rand = Math.floor(Math.random() * quotes.length)
    setRand(rand)

    let randomColor =
      pastelColors[Math.floor(Math.random() * pastelColors.length)]
    setColor(randomColor)
  }

  return (
    <div id="quote-box" >
      {!quotes.length && <p>Loading</p>}
      {quotes.length > 0 && (
        <>
          <p id="text" style={{ color: color }}>
            <i id="quotesIcon">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </i>
            {quotes[rand].quote}
          </p>
          <p id="author" style={{ color: color }}>
            - {quotes[rand].author}
          </p>
          <span id="bottom-row">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${quotes[rand]?.quote} - ${quotes[rand]?.author}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: color }}
            >
              <i id="twitterIcon">
                <FontAwesomeIcon icon={faSquareTwitter} />
              </i>
            </a>
            <button
              id="new-quote"
              onClick={randomQuote}
              style={{ backgroundColor: color, color: "white" }}
            >
              New quote
            </button>
          </span>
        </>
      )}
      <style>{`body { background-color: ${color}; }`}</style>
    </div>
  )
}
