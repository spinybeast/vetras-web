export function formatDate(date) {
    return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()
}

export function getOrderStatus(order) {
    return order.completedAt ? 'Completed' : 'New';
}

export function camelCaseToWords(text) {
    if (text.replace(/([A-Z])/g, "").length === 0) {
        return text;
    }
    let result = text.replace(/([A-Z])/g, " $1");
    console.log(result);
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return Math.round(total / grades.length || 0);
}