const express = require('express');
const app = express();
const cors=require('cors')
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api', (req, res) => {
    const { data }=req.body;
    // res.json({massage:`ok ${data}`})
    console.log(data);

     res.json(data);
});

app.listen(port, () => {
    console.log(`server ${port}`);
});
