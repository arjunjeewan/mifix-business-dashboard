import axios from 'axios';
import { environment } from '../Environment/environment';

class userServiceInstance {
    getdisbursementData(fromDate, toDate, bank, state, product) {
        return axios.get(
            `${environment.apiUrl}/dashboard/disbursement?fromDate=${fromDate}&toDate=${toDate}&bank=${bank}&state=${state}&product=${product}`
        );
    }
    getcollectionData(fromDate, toDate, bank) {
        return axios.get(
            `${environment.apiUrl}/dashboard/collection?fromDate=${fromDate}&toDate=${toDate}&bank=${bank}`
        );
    }
    getauditData(fromDate, toDate, bank, state) {
        return axios.get(
            `${environment.apiUrl}/dashboard/audit?fromDate=${fromDate}&toDate=${toDate}&bank=${bank}&state=${state}`
        );
    }
}

const UserService = new userServiceInstance();
export default UserService;
