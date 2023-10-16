import { CustomSettingsWidget } from "../../app/components"

describe('CustomSettingsWidget Component', () => {
    it('Should render the component without error', () => {
        cy.mount(<CustomSettingsWidget text='House Chat' description='Sample house chat' />)
    })
})