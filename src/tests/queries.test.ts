import { addProduct } from "../databaseQueries/queries";
import {describe, it, expect} from "vitest"

describe("adding a product to the products collection in firebase", () => {
    it("Adds a product to firebase product collection", () => {
        let result = addProduct("Green Keyboard", 299.99)
        expect(result).resolves.toBe("Successfully Added Product")
    })

    
})
