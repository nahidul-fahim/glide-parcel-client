import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import BookParcel from "../../Pages/DashboardPages/UserDashboardPages/BookParcel/BookParcel";
import MyParcels from "../../Pages/DashboardPages/UserDashboardPages/My Parcels/MyParcels";
import UpdaateBooking from "../../Pages/DashboardPages/UserDashboardPages/UpdateBooking/UpdaateBooking";
import MyProfile from "../../Pages/DashboardPages/UserDashboardPages/MyProfile/MyProfile";
import Statistics from "../../Pages/DashboardPages/AdminDashboardPages/Statistics/Statistics";
import AllParcels from "../../Pages/DashboardPages/AdminDashboardPages/AllParcels/AllParcels";
import AllDeliveryMan from "../../Pages/DashboardPages/AdminDashboardPages/AllDeliveryMan/AllDeliveryMan";
import AllUsers from "../../Pages/DashboardPages/AdminDashboardPages/AllUsers/AllUsers";
import MyDeliveryList from "../../Pages/DashboardPages/DeliveryManDashboardPages/MyDeliveryList/MyDeliveryList";
import MyReviews from "../../Pages/DashboardPages/DeliveryManDashboardPages/MyReviews/MyReviews";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import Payment from "../../Pages/DashboardPages/Payment/Payment";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
        ]
    },

    // User login
    {
        path: "/login",
        element: <Login />
    },
    // Register new user
    {
        path: "/register",
        element: <Register />
    },

    // dashboard router
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "statistics",
                // index: true,
                element: <AdminRoute><Statistics /></AdminRoute>
            },
            {
                path: "bookparcel",
                element: <BookParcel />
            },
            {
                path: "myparcels",
                element: <MyParcels />
            },
            {
                path: "myparcels/updatebooking/:id",
                element: <UpdaateBooking />,
                loader: ({ params }) => fetch(`http://localhost:5000/booking/${params.id}`),
            },
            {
                path: "myprofile",
                element: <MyProfile />
            },
            {
                path: "allparcels",
                element: <AdminRoute><AllParcels /></AdminRoute>
            },
            {
                path: "alldeliveryman",
                element: <AdminRoute><AllDeliveryMan /></AdminRoute>
            },
            {
                path: "allusers",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "mydeliverylist",
                element: <MyDeliveryList />
            },
            {
                path: "myreviews",
                element: <MyReviews />
            },
            {
                path: "payment",
                element: <Payment />
            }
        ]
    }
])

export default router;