// ** React Imports
import { Fragment, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Card,
  Button,
  Form,
  Label,
  Modal,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  ListGroup,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

import { X, DownloadCloud } from 'react-feather'

import { useDropzone } from 'react-dropzone'

import { Link } from 'react-router-dom'

const UploadResumeModal = () => {
  const [show, setShow] = useState(false)

  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/*',
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length) {
        toast.error(<ErrorToast />, { icon: false, hideProgressBar: true })
      } else {
        setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      }
    }
  })

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>
          <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        </div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }
  
  return (
    <Fragment>
      
        <Link to='#' onClick={() => setShow(true)}>ID:202213277</Link>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-4'>
          <h1 className='text-center mb-1'>Upload Resume</h1>
          <Card>
          <CardHeader>
            <CardTitle tag='h4'>Upload Your Resume</CardTitle>
          </CardHeader>
          <CardBody>
          <Form className='mt-2 pt-50'>
                <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className='d-flex align-items-center justify-content-center flex-column'>
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
                <p className='text-secondary'>
                  Drop files here or click{' '}
                  <a href='/' onClick={e => e.preventDefault()}>
                    browse
                  </a>{' '}
                  thorough your machine
                </p>
              </div>
            </div>
            {files.length ? (
              <Fragment>
                <ListGroup className='my-2'>{fileList}</ListGroup>
                <div className='d-flex justify-content-end'>
                  <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                    Remove All
                  </Button>
                  <Button color='primary'>Upload Files</Button>
                </div>
              </Fragment>
            ) : null}
            </Form>
            </CardBody>
            </Card>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UploadResumeModal
