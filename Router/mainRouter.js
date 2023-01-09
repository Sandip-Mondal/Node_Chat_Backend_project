const express = require("express");
const router = express.Router();
const signup = require("./SignUp");
const Login = require("./login");
const HiddenPage = require("./HidenPage");
const Auth = require('../MiddleWare/Auth');
const GetMessage = require("./GetMessage");
const { SingleChat, groupChat, fetchChat, sendChatInfo, renameGroupName, addToGroup,removeFromGroup,deleteGroup } = require("./ConnectionChat");
const MessageSent = require("./MessageSent");
const { SearchUserForSingleChat, searchUserForGroupChat } = require("./SearchUser");

router.post("/signup", signup);
router.post("/login", Login);
router.get("/page", Auth, HiddenPage);
router.get("/singlechat/:id", Auth, SingleChat);
router.post("/groupchat", Auth, groupChat);
router.get("/chatInfo/:chatId", sendChatInfo);
router.patch("/updateGroupName/:chatId/:newChatName", renameGroupName);
router.patch("/addUser/:chatId/:userId", addToGroup);
router.post("/removeUser", removeFromGroup);   
router.delete("/deleteGroup/:chatId", deleteGroup); 
router.post("/getmessage", Auth, GetMessage);
router.post("/MessageSent", Auth, MessageSent);
router.get("/fetchchat", Auth, fetchChat);
router.get("/search/:search", Auth, SearchUserForSingleChat);
router.get("/searchGroup/:email", Auth, searchUserForGroupChat);


module.exports = router;