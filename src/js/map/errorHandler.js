import { dataContext } from 'components/DataContext';
import { on } from 'utils/events';

export const addErrorHandler = () => {
    on('showError', () => {
        if (!dataContext.dataError) {
            dataContext.dataError = true;

            setTimeout(() => dataContext.dataError = false, 10000);
        }
    });
};
