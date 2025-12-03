import {
    AccessorKeyColumnDef,
    getFilteredRowModel,
    getSortedRowModel,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
// import { Container } from 'src/components'
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import clsx from "clsx";

type Props = {
    columns: AccessorKeyColumnDef<any, string>[];
    onRowClick?: (row: any) => void;
    data: any[];
    className?: string;
    isLoading?: boolean | undefined;
};

const Table = ({
    data,
    columns,
    onRowClick,
    className,
    isLoading,
    ...tableOptions
}: Props) => {
    const tsTableClasses = clsx(
        "w-full",
        "max-w-full",
        "text-secondary-text",
        "label-1",
        "grow",
        "max-h-full",
        "max-h-full",
        "!box-border",
        "overflow-y-hidden",
        "overflow-x-auto",
        "flex-column",
        className
    );

    const table = useReactTable({
        data,
        columns,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        ...tableOptions,
    });

    return (
        <div className={tsTableClasses}>
            {table.getHeaderGroups().map(TableHeader)}
            {/* <Container {...{ isLoading, isEmpty: !data.length }}> */}
            {table.getRowModel().rows.map((row) => (
                <TableRow {...{ row, onRowClick }} />
            ))}
            {/* </Container> */}
        </div>
    );
};
export default Table;
