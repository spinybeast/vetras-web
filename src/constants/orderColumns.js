import {getOrderStatus, formatDate} from "../helpers/common";

export default [
    {
        headerName: "Service type", field: "serviceType"
    },
    {
        headerName: "License plate", field: "vehicle.licensePlate"
    },
    {
        headerName: "Manufacturer", field: "vehicle.manufacturer"
    },
    {
        headerName: "Model", field: "vehicle.model"
    },
    {
        headerName: "Created at", valueGetter: function (params) {
            return formatDate(params.data.createdAt);
        }
    },
    {
        headerName: "Status", valueGetter: function (params) {
            return getOrderStatus(params.data);
        },
    },
];