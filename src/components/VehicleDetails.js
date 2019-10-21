import React from "react";
import {camelCaseToWords} from "../helpers/common";
import Details from "./Details";
import {getPhoto, checkOutVehicle} from "../helpers/api";
import {Button} from "antd";

export default function VehicleDetails({vehicle, visible, onClose, getData}) {
    const commonFields = ['VIN', 'manufacturer', 'model', 'type', 'fuel', 'mileage', 'principal', 'licensePlate'];
    const checkOut = () => {
      checkOutVehicle(vehicle._id).then(() => {
          getData();
          onClose();
      });
    };
    return <Details title="Vehicle details" visible={visible} onClose={onClose}>
        {
            vehicle.photos && vehicle.photos.length ?
                <div>
                    {
                        vehicle.photos.map((photo, key) =>
                            <img width={150} key={key} alt={vehicle.VIN} src={getPhoto(photo)}/>
                        )
                    }
                </div> : null
        }
        <div>
            <h2>Common data</h2>
            {
                Object.keys(vehicle).map((field, key) => {
                    if (!!~commonFields.indexOf(field) && vehicle[field].length) {
                        return <div key={key}><strong>{camelCaseToWords(field)}: </strong>{vehicle[field]}</div>;
                    }
                    return null;
                })
            }
            {
                vehicle.damages && vehicle.damages.length ?
                <div>
                    <h3>Damages</h3>
                    {
                        vehicle.damages.map((damage, key) =>
                            <div key={key}>
                                {
                                    damage.photos && damage.photos.length ?
                                        <img width={150} alt={damage.type} src={getPhoto(damage.photos[0])}/> :
                                        null
                                }
                                <strong>{damage.part}: </strong>{damage.degree} {damage.type}
                            </div>
                        )
                    }
                </div> : null
            }
        </div>
        <div>
            <h2>Ordered services</h2>
            <ul>
                {
                    vehicle.servicesOrdered && vehicle.servicesOrdered.length ?
                        vehicle.servicesOrdered.map((service, key) =>
                            <li key={key}>{service}</li>
                        ) : null
                }
            </ul>
        </div>
        <div>
            <h2>Completed services</h2>
            <ul>
                {
                    vehicle.completedOrders && vehicle.completedOrders.length ?
                        vehicle.completedOrders.map((order, key) =>
                            <li key={key}>{order.serviceType}</li>
                        ) : null
                }
            </ul>
        </div>
        <div>
            {
                vehicle.status !== 'Checked Out' &&
                <Button type="danger" onClick={() => checkOut()}>Check out</Button>
            }
        </div>

    </Details>
}