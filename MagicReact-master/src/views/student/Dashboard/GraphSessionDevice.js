// ** React Imports
import { Fragment, useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'


import SessionByDevice from '@src/views/ui-elements/SessionByDevice'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Styles
import '@src/@core/scss/react/libs/charts/apex-charts.scss'

const GraphSessionDevice = () => {
  // ** Context
  const context = useContext(ThemeColors)
  return (
    <Fragment>
     
     <Row>
              <SessionByDevice
                primary={context.colors.primary.main}
                warning={context.colors.warning.main}
                danger={context.colors.danger.main}
              />
         </Row> 
    </Fragment>
  )
}

export default GraphSessionDevice