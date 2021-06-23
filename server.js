const app = require('./app');
const port = 3000;
// http 일 때랑 거의 비슷
app.listen(port, () => { 
    console.log(`App running on port ${port}...`);
});