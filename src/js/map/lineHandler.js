import { getLines } from 'api/data';
import { dataContext } from 'components/DataContext';

export const addLineHandler = async () => {
    dataContext.lines = await getLines();
};
