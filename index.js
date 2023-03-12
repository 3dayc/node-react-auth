const express = require('express');
const app = express();
const port = 5001;
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있게 함
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 위와 마찬가지지만 json 데이터
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://hyanghoon:${process.env.REACT_APP_MONGODB_PW}@cluster0.vdejef3.mongodb.net/?retryWrites=true&w=majority`
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/login', (req, res) => res.send('Login'));

app.post('/resist', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);

  // 몽구스 5.0 이상에서는 save() 메서드에 콜백 함수를 전달할 수 없으므로 에러 발생
  // 해결방법 : save() 메서드가 프로미스를 반환하므로 콜백 함수를 사용할 필요가 없음
  // 대신, then() 및 catch()를 사용하여 결과 처리할 수 있다.

  // user.save((err, userInfo) => {
  //   if (err) return res.json({ success: false, err });
  //   return res.status(200).json({
  //     success: true,
  //   });
  // });

  user
    .save()
    .then((userInfo) => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.listen(port, () => console.log(`on port ${port}`));
