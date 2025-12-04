import type { DefaultConfigurations } from "."

export const StackpanelOrientationTypes = ["vertical", "horizontal"] as const
export type StackpanelOrientationType = typeof StackpanelOrientationTypes[number]

export interface StackpanelConfigurations extends DefaultConfigurations {
   orientation: StackpanelOrientationType,
   expand: boolean
}
