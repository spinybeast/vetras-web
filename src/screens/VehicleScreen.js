import React, {useState, useEffect, useCallback} from "react";
import {AgGridReact} from "ag-grid-react";
import {fetchVehicles, fetchCompletedOrders} from "../helpers/api";
import columns from '../constants/vehicleColumns';
import VehicleDetails from "../components/VehicleDetails";
import {Switch} from "antd";
import {STATUS_CHECKED_OUT} from "../constants/api";

export default function VehicleScreen() {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const getData = useCallback(() => {
        fetchVehicles().then(vehicles => {
            fetchCompletedOrders(vehicles).then(orders => {
                vehicles.forEach(vehicle => {
                    vehicle.completedOrders = orders.filter(order => order.vehicleRecord === vehicle._id);
                });
                setVehicles(vehicles);
            });
        });
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div
            className="ag-theme-balham"
            style={{
                height: '100%',
                width: '100%' }}
        >
            <p><Switch onChange={(showAll) => {setShowAll(showAll)}}/> Show all</p>
            <AgGridReact
                columnDefs={columns}
                rowData={showAll ? vehicles : vehicles.filter(v => v.status !== STATUS_CHECKED_OUT)}
                rowSelection='single'
                onRowClicked={(row) => {
                    setSelectedVehicle(row.data);
                    setShowDetails(true);
                }}
            >
            </AgGridReact>
            <VehicleDetails
                getData={getData}
                vehicle={selectedVehicle}
                visible={showDetails}
                onClose={() => setShowDetails(false)}
            />
        </div>
    );


}