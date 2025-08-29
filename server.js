const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

//dummy data
        const fullName = "arshlaan_siddiquie";
        const dob = "14022004";
        const email = "arshlaan.siddiquie2022@vitstudent.ac.in";
        const rollNumber = "22BCB0132";

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input: 'data' must be an array." });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (!isNaN(parseFloat(item)) && isFinite(item)) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(num));
                } else {
                    odd_numbers.push(String(num));
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else {
                special_characters.push(item);
            }
        });
//parsing
        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }
//respomse
        const response = {
            is_success: true,
            user_id: `${fullName}_${dob}`,
            email: email,
            roll_number: rollNumber,
            odd_numbers: odd_numbers,
            even_numbers: even_numbers,
            alphabets: alphabets,
            special_characters: special_characters,
            sum: String(sum),
            concat_string: concat_string,
        };

//success
        res.status(200).json(response);

    } catch (error) {
//error
        console.error("Error processing request:", error);
        res.status(500).json({ is_success: false, error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;