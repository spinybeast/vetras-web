import {getAvg} from "../helpers/common";

const getValueGetter = (params, serviceType) => {
    let employee = params.data;
    const orders = employee.orders.filter(order => order.serviceType === serviceType);
    const times = orders.map(order => order.labour.duration);
    return getAvg(times);
};

export default [
    {
        headerName: "", field: "firstName"
    },
    {
        headerName: "Wash", valueGetter: (params) => getValueGetter(params,"Wash")
    },
    {
        headerName: "Tire Pressure", valueGetter: (params) => getValueGetter(params,"Tire pressure")
    },
    {
        headerName: "Service", valueGetter: (params) => getValueGetter(params,"Service")
    }
];