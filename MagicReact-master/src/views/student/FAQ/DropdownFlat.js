import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const DropdownFlat = () => {
  return (
    <div className='demo-inline-spacing'>
      <UncontrolledButtonDropdown>
        <DropdownToggle color='flat-primary' caret>
          Drop
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem href='/' tag='a'>Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing
           jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum.
            Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.</DropdownItem>
       
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      
    </div>
  )
}

export default DropdownFlat