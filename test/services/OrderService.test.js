import OrderService from '../../src/services/OrderService'
import ItemRepository from '../../src/repository/ItemRepository'
import OrderRepository from '../../src/repository/OrderRepository'

it('Create Order', () => {
    let or = new OrderRepository();
    or.createOrder = jest.fn().mockResolvedValue({ status: "success" });
    let ir = new ItemRepository();

    let OS = new OrderService(or, ir);

    OS.createOrder({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it1", quantity: "2" }] })
        .then(res => {
            expect(res).toEqual({ status: "success" })
        })
})


it('Delete Order', () => {
    let or = new OrderRepository();
    or.deleteOrderByOrderId = jest.fn().mockResolvedValue({ status: "success" });
    let ir = new ItemRepository();

    let OS = new OrderService(or, ir);

    OS.deleteOrderByOrderId("Order-123456")
        .then(res => {
            expect(res).toEqual({ status: "success" })
        })
})



it('Update Order', () => {
    let or = new OrderRepository();
    or.updateOrderByOrderId = jest.fn().mockResolvedValue({ status: "success" });
    let ir = new ItemRepository();

    let OS = new OrderService(or, ir);

    OS.updateOrderByOrderId("Order-123456", { id: "Order-12345678", email: "test@gmail.com", items: [{ id: "it1", quantity: "2" }] })
        .then(res => {
            expect(res).toEqual({ status: "success" })
        })
})


it('Get Order By Email', () => {
    let or = new OrderRepository();
    or.getOrdersByEmail = jest.fn().mockResolvedValue({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it1", quantity: "2" }] });
    let ir = new ItemRepository();

    let OS = new OrderService(or, ir);

    OS.getOrdersByEmail("test@gmail.com")
        .then(res => {
            expect(res).toEqual({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it1", quantity: "2" }] })
        })
})


it('Get Order By Order Id', () => {
    let or = new OrderRepository();
    or.getOrderByOrderId = jest.fn().mockResolvedValue({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it1", quantity: "2" }] });
    let ir = new ItemRepository();
    ir.getAllItems = jest.fn().mockResolvedValue([{ id: "it1", name: "Soap", price: "5" }]);

    let OS = new OrderService(or, ir);

    OS.getOrderItemsByOrderId("Order-123456")
        .then(res => {
            expect(res).toEqual({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it1", quantity: "2", name: "Soap", price: "5" }] })
        })
})

it('Get Order By Email - Item not found in item list', () => {
    let or = new OrderRepository();
    or.getOrderByOrderId = jest.fn().mockResolvedValue({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it2", quantity: "2" }, { id: "it1", quantity: "2" }] });
    let ir = new ItemRepository();
    ir.getAllItems = jest.fn().mockResolvedValue([{ id: "it1", name: "Soap", price: "5" }]);

    let OS = new OrderService(or, ir);

    OS.getOrderItemsByOrderId("Order-123456")
        .then(res => {
            expect(res).toEqual({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it1", quantity: "2", name: "Soap", price: "5" }] })
        })
})


it('Get Order By Email - Item array not found', () => {
    let or = new OrderRepository();
    or.getOrderByOrderId = jest.fn().mockResolvedValue({ id: "Order-123456", email: "test@gmail.com", items: [{ id: "it2", quantity: "2" }, { id: "it1", quantity: "2" }] });
    let ir = new ItemRepository();
    ir.getAllItems = jest.fn().mockResolvedValue(null);

    let OS = new OrderService(or, ir);

    OS.getOrderItemsByOrderId("Order-123456")
        .then(res => {
            expect(res).toEqual(null)
        })
})

it('Get Order By Email - Order not found', () => {
    let or = new OrderRepository();
    or.getOrderByOrderId = jest.fn().mockResolvedValue(null);
    let ir = new ItemRepository();

    let OS = new OrderService(or, ir);

    OS.getOrderItemsByOrderId("Order-123456")
        .then(res => {
            expect(res).toEqual(null)
        })
})
