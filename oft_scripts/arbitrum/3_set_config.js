const hre = require("hardhat");
require("dotenv").config();

const oappAddress = '0x9058Be253db2c1d54Ed6b6eaA661bb1B066B9F5b';
const sendLibAddress = '0x975bcD720be66659e3EB3C0e4F1866a3020E493A';
const receiveLibAddress = '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6'
const endpointAddress = '0x1a44076050125825900e736c501f859c50fE728c'
const lzDVNAddress = '0x2f55C492897526677C5B68fb199ea31E2c126416'
const nmDVNAddress = '0xa7b5189bcA84Cd304D8553977c7C614329750d99'
const executorAddress = '0x31CAe3B7fB82d847621859fb1585353c5720660D'

const SolanaEid = 30168
const EthereumEid = 30101
const BaseEid = 30184
const LineaEid = 30183

async function main() {
    const [signer] = await hre.ethers.getSigners();

    let abiCoder = new hre.ethers.utils.AbiCoder()

    const endpointContract = new hre.ethers.Contract(endpointAddress, ENDPOINT_ABI, signer);

    const setConfigParamExecutor = {
        eid: LineaEid,
        configType: 1,
        config: abiCoder.encode(
            ["tuple(uint32 maxMessageSize,address executor)"],
            [{
                maxMessageSize: 10000,
                executor: executorAddress
            }])
    }

    const setConfigParamUln = {
        eid: LineaEid,
        configType: 2,
        config: abiCoder.encode(
            ["tuple(uint64 confirmations,uint8 requiredDVNCount,uint8 optionalDVNCount,uint8 optionalDVNThreshold,address[] requiredDVNs,address[] optionalDVNs)"],
            [{
                confirmations: 10,
                requiredDVNCount: 2,
                optionalDVNCount: 0,
                optionalDVNThreshold: 0,
                requiredDVNs: [lzDVNAddress, nmDVNAddress],
                optionalDVNs: [],
            }]
        )
    }

    let tx
    tx = await endpointContract.setConfig(oappAddress, sendLibAddress, [
        setConfigParamExecutor,
        setConfigParamUln,
    ]);
    await tx.wait();

    tx = await endpointContract.setConfig(oappAddress, receiveLibAddress, [
        setConfigParamUln,
    ]);
    await tx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

const ENDPOINT_ABI = [{"inputs":[{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"LZ_AlreadyRegistered","type":"error"},{"inputs":[],"name":"LZ_ComposeExists","type":"error"},{"inputs":[{"internalType":"bytes32","name":"expected","type":"bytes32"},{"internalType":"bytes32","name":"actual","type":"bytes32"}],"name":"LZ_ComposeNotFound","type":"error"},{"inputs":[],"name":"LZ_DefaultReceiveLibUnavailable","type":"error"},{"inputs":[],"name":"LZ_DefaultSendLibUnavailable","type":"error"},{"inputs":[{"internalType":"uint256","name":"requiredNative","type":"uint256"},{"internalType":"uint256","name":"suppliedNative","type":"uint256"},{"internalType":"uint256","name":"requiredLzToken","type":"uint256"},{"internalType":"uint256","name":"suppliedLzToken","type":"uint256"}],"name":"LZ_InsufficientFee","type":"error"},{"inputs":[],"name":"LZ_InvalidExpiry","type":"error"},{"inputs":[{"internalType":"uint64","name":"nonce","type":"uint64"}],"name":"LZ_InvalidNonce","type":"error"},{"inputs":[],"name":"LZ_InvalidPayloadHash","type":"error"},{"inputs":[],"name":"LZ_InvalidReceiveLibrary","type":"error"},{"inputs":[],"name":"LZ_LzTokenUnavailable","type":"error"},{"inputs":[],"name":"LZ_OnlyNonDefaultLib","type":"error"},{"inputs":[],"name":"LZ_OnlyReceiveLib","type":"error"},{"inputs":[],"name":"LZ_OnlyRegisteredLib","type":"error"},{"inputs":[],"name":"LZ_OnlyRegisteredOrDefaultLib","type":"error"},{"inputs":[],"name":"LZ_OnlySendLib","type":"error"},{"inputs":[],"name":"LZ_PathNotInitializable","type":"error"},{"inputs":[],"name":"LZ_PathNotVerifiable","type":"error"},{"inputs":[{"internalType":"bytes32","name":"expected","type":"bytes32"},{"internalType":"bytes32","name":"actual","type":"bytes32"}],"name":"LZ_PayloadHashNotFound","type":"error"},{"inputs":[],"name":"LZ_SameValue","type":"error"},{"inputs":[],"name":"LZ_SendReentrancy","type":"error"},{"inputs":[],"name":"LZ_Unauthorized","type":"error"},{"inputs":[],"name":"LZ_UnsupportedEid","type":"error"},{"inputs":[],"name":"LZ_UnsupportedInterface","type":"error"},{"inputs":[],"name":"LZ_ZeroLzTokenFee","type":"error"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Transfer_NativeFailed","type":"error"},{"inputs":[],"name":"Transfer_ToAddressIsZero","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint16","name":"index","type":"uint16"}],"name":"ComposeDelivered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint16","name":"index","type":"uint16"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"}],"name":"ComposeSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"address","name":"newLib","type":"address"}],"name":"DefaultReceiveLibrarySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"address","name":"oldLib","type":"address"},{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"}],"name":"DefaultReceiveLibraryTimeoutSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"address","name":"newLib","type":"address"}],"name":"DefaultSendLibrarySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"delegate","type":"address"}],"name":"DelegateSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":false,"internalType":"bytes32","name":"sender","type":"bytes32"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint64","name":"nonce","type":"uint64"}],"name":"InboundNonceSkipped","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newLib","type":"address"}],"name":"LibraryRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint16","name":"index","type":"uint16"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"extraData","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"reason","type":"bytes"}],"name":"LzComposeAlert","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"receiver","type":"address"},{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"indexed":false,"internalType":"struct Origin","name":"origin","type":"tuple"},{"indexed":false,"internalType":"bytes32","name":"guid","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"gas","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"message","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"extraData","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"reason","type":"bytes"}],"name":"LzReceiveAlert","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"}],"name":"LzTokenSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":false,"internalType":"bytes32","name":"sender","type":"bytes32"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint64","name":"nonce","type":"uint64"},{"indexed":false,"internalType":"bytes32","name":"payloadHash","type":"bytes32"}],"name":"PacketBurnt","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"indexed":false,"internalType":"struct Origin","name":"origin","type":"tuple"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"PacketDelivered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint32","name":"srcEid","type":"uint32"},{"indexed":false,"internalType":"bytes32","name":"sender","type":"bytes32"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint64","name":"nonce","type":"uint64"},{"indexed":false,"internalType":"bytes32","name":"payloadHash","type":"bytes32"}],"name":"PacketNilified","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes","name":"encodedPayload","type":"bytes"},{"indexed":false,"internalType":"bytes","name":"options","type":"bytes"},{"indexed":false,"internalType":"address","name":"sendLibrary","type":"address"}],"name":"PacketSent","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"indexed":false,"internalType":"struct Origin","name":"origin","type":"tuple"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"bytes32","name":"payloadHash","type":"bytes32"}],"name":"PacketVerified","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"address","name":"newLib","type":"address"}],"name":"ReceiveLibrarySet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"address","name":"oldLib","type":"address"},{"indexed":false,"internalType":"uint256","name":"timeout","type":"uint256"}],"name":"ReceiveLibraryTimeoutSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint32","name":"eid","type":"uint32"},{"indexed":false,"internalType":"address","name":"newLib","type":"address"}],"name":"SendLibrarySet","type":"event"},{"inputs":[],"name":"EMPTY_PAYLOAD_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NIL_PAYLOAD_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"blockedLibrary","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"bytes32","name":"_sender","type":"bytes32"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes32","name":"_payloadHash","type":"bytes32"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"bytes","name":"_message","type":"bytes"}],"name":"clear","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint16","name":"index","type":"uint16"}],"name":"composeQueue","outputs":[{"internalType":"bytes32","name":"messageHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"srcEid","type":"uint32"}],"name":"defaultReceiveLibrary","outputs":[{"internalType":"address","name":"lib","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"srcEid","type":"uint32"}],"name":"defaultReceiveLibraryTimeout","outputs":[{"internalType":"address","name":"lib","type":"address"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"dstEid","type":"uint32"}],"name":"defaultSendLibrary","outputs":[{"internalType":"address","name":"lib","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"oapp","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"delegate","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"eid","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"address","name":"_lib","type":"address"},{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"uint32","name":"_configType","type":"uint32"}],"name":"getConfig","outputs":[{"internalType":"bytes","name":"config","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint32","name":"_srcEid","type":"uint32"}],"name":"getReceiveLibrary","outputs":[{"internalType":"address","name":"lib","type":"address"},{"internalType":"bool","name":"isDefault","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRegisteredLibraries","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getSendContext","outputs":[{"internalType":"uint32","name":"","type":"uint32"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint32","name":"_dstEid","type":"uint32"}],"name":"getSendLibrary","outputs":[{"internalType":"address","name":"lib","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"bytes32","name":"_sender","type":"bytes32"}],"name":"inboundNonce","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"inboundNonce","type":"uint64"}],"name":"inboundPayloadHash","outputs":[{"internalType":"bytes32","name":"payloadHash","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"initializable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint32","name":"_dstEid","type":"uint32"}],"name":"isDefaultSendLibrary","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"lib","type":"address"}],"name":"isRegisteredLibrary","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isSendingMessage","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint32","name":"_eid","type":"uint32"}],"name":"isSupportedEid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"address","name":"_actualReceiveLib","type":"address"}],"name":"isValidReceiveLibrary","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"}],"name":"lazyInboundNonce","outputs":[{"internalType":"uint64","name":"nonce","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint16","name":"_index","type":"uint16"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"lzCompose","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint16","name":"_index","type":"uint16"},{"internalType":"uint256","name":"_gas","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"bytes","name":"_extraData","type":"bytes"},{"internalType":"bytes","name":"_reason","type":"bytes"}],"name":"lzComposeAlert","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"lzReceive","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint256","name":"_gas","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_message","type":"bytes"},{"internalType":"bytes","name":"_extraData","type":"bytes"},{"internalType":"bytes","name":"_reason","type":"bytes"}],"name":"lzReceiveAlert","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lzToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nativeToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint32","name":"_dstEid","type":"uint32"},{"internalType":"bytes32","name":"_receiver","type":"bytes32"}],"name":"nextGuid","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"bytes32","name":"_sender","type":"bytes32"},{"internalType":"uint64","name":"_nonce","type":"uint64"},{"internalType":"bytes32","name":"_payloadHash","type":"bytes32"}],"name":"nilify","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"receiver","type":"bytes32"}],"name":"outboundNonce","outputs":[{"internalType":"uint64","name":"nonce","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"receiver","type":"bytes32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"bytes","name":"options","type":"bytes"},{"internalType":"bool","name":"payInLzToken","type":"bool"}],"internalType":"struct MessagingParams","name":"_params","type":"tuple"},{"internalType":"address","name":"_sender","type":"address"}],"name":"quote","outputs":[{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint32","name":"srcEid","type":"uint32"}],"name":"receiveLibraryTimeout","outputs":[{"internalType":"address","name":"lib","type":"address"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"recoverToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lib","type":"address"}],"name":"registerLibrary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"dstEid","type":"uint32"},{"internalType":"bytes32","name":"receiver","type":"bytes32"},{"internalType":"bytes","name":"message","type":"bytes"},{"internalType":"bytes","name":"options","type":"bytes"},{"internalType":"bool","name":"payInLzToken","type":"bool"}],"internalType":"struct MessagingParams","name":"_params","type":"tuple"},{"internalType":"address","name":"_refundAddress","type":"address"}],"name":"send","outputs":[{"components":[{"internalType":"bytes32","name":"guid","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"},{"components":[{"internalType":"uint256","name":"nativeFee","type":"uint256"},{"internalType":"uint256","name":"lzTokenFee","type":"uint256"}],"internalType":"struct MessagingFee","name":"fee","type":"tuple"}],"internalType":"struct MessagingReceipt","name":"","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"bytes32","name":"_guid","type":"bytes32"},{"internalType":"uint16","name":"_index","type":"uint16"},{"internalType":"bytes","name":"_message","type":"bytes"}],"name":"sendCompose","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"address","name":"_lib","type":"address"},{"components":[{"internalType":"uint32","name":"eid","type":"uint32"},{"internalType":"uint32","name":"configType","type":"uint32"},{"internalType":"bytes","name":"config","type":"bytes"}],"internalType":"struct SetConfigParam[]","name":"_params","type":"tuple[]"}],"name":"setConfig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_newLib","type":"address"},{"internalType":"uint256","name":"_gracePeriod","type":"uint256"}],"name":"setDefaultReceiveLibrary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_lib","type":"address"},{"internalType":"uint256","name":"_expiry","type":"uint256"}],"name":"setDefaultReceiveLibraryTimeout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_newLib","type":"address"}],"name":"setDefaultSendLibrary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_delegate","type":"address"}],"name":"setDelegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_lzToken","type":"address"}],"name":"setLzToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_newLib","type":"address"},{"internalType":"uint256","name":"_gracePeriod","type":"uint256"}],"name":"setReceiveLibrary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_lib","type":"address"},{"internalType":"uint256","name":"_expiry","type":"uint256"}],"name":"setReceiveLibraryTimeout","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"uint32","name":"_eid","type":"uint32"},{"internalType":"address","name":"_newLib","type":"address"}],"name":"setSendLibrary","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_oapp","type":"address"},{"internalType":"uint32","name":"_srcEid","type":"uint32"},{"internalType":"bytes32","name":"_sender","type":"bytes32"},{"internalType":"uint64","name":"_nonce","type":"uint64"}],"name":"skip","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"verifiable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint32","name":"srcEid","type":"uint32"},{"internalType":"bytes32","name":"sender","type":"bytes32"},{"internalType":"uint64","name":"nonce","type":"uint64"}],"internalType":"struct Origin","name":"_origin","type":"tuple"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"bytes32","name":"_payloadHash","type":"bytes32"}],"name":"verify","outputs":[],"stateMutability":"nonpayable","type":"function"}]