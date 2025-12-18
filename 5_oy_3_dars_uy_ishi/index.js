//-------------------------------------------------1 creata Bookstore

// use Bookstore

//-------------------------------------------------2 createCallection Books, Authors, members, Orders

// db.createCollection("Books")
// db.createCollection("Authors")
// db.createCollection("members")
// db.createCollection("Orders")

//-------------------------------------------------3 insertData in Books

// db.Books.insertOne({bookname: "O‘tkan kunlar", author: "Abdulla Qodiriy", ganr: "Tarixiy roman", year: "1925", copy: "1000000"})
// db.Books.insertOne({bookname: "Mehrobdan chayon", author: "Abdulla Qodiriy", ganr: "Ijtimoiy roman", year: "1929", copy: "500000"})
// db.Books.insertOne({bookname: "Kecha va kunduz", author: "Cho‘lpon", ganr: "Roman", year: "1936", copy: "1000000"})
// db.Books.insertOne({bookname: "Ulug‘bek xazinasi", author: "Odil Yoqubov", ganr: "Tarixiy roman", year: "1973", copy: "100000"})
// db.Books.insertOne({bookname: "Shum bola", author: "G‘afur G‘ulom", ganr: "Qissа", year: "1936", copy: "1000000"})

//-------------------------------------------------3 insertData in Authors

// db.Authors.insertOne({author: "G‘afur G‘ulom", Birthyear: "1903", ganr: "Qissa, she’riyat, hajv"})
// db.Authors.insertOne({author: "Abdulla Qodiriy", Birthyear: "1894", ganr: "Tarixiy roman, ijtimoiy nasr"})
// db.Authors.insertOne({author: "Cho‘lpon", Birthyear: "1897", ganr: "Roman, she’riyat, publitsistika"})
// db.Authors.insertOne({author: "Odil Yoqubov", Birthyear: "1926", ganr: "Roman, drama"})

//-------------------------------------------------3 insertData in members

// db.members.insertOne({username: "Qudrat", age: 23, join: "17.12.2025"})
// db.members.insertOne({username: "Sherzod", age: 15, join: "17.12.2025"})
// db.members.insertOne({username: "Sarvar", age: 16, join: "17.12.2025"})
// db.members.insertOne({username: "Bobur", age: 14, join: "17.12.2025"})
// db.members.insertOne({username: "Maqsaddin", age: 14, join: "17.12.2025"})

//-------------------------------------------------3 insertData in Orders tekshiruv bilan

// let BooksArr = db.Books.find().toArray();

// compartion(BooksArr, "Qudrat", "Kecha va kunduz", 7);

// function compartion(have, username, bookname, count) {
//   for (let i = 0; i < have.length; i++) {
//     let belgi = have[i];
//     if (belgi.bookname === bookname) {
//       if (belgi.count >= count) {

//         db.Orders.insertOne({
//           username: username,
//           bookname: bookname,
//           date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}_${new Date().getHours()}:${new Date().getMinutes()}`,
//           count: count,
//         });

//         db.Books.updateOne(
//           { bookname: { $lte: bookname } },
//           { $set: { count: (belgi.count - count) } }
//         );

//         return console.log(belgi.count - count);
//       } else {
//         return console.log("Do'konda buncha kitob yo'q");
//       }
//     }
//   }
//   return console.log("Kitob nomi xato yoki do'konda bu kitob yo'q");
// }

//-------------------------------------------------3 insertData in Orders

// db.Orders.insertOne({username: "Qudrat", bookname: "Kecha va kunduz", date: "17.12.2025", count: 1})
// db.Orders.insertOne({username: "Bobur", bookname: "Kecha va kunduz", date: "17.12.2025", count: 2})
// db.Orders.insertOne({username: "Sherzod", bookname: "Kecha va kunduz", date: "17.12.2025", count: 1})
// db.Orders.insertOne({username: "Sherzod", bookname: "O‘tkan kunlar", date: "17.12.2025", count: 2})
// db.Orders.insertOne({username: "Bobur", bookname: "O‘tkan kunlar", date: "17.12.2025", count: 2})
// db.Orders.insertOne({username: "Qudrat", bookname: "O‘tkan kunlar", date: "17.12.2025", count: 1})
// db.Orders.insertOne({username: "Sarvar", bookname: "O‘tkan kunlar", date: "17.12.2025", count: 1})
// db.Orders.insertOne({username: "Bobur", bookname: "Ulug‘bek xazinasi", date: "17.12.2025", count: 1})
// db.Orders.insertOne({username: "Maqsaddin", bookname: "Shum bola", date: "17.12.2025", count: 1})

// ---------------------------------------------esdan chiqgan narsalarni qaytadan update qildim

// db.Books.updateMany({year: {$lt: "2000"}}, {$set: {count: 15}})

// -------------------------------------------------4 muallifning ismi bo'yicha kitoblarni qidirish

// let author = db.Books.find().toArray();
// function orderArray(arr, muallif) {
//   let result = {};

//   for (let i = 0; i < arr.length; i++) {
//     let { bookname, count, author } = arr[i];

//     if (author === muallif) {
//       result[bookname] = (result[bookname] || 0) + count;
//     }
//   }

//   return result;
// }

// console.log(orderArray(author, "Abdulla Qodiriy"));

// -------------------------------------------------5 hisobot

// let OrderArr = db.Orders.find().toArray();

// function orderArray(arr) {
//   let result = {};

//   for (let i = 0; i < arr.length; i++) {
//     let { bookname, count } = arr[i];

//     if (!result[bookname]) {
//       result[bookname] = 0;
//     }

//     result[bookname] += count;
//   }

//   return result;
// }

// console.log(orderArray(OrderArr));

// -------------------------------------------------5 hisobot

// db.members.aggregate([{$group: {_id : "$age", count: {$sum: 1}}}])
// db.Books.aggregate([{$group: {_id : "$ganr", count: {$sum: 1}}}])

// -------------------------------------------------6 Qo'shimcha topshiriqlaar

// let memberss = db.members.find().toArray().length; console.log(memberss)

// -------------------------------------------------6 Qo'shimcha topshiriqlaar

// let OrdersArray = db.Orders.find().toArray();

// function orderArray(arr) {
//   let result = {};

//   for (let i = 0; i < arr.length; i++) {
//     let { username, count } = arr[i];

//     if (!result[username]) {
//       result[username] = 0;
//     }

//     result[username] += count;
//   }

//   return result;
// }

// console.log(orderArray(OrdersArray));
