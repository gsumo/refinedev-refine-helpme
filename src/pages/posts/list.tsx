import React from 'react';
import { useTable, ColumnDef, flexRender } from '@pankod/refine-react-table';
import { GetManyResponse, useMany } from '@pankod/refine-core';
import {
  Box,
  Group,
  List,
  ScrollArea,
  Select,
  Table,
  Pagination,
  EditButton,
  DeleteButton,
  DateField,
} from '@pankod/refine-mantine';

import { ColumnFilter, ColumnSorter } from '../../components/table';
import { FilterElementProps, ICategory, IPost } from '../../interfaces';

interface Intference {
  id: number;
  title: string;
  categories: ICategory[];
}

export const PostList: React.FC = () => {
  const columns = React.useMemo<ColumnDef<IPost>[]>(
    () => [
      {
        id: 'id',
        header: 'ID',
        accessorKey: 'id',
      },
      {
        id: 'title',
        header: 'Title',
        accessorKey: 'title',
        meta: {
          filterOperator: 'contains',
        },
        cell: (props) => {
          const title = props.getValue() as string;
          return (
            <EditButton
              recordItemId={props.row.original.id}
              hideText={true}
              variant="light"
              className="text-slate-500 hover:text-slate-800"
            />
          );
        },
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    setOptions,
    refineCore: {
      setCurrent,
      pageCount,
      current,
      tableQueryResult: { data: tableData },
    },
  } = useTable({
    columns,
  });

  setOptions((prev) => ({
    ...prev,
    meta: {
      ...prev.meta,
    },
  }));

  return (
    <ScrollArea>
      <List>
        <Table highlightOnHover>
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <Group spacing="xs" noWrap>
                          <Box>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Box>
                          <Group spacing="xs" noWrap>
                            <ColumnSorter column={header.column} />
                            <ColumnFilter column={header.column} />
                          </Group>
                        </Group>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <Pagination
          position="right"
          total={pageCount}
          page={current}
          onChange={setCurrent}
        />
      </List>
    </ScrollArea>
  );
};
