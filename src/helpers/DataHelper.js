export const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-type',
    'Access-Control-Max-Age': '86400',
    'Content-type': 'application/json'
};

export const sortData = (data, sortBy, sortOrder) => {
    const resortedData = data.sort((a, b) => {
        const caseA = a[sortBy];
        const caseB = b[sortBy];

        if (sortOrder === "ASC") {
            if (caseA < caseB)
                return -1;
            if (caseA > caseB)
                return 1;

            return 0;
        } else if (sortOrder === "DESC") {
            if (caseB < caseA)
                return -1;
            if (caseB > caseA)
                return 1;

            return 0;
        }
    });

    return resortedData;
}