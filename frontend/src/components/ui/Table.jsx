import { forwardRef } from 'react'

const Table = forwardRef(
  (
    {
      columns,
      data,
      onRowClick,
      className = '',
      emptyMessage = 'No data available',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full border-collapse border border-neutral-200 rounded-lg overflow-hidden'
    const classes = `${baseStyles} ${className}`.trim()

    return (
      <div className="overflow-x-auto">
        <table ref={ref} className={classes} {...props}>
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-neutral-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={onRowClick ? 'cursor-pointer hover:bg-neutral-50' : ''}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700"
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
  }
)

Table.displayName = 'Table'

export default Table
