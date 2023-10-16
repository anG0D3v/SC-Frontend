import { CgProfile } from 'react-icons/cg';
import { MdEmail } from 'react-icons/md';
import { CustomListItem, CustomLabel, CustomAvatar } from '@/components';

describe('CustomListItem Component', () => {
    afterEach(() => {
        cy.wait(2000);
    })
    it('Render the component', () => {
        
            cy.mount(
                <div className='mb-2'>
                   <ul>
                    {
                        Array(3).fill('Item ').map((i, idx) => (
                            <CustomListItem 
                                helperText={<span><CustomLabel children='a minute ago' variant='subtitle' addedclass='text-xs text-blue-600 dark:text-blue-500 mb-2' /></span>} 
                                key={idx} 
                                text={i + (idx+=1)}
                            />
                        ))
                    }
                   </ul>
                </div>
            )
       
    })
    it('Should be able to render with icon', () => {
        cy.mount(
            <div className='mb-2'>
                <CustomListItem 
                    text='My Profile'
                    helperText={<span><CustomLabel children='View my profile' variant='subtitle' addedclass='text-xs text-blue-600 dark:text-blue-500' /></span>} 
                    icon={<CgProfile size={25} />}
                />
            </div>
        )
        cy.get('a').as('link');
        cy.get('@link').within(() => {
            cy.get('svg').should('exist')
        })
    })

    it('Should display an avatar in the list', () => {
        cy.mount(
            <div className='mb-2'>
                <CustomListItem
                    avatar={<CustomAvatar size='medium' badge={<MdEmail size={10} />}  url='https://flowbite.com/docs/images/people/profile-picture-5.jpg' />}  
                    text='John Doe'
                    helperText={<span><CustomLabel children='johndoe@gmail.com' variant='subtitle' addedclass='text-xs text-blue-600 dark:text-blue-500' /></span>} 
                />
            </div>
        )
        cy.get('a').within(() => {
            cy.get('img').should('exist').should('have.attr', 'src').and('eq', 'https://flowbite.com/docs/images/people/profile-picture-5.jpg');
        })
    })

    it('Should indicate active state for the list', () => {
        cy.mount(
            <div className='mb-2 p-5'>
                <ul>
                    <li>
                        <CustomListItem
                            active
                            icon={<CgProfile size={25} />}
                            text='John Doe'
                            helperText={<span><CustomLabel children='johndoe@gmail.com' variant='subtitle' addedclass='text-xs text-white dark:text-blue-500' /></span>} 
                        />
                    </li>
                </ul>
            </div>
        )

        cy.get('li').each(($li) => {
            cy.wrap($li).within(() => {
                cy.get('a').should('have.class', 'rc-active-list');
            })
        })
    })

    it('Should indicate loading state', () => {
        cy.mount(
            <div className='mb-2 p-5'>
                <ul>
                    {
                        Array(3).fill().map((item, idx) => (
                            <li key={idx} className='mb-2'>
                                <CustomListItem
                                    isLoading
                                    icon={<CgProfile size={25} />}
                                    text='John Doe'
                                    helperText={<span><CustomLabel children='johndoe@gmail.com' variant='subtitle' addedclass='text-xs text-white dark:text-blue-500' /></span>} 
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        )

        cy.get('#loader').should('exist');
    })
})