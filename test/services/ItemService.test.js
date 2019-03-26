import ItemService from '../../src/services/ItemService'
import ItemRepository from '../../src/repository/ItemRepository'

it('Get All Items', () => {
    let ir = new ItemRepository();
    ir.getAllItems = jest.fn().mockResolvedValue([{ id: "it1", name: "soap", price: "5" }]);

    let IS = new ItemService(ir)

    IS.getAllItems()
        .then(res => {
            expect(res).toEqual([{ id: "it1", name: "soap", price: "5" }])
        })
})


it('Get Item By ID', () => {
    let ir = new ItemRepository();
    ir.getItemById = jest.fn().mockResolvedValue({ id: "it1", name: "soap", price: "5" });

    let IS = new ItemService(ir)

    IS.getItemById('it1')
        .then(res => {
            expect(res).toEqual({ id: "it1", name: "soap", price: "5" })
        })
})

it('Update Item By ID', () => {
    let ir = new ItemRepository();
    ir.updateItemById = jest.fn().mockResolvedValue({ status: "success" });

    let IS = new ItemService(ir)

    IS.updateItemById('it1')
        .then(res => {
            expect(res).toEqual({ status: "success" })
        })
})

it('Delete Item By ID', () => {
    let ir = new ItemRepository();
    ir.removeItemById = jest.fn().mockResolvedValue({ status: "success" });

    let IS = new ItemService(ir)

    IS.removeItemById('it1')
        .then(res => {
            expect(res).toEqual({ status: "success" })
        })
})

it('Create Item', () => {
    let ir = new ItemRepository();
    ir.createItem = jest.fn().mockResolvedValue({ status: "success" });

    let IS = new ItemService(ir)

    IS.createItem({ id: "it2", name: "soft drink", price: "10" })
        .then(res => {
            expect(res).toEqual({ status: "success" })
        })
})
