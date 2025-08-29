const request = require('supertest');

const app = require('./server'); 
describe('POST /bfhl', () => {

    // Test Case 1: Successful request with mixed data
    test('should return a successful response with correct data processing for a mixed array', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: ["a", "1", "334", "4", "R", "$"] });

        expect(response.statusCode).toBe(200);
        expect(response.body.is_success).toBe(true);
        expect(response.body).toHaveProperty('user_id');
        expect(response.body.odd_numbers).toEqual(["1"]);
        expect(response.body.even_numbers).toEqual(["334", "4"]);
        expect(response.body.alphabets).toEqual(["A", "R"]);
        expect(response.body.special_characters).toEqual(["$"]);
        expect(response.body.sum).toBe("339");
        expect(response.body.concat_string).toBe("Ra");
    });

    // Test Case 2: Request with an empty data array
    test('should handle an empty data array gracefully', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: [] });

        expect(response.statusCode).toBe(200);
        expect(response.body.is_success).toBe(true);
        expect(response.body.odd_numbers).toEqual([]);
        expect(response.body.even_numbers).toEqual([]);
        expect(response.body.alphabets).toEqual([]);
        expect(response.body.special_characters).toEqual([]);
        expect(response.body.sum).toBe("0");
        expect(response.body.concat_string).toBe("");
    });

    // Test Case 3: Request with only numbers
    test('should correctly process an array containing only numbers', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: ["1", "2", "3", "4", "5"] });

        expect(response.statusCode).toBe(200);
        expect(response.body.is_success).toBe(true);
        expect(response.body.odd_numbers).toEqual(["1", "3", "5"]);
        expect(response.body.even_numbers).toEqual(["2", "4"]);
        expect(response.body.alphabets).toEqual([]);
        expect(response.body.sum).toBe("15");
        expect(response.body.concat_string).toBe("");
    });

    // Test Case 4: Request with only alphabets
    test('should correctly process an array containing only alphabets', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: ["Z", "x", "Y", "w"] });

        expect(response.statusCode).toBe(200);
        expect(response.body.is_success).toBe(true);
        expect(response.body.alphabets).toEqual(["Z", "X", "Y", "W"]);
        expect(response.body.odd_numbers).toEqual([]);
        expect(response.body.even_numbers).toEqual([]);
        expect(response.body.sum).toBe("0");
        expect(response.body.concat_string).toBe("WyXz");
    });
    
    // Test Case 5: Request with multi-character alphabet strings
    test('should correctly process an array containing multi-character alphabet strings', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: ["A", "ABcD", "DOE"] });

        expect(response.statusCode).toBe(200);
        expect(response.body.is_success).toBe(true);
        expect(response.body.alphabets).toEqual(["A", "ABCD", "DOE"]);
        expect(response.body.odd_numbers).toEqual([]);
        expect(response.body.even_numbers).toEqual([]);
        expect(response.body.sum).toBe("0");
        expect(response.body.concat_string).toBe("EoDdCbAa");
    });


    // Test Case 6: Request without the 'data' field
    test('should return a 400 error if the data field is missing', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ not_data: [] });

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body).toHaveProperty('error');
    });

    // Test Case 7: Request where 'data' is not an array
    test('should return a 400 error if data is not an array', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: "this is a string, not an array" });

        expect(response.statusCode).toBe(400);
        expect(response.body.is_success).toBe(false);
        expect(response.body.error).toBe("Invalid input: 'data' must be an array.");
    });
    
    // Test Case 8: Request with only special characters
    test('should correctly process an array of only special characters', async () => {
        const response = await request(app)
            .post('/bfhl')
            .send({ data: ["&", "*", "(", ")"] });

        expect(response.statusCode).toBe(200);
        expect(response.body.is_success).toBe(true);
        expect(response.body.special_characters).toEqual(["&", "*", "(", ")"]);
        expect(response.body.odd_numbers).toEqual([]);
        expect(response.body.even_numbers).toEqual([]);
        expect(response.body.alphabets).toEqual([]);
        expect(response.body.sum).toBe("0");
    });
});
