const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

// Định nghĩa các route cho Contact
router.route("/")
  .get(contacts.findAll)        // Lấy danh sách tất cả contact
  .post(contacts.create)        // Tạo contact mới
  .delete(contacts.deleteAll);  // Xóa toàn bộ contact

router.route("/favorite")
  .get(contacts.findAllFavorite); // Lấy danh sách contact yêu thích

router.route("/:id")
  .get(contacts.findOne)        // Lấy 1 contact theo id
  .put(contacts.update)         // Cập nhật contact
  .delete(contacts.delete);     // Xóa contact theo id

module.exports = router;