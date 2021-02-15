// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { useStateValue } from "../contexts/StateProvider";

// const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
//   const { user } = useStateValue();
//   return (
//     <Route
//       {...rest}
//       render={(routeProps) =>
//         !!user ? (
//           <RouteComponent {...routeProps} />
//         ) : (
//           <Redirect to={"/login"} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useStateValue();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}
