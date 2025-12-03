import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";

export const tsTableRow = clsx(
    "flex",
    "items-center",
    "max-w-full",
    "w-full",
    "bg-light-grey"
);

// to do handle any type
const TableRow = ({ row, onRowClick }: any) => {
    return (
        <div
            className={clsx(
                tsTableRow,
                "!text-primary-text hover:cursor-pointer hover:bg-mid-grey border-b border-mid-grey"
            )}
            key={row.id}
            onClick={() => onRowClick?.(row)}
        >
            {row.getVisibleCells().map((cell: any) => {
                const style = {
                    width:
                        (cell.column.columnDef.meta as any)?.headerStyles
                            ?.width || cell.column.getSize(),
                    ...(cell.column.columnDef.meta as any)?.cellStyles,
                };
                return (
                    <div
                        className='px-2.5 py-3'
                        style={style}
                        key={cell.id}
                    >
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TableRow;
