import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import urls from "../Constants/urls";

export default function Org({ children }) {

    const { organizationId } = useSelector(state => state.user)

    if(!organizationId)
        return <Navigate to={urls.SELECT_ORGANIZATION} />

    return (<>
        {children}
    </>)

}