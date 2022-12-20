/* eslint-disable no-tabs */
import { Row, Col, Card, CardBody, Label, Input, Button } from 'reactstrap'
import Select from 'react-select'
import Axios from 'axios'
import {axiosClient} from '../../../Client'
import {useState, useEffect } from 'react'
const shortid = require('shortid')
const Razorpay = require('razorpay')

//   const loadScript = (src) => {
//         return new Promise((resolve) => {
// 		const script = document.createElement('script')
// 		script.src = src
// 		script.onload = () => {
// 			resolve(true)
//             console.log("true")
// 		}

// 		script.onerror = () => {
// 			resolve(false)
//             console.log("error")
// 		}

// 		document.body.appendChild(script)
// 	})
// }
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


  const makePayment = async () => {
    const res = await initializeRazorpay()

    if (!res) {
      alert("Razorpay SDK Failed to load")
      return
    }

    //Make API call to the serverless API
    const data = await fetch("/student/Wallet/api/razorpay/", { method: "POST" }).then((t) => t.json())
    console.log(data)
    const  options = {
      key: 'rzp_test_L6Du3aG8Txsg06', // Enter the Key ID generated from the Dashboard
      name: "Soc Expert Testing",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test SocExpert",
      image: "/static/media/newMagicLogo.b5c32078.svg",
      handler (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id)
        alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
      },
      prefill: {
        name: "Soc Expert",
        email: "soc@gmail.com",
        contact: "1234567890"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

const wallet = () => {

    const [NumberOfCoins, setNumberOfCoins] = useState([])
    //const [selectedNumberOfCoins, setSelectedNumberOfCoins] = useState(NumberOfCoins)

    const getSelectedCoins = (e) => {
        const coins = e.target.value
        setNumberOfCoins([coins])
        console.log("selectd Coins", coins)
    }

    const BuyCoins = (((parseInt(NumberOfCoins) * 18) / 100) + parseInt(NumberOfCoins))
    console.log("Buy Coins", BuyCoins)

    // async function displayRazorpay() {
	// 	const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

	// 	if (!res) {
	// 		alert('Razorpay SDK failed to load. Are you online?')
	// 		return
	// 	}

	// 	// const data1 = await fetch('https://api.razorpay.com/v1/orders', { method: 'POST' }).then((t) =>	t.json()
	// 	//  )

	// 	// console.log(data1)
    //     const razorpayInstance =  new Razorpay({
    //         key_id:'rzp_test_L6Du3aG8Txsg06',
    //         key_secret:'yRPDCYsfHFnDn9IRBV1TCF39'
    //     })
        
    //     // Axios.post('/razorpay', async (req, res) => {
    //     //     const payment_capture = 1
    //     //     const amount = 1
    //     //     const currency = 'INR'
            
    //     //     const options = {
    //     //         amount: amount * 100,
    //     //         currency,
    //     //         receipt: shortid.generate(),
    //     //         payment_capture,
    //     //         name: 'SocExpert Testing',
	// 	// 	description: 'SocExpert Wallet Payment Testing',
	// 	// 	image: '/static/media/newMagicLogo.b5c32078.svg',
    //     //     prefill: {
	// 	// 		name:'socexpert',
	// 	// 		email: 'sdfdsjfh2@ndsfdf.com',
	// 	// 		phone_number: '8907654623'
	// 	// 	}
    //     //     }

    //     //     try {
    //     //         const response = await razorpayInstance.orders.create(options)
    //     //         console.log(response)
    //     //         res.JSON({
    //     //             id: response.id,
    //     //             currency: res.currency,
    //     //             amount: res.amount
    //     //         })
    //     //     } catch (error) {
    //     //         console.error()
    //     //     }
    //     // })

	// 	const options = {
	// 		key: 'rzp_test_L6Du3aG8Txsg06', //__DEV__ ? 'rzp_test_Lv8I10DUZg4qVW' : 'PRODUCTION_KEY', 
	// 		amount:  (BuyCoins * 100), //data.amount.toString(),  
	// 		currency: 'INR', //data.currency,         
	// 		//order_id: data.id,
    //         payment_capture:1,
    //         receipt: shortid.generate(),
	// 		name: 'SocExpert Testing',
	// 		description: 'SocExpert Wallet Payment Testing',
	// 		image: '/static/media/newMagicLogo.b5c32078.svg',
	// 		handler (response) {
	// 			alert(response.razorpay_payment_id)
	// 			alert(response.razorpay_order_id)
	// 			alert(response.razorpay_signature)
    //             console.log(response)
	// 		},
    //         // handler: function (response) {
	// 		// 	alert(response.razorpay_payment_id)
	// 		// 	alert(response.razorpay_order_id)
	// 		// 	alert(response.razorpay_signature)
	// 		// },
	// 		prefill: {
	// 			name:'socexpert',
	// 			email: 'sdfdsjfh2@ndsfdf.com',
	// 			phone_number: '8907654623'
	// 		}
	// 	}
    //     // try {
    //     //     const response = await razorpayInstance.orders.create(options)
    //     //     console.log('order', response)
    //     //     res.json({
    //     //         id: response.id,
    //     //         currency: response.currency,
    //     //         amount: response.amount
    //     //     })
    //     // } catch (error) {
    //     //     console.log(error)
    //     // }
    //     const response = razorpayInstance.orders.create(options)
    //        console.log('order', response)
	// 	const paymentObject = new window.Razorpay(options)
	// 	paymentObject.open()
    // }
    
const loggedInUserDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"))
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
                              console.log("S3 Connect", s3Connect.data)
              }
              )
                            
              console.log("Barrow Experience", BarrowExpRes.data)
                })
                console.log("Tech. Query", techQuery.data)
            })
                        console.log("Requests", requests.data)
                }
                )
                    console.log("CV Review", cvReview.data)
                }
                )
                console.log("Expired", expiredCoin.data)
            }
            )
            console.log("Mock", coin.data)
         }

         )
       // setUserDetails({...data})
        console.log("Wallet Data:", res.data)
      })
    }, [])
  
 
    return (
        <div>
        <Row className='match-height'>
            {/* Stats With Icons */}
            <Col xl='3' md='3' sm='6'>
                <Card>
                {
      userDetails.map(curData => (  
                    <CardBody className='text-center mt-2'>
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
      userExpiredCoin.map(curData => (  
                    <CardBody className='text-center mt-2'>
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
                                <option selected >0</option>
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
                                {NumberOfCoins.map((coins) => (
                                    <Input type='text' readOnly placeholder='Coins' value={((parseInt(coins) * 18) / 100)}></Input>
                                    ))}
                            </Col>

                            {NumberOfCoins.map((coins) => (
                            <Col xl='4' md='4' sm='12' className='text-center mt-2'>
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
      userRequests.map(curData => (    
           <Col className='text-center' xl='2' md='2' sm='6' xs='6' >
            <p>Your Requests</p>
                        <br />
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}> {curData}</h3>
                        </Col>
      ))
}
                        {
      userWallet.map(curData => (  
                        <Col className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>Mock</p>
            <label className='col-8 enrollDetailLabelStyle' htmlFor="text">
           
            </label>
    
                        <br />
                       
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}> {curData}</h3>
                        </Col>
                          ))
                        }
                        {
      userCvReview.map(curData => (  
                        <Col className='text-center' xl='2' md='2' sm='6' xs='6'>
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
                            userBarrowExp.map(curData => (  
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}>{curData}</h3>
                        ))
      }
                        </Col>
                        {
      userTechQuery.map(curData => (  
                        <Col className='text-center' xl='2' md='2' sm='6' xs='6'>
            <p>Tech. Query</p>
                        <br />
                        <h3 style={{ color: "#726c6c", fontWeight: "bold" }}>{curData}</h3>
                        </Col>
      ))
}
{
      userS3Connect.map(curData => (   
                        <Col className='text-center' xl='2' md='2' sm='6' xs='6'>
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