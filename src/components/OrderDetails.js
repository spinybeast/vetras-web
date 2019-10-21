import React from "react";
import {formatDate} from "../helpers/common";
import Details from "./Details";

export default function OrderDetails({order, visible, onClose}) {

    return <Details title="Order details" visible={visible} onClose={onClose}>
        <p>
            <strong>Created at: </strong>{formatDate(order.createdAt)}
        </p>
        {
            order.serviceSubtypesActual &&
            <p>
                <strong>Services subtypes: </strong>
                <ul>
                    {
                        order.serviceSubtypesActual.map((type, key) => <li key={key}>{type}</li>)
                    }
                </ul>
            </p>
        }
        {
            order.completedAt &&
            <p>
                <strong>Completed at: </strong>{formatDate(order.completedAt)}
            </p>
        }
    </Details>
}