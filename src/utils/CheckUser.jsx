import React from 'react';
import useUserContext from '../hooks/useUserContext';

const CheckUser = ({ userComponent, doctorComponent }) => {
    const { user, saveUser } = useUserContext();

    if (user) {
        if (user.isStaff) {
            return doctorComponent;
        }
    }
    return userComponent;
}
export default CheckUser;
