import { toast } from 'react-toastify';

export const notifyTypes = {
    0: 'dark',
    1: 'info',
    2: 'success',
    3: 'warning',
    4: 'error'
}

export const notify = (body, type) => {
    return toast[notifyTypes[type]](body, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}