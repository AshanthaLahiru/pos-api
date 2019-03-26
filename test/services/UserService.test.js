import UserService from '../../src/services/UserService'
import UserRepository from '../../src/repository/UserRepository'
import njwt from "njwt"
import passwordHash from "password-hash"


// let ur = new UserRepository();
// ur.findUser = jest.fn().mockResolvedValue({ email: "test@gmail.com", name: "test user", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })
// ur.insertUser = jest.fn().mockResolvedValue({ status: "success" })

// let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)


it('Insert User Fail', () => {
    let ur = new UserRepository();
    ur.findUser = jest.fn().mockResolvedValue(null)
    ur.insertUser = jest.fn().mockResolvedValue({ status: "success" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.insertUser({ email: "test@gmail.com", name: "test user", password: "test" })
        .then((res) => {
            expect(res).toEqual({ status: "success" })
        })
})

it('Insert User Fail', () => {
    let ur = new UserRepository();
    ur.findUser = jest.fn().mockResolvedValue({ name: "test user2", email: "test2@gmail.com", password: "some_string" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.insertUser({ email: "test2@gmail.com", name: "test user2", password: "test" })
        .then((res) => {
            expect(res).toEqual(null)
        })
})

// it('Insert User Throws Error', () => {
//     let ur = new UserRepository();
//     ur.findUser = jest.fn().mockResolvedValue({ name: "test user2", email: "test2@gmail.com", password: "some_string" })

//     let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

//     US.insertUser({ email: "test2@gmail.com", name: "test user2", password: "test" })
//         .then((res) => {
//             expect(res).toEqual(null)
//         })
// })

it('Find User Success', () => {
    let ur = new UserRepository();
    ur.findUser = jest.fn().mockResolvedValue({ email: "test@gmail.com", name: "test user", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)


    US.findUser("tes@gmail.com")
        .then((res) => {
            expect(res).toEqual({ email: "test@gmail.com", name: "test user", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })
        })
})

it('Find User Failed', () => {
    let ur = new UserRepository();
    ur.findUser = jest.fn().mockResolvedValue(null)

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.findUser("tes@gmail.com")
        .then((res) => {
            expect(res).toEqual(null)
        })
})

it('Login User Success', () => {
    let ur = new UserRepository();
    ur.findUser = jest.fn().mockResolvedValue({ email: "test@gmail.com", name: "test user", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.loginUser({ email: "test@gmail.com", password: "test" })
        .then((res) => {
            expect(res).toEqual({
                email: "test@gmail.com",
                name: "test user",
                password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb",
                'auth-token': expect.any(String)
            })
        })
})

it('Login User Fail', () => {
    let ur = new UserRepository();
    ur.findUser = jest.fn().mockResolvedValue({ email: "test@gmail.com", name: "test user", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.loginUser({ email: "test@gmail.com", password: "tes" })
        .then((res) => {
            expect(res).toEqual(null)
        })
})

it('Update User', () => {
    let ur = new UserRepository();
    ur.updateUser = jest.fn().mockResolvedValue({ status: "success" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.updateUser('test@gmail.com', { name: "Test", email: "tes@gmail.com", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })
        .then((res) => {
            expect(res).toEqual({ status: "success" })
        })
})

it('Update User Fail', () => {
    let ur = new UserRepository();
    ur.updateUser = jest.fn().mockResolvedValue(null)

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.updateUser('test@gmail.com', { name: "Test", email: "tes@gmail.com", password: "sha1$2aeb5c6c$1$ef6f6d57739cf8fc4a81b13dbcb127d89d0b49eb" })
        .then((res) => {
            expect(res).toEqual(null)
        })
})

it('Delete User', () => {
    let ur = new UserRepository();
    ur.removeUser = jest.fn().mockResolvedValue({ status: "success" })

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.removeUser('test@gmail.com')
        .then((res) => {
            expect(res).toEqual({ status: "success" })
        })
})

it('Delete User Fail', () => {
    let ur = new UserRepository();
    ur.removeUser = jest.fn().mockResolvedValue(null)

    let US = new UserService({ jwtSecretKey: "secret" }, ur, njwt, passwordHash)

    US.removeUser('test@gmail.com')
        .then((res) => {
            expect(res).toEqual(null)
        })
})