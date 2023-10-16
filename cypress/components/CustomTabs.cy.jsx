import { CustomTabs } from '@/components';
import { FaUserAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';

describe('Custom Tabs Component', () => {
    beforeEach(() => {
        cy.fixture('dummy-tabs.json').as('items');
    })
    it('Should render tabs', function () {
        cy.mount(<CustomTabs items={this.items}  />)
    });
    it('Should able to select other tab item', function () {
        cy.mount(<CustomTabs items={this.items} onSelectTab={(item) => console.log(item)}  />)
        this.items?.map(item => {
            cy.get('#tab-'+item.key).click();
            cy.get('#tab-'+item.key).should('have.class', 'active-tab');
            cy.wait(2000)
        })
    })
    it('Should render an icon in a tab', () => {
        const data = [
            { id: 'profile', name: 'Profile', key: 0, icon: <FaUserAlt />},
            { id: 'dashboard', name: 'Dashboard', key: 1, icon: <MdDashboard />},
            { id: 'settings', name: 'Settings', key: 2, icon: <FiSettings />}
        ]
        cy.mount(<CustomTabs items={data}  />);
        cy.get('button').each(($button) => {
            cy.wrap($button).within(() => {
                cy.get('svg').should('exist');
            });
        });
    })
})