import { ElementTypes, type ElementType, type Element, type DefaultConfigurations } from './datamodel'
import { HeaderTypes, type HeaderConfigurations, type HeaderType } from './datamodel/Header'
import { ParagraphLayoutTypes, type ParagraphConfigurations, type ParagraphLayoutType } from './datamodel/Paragraph'
import { StackpanelOrientationTypes, type StackpanelConfigurations, type StackpanelOrientationType } from './datamodel/Stackpanel'
import { Graph } from './Graph'
import './GraphElement.css'
import { NotifiableSelect } from './NotifiableSelect'

interface GraphElementProps {
   index: number
   element: Element
   onElementUpdate: (index: number, element: Element) => void
   onElementRemove: (index: number) => void
}

export const GraphElement = ({ index, element, onElementUpdate, onElementRemove }: GraphElementProps) => {
   const onConfigurationUpdate = (c: DefaultConfigurations | ParagraphConfigurations | HeaderConfigurations | StackpanelConfigurations) => {
      onElementUpdate(index, {
         ...element,
         configurations: c
      })
   }
   return (
      <div className="content">
         <div className="type-options">
            <select value={element.type}
               onChange={(e) =>
                  onElementUpdate(index, {
                     ...element,
                     type: e.target.value as ElementType
                  })
               }>
               {ElementTypes.map((t) => <option value={t}>{t}</option>)}
            </select>
            <button className="btn-cancel" onClick={() => onElementRemove(index)}>-</button>
         </div>
         {/* <div>
            <label>invert
               <input type="checkbox"
                  checked={element.configurations.invert}
                  onChange={(e) => onConfigurationUpdate({
                     ...element.configurations,
                     invert: e.target.checked
                  })} />
            </label>
         </div> */}
         <div className="type-content">
            {(() => { // type dependent configurations
               switch (element.type) {
                  case "paragraph": return (
                     <>
                        <div className="element-options">
                           <NotifiableSelect<ParagraphConfigurations, ParagraphLayoutType>
                              bindTo={element.configurations as ParagraphConfigurations}
                              property="layout"
                              onNotify={(c) => onConfigurationUpdate(c)}
                              options={ParagraphLayoutTypes} />
                           <label>bold
                              <input type="checkbox"
                                 checked={(element.configurations as ParagraphConfigurations).bold}
                                 onChange={(e) => onConfigurationUpdate({
                                    ...element.configurations,
                                    bold: e.target.checked
                                 })} />
                           </label>
                        </div>
                        <div className="element-content">
                           <textarea value={element.content}
                              onChange={(e) => {
                                 onElementUpdate(index, {
                                    ...element,
                                    content: e.target.value
                                 })
                              }} />
                        </div>
                     </>
                  )
                  case "header": return (
                     <>
                        <div className="element-options">
                           <NotifiableSelect<HeaderConfigurations, HeaderType>
                              bindTo={element.configurations as HeaderConfigurations}
                              property="style"
                              onNotify={(c) => onConfigurationUpdate(c)}
                              options={HeaderTypes} />
                        </div>
                        <div className="element-content">
                           <input value={element.content}
                              onChange={(e) =>
                                 onElementUpdate(index, {
                                    ...element,
                                    content: e.target.value
                                 })
                              }>
                           </input>
                        </div>
                     </>
                  )
                  case "stackpanel": return (
                     <>
                        <div className="element-options">
                           <NotifiableSelect<StackpanelConfigurations, StackpanelOrientationType>
                              bindTo={element.configurations as StackpanelConfigurations}
                              property="orientation"
                              onNotify={(c) => onConfigurationUpdate(c)}
                              options={StackpanelOrientationTypes} />
                           <label>expand
                              <input type="checkbox"
                                 checked={(element.configurations as StackpanelConfigurations).expand}
                                 onChange={(e) => onConfigurationUpdate({
                                    ...element.configurations,
                                    expand: e.target.checked
                                 })} />
                           </label>
                        </div>
                        <div className="element-content stackpanel">
                           <Graph children={element.children}
                              onElementAdd={(i, e) =>
                                 onElementUpdate(index, {
                                    ...element,
                                    children: i < 0
                                       ? [...element.children, e]
                                       : element.children.toSpliced(i + 1, 0, e)
                                 })
                              }
                              onElementUpdate={(i, e) =>
                                 onElementUpdate(index, {
                                    ...element,
                                    children: element.children.with(i, e)
                                 })
                              }
                              onElementRemove={(i) =>
                                 onElementUpdate(index, {
                                    ...element,
                                    children: element.children.toSpliced(i, 1)
                                 })
                              }>
                           </Graph>
                        </div>
                     </>
                  )
               }
            })()}
         </div>
      </div>
   )
}
