import { Element } from './datamodel'
import { GraphElement } from './GraphElement'
import './Graph.css'

interface GraphProps {
   title?: string
   children: Array<Element>
   onElementAdd: (index: number, element: Element) => void
   onElementUpdate: (index: number, element: Element) => void
   onElementRemove: (index: number) => void
}

export const Graph = ({ children = [], onElementAdd, onElementUpdate, onElementRemove }: GraphProps) => {

   return (
      <div>
         <ul>
            {children.map((element, i) =>
               <li>
                  <GraphElement
                     index={i}
                     element={element}
                     onElementUpdate={(i, e) => onElementUpdate(i, e)}
                     onElementRemove={(i) => onElementRemove(i)} />
                  <button onClick={() => onElementAdd(i, new Element())}>+</button>
               </li>)}
         </ul>
         <button onClick={() => onElementAdd(-1, new Element())}>
            add element
         </button>
      </div>
   )
}
