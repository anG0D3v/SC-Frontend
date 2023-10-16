import * as yup from 'yup';

function loginValidator() {
    return yup.object({
        email: yup.string().email().required().label('Email'),
        password: yup.string().required().label('Password'),
    });
}

function requestAnInvitationValidator() {
    return yup.object({
        firstName: yup.string().required().label('First Name'),
        lastName: yup.string().required().label('Last Name'),
        email: yup.string().email().required().label('Email'),
        phone: yup.string().required().label('Phone Number'),
        introduction: yup.string().optional(),
    });
}

export { loginValidator, requestAnInvitationValidator };
