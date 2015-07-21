/*eslint-disable no-unused-vars */

import React from "react";
import { Route, DefaultRoute, NotFoundRoute } from "react-router";
<% if (material) { %>import Master from "./Master.jsx";<% }%>
<% for(var n in routers) { %>import <%=routers[n]%> from "./components/pages/<%= routers[n]%>";
<% } %>import NotFound from "./components/pages/NotFound.jsx";


module.exports = (
  <Route path="/" handler={Master}><% for(var i=0;i<routers.length;i++) { if (i==0) { %>
    <DefaultRoute name="<%= routers[i] %>" handler={<%=routers[i] %>} /><% } if (i>0) {%>
    <Route name="<%= routers[i] %>" handler={<%= routers[i] %>]} /> <% }} %>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

/*eslint-enable no-unused-vars */
