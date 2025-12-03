import { flexRender } from '@tanstack/react-table'
import { tsTableRow } from './TableRow'
import clsx from 'clsx'

//to do fix any type
const TableHeader = (headerGroup: any) => {
	const tsTableRowHeader = clsx('bg-light-grey', '!border-b-mid-grey', 'border-b')
	return (
		<div className={clsx(tsTableRowHeader, tsTableRow)} key={headerGroup.id}>
			{headerGroup.headers.map((header: any) => {
				const classNames = clsx('px-2.5', 'py-3')
				const style = {
					width: header.getSize(),
					...(header.column.columnDef.meta as any)?.headerStyles,
				}

				return (
					<div key={header.id} style={style} className={classNames}>
						{flexRender(header.column.columnDef.header, header.getContext())}
					</div>
				)
			})}
		</div>
	)
}

export default TableHeader
