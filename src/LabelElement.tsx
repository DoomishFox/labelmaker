import { type Element } from "./datamodel"

interface LabelElementProps {
   element: Element
}

export const LabelElement = ({ element }: LabelElementProps) => {
   return (
      <div>
         panel ({element.type}) [{element.content}]
      </div>
   )
}
