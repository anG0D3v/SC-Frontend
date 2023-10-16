import * as yup from 'yup';
import { isValidURL } from '@/utils/utils';

function createValidator(data) {
    return yup.object({
        title: yup.string().required().label('Title'),
        link: yup
            .string()
            .url()
            .required()
            .label('Link')
            .test('valid-link', 'Your link should contain https', (val) => {
                if (val !== undefined && val !== '') {
                    return isValidURL(val);
                }
                return true;
            }),
        languageId: yup.string().required().label('Language'),
        spaceId: yup.string().required().label('Space'),
    });
}

export { createValidator };
