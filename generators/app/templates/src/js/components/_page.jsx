import React from "react";
<% if (material) { %> import FullWidthSection from "../FullWidthSection.jsx"; <% }%>

class <%=title%> extends React.Component {
    render() {
        return (
				<h1><%=title%></h1>
            );
    }
}
module.exports = <%=title%>;
