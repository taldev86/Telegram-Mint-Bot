// https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = 'test';

require('dotenv').config()
const Web3 = require('web3')
// Use your contract abi
const abi = require('./abi.json')
// Use your rpc node websocket url
const web3wss = new Web3(process.env.WSS_RPC_NODE)
// Use your contract address
const contract = new web3wss.eth.Contract(abi, process.env.CONTRACT_ADDRESS);
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

// Use the link of the place where you store the nft images.( pinata cloud, ipfs, aws s3, drive etc. )
const imageStore = process.env.IMAGE_STORE
// Use your bot token
const token = process.env.TELEGRAM_BOT_TOKEN;
const app = express();
const port = 3002;
var bodyParser = require('body-parser');
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const collectionName = "Pet Frens"

const timer = ms => new Promise(res => setTimeout(res, ms))

contract.events.Transfer({})
    .on('data', async event => {
        const bot = new TelegramBot(token, { polling: true });
        // @test-chat-id 555108763
        if (event.returnValues.from === '0x0000000000000000000000000000000000000000') {
            try {
                await bot.sendPhoto(-1001618068341,`${imageStore}/${event.returnValues.tokenId}.png`, { caption: `${collectionName} #${event.returnValues.tokenId} minted! 🎉` })
                await timer(3000); 
            } catch (error) {
                console.log(error);
            }    
        }
        console.log(deneme);
    })

app.listen(port);
module.exports = app