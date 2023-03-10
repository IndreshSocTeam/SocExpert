// ** React Imports
import { Fragment, useState} from 'react'
// ** Third Party Components
//import axios from 'axios'

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap'

// ** Demo Components
import Tabs from './Tabs'
import Breadcrumbs from '@components/breadcrumbs'
import SubmitAssignmentTabs from './SubmitAssignment'
import ReviewAssignmentTabs from './ReviewAssignment'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-account-settings.scss'

const StudentAssignment = () => {
  const [activeTab, setActiveTab] = useState('1')

  const toggleTab = tab => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Breadcrumbs breadCrumbTitle='Assignment' breadCrumbParent='Review' breadCrumbActive='Assignment' />
        <Row>
          <Col xs={12}>
            <Tabs className='mb-2' activeTab={activeTab} toggleTab={toggleTab} />
            <TabContent activeTab={activeTab}>
              <TabPane tabId='1'>
                    <SubmitAssignmentTabs />
              </TabPane>
              <TabPane tabId='2'>
                    <ReviewAssignmentTabs/>
              </TabPane>
              </TabContent>
          </Col>
        </Row>
    </Fragment>
  )
}

export default StudentAssignment
//*************************************************************************************************** */
// ** React Imports
// import { Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'

// // ** Table Columns
// import { columns } from './column'

// // ** Third Party Components
// import ReactPaginate from 'react-paginate'
// import { ChevronDown } from 'react-feather'
// import DataTable from 'react-data-table-component'

// // ** Reactstrap Imports
// import { Button, Input, Row, Col, Card } from 'reactstrap'

// // ** Store & Actions
// import { getData } from './store'

// import { useDispatch, useSelector } from 'react-redux'

// // ** Styles
// import '@styles/react/apps/app-invoice.scss'
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// const CustomHeader = ({ handleFilter, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
//   return (
//     <div className='invoice-list-table-header w-100 py-2'>
//       <Row>
//         <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
//           <div className='d-flex align-items-center me-2'>
//             <label htmlFor='rows-per-page'>Show</label>
//             <Input
//               type='select'
//               id='rows-per-page'
//               value={rowsPerPage}
//               onChange={handlePerPage}
//               className='form-control ms-50 pe-3'
//             >
//               <option value='10'>10</option>
//               <option value='25'>25</option>
//               <option value='50'>50</option>
//             </Input>
//           </div>
//           <Button tag={Link} to='/apps/invoice/add' color='primary'>
//             Add Assignment
//           </Button>
//         </Col>
//         <Col
//           lg='6'
//           className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
//         >
//           <div className='d-flex align-items-center'>
//             <label htmlFor='search-invoice'>Search</label>
//             <Input
//               id='search-invoice'
//               className='ms-50 me-2 w-100'
//               type='text'
//               value={value}
//               onChange={e => handleFilter(e.target.value)}
//               placeholder='Search Assignment'
//             />
//           </div>
//           <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
//             <option value=''>Select Status</option>
//             <option value='downloaded'>Asignment</option>
//             <option value='draft'>Asignment</option>
//             <option value='paid'>Asignment</option>
//             <option value='partial payment'>Asignment</option>
//             <option value='past due'>Asignment</option>
//             <option value='sent'>Asignment</option>
//           </Input>
//         </Col>
//       </Row>
//     </div>
//   )
// }

// const InvoiceList = () => {
//   // ** Store vars
//   const dispatch = useDispatch()
//   const store = useSelector(state => state.invoice)

//   // ** States
//   const [value, setValue] = useState('')
//   const [sort, setSort] = useState('desc')
//   const [sortColumn, setSortColumn] = useState('id')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [statusValue, setStatusValue] = useState('')
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   useEffect(() => {
//     dispatch(
//       getData({
//         sort,
//         q: value,
//         sortColumn,
//         page: currentPage,
//         perPage: rowsPerPage,
//         status: statusValue
//       })
//     )
//   }, [dispatch, store])

//   const handleFilter = val => {
//     setValue(val)
//     dispatch(
//       getData({
//         sort,
//         q: val,
//         sortColumn,
//         page: currentPage,
//         perPage: rowsPerPage,
//         status: statusValue
//       })
//     )
//   }

//   const handlePerPage = e => {
//     dispatch(
//       getData({
//         sort,
//         q: value,
//         sortColumn,
//         page: currentPage,
//         status: statusValue,
//         perPage: parseInt(e.target.value)
//       })
//     )
//     setRowsPerPage(parseInt(e.target.value))
//   }

//   const handleStatusValue = e => {
//     setStatusValue(e.target.value)
//     dispatch(
//       getData({
//         sort,
//         q: value,
//         sortColumn,
//         page: currentPage,
//         perPage: rowsPerPage,
//         status: e.target.value
//       })
//     )
//   }

//   const handlePagination = page => {
//     dispatch(
//       getData({
//         sort,
//         q: value,
//         sortColumn,
//         status: statusValue,
//         perPage: rowsPerPage,
//         page: page.selected + 1
//       })
//     )
//     setCurrentPage(page.selected + 1)
//   }

//   const CustomPagination = () => {
//     const count = Number((store.total / rowsPerPage).toFixed(0))

//     return (
//       <ReactPaginate
//         nextLabel=''
//         breakLabel='...'
//         previousLabel=''
//         pageCount={count || 1}
//         activeClassName='active'
//         breakClassName='page-item'
//         pageClassName={'page-item'}
//         breakLinkClassName='page-link'
//         nextLinkClassName={'page-link'}
//         pageLinkClassName={'page-link'}
//         nextClassName={'page-item next'}
//         previousLinkClassName={'page-link'}
//         previousClassName={'page-item prev'}
//         onPageChange={page => handlePagination(page)}
//         forcePage={currentPage !== 0 ? currentPage - 1 : 0}
//         containerClassName={'pagination react-paginate justify-content-end p-1'}
//       />
//     )
//   }

//   const dataToRender = () => {
//     const filters = {
//       q: value,
//       status: statusValue
//     }

//     const isFiltered = Object.keys(filters).some(function (k) {
//       return filters[k].length > 0
//     })

//     if (store < 0) {
//       return store.data
//     } else if (store === 0 && isFiltered) {
//       return []
//     } else {
//       return store
//     }
//   }

//   const handleSort = (column, sortDirection) => {
//     setSort(sortDirection)
//     setSortColumn(column.sortField)
//     dispatch(
//       getData({
//         q: value,
//         page: currentPage,
//         sort: sortDirection,
//         status: statusValue,
//         perPage: rowsPerPage,
//         sortColumn: column.sortField
//       })
//     )
//   }

//   return (
//     <div className='invoice-list-wrapper'>
//       <Card>
//         <div className='invoice-list-dataTable react-dataTable'>
//           <DataTable
//             noHeader
//             pagination
//             sortServer
//             paginationServer
//             subHeader={true}
//             columns={columns}
//             responsive={true}
//             onSort={handleSort}
//             data={dataToRender()}
//             sortIcon={<ChevronDown />}
//             className='react-dataTable'
//             defaultSortField='invoiceId'
//             paginationDefaultPage={currentPage}
//             paginationComponent={CustomPagination}
//             subHeaderComponent={
//               <CustomHeader
//                 value={value}
//                 statusValue={statusValue}
//                 rowsPerPage={rowsPerPage}
//                 handleFilter={handleFilter}
//                 handlePerPage={handlePerPage}
//                 handleStatusValue={handleStatusValue}
//               />
//             }
//           />
//         </div>
//       </Card>
//     </div>
//   )
// }

// export default InvoiceList

