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
      <>
         <ol className="graph">
            {children.map((element, i) =>
               <>
                  <li className="graph-element">
                     <GraphElement
                        index={i}
                        element={element}
                        onElementUpdate={(i, e) => onElementUpdate(i, e)}
                        onElementRemove={(i) => onElementRemove(i)} />
                  </li>
                  <button className="" onClick={() => onElementAdd(i, new Element())}>+</button>
               </>
            )}
            {children.length == 0 &&
               <button className="" onClick={() => onElementAdd(-1, new Element())}>
                  add first element
               </button>
            }
         </ol>
      </>
   )
}
