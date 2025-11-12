import { useState } from 'react'
import { Element } from './datamodel.ts'
import { Graph } from './Graph.tsx'
import { Label } from './Label.tsx'
import { LabelElement } from './LabelElement.tsx'
import './App.css'

function App() {
   const [elements, setElements] = useState(Array<Element>())

   return (
      <>
         <h1>labelmaker</h1>
         <div className="card">
            <Graph
               children={elements}
               onElementAdd={(i, e) => setElements((elements) => i < 0 ? [...elements, e] : elements.toSpliced(i + 1, 0, e))}
               onElementUpdate={(i, e) => setElements((elements) => elements.with(i, e))}
               onElementRemove={(i) => setElements((elements) => elements.toSpliced(i, 1))}>
            </Graph>
         </div>
         <div className="card">
            <Label
               children={elements.map((e) => <LabelElement element={e} />)}>
            </Label>
         </div>
      </>
   )
}

export default App
