import { addProduct } from "../databaseQueries/queries";
import {describe, it, expect} from "vitest"

describe("adding a product to the products collection in firebase", () => {
    it("Returns 1", () => {
        expect(addProduct()).toBe(1)
    })
})