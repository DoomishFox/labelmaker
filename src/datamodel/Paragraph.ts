import type { DefaultConfigurations } from "."

export const ParagraphLayoutTypes = ["left", "center", "right"] as const
export type ParagraphLayoutType = typeof ParagraphLayoutTypes[number]

export interface ParagraphConfigurations extends DefaultConfigurations {
   layout: ParagraphLayoutType
   bold: boolean
}
