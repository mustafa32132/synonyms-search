import { useState } from "react"
import "./App.css"
import { fetchSynonyms } from "./api/fetchSynonym"

type synonym = {
  word: string
  score: number
}

function App() {
  const [word, setWord] = useState("")

  const [synonyms, setSynonyms] = useState<synonym[]>([])

  const handelFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSynonyms(word).then(setSynonyms)
  }

  const handelSynonymClicked = (newWord: string) => {
    setWord(newWord)
    fetchSynonyms(newWord).then(setSynonyms)
  }

  return (
    <div className="App grid bg-slate-500 h-screen w-screen place-items-center">
      <form onSubmit={handelFetchSynonyms} className="flex gap-2">
        <label htmlFor="word-input"> type a word</label>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          id="word-input"
        ></input>

        <button>Submite</button>
      </form>
      <ul>
        {synonyms.map((synonym) => (
          <li
            onClick={() => handelSynonymClicked(synonym.word)}
            key={synonym.word}
          >
            {synonym.word}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
