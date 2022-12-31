import React from 'react'
import NavigationBar from './components/navigatonbar/NavigationBar'
import {Outlet } from 'react-router-dom'



function RouteLayout() {
  return (
    <div>
        {/*Navigation bar */}
        <NavigationBar></NavigationBar>
        {/**C omponenets */}
        <Outlet></Outlet>
    </div>
  )
}

export default RouteLayout