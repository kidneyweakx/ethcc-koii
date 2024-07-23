const { namespaceWrapper } = require('@_koii/namespace-wrapper');
const axios = require('axios');
const getIPFSData = require('./nftCopyright/getNFTcid');
class Submission {
  /**
   * Executes your task, optionally storing the result.
   *
   * @param {number} round - The current round number
   * @returns {void}
   */
  async task(round) {
    console.log('Started Task', new Date(), process.env.TEST_KEYWORD)
    try {
      console.log('ROUND', round);

      const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
      }

      const validNum = getRandom(1, process.env.MAX_TOKEN_ID);
      const data = await getIPFSData(process.env.NFT_ADDRESS, validNum);
      const image = data.image

      const ipfsCID = image.split('ipfs://')[1];
      console.log('IPFS CID', ipfsCID);

      await namespaceWrapper.storeSet('value', ipfsCID);
      return ipfsCID
    } catch (err) {
      console.log('ERROR IN EXECUTING TASK', err);
      return 'ERROR IN EXECUTING TASK' + err;
    }
  }

  /**
   * Submits a task for a given round
   *
   * @param {number} round - The current round number
   * @returns {Promise<any>} The submission value that you will use in audit. Ex. cid of the IPFS file
   */
  async submitTask(round) {
    console.log('SUBMIT TASK CALLED ROUND NUMBER', round);
    try {
      console.log('SUBMIT TASK SLOT', await namespaceWrapper.getSlot());
      const submission = await this.fetchSubmission(round);
      console.log('SUBMISSION', submission);
      await namespaceWrapper.checkSubmissionAndUpdateRound(submission, round);
      console.log('SUBMISSION CHECKED AND ROUND UPDATED');
      return submission;
    } catch (error) {
      console.log('ERROR IN SUBMISSION', error);
    }
  }
  /**
   * Fetches the submission value
   *
   * @param {number} round - The current round number
   * @returns {Promise<string>} The submission value that you will use in audit. It can be the real value, cid, etc.
   *
   */
  async fetchSubmission(round) {
    console.log('FETCH SUBMISSION');
    // Fetch the value from NeDB
    const value = await namespaceWrapper.storeGet('value'); // retrieves the value
    // Return cid/value, etc.
    return value;
  }
}
const submission = new Submission();
module.exports = { submission };
