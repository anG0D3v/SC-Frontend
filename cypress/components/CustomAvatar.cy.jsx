/* eslint-disable no-undef */
import { MdEmail } from 'react-icons/md';
import { CustomAvatar } from '../../app/components';

describe('Custom Avatar Component', () => {
    afterEach(() => {
        cy.wait(2000)
    })
    
    it('Should render with url', () => {
        cy.mount(<CustomAvatar url='https://flowbite.com/docs/images/people/profile-picture-5.jpg' size='medium' />);
        cy.get('img').should('have.attr', 'src').and('not.be.null');
    })

    // it('Should render with text and helper text', () => {
    //     mount(
    //         <div className='p-5'>
    //             <CustomAvatar text='John Doe' helperText='johndoe@gmail.com' url='https://flowbite.com/docs/images/people/profile-picture-5.jpg' size='medium' />
    //         </div>
    //     );
    //     cy.get('#avatar-text').should('contain', 'John Doe');
    //     cy.get('#avatar-helper-text').should('contain', 'johndoe@gmail.com')
    // })

    // it('Should render an indicator if present', () => {
    //     mount(
    //         <div className='p-5'>
    //             <CustomAvatar indicator text='John Doe' helperText='johndoe@gmail.com' url='https://flowbite.com/docs/images/people/profile-picture-5.jpg' size='medium' />
    //         </div>
    //     );
    //     cy.get('#indicator').should('exist')
    // })

    // it('Should render a badge if present', () => {
    //     mount(
    //         <div className='p-5'>
    //             <CustomAvatar badge={<MdEmail size={10} />} text='John Doe' helperText='johndoe@gmail.com' url='https://flowbite.com/docs/images/people/profile-picture-5.jpg' size='medium' />
    //         </div>
    //     );
    //     cy.get('#badge').should('exist')
    // })

    // it('Should render initials of user if no image available', () => {
    //     mount(
    //         <div className='p-5'>
    //             <CustomAvatar badge={<MdEmail size={10} />} text='John Doe' helperText='johndoe@gmail.com' size='medium' />
    //         </div>
    //     );

    //     cy.get('#avatar-initials').should('contain', 'JD');
    // })
})
