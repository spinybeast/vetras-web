import {update, search, searchAll} from "./elastic";
import {MINIO_URL, STATUS_CHECKED_OUT} from "../constants/api";

export function getPhoto(name) {
    return MINIO_URL + '/images/' + name;
}

export function fetchVehicles() {
    const body = {
        query: {match_all: {}},
        sort: [{"vehicle.createdAt": {"order": "desc"}}]
    };
    return search('vehicles', 'vehicle', body);
}

export function fetchVehiclesById(ids) {
    const body = {
        query: {
            ids: {
                values: ids
            }
        }
    };
    return search('vehicles', 'vehicle', body);
}

export function fetchOrdersById(ids) {
    const body = {
        query: {
            ids: {
                values: ids
            }
        }
    };
    return search('orders', 'order', body);
}

export function fetchCompletedOrders(vehicles) {
    const body = {
        query: {
            bool: {
                should: vehicles.map(vehicle => ({term: {"order.vehicleRecord": vehicle._id}})),
                must: {
                    exists: {
                        field: "order.completedAt"
                    }
                }
            }
        },
    };
    return search('orders', 'order', body);
}

export function fetchOrders() {
    const body = {
        query: {match_all: {}},
        sort: [{"order.createdAt": {"order": "desc"}}]
    };
    return search('orders', 'order', body);
}

export function fetchLabours() {
    const body = {
        query: {
            bool: {
                must: {
                    match: {
                        "work.itemType": "order"
                    }
                }
            }
        }
    };
    return search('labour_tracking', 'work', body);
}

export function fetchEmployees() {
    return searchAll('employees', 'employee');
}

export function checkOutVehicle(vehicleId) {
    const vehicle = {
        updatedAt: (new Date()).toJSON(),
        status: STATUS_CHECKED_OUT
    };
    return update('vehicles', vehicleId, {vehicle});
}