import { ElementTypes, type ElementType, type Element } from './datamodel'
import { Graph } from './Graph'
import './GraphElement.css'

interface GraphElementProps {
   index: number
   element: Element
   onElementUpdate: (index: number, element: Element) => void
   onElementRemove: (index: number) => void
}

export const GraphElement = ({ index, element, onElementUpdate, onElementRemove }: GraphElementProps) => {
   return (
      <>
         <div>
            {index} panel (<select value={element.type} onChange={(e) => onElementUpdate(index, { ...element, type: e.target.value as ElementType })}>
               {ElementTypes.map((t) => <option value={t}>{t}</option>)}
            </select>)
            <button onClick={() => onElementRemove(index)}>-</button>
         </div>
         <div>
            {(() => {
               switch (element.type) {
                  case "header": return (
                     <>
                        <div>
                           <select>
                              <option>h1</option>
                              <option>h2</option>
                              <option>h3</option>
                           </select>
                        </div>
                        <div>
                           <input onChange={(e) => onElementUpdate(index, { ...element, content: e.target.value })}>
                           </input>
                        </div>
                     </>
                  )
                  case "stackpanel": return (
                     <>
                        <div>
                           <select>
                              <option>vertical</option>
                              <option>horizontal</option>
                           </select>
                        </div>
                        <div>
                           <Graph
                              children={element.children}
                              onElementAdd={(i, e) => onElementUpdate(index, { ...element, children: i < 0 ? [...element.children, e] : element.children.toSpliced(i + 1, 0, e) })}
                              onElementUpdate={(i, e) => onElementUpdate(index, { ...element, children: element.children.with(i, e) })}
                              onElementRemove={(i) => onElementUpdate(index, { ...element, children: element.children.toSpliced(i, 1) })}>
                           </Graph>
                        </div>
                     </>
                  )
               }
            })()}
         </div>
      </>
   )
}
