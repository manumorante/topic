import React, { useState, useRef } from 'react'
import { TEXT } from '../text'
import { connectingWords } from './connectingWords'
import './script'

export default function App() {
  const [data, setData] = useState(null)
  const [normalized, setNormalized] = useState(null)
  const textRef = useRef(null)

  // Procesa el texto aplicando los siguiente acciones:
  const normalizeText = (text) => {
    return (
      text
        // - Convierte todo a minúsculas
        .toLowerCase()
        // - Elimina los signos de puntuación
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        // - Elimina las preposiciones
        .replace(
          /\b(a|ante|bajo|con|contra|de|desde|durante|en|entre|hacia|hasta|mediante|para|por|según|sin|so|sobre|tras|versus|via|y|o|u)\b/g,
          ''
        )
        // Elimina los artículos posesivos
        .replace(/\b(el|la|los|las|un|una|unos|unas)\b/g, '')
        // Elimina las contracciones
        .replace(
          /\b(esto|esta|estos|estas|ese|eso|esos|esas|aquello|aquella|aquellos|aquellas|esto|esta|estos|estas|ese|eso|esos|esas|aquello|aquella|aquellos|aquellas)\b/g,
          ''
        )
        // - Elimina los dobles espacios
        .replace(/\s+/g, ' ')
    )
  }

  // Crea un array de palabras y cuenta el número de repeticiones de cada palabra
  // Devuelve un objeto con la estructura:
  // {
  //   "palabra": número de repeticiones
  // }
  const makeObject = (text) => {
    const dataObject = {}
    const words = text.split(' ')
    words.forEach((word) => {
      if (dataObject[word]) {
        dataObject[word]++
      } else {
        dataObject[word] = 1
      }
    })
    return dataObject
  }

  // Llama a una funcion cuando el textarea cambie de valor
  const handleRun = () => {
    const text = textRef.current.value
    const normalizedText = normalizeText(text)
    setNormalized(normalizedText)

    const estructured = makeObject(normalizedText)
    const sorted = Object.entries(estructured).sort((a, b) => b[1] - a[1])

    setData(sorted)
  }

  return (
    <div className='App mx-auto max-w-2xl flex flex-col gap-5'>
      <h1 className='font-mono text-xl font-bold'>Top[i]cs</h1>
      <p className='text-lg text-slate-400'>
        Esta aplicación es una excusa para usar{' '}
        <span className='text-white'>Github Copilot</span> de una forma mas
        dirigida. Tratando de lograr algoritmos complejos o cuando menos
        tediosos de escribir.
      </p>

      <textarea
        ref={textRef}
        className='rounded-lg bg-slate-900 p-6 shadow-lg ring-1 ring-white/10'
        defaultValue={TEXT}
        rows={10}
      />

      <div className='flex w-full justify-between gap-2 mb-7'>
        <p className='text-slate-300'>
          El texto de ejemplo fué obtenido de{' '}
          <a
            target='_blank'
            href='https://beta.openai.com/playground'
            className='text-white'>
            OpenAI playground
          </a>
        </p>

        <button
          className='focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto bg-sky-500 highlight-white/20 hover:bg-sky-400'
          onClick={handleRun}>
          Run
        </button>
      </div>

      {/* Pinta la data en forma de tabla */}
      {data && (
        <table className='border-collapse table-auto w-full text-sm'>
          <thead className='bg-slate-900'>
            <tr>
              <th className='p-4 pl-8'>Palabra</th>
              <th className='p-4 pl-8'>Repeticiones</th>
            </tr>
          </thead>
          <tbody className='bg-slate-800'>
            {data.map(([word, count]) => (
              <tr key={word}>
                <td className='border-b border-slate-700 p-4 pl-8 text-slate-400'>
                  {word}
                </td>
                <td className='border-b border-slate-700 p-4 pl-8 text-slate-400'>
                  {count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {normalized && (
        <details className='open rounded-lg bg-slate-900 p-6 shadow-lg ring-1 ring-white/10'>
          <summary className='select-none text-sm font-semibold text-white'>
            Texto normalizado
          </summary>
          <div className='mt-3 text-sm leading-6 text-slate-400'>
            {normalized}
          </div>
        </details>
      )}

      {connectingWords && (
        <details className='open rounded-lg bg-slate-900 p-6 shadow-lg ring-1 ring-white/10'>
          <summary className='select-none text-sm font-semibold text-white'>
            Algunos conectores generados con IA
          </summary>
          <div className='mt-3 text-sm leading-6 text-slate-400'>
            {connectingWords.map((word, index) => (
              <span key={index}>{word}, &nbsp;</span>
            ))}
          </div>
        </details>
      )}
    </div>
  )
}
