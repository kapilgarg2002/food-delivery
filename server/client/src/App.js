import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { auth } from "./firebase";
import {
  AddProduct,
  Contact,
  Home,
  Login,
  ManageAllOrders,
  MyOrders,
  NotFound,
  PlaceOrder,
  PrivateRoute,
  ProductDetail,
  Register,
  Shop,
  UserDashboard,
  Welcome,
} from "./pages";

import { SERT_USER } from "./redux/constants/userConstants";
import "./scss/styles.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch({ type: SERT_USER, payload: user });
      } else {
        dispatch({ type: SERT_USER, payload: null });
      }
    });

    return () => unsubscribe;
  }, [dispatch]);
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="shop" element={<Shop />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="placeorder/:orderId" element={<PlaceOrder />} />

          <Route
            path="contact"
            element={
              <PrivateRoute>
                <Contact />
              </PrivateRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<Welcome />}></Route>
            <Route path="myorders" element={<MyOrders />}></Route>
            <Route path="manageOrders" element={<ManageAllOrders />}></Route>
            <Route path="addproduct" element={<AddProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
