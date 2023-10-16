'use client'
import { memo } from 'react';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';

CustomForm.propTypes = {
    content: PropTypes.any.isRequired,
    initialValues: PropTypes.any.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validationSchema: PropTypes.any.isRequired,
};

function CustomForm(props) {
    return (
        <Formik
            enableReinitialize
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}
        > 
            {({ errors, touched, handleReset, handleSubmit }) => (
                <Form onReset={handleReset} encType='multipart/form-data' className='flex flex-col gap-3'>
                   {
                        props.content(errors, touched)
                   }
                </Form>
            )}
        </Formik>
    );
}

export default memo(CustomForm);