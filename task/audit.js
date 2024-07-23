const { namespaceWrapper } = require('@_koii/namespace-wrapper');
const { parse } = require('dotenv');

class Audit {
  /**
   * Validates the submission value by your logic
   *
   * @param {string} submission_value - The submission value to be validated
   * @param {number} round - The current round number
   * @returns {Promise<boolean>} The validation result, return true if the submission is correct, false otherwise
   */
  async validateNode(submission_value, round) {
    let vote;
    console.log('SUBMISSION VALUE', submission_value, round);
    try {
      const qid = submission_value.split('/')[0]
      // submission value = QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg + token id
      
      if (qid === 'QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg') {
        console.log(submission_value.split('/')[1].split('.')[0])
        if (parseInt(submission_value.split('/')[1].split('.')[0]) <= parseInt(process.env.MAX_TOKEN_ID)) {
          vote = true;
        }
      } else {
        vote = false;
      }
    } catch (e) {
      console.error(e);
      vote = false;
    }
    return vote;
  }
  /**
   * Audits the submission value by your logic
   *
   * @param {number} roundNumber - The current round number
   * @returns {void}
   */
  async auditTask(roundNumber) {
    console.log('AUDIT CALLED IN ROUND', roundNumber);
    console.log('CURRENT SLOT IN AUDIT', await namespaceWrapper.getSlot());
    await namespaceWrapper.validateAndVoteOnNodes(this.validateNode, roundNumber);
  }
}
const audit = new Audit();
module.exports = { audit };
