import React, {useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import columns from '../constants/orderColumns';
import {fetchOrders, fetchVehiclesById} from "../helpers/api";
import OrderDetails from "../components/OrderDetails";

export default function OrdersScreen() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        fetchOrders().then(orders => {
            fetchVehiclesById(orders.map(order => order.vehicleRecord)).then(vehicles => {
                orders.forEach(order => {
                    order.vehicle = vehicles.filter(vehicle => vehicle._id === order.vehicleRecord)[0];
                });
                setOrders(orders);
            });
        });
    }, []);

    return (
        <div
            className="ag-theme-balham"
            style={{
                height: '100%',
                width: '100%' }}
        >
            <AgGridReact
                columnDefs={columns}
                rowData={orders}
                rowSelection='single'
                onRowClicked={(row) => {
                    setSelectedOrder(row.data);
                    setShowDetails(true);
                }}
            >
            </AgGridReact>
            <OrderDetails
                order={selectedOrder}
                visible={showDetails}
                onClose={() => setShowDetails(false)}
            />
        </div>
    );
}