import React, {useState, useEffect} from "react";
import {AgGridReact} from "ag-grid-react";
import {fetchEmployees, fetchLabours, fetchOrdersById} from "../helpers/api";
import columns from "../constants/staffColumns";
import StaffDetails from "../components/StaffDetails";

export default function StaffScreen() {
    const [employees, setEmployees] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState({});
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        fetchEmployees().then(employees => {
            fetchLabours().then(labours => {
                fetchOrdersById(labours.map(labour => labour.reference)).then(orders => {
                    orders.forEach(order => {
                        order.labour = labours.filter(labour => labour.reference === order._id)[0];
                    });
                    employees.forEach(employee => {
                        const employeeLabours = labours.filter(labour => labour.employee === employee.login);
                        const employeesOrders = employeeLabours.map(labour => labour.reference);
                        employee.orders = orders.filter(order => !!~employeesOrders.indexOf(order._id));
                    });
                    setEmployees(employees);
                })
            })
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
                rowData={employees}
                rowSelection='single'
                onRowClicked={(row) => {
                    setSelectedStaff(row.data);
                    setShowDetails(true);
                }}
            >
            </AgGridReact>
            <StaffDetails
                staff={selectedStaff}
                visible={showDetails}
                onClose={() => setShowDetails(false)}
            />
        </div>
    );


}