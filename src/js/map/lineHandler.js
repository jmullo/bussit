import { includes, intersection } from 'lodash';

import { getLines } from 'api/data';
import { save, load } from 'api/storage';
import { on } from 'utils/events';
import { dataContext } from 'components/DataContext';

export const addLineHandler = async () => {
    const savedLines = load('selectedLines');

    dataContext.lines = await getLines();
    dataContext.lineRefs = getLineRefs(dataContext.lines);
    dataContext.selectedLines = intersection(dataContext.lineRefs, savedLines);

    on('selectedLines', (selectedLines) => save('selectedLines', selectedLines));
};

const getLineRefs = (lines) => {
    const lineStrings = Object.keys(lines);

    const lineNumbers = lineStrings.reduce((result, value) => {
        const number = Number(value.replace(/\D/g,''));

        if (!includes(result, number)) {
            result.push(number);
        }

        return result;
    }, []).sort((a, b) => a - b);

    return lineNumbers.map((number) => String(number));
};
