import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import FormCategory from './Components/FormCategory/FormCategory'
import FormProduct from './Components/FormProduct/FormProduct'
import Catalogo from './Components/Catalogo/Catalogo'
import ProductsCards from './Components/ProductsCards/Productscards'
import Product from './Components/Product/Product'
import NavBar from './Components/NavBar/NavBar'
import FormUsuario from './Components/FormUsuario/FormUsuario'
import Admin from './Components/Admin/Admin.js'
import UsersList from './Components/Admin/UsersList'
import ClosedOrders from './Components/ClosedOrders/ClosedOrders.jsx'
import OrderDetail from './Components/ClosedOrders/OrderDetail.jsx'
import LoginForm from './Components/LoginForm/LoginForm.jsx'
import { Cart } from './Components/Cart'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import ResetPasswordForm from './Components/ResetPassword/ResetPasswordForm/ResetPasswordForm'
import Email from './Components/Checkout'
import { Carrousel } from './Components/Carrousel/Carrousel'
import { userLoginLS } from './actions/index'
import { Footer } from './Components/Footer/Footer'

library.add(fab, faCheckSquare, faCoffee, fas)

function App({ userLogin }) {
  if (!localStorage.getItem('carrito'))
    localStorage.setItem('carrito', JSON.stringify([]))

  if (!localStorage.getItem('userLogged')) {
    localStorage.setItem('userLogged', JSON.stringify(''))
  } else {
    const user = JSON.parse(localStorage.getItem('userLogged'))
    userLogin(user)
  }

  return (
    <div className='App h-100'>
      <Route path='/' render={() => <NavBar />} />
      <Route exact path='/' render={() => <Carrousel />} />

      <Route exact path='/:name?' component={Catalogo} />
      <Route exact path='/admin/cart' component={Cart} />
      <Route exact path='/user/form' component={FormUsuario} />

      <Route
        path='/products/:id'
        render={({ match }) => <Product match={match} />}
      />

      <Route
        path='/admin/createProduct'
        render={({ match }) => <FormProduct match={match} />}
      />

      <Route
        path='/product/admin/:productId'
        render={({ match }) => <FormProduct match={match} />}
      />

      <Route
        path='/admin/createCategory'
        render={({ match }) => <FormCategory match={match} />}
      />

      <Route
        path='/category/admin/:name'
        render={({ match }) => <FormCategory match={match} />}
      />

      <Route
        path='/user/createUser'
        render={({ match }) => <FormUsuario match={match} />}
      />
      <Route
        path='/auth/me'
        render={({ match }) => <FormUsuario match={match} />}
      />

      <Route path='/productsCards' render={() => <ProductsCards />} />
      <Route path='/principal/admin' render={() => <Admin />} />
      <Route path='/admin/closedOrders' render={() => <ClosedOrders />} />
      <Route
        path='/detailOrder/admin/:id'
        render={({ match }) => <OrderDetail match={match} />}
      />
      <Route path='/admin/usersList' render={() => <UsersList />} />
      <Route exact path='/user/login' render={() => <LoginForm />} />
      <Route
        exact
        path='/user/resetPassword'
        render={() => <ResetPasswordForm />}
      />

      <Route path='/checkout/order' render={() => <Email />} />

      <Route path='/user/compras' render={() => <ClosedOrders />} />

      <Route path='/' render={() => <Footer />} />

    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (user) => dispatch(userLoginLS(user)),
  }
}

export default connect(null, mapDispatchToProps)(App)
