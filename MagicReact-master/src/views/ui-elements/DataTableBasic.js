import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'



// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
const DataTablesBasic = () => {
    return (
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle tag='h4'>Zero Configuration</CardTitle>
        </CardHeader>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            pagination
            data={data}
            columns={basicColumns}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>
      </Card>
    )
  }

export default DataTablesBasic