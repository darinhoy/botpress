const axios = require('axios');

const checkLoanStatus = async (state, event) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/loan-status?botpress_user_id=${event.user.id}`);
    state.loanStatusMessage = `Your loan status: ${response.data.status}`;
  } catch (err) {
    state.loanStatusMessage = '❌ Could not check status.';
    console.error(err);
  }
  return state;
}

return checkLoanStatus(state, event);
