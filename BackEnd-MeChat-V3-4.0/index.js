const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

//models
const Account = require("./models/account");
const User = require("./models/user");

dotenv.config({
  path: "./config.env",
});
process.on("uncaughtException", (err) => {
  process.exit(1);
});

const app = require("./app");

// Connect the database
mongoose.connect(
  process.env.DATABASE,
  () => {
    console.log("Success");
  },
  (e) => console.error(e)
);

// Start the server
const _port = process.env.PORT;
app.listen(_port, () => {
  console.log(`Application is running on port ${_port}`);
});

process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});

// run();
// async function run() {
//   ///User 1
//   const _HuyAccount = await Account.create({
//     phoneNumber:"0879276284",
//     passWord:await bcrypt.hash("123456", 10),
//   });

//   const _HuyUser = await User.create({
//     fullName:"Nguyen Duc Huy",
//     bio:"Sông Lam",
//     birthday:Date.now(),
//     accountID:_HuyAccount,
//     avatarLink:"https://mechat.s3.ap-southeast-1.amazonaws.com/huy.jpg",
//     backgroundLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/background.jpg",     
//   });

//   //User 2

//   const _PhuongAccount = await Account.create({
//     phoneNumber:"0396887293",
//     passWord:await bcrypt.hash("123456", 10),
//   });

//   const _PhuongUser = await User.create({
//     fullName:"Võ Minh Phương",
//     bio:"Sông Lam",
//     birthday:Date.now(),
//     accountID:_PhuongAccount,
//     avatarLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/phuong.jpg",
//     backgroundLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/background.jpg",
//   });

//   //User 3
//   const _TuanAccount = await Account.create({
//     phoneNumber:"0343220597",
//     passWord:await bcrypt.hash("123456", 10),
//   });

//   const _TuanUser = await User.create({
//     fullName:"Lê Tuấn",
//     bio:"Sông Lam",
//     birthday:Date.now(),
//     accountID:_TuanAccount,
//     avatarLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/tuan.jpg",
//     backgroundLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/background.jpg",
//   });

//   //User 4
//   const _NhoAccount = await Account.create({
//     phoneNumber:"0397548005",
//     passWord:await bcrypt.hash("123456", 10),
//   });

//   const _NhoUser = await User.create({
//     fullName:"Võ Thành Nhớ",
//     bio:"Sông Lam",
//     birthday:Date.now(),
//     accountID:_NhoAccount,
//     avatarLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/nho.jpg",
//     backgroundLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/background.jpg",
//   });

//   //User 5
//   const _TranAccount = await Account.create({
//     phoneNumber:"0325676569",
//     passWord:await bcrypt.hash("123456", 10),
//   });

//   const _TranUser = await User.create({
//     fullName:"Tăng Bảo Trấn",
//     bio:"Sông Lam",
//     birthday:Date.now(),
//     accountID:_TranAccount,
//     avatarLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/tran.jpg",
//     backgroundLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/background.jpg",
//   });

//   //User 6
//   const _admin = await Account.create({
//     phoneNumber:"0878787878",
//     passWord:await bcrypt.hash("123456", 10),
//   });

//   const _AdminUser = await User.create({
//     fullName:"Admin",
//     bio:"Admin",
//     birthday:Date.now(),
//     accountID:_admin,
//     avatarLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/admin.png",
//     backgroundLink:"https://mechat-v2.s3.ap-southeast-1.amazonaws.com/background.jpg",
//   });

//   await _HuyAccount.save();
//   await _HuyUser.save();

//   await _TuanAccount.save();
//   await _TuanUser.save();

//   await _NhoAccount.save();
//   await _NhoUser.save();

//   await _PhuongAccount.save();
//   await _PhuongUser.save();

//   await _TranAccount.save();
//   await _TranUser.save();
// }
