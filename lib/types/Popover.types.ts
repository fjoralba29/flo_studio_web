import { PropsWithChildren } from 'react'

export type PopoverPlacement =
	| 'top-start'
	| 'top'
	| 'top-end'
	| 'bottom-start'
	| 'bottom'
	| 'bottom-end'
	| 'left-start'
	| 'left'
	| 'left-end'
	| 'right-start'
	| 'right'
	| 'right-end'

export type PopoverProps = PropsWithChildren & {
	content: React.ReactNode
	placement?: PopoverPlacement
	offset?: number
	autoFlip?: boolean
}

export interface PopoverStylesConfig {
	rounded: string
	colorContentBackground: string
	colorContentBorder: string
	colorArrowFill: string
}
