const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transation,
  Account,
} = require('@solana/web3.js')

const newPair = new Keypair() //init a new keypair
console.log(newPair)

const publicKey = new PublicKey(newPair._keypair.publicKey).toString() // extract publicKey as string
const secretKey = newPair._keypair.secretKey // extract secretKey as a uint array

const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed') // create a connection object to get balance on devnet
    const myWallet = await Keypair.fromSecretKey(secretKey) // create a wallet
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey),
    )
    console.log(`Wallet address ${publicKey}`)
    console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}`)
  } catch (err) {
    console.log(err)
  }
}

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed') // create a connection object to get balance on devnet
    const walletKeyPair = await Keypair.fromSecretKey(secretKey) // create a wallet
    console.log(`--Airdropping 2 SOL--`)
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL,
    )
    await connection.confirmTransaction(fromAirDropSignature)
  } catch (err) {
    console.log(err)
  }
}

const driverFunction = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

driverFunction()
