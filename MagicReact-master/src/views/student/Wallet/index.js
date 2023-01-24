/* eslint-disable no-tabs */
import { Row, Col, Card, CardBody, Label, Input, Button } from 'reactstrap'
import {axiosClient} from '../../../Client'
import {useState, useEffect } from 'react'

import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

const Razorpay = require('razorpay')


const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"

      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }


const wallet = () => {

   // const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
    const loggedInUserDetails = JSON.parse(Cookies.get("loggedInUserDetails"))

    const [NumberOfCoins, setNumberOfCoins] = useState([])
    const [TotalCoinsWithTax, setTotalCoinsWithTax] = useState('')
    

    const getSelectedCoins = (e) => {
        const coins = e.target.value
        setNumberOfCoins([coins])
        axiosClient.post(`Wallet/CalculateBuyCoinsTax?BuyCoins=${coins}`).then((c) => {
            setTotalCoinsWithTax(c)
        })
    }
    

    const BuyCoins = TotalCoinsWithTax.data //(((parseInt(NumberOfCoins) * 18) / 100) + parseInt(NumberOfCoins))


    const makePayment = async () => {
        const res = await initializeRazorpay()
        if (!res) {
            alert("Razorpay SDK Failed to load")
            return
        }
            
        const orderData = {key: 'rzp_test_L6Du3aG8Txsg06', amount: BuyCoins, currency:'INR', StudentId : loggedInUserDetails.StudentId } // here anything extra can be passed while creating an order
        const response = await axiosClient.post(`Wallet/InitializePaymentAndgetOrderDetails`,  orderData)
        const options = {
          key: orderData.key,
          amount: response.data.orderJson.amount,
          currency: response.data.orderJson.currency,
          name: 'Magic By SOCExperts',
          description: 'Buy Soc Expert SE Coins',
          image: '/static/media/newMagicLogo.b5c32078.svg',
          order_id : response.data.orderJson.id,
          handler: async (responseHandler) => {
            const ConfirmPaymentPayload = {
                razorpay_payment_id:responseHandler.razorpay_payment_id,
                razorpay_order_id:responseHandler.razorpay_order_id,
                razorpay_signature:responseHandler.razorpay_signature
            }    
            await axiosClient.post(`Wallet/Confirm?TransationDetaiId=${response.data.TransationDetaiId}`, ConfirmPaymentPayload).then(() => {
                toast.success('Payment Success Completed, Your OrderId:', responseHandler.razorpay_order_id, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                    })
            })
        //     .then(response1 => console.log("response1.data", response1.data))
        //     .catch((err) => console.log(err))
        //     console.log("response handler", responseHandler)
        // alert(responseHandler.razorpay_payment_id)
        // alert(responseHandler.razorpay_order_id)
        // alert(responseHandler.razorpay_signature)
          },
          prefill: {
            name: loggedInUserDetails.Fname,
            email: "testuser@mail.com",
            contact: "1234567890"
          },
          theme: {
            color: '#7367f0'
          }
        }
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    }

    // ** Context
    const [userDetails, setUserDetails] = useState([])  
    const [userWallet, setUserWallet] = useState([])
    const [userExpiredCoin, setUserExpiredCoin] = useState([])
    const [userCvReview, setUserCvReview] = useState([])
    const [userRequests, setUserRequests] = useState([])
    const [userTechQuery, setUserTechQuery] = useState([])
    const [userBarrowExp, setUserBarrowExp] = useState([])
    const [userS3Connect, setUserS3Connect] = useState([])
    useEffect(() => {
    //   axiosClient.get('Wallet/GetStudentWalletMock?StudentId=29&TypeId=1')
    axiosClient.get(`Wallet/GetStudentWalletAvailableCoins?StudentDetailID=${loggedInUserDetails.StudentId}`)    
    .then((res) => {
      setUserDetails([res.data])
       axiosClient.get(`Wallet/GetStudentEachRequestsTypeNumbers?StudentId=${loggedInUserDetails.StudentId}&TypeId=1`).then((coin) => {
          setUserWallet([coin.data])
          axiosClient.get(`Wallet/GetStudentWalletExpiredCoins?StudentDetailID=${loggedInUserDetails.StudentId}`).then((expiredCoin) => {
              setUserExpiredCoin([expiredCoin.data])
              axiosClient.get(`Wallet/GetStudentEachRequestsTypeNumbers?StudentId=${loggedInUserDetails.StudentId}&TypeId=2`).then((cvReview) => {
                  setUserCvReview([cvReview.data])
                  axiosClient.get(`Wallet/GetStudentWalletTotalRequests?StudentId=${loggedInUserDetails.StudentId}`).then((requests) => {
                      setUserRequests([requests.data])
                      axiosClient.get(`Wallet/GetStudentEachRequestsTypeNumbers?StudentId=${loggedInUserDetails.StudentId}&TypeId=4`).then((techQuery) => {
                          setUserTechQuery([techQuery.data])
                          axiosClient.get(`Wallet/GetStudentEachRequestsTypeNumbers?StudentId=${loggedInUserDetails.StudentId}&TypeId=8`).then((BarrowExpRes) => {
                            setUserBarrowExp([BarrowExpRes.data])
                          axiosClient.get(`Wallet/GetStudentEachRequestsTypeNumbers?StudentId=${loggedInUserDetails.StudentId}&TypeId=33`).then((s3Connect) => {
                              setUserS3Connect([s3Connect.data])
              }
              )
                            
                })
            })
                }
                )
                }
                )
            }
            )
         }

         )
      })
    }, [])
  
 
    return (
        <div>
        <Row className='match-height'>
            {/* Stats With Icons */}
            <Col xl='3' md='3' sm='6'>
                <Card>
                {
      userDetails.map((curData, index) => (  
                    <CardBody key={index} className='text-center mt-2'>
                        <p>Balance Coins</p>
                        <br />
                        
                        <h3 style={{ color: "green", fontWeight: "bold" }}>{curData.SECoin}</h3>
                    </CardBody>
      ))
}
                </Card>
            </Col>
            <Col xl='3' md='3' sm='6'>
                <Card>
                {
      userExpiredCoin.map((curData, index) => (  
                    <CardBody key={index} className='text-center mt-2'>
                        <p>Coins Spent</p>
                        <br />
                        
                        <h3 style={{ color: "red", fontWeight: "bold" }}> {curData}</h3>
                    </CardBody>
      ))
}
                </Card>
            </Col>

            <Col xl='6' md='6' sm='12'>
                <Card>
                    <CardBody>
                        <Row>
                            <Col xl='4' md='4' sm='12' className='mt-2'>
                                <Label for='RequestType' className='form-label'>
                                    No. of Coins
                                </Label>
                                <select name='NoOfCoins' id='NoOfCoins' className='form-control' placeholder='Select-Coins' onChange={getSelectedCoins} > 
                                <option readOnly >0</option>
                <option value='100' >100</option>
                <option value='200' >200</option>
                <option value='500' >500</option>
                <option value='1000' >1000</option>
                <option value='2000' >2000</option>
                <option value='3000' >3000</option>
                </select>
                               
                            </Col>
                            <Col xl='4' md='4' sm='12' className='mt-2'>
                                <Label for='RequestType' className='form-label'>
                                    Service Tax (18%)
                                </Label>
                                {NumberOfCoins.map((coins, index) => (
                                    <Input key={index} type='text' readOnly placeholder='Coins' value={((parseInt(coins) * 18) / 100)}></Input>
                                    ))}
                            </Col>

                            {NumberOfCoins.map((coins, index) => (
                            <Col key={index} xl='4' md='4' sm='12' className='text-center mt-2'>
                                <Label for='RequestType' className='form-label '>
                                    Total: (Coins + Tax)
                                </Label> &nbsp;
                                <Label for='RequestType' className='form-label btn bg-success' style={{ color: "white", fontWeight: "bold" }}>
                                    Total: {(((parseInt(coins) * 18) / 100) + parseInt(coins))}
                                </Label>
                            </Col>
                            ))}
                        </Row>
                        <hr/>
                        <div className='text-center mt-2'>
                        { (NumberOfCoins > 0) ? <Button type='button' onClick={makePayment} style={{ align: "center" }} className='me-1 col-md-3' color='primary'>
                                Buy
                            </Button> : ""
                                                    }                            </div>
                    </CardBody>
                </Card>
            </Col>
            {/* Stats With Icons */}
        </Row>
            <Col>
        <Card>
            <CardBody>
                <Row>
                {
      userRequests.map((curData, index) => (    
           <Col key={index} className='text-center' xl='2' md='2' sm='6' xs='6' >
            <p>Your Requests</p>
                        <br />
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}> {curData}</h3>
                        </Col>
      ))
}
                        {
      userWallet.map((curData, index) => (  
                        <Col key={index} className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>Mock</p>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
           
            </label>
    
                        <br />
                       
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}> {curData}</h3>
                        </Col>
                          ))
                        }
                        {
      userCvReview.map((curData, index) => (  
                        <Col key={index} className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>CV Review</p>
                        <br />
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}>{curData}</h3>
                        </Col>
      ))
      }
                        <Col className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>Borrow Exp.</p>
                        <br />
                        {
                            userBarrowExp.map((curData, index) => (  
                        <h3 key={index} style={{ color: "#726c6c", fontWeight: "bold" }}>{curData}</h3>
                        ))
      }
                        </Col>
                        {
      userTechQuery.map((curData, index) => (  
                        <Col key={index} className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>Tech. Query</p>
                        <br />
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}>{curData}</h3>
                        </Col>
      ))
}
{
      userS3Connect.map((curData, index)=> (   
                        <Col key={index} className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>S3 Connect</p>
                        <br />
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}>{curData}</h3>
                        </Col>
      ))
}
                        </Row>
            </CardBody>
           
        </Card>
        </Col>
       
        </div>
    )
}

export default wallet