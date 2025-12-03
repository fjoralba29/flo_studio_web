import { cn } from "@/helpers/cn";
import { useObserveTableLastItem } from "@/helpers/useObserveTableLastItem";
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";

import { useRef } from "react";

const alignmentClasses = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
};

type TableColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
    align?: string;
    headerClasses?: string;
    cellClasses?: string;
};

type TableProps<TData> = {
    data: TData[];
    columns: TableColumnDef<TData, unknown>[];
    onRowClick?: (rowData: TData) => void;
    className?: string;
    headerClassName?: string;
    rowClassName?: string | ((rowData: TData) => string);
    isLoading?: boolean;
    isLoadingMore: boolean;
    hasMore: boolean;
    loadMore: () => void;
};

const InfinityTable = <TData,>({
    data = [],
    columns,
    onRowClick,
    className = "",
    isLoading = false,
    headerClassName,
    rowClassName,
    isLoadingMore = true,
    hasMore = false,
    loadMore,
}: TableProps<TData>) => {
    const table = useReactTable({
        data,
        columns: columns as ColumnDef<TData, unknown>[],
        getCoreRowModel: getCoreRowModel(),
    });
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const haveData = data.length !== 0 && !isLoading;

    const containerClasses = cn(
        "relative",
        "w-full",
        "h-full",
        "overflow-x-auto",
        "overflow-y-auto",
        "label-1",
        "text-left",
        "overscroll-contain",
        className
    );

    const tableClasses = cn(
        "w-full table-auto overscroll-contain",
        !haveData && "h-full"
    );

    const tableHeaderRowClasses = cn(
        "tiny-strong",
        "text-secondary-text",
        "bg-grape",
        "text-white",
        "rounded-lg",
        "border-b-[2px]",
        "border-mid-grey",
        "overflow-hidden",
        "whitespace-nowrap",
        "sticky",
        "top-0",
        "z-10",
        "transition",
        headerClassName
    );

    const tableRowClasses = cn(
        "whitespace-nowrap",
        "transition-colors",
        "duration-300",
        "text-primary-text",
        "bg-light-grey",
        "hover:bg-mid-grey",
        "border-b",
        "border-mid-grey",
        "transition",
        "h-auto",
        onRowClick && "hover:cursor-pointer"
    );

    const hasNoData = data.length === 0 && !isLoading;
    const columnCount = table.getAllLeafColumns().length;

    useObserveTableLastItem({
        loadMore,
        hasMore,
        isLoadingMore,
        loadMoreRef,
    });

    return (
        <div className={containerClasses}>
            <table className={tableClasses}>
                <thead className={tableHeaderRowClasses}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const {
                                    id,
                                    isPlaceholder,
                                    getContext,
                                    column,
                                } = header;
                                const { align = "start", headerClasses = "" } =
                                    column.columnDef as TableColumnDef<TData>;
                                return (
                                    <th
                                        key={id}
                                        className={cn(
                                            "px-[15px]",
                                            "py-[10px]",
                                            "align-top",
                                            alignmentClasses?.[
                                                align as keyof typeof alignmentClasses
                                            ] || "text-left",
                                            headerClasses
                                        )}
                                    >
                                        {isPlaceholder
                                            ? null
                                            : flexRender(
                                                  column.columnDef.header,
                                                  getContext()
                                              )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody className={cn("relative", hasNoData && "h-full")}>
                    {isLoading && (
                        <tr>
                            <td colSpan={columnCount}>
                                <div className='flex justify-center items-center w-full h-full min-h-[200px]'>
                                    Loading
                                </div>
                            </td>
                        </tr>
                    )}
                    {hasNoData && (
                        <tr className='h-full'>
                            <td
                                colSpan={columnCount}
                                className='h-full'
                            >
                                Empty
                            </td>
                        </tr>
                    )}
                    {haveData &&
                        table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className={cn(
                                    tableRowClasses,
                                    onRowClick && "cursor-pointer",
                                    rowClassName &&
                                        (typeof rowClassName === "string"
                                            ? rowClassName
                                            : rowClassName(row.original))
                                )}
                                onClick={() => onRowClick?.(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const {
                                        id: cellId,
                                        getContext,
                                        column,
                                    } = cell;
                                    const {
                                        align = "start",
                                        cellClasses = "",
                                    } =
                                        (column.columnDef as TableColumnDef<TData>) ||
                                        "start";

                                    return (
                                        <td
                                            key={cellId}
                                            className={cn(
                                                "px-[15px]",
                                                "py-[10px]",
                                                "align-top",
                                                "h-auto",
                                                "min-h-[48px]",
                                                alignmentClasses?.[
                                                    align as keyof typeof alignmentClasses
                                                ] || "text-left",
                                                cellClasses
                                            )}
                                        >
                                            {flexRender(
                                                column.columnDef.cell,
                                                getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>

                {!isLoading && !hasNoData && hasMore && (
                    <tfoot>
                        <tr>
                            <td
                                colSpan={columnCount}
                                className='p-4 text-center'
                            >
                                <div
                                    ref={loadMoreRef}
                                    className='flex justify-center'
                                >
                                    Loading
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
};

export default InfinityTable;
