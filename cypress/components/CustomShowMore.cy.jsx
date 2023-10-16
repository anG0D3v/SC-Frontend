const { CustomShowMore } = require("@/components")

describe('CustomShowMore Component', () => {
    beforeEach(() => {
        cy.wait(2000)
    })
    it('Should display show more anchor to expand long text', () => {
        cy.mount(
            <div className="p-2">
                <CustomShowMore text='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' />
            </div>
        )
       cy.textExist('Show more').click().then(($label) => {
            expect($label.text()).eql('Show less');
       });
    })

    it('Should not display show more anchor if text is not too long', () => {
        cy.mount(
            <div className="p-2">
                <CustomShowMore text='Lorem Ipsum is simply dummy text of the printing and typesetting industry.' />
            </div>
        )
       cy.textNotExist('Show more')
    })
})