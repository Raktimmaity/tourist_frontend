import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Trips from './pages/Trips';
import Tours from './pages/Tours';
import Flights from './pages/Flights';
import Rewards from './pages/Rewards';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PopularDestinations from './components/Destination';
import Destination from './components/Destination';
import { Package, Users } from 'lucide-react';
import Packages from './components/Packages';
import Reviews from './components/Reviews';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Partners from './components/Partners';
import Filghts from './pages/Flights';
import FAQ from './components/FAQ';
import FlightsPage from './pages/FlightsPage';
import Hotels from './pages/Hotels';
import Homestays from './pages/Homestays';
import Holiday from './pages/Holiday';
import Trains from './pages/Trains';
import Buses from './pages/Buses';
import Cabs from './pages/Cabs';
import ARScanner from './components/ARScanner';
import TrainBooking, { StripeWrapper } from './pages/TrainBooking';
import UserDashboard from './components/UserDashboard';
import ProfilePage from './pages/ProfilePage';
import User from './pages/User';
import HotelList from './pages/HotelList';
import AddTouristPlace from './components/AddTouristPlace';
import TouristPlacesListPage from './components/TouristPlacesListPage';
import Booking from './components/Booking';
import VirtualTourPage from './pages/VirtualTourPage';
import ForgotPassword from './components/ForgotPassword';
import ContactMessages from './pages/ContactMessages';


// function App(){

//   const route = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <>
//           <Home />,
//           <Trips />,
//           <Flights />,
//           <Rewards/>
//         </>
//       )
//     }
//   ]);

//   return (
//     // <div className="font-sans">
//     //   <Navbar />
//     //   <Routes>
//     //     <Route path="/" element={<Home />} />
//     //     <Route path="/trips" element={<Trips />} />
//     //     <Route path="/tours" element={<Tours />} />
//     //     <Route path="/flights" element={<Flights />} />
//     //     <Route path="/rewards" element={<Rewards />} />
//     //   </Routes>
//     // </div>
//     <>
//       <RouterProvider router={route}/>
//     </>
//   );
// }
// export default App;

function App(){

  const route = createBrowserRouter([
    {
      path: "/",
      element:(
        <>
        <Navbar/>
        <Hero/>
        {/* <ContactMessages/> */}
        <About/>
        <Services/>
        {/* <ARScanner/> */}
        <Destination/>
        {/* <Packages/> */}
        <Partners/>
        {/* <Flights/> */}
        <Reviews/>
        <FAQ/>
        <Contact/>
        <Footer/>
        </>
      )
    },
    {
      path: "/package",
      element:(
        <>
        <Navbar/>
        <Packages/>
        <Footer/>
        </>
      )
    },
    {
      path: "/tours",
      element:(
        <>
        <Navbar/>
        <Tours/>
        <Footer/>
        </>
      )
    },
    {
      path: "/trips",
      element:(
        <>
        <Navbar/>
        <Trips/>
        <Footer/>
        </>
      )
    },
    {
      path: "/flights",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <FlightsPage/>
        <Footer/>
        </>
      )
    },
    {
      path: "/hotels",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <Hotels/>
        <Footer/>
        </>
      )
    },
    {
      path: "/homestays",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <Homestays/>
        <Footer/>
        </>
      )
    },
    {
      path: "/holiday",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <Holiday/>
        <Footer/>
        </>
      )
    },
    {
      path: "/trains",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <Trains/>
        <Footer/>
        </>
      )
    },
    {
      path: "/buses",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <Buses/>
        <Footer/>
        </>
      )
    },
    {
      path: "/cabs",
      element:(
        <>
        <Navbar/>
        <Hero/>
        <Cabs/>
        <Footer/>
        </>
      )
    },
    {
      path: "/ar",
      element:(
        <>
        <Navbar/>
        {/* <Hero/> */}
        <ARScanner/>
        <Footer/>
        </>
      )
    },
    {
      path: "/train-booking",
      element:(
        <>
          <Navbar/>
          <Navbar />
      <StripeWrapper> {/* Wrap TrainBooking with StripeWrapper */}
        <TrainBooking />
      </StripeWrapper>
          <Footer/>
        </>
      )
    },
    {
      path: "/dashboard",
      element:(
        <>
        <Navbar/>
        <UserDashboard/>
        <Footer/>
        </>
      )
    },
    {
      path: "/profile",
      element:(
        <>
        <Navbar/>
        <ProfilePage/>
        <Footer/>
        </>
      )
    },
    {
      path: "/users",
      element:(
        <>
        <Navbar/>
        <User/>
        <Footer/>
        </>
      )
    },
    {
      path: "/hotel",
      element:(
        <>
        <Navbar/>
        <HotelList/>
        <Footer/>
        </>
      )
    },
    {
      path: "/add-tourist-place",
      element:(
        <>
        <Navbar/>
        <AddTouristPlace/>
        <Footer/>
        </>
      )
    },
    {
      path: "/tourist-place-list",
      element:(
        <>
        <Navbar/>
        <TouristPlacesListPage/>
        <Footer/>
        </>
      )
    },
    {
      path: "/bookings",
      element:(
        <>
        <Navbar/>
        <Booking/>
        <Footer/>
        </>
      )
    },
    {
      path:"/virtual-tour",
      element:(
        <>
        <Navbar/>
        <VirtualTourPage/>
        <Footer/>
        </>
      )
    },
    {
      path:"/forgot-password",
      element:(
        <>
        <Navbar/>
        <ForgotPassword/>
        <Footer/>
        </>
      )
    },
    {
      path: "/contact-messages",
      element:(
        <>
          <Navbar/>
          <ContactMessages/>
          <Footer/>
        </>
      )
    }
    // {
    //   path: "/book",
    //   element:(
    //     <>
    //       <Navbar/>
         
    //       <Footer/>
    //     </>
    //   )
    // }
  ])

  return(
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App;
