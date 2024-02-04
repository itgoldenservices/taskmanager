import { useState } from 'react';

const useForm = initialState => {

    const [values, setvalues] = useState(initialState);

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setvalues({
            ...values,
            [name]: value
        });
    };

    const handleInputReset = () => setvalues(initialState);

    const handleInputEdit = newState => setvalues(newState);

    return [values, handleInputChange, handleInputReset, handleInputEdit];
};

export default useForm;