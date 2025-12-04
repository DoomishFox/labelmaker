export const ElementTypes = ["stackpanel", "header", "paragraph"] as const
export type ElementType = typeof ElementTypes[number]
export const isElementType = (type: string) => type in ElementTypes

export interface DefaultConfigurations {
   invert: boolean
}
export const DefaultConfiguration: DefaultConfigurations = {
   invert: false
}

export class Element {
   public type: ElementType
   public children: Array<Element>
   public configurations: DefaultConfigurations
   public content: string
   constructor(type: ElementType = "paragraph") {
      this.type = type
      this.children = []
      this.configurations = DefaultConfiguration
      this.content = ""
   }
}
