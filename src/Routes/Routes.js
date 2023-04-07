import { createBrowserRouter } from "react-router-dom"
import Maps from "../Components/Maps/Maps"
import StaticMap from "../Components/StaticMap/StaticMap"

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Maps></Maps>
    },
    {
        path:"/staticMap",
        element:<StaticMap></StaticMap>
    }
])