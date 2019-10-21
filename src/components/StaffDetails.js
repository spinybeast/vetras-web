import React from "react";
import {formatDate} from "../helpers/common";
import Details from "./Details";

export default function StaffDetails({staff, visible, onClose}) {

    return <Details title="Staff details" visible={visible} onClose={onClose}>

        {
            staff.orders && staff.orders.map((order, key) =>
                <div key={key}>
                    <strong>Work: </strong>{order.serviceType}&nbsp;
                    <strong>Duration: </strong>{order.labour.duration}
                </div>
            )
        }

    </Details>
}