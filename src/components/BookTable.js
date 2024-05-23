import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { fetchBooks } from '../api';
import { CSVLink } from 'react-csv';
import './BookTable.css';

const BookTable = ({ page, pageSize, setPageSize, searchQuery, setSearchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const { books, total } = await fetchBooks(page + 1, pageSize); // +1 because API page index might be 1-based
      const filteredBooks = books.filter(book =>
        book.author_name && book.author_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filteredBooks);
      setTotalRecords(total);
      setLoading(false);
    };
    loadBooks();
  }, [page, pageSize, searchQuery]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditFormData(data[index] || {});
    console.log('Editing row:', index, 'Data:', data[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveClick = async () => {
    const newData = [...data];
    newData[editingIndex] = editFormData;
    setData(newData);
    setEditingIndex(null);

    // Add API call here to persist changes
    // Example:
    // const response = await saveBook(editFormData);
    // if (response.success) {
    //   // Optionally refresh data or show success message
    // }
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditFormData({});
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Ratings Average', accessor: 'ratings_average' },
      { Header: 'Author Name', accessor: 'author_name' },
      { Header: 'Title', accessor: 'title' },
      { Header: 'First Publish Year', accessor: 'first_publish_year' },
      { Header: 'Subject', accessor: 'subject' },
      { Header: 'Author Birth Date', accessor: 'author_birth_date' },
      { Header: 'Author Top Work', accessor: 'author_top_work' },
      {
        Header: 'Edit',
        accessor: 'edit',
        Cell: ({ row: { index } }) => (
          editingIndex === index ? (
            <>
              <button className="btn" onClick={handleSaveClick}>Save</button>
              <button className="btn" onClick={handleCancelClick}>Cancel</button>
            </>
          ) : (
            <button className="btn" onClick={() => handleEditClick(index)}>Edit</button>
          )
        )
      },
    ],
    [editingIndex, editFormData]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page: tablePage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize: pageSz },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setPageSz,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: page, pageSize },
      manualPagination: true,
      pageCount: Math.ceil(totalRecords / pageSize),
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <div className="header">
        <CSVLink data={data} className="btn">Download CSV</CSVLink>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {tablePage.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>
                      {editingIndex === row.index ? (
                        <input
                          name={cell.column.id}
                          value={editFormData[cell.column.id] || ''}
                          onChange={handleEditChange}
                        />
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button className="btn" onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSz}
          onChange={e => {
            setPageSz(Number(e.target.value));
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 50, 100].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BookTable;