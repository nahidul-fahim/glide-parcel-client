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
        element: <Dashboard />,
        children: [
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
            }
        ]
    }
])

export default router;