import { addProduct } from "../databaseQueries/queries";
import {describe, it, expect} from "vitest"

describe("adding a product to the products collection in firebase", () => {
    it("Adds a product to firebase product collection", () => {
        
        return expect(addProduct("Green Keyboard", 299.99)).resolves.toEqual(true)
    })

    //test a faulty input. The test should pass because we are testing a faulty inout
    it("Throws error since a field is left empty", async () => {
        expect.assertions(1)
        await addProduct(undefined, 299.99).catch(err => {
            expect(err).toEqual("FirebaseError: Function addDoc() called with invalid data. Unsupported field value: undefined \(found in field productName in document products\/[a-zA-Z]{20}\)")
        })
    })
})
