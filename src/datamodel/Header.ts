import type { DefaultConfigurations } from "."

export const HeaderTypes = ["big", "medium", "small"] as const
export type HeaderType = typeof HeaderTypes[number]

export interface HeaderConfigurations extends DefaultConfigurations {
   style: HeaderType
}
