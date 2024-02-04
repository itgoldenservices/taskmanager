import moment from 'moment';

// Calcula el plazo de entrega
const calculateDeadLineTask = (created, deadlineTask) => {

    switch (deadlineTask) {
        case 'one':
            return moment(created, 'YYYY/MM/DD').add(1, 'days').format('YYYY/MM/DD');

        case 'two':
            return moment(created, 'YYYY/MM/DD').add(2, 'days').format('YYYY/MM/DD');

        case 'three':
            return moment(created, 'YYYY/MM/DD').add(3, 'days').format('YYYY/MM/DD');

        case 'five':
            return moment(created, 'YYYY/MM/DD').add(5, 'days').format('YYYY/MM/DD');

        case 'seven':
            return moment(created, 'YYYY/MM/DD').add(7, 'days').format('YYYY/MM/DD');

        default:
            break;
    }

};

const calculateDeadLineTaskInverse = deadlineTask => {

    switch (deadlineTask) {
        case 1:
            return 'one';

        case 2:
            return 'two';

        case 3:
            return 'three';

        case 5:
            return 'five';

        case 7:
            return 'seven';

        default:
            break;
    }
};

export {
    calculateDeadLineTask,
    calculateDeadLineTaskInverse
};