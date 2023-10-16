import * as yup from 'yup';
import { isValidURL } from '@/utils/utils';

function addSocialLinkValidator() {
    return yup.object({
        id: yup.string().optional(),
        icon_id: yup.number().positive().optional(),
        name: yup.string().required().label('Link Name'),
        path: yup
            .string()
            .url()
            .required()
            .label('Path')
            .test('valid-link', 'Your link should contain https', (val) => {
                if (val !== undefined && val !== '') {
                    return isValidURL(val);
                }
                return true;
            }),
        houses: yup.array().min(1).optional(),
    });
}

function updateValidator() {}

export { addSocialLinkValidator, updateValidator };
