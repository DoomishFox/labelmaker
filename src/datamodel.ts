export const ElementTypes = ["stackpanel", "header", "paragraph"] as const
export type ElementType = typeof ElementTypes[number]
export const isElementType = (type: string) => type in ElementTypes

export class Element {
   public type: ElementType
   public children: Array<Element>
   public content?: string
   constructor(type: ElementType = "paragraph") {
      this.type = type
      this.children = []
   }
}
