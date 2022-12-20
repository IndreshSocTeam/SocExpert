import mock from './mock'
const data = {
  faqData: {
    // payment
    payment: {
      icon: 'CreditCard',
      title: 'Payment',
      subtitle: 'Which license do I need?',
      qandA: [
        {
          question: '1. What is SOC Experts MAGIC (SE-MAGIC)?',
          ans: 'SOC Experts MAGIC is a one stop portal for SOC Experts students. It has got everything you need to start a career in Cybersecurity.It is also a community driven portal where several SOC Experts Alumni come together to help current students. It is a tool – of the students (current and alumni), by the students (alumni network), for the students (current students).'
          
        },
        {
          question: '2. What can a student do in SOC Experts MAGIC?',
          ans: 'The following can be achieved through SE-MAGIC:                  1)  Raise a request for Mock Interview or CV Review or General Query. 2)Track your learning progress 3) Submit Assignments 4) Raise Concerns or Complaints 5) Apply for Cybersecurity Jobs 6) All SOC Experts resources in one place. 7) Free Courses 8) CV points 9) CV templates 10) All other SOC Experts resources that can help you in starting a Cybersecurity Career.'
        },
        {
          question: '3. Who is a Cyber Genie?',
          ans: 'Any SOC Experts Alumni who is currently working in Cybersecurity domain can be a Cyber Genie. Since they are our alumni, they already understand the essence of being a mentor i.e., the dedication and commitment required by a mentor towards each student for each of their requests.  A Cyber Genie is a person who has walked the same path that you are currently walking and we believe they are the best people to take you towards your goal (Cybersecurity Job), because they have been there and don’t that.'
        },
        {
          question: '4. What is SE-COIN?',
          ans: 'SE-Coin is the currency we use to request services with Cyber Genies. Think about them like the Genie Lamp. Every time you use few SE-Coins a Cyber Genie will be available to help you.  Each student will get either 2000, 3000 or 5000 SE-Coins depending on the course they have enrolled for.'
        },
        {
          question: '5. What is a cost of each type of request?',
          ans: 'Currently MAGIC offers three types of requests: Mock Interview – 100 SE-Coins, CV Review – 250 SE-Coins, General Query – 100 SE-Coins. You can also raise a high priority request for quick resolution by paying 100 additional SE-Coins for the request. '
        },
        {
          question: '6. What if I do not like the service offered by the Cyber Genie for a request?',
          ans: 'You have the complete control over the request resolution. Once the Cyber Genie marks the request as CLOSED and if you are not completely satisfied with the resolution, you can mark the request as NOT RESOLVED.Please Note: All requests in CLOSED state will be AUTO-RESOLVED in 24 hours.'
        },
        {
          question: '7. How long are these SE-Coins valid?',
          ans: 'SE-Coins will be valid for 3 months from the batch start date. After which they will be lapsed.'
        },
        {
          question: '8. Can I use SE-Coins even after I get placed?',
          ans: '  Yes, you can. We understand that a graduate starting a cybersecurity career or a working professional switching to cybersecurity domain will have several questions even after they get the job. You can use SE-Coins to request support from Cyber Genies before they lapse for your account.'
        },
        {
          question: '9. Can I buy more SE-Coins?',
          ans: ' Currently we do not support that feature. However, we are planning to include the future to buy additional SE-Coins in the future releases of MAGIC portal.'
        },
        {
          question: '10. Is there a time for raising requests?',
          ans: ' You can raise the requests 24/7; however, they will be picked up depending up on the availability of the Cyber Genies. Usually, requests raised before 8pm IST will be addressed on the same day.'
        }
      ]
    },
    // delivery
    delivery: {
      icon: 'ShoppingBag',
      title: 'Delivery',
      subtitle: 'Which license do I need?',
      qandA: [
        {
          question: 'Where has my order reached?',
          ans: 'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.'
        },
        {
          question:
            'The shipment status shows that it has been returned/cancelled. What does it mean and who do I contact?',
          ans: 'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.'
        },
        {
          question: 'What if my shipment is marked as lost?',
          ans: 'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.'
        },
        {
          question: 'My shipment status shows that it’s out for delivery. By when will I receive it?',
          ans: 'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.'
        },
        {
          question: 'What do I need to do to get the shipment delivered within a specific timeframe?',
          ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      ]
    },
    // cancellation and return
    cancellationReturn: {
      icon: 'RefreshCw',
      title: 'Cancellation & Return',
      subtitle: 'Which license do I need?',
      qandA: [
        {
          question: 'Can my security guard or neighbour receive my shipment if I am not available?',
          ans: 'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.'
        },
        {
          question: 'How can I get the contact number of my delivery agent?',
          ans: 'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.'
        },
        {
          question: 'How can I cancel my shipment?',
          ans: 'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.'
        },
        {
          question: 'I have received a defective/damaged product. What do I do?',
          ans: 'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.'
        },
        {
          question: 'How do I change my delivery address?',
          ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
          question: 'What documents do I need to carry for self-collection of my shipment?',
          ans: 'At tempor commodo ullamcorper a lacus vestibulum. Ultrices neque ornare aenean euismod. Dui vivamus arcu felis bibendum. Turpis in eu mi bibendum neque egestas congue. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit. Tortor consequat id porta nibh. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Faucibus nisl tincidunt eget nullam non nisi. Enim nunc faucibus a pellentesque. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Nec nam aliquam sem et tortor consequat id. Fringilla est ullamcorper eget nulla facilisi. Morbi tristique senectus et netus et.'
        },
        {
          question: 'What are the timings for self-collecting shipments from the Delhivery Branch?',
          ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod lacinia at quis risus sed vulputate odio ut enim. Dictum at tempor commodo ullamcorper a lacus vestibulum.'
        }
      ]
    },
    // my orders
    myOrders: {
      icon: 'Package',
      title: 'My Orders',
      subtitle: 'Which license do I need?',
      qandA: [
        {
          question: 'Can I avail of an open delivery?',
          ans: 'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.'
        },
        {
          question: 'I haven’t received the refund of my returned shipment. What do I do?',
          ans: 'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.'
        },
        {
          question: 'How can I ship my order to an international location?',
          ans: 'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.'
        },
        {
          question: 'I missed the delivery of my order today. What should I do?',
          ans: 'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.'
        },
        {
          question: 'The delivery of my order is delayed. What should I do?',
          ans: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }
      ]
    },
    // product and services
    productServices: {
      icon: 'Settings',
      title: 'Product & Services',
      subtitle: 'Which license do I need?',
      qandA: [
        {
          question: 'How can I register a complaint against the courier executive who came to deliver my order?',
          ans: 'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.'
        },
        {
          question: 'The status for my shipment shows as ‘not picked up’. What do I do?',
          ans: 'Sweet pie candy jelly. Sesame snaps biscuit sugar plum. Sweet roll topping fruitcake. Caramels liquorice biscuit ice cream fruitcake cotton candy tart. Donut caramels gingerbread jelly-o gingerbread pudding. Gummi bears pastry marshmallow candy canes pie. Pie apple pie carrot cake.'
        },
        {
          question: 'How can I get a proof of delivery for my shipment?',
          ans: 'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan.'
        },
        {
          question: 'How can I avail your services?',
          ans: 'Cheesecake muffin cupcake dragée lemon drops tiramisu cake gummies chocolate cake. Marshmallow tart croissant. Tart dessert tiramisu marzipan lollipop lemon drops. Cake bonbon bonbon gummi bears topping jelly beans brownie jujubes muffin. Donut croissant jelly-o cake marzipan. Liquorice marzipan cookie wafer tootsie roll. Tootsie roll sweet cupcake.'
        }
      ]
    }
  }
}

mock.onGet('/faq/data').reply(config => {
  const { q = '' } = config.params
  const queryLowered = q.toLowerCase()

  const filteredData = {}

  Object.entries(data.faqData).forEach(entry => {
    const [categoryName, categoryObj] = entry
    const filteredQAndAOfCategory = categoryObj.qandA.filter(qAndAObj => {
      return qAndAObj.question.toLowerCase().includes(queryLowered)
    })
    filteredData[categoryName] = {
      ...categoryObj,
      qandA: filteredQAndAOfCategory.length ? filteredQAndAOfCategory : []
    }
  })

  return [200, filteredData]
})
